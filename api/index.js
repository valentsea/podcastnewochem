/* eslint-disable */

const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const podcastFeedParser = require('podcast-feed-parser')
const { MongoClient } = require('mongodb')
const csvToJson = require('convert-csv-to-json')

const mongoUrl =
    'mongodb+srv://tarasowalentin:Xy6EnM4ZGibsYKn@cluster0.7saxp.mongodb.net/newochem?retryWrites=true&w=majority'
const RSS_URL = 'https://podster.fm/rss.xml?pid=48291'
const PATREON_RSS_URL =
    'https://www.patreon.com/rss/newochem?auth=XPyveZC4v9PFsa2KFDOXQ2BuWrJWBYO-'
let intervalOfUpdating = 14400000 // 4 hours
let episodesCachedFromDB
let episodesPatronUrlsCachedFromRSS
let episodesPatronNoUrlsCachedFromRSS

// main logic
async function updateEpisodesAPI() {
    let episodes = await getEpisodesArrayFromRSS()

    for (let i = 0; i < 3; i++) {
        const episode = episodes[i]
        console.log(episode.title)
        await updateEpisodeInDB(episode)
    }

    cacheEpisodesFromDB()
}

updateEpisodesAPI()
getEpisodesArrayFromPatreonRSS(true).then(
    (episodes) => (episodesPatronUrlsCachedFromRSS = episodes)
)
getEpisodesArrayFromPatreonRSS(false).then(
    (episodes) => (episodesPatronNoUrlsCachedFromRSS = episodes)
)
setInterval(async () => {
    await updateEpisodesAPI()
    episodesPatronUrlsCachedFromRSS = await getEpisodesArrayFromPatreonRSS(true)
    episodesPatronNoUrlsCachedFromRSS = await getEpisodesArrayFromPatreonRSS(
        false
    )
}, intervalOfUpdating)

// end of main logic

// Express
const app = express()
app.use(cors())
const port = 80

app.get('/api/episodes', async (req, res) => {
    res.send(episodesCachedFromDB)
})
app.get('/api/patreon-episodes', async (req, res) => {
    let email = req.query.email
    let isPatron = await checkIsPatron(email)
    let episodes
    if (isPatron) {
        episodes = episodesPatronUrlsCachedFromRSS
        res.send({ episodes })
    } else {
        episodes = episodesPatronNoUrlsCachedFromRSS
        res.send({ episodes })
    }
})
app.get('/api/isPatron', async (req, res) => {
    let email = req.query.email
    let isPatron = await checkIsPatron(email)
    res.send({ isPatron })
})

app.listen(port, () => {
    console.log(`The app listening at http://localhost:${port}/api/episodes`)
    // console.log(`The app listening at http://localhost:${port}/podcast`)
})
// END Express

// TOOLS: RSS
async function getEpisodesArrayFromRSS() {
    const options = {
        fields: {
            episodes: [
                'title',
                'itunes:episode',
                'description',
                'pubDate',
                'link',
                'enclosure',
                'duration',
                'listenings',
            ],
        },
    }
    const rss = await podcastFeedParser.getPodcastFromURL(RSS_URL, options)
    let episodes = rss.episodes

    for (let i = 0; i < episodes.length; i++) {
        let episode = episodes[i]
        episode.id = episode['itunes:episode']
        episode.listenings = +episode.listenings
        delete episode.summary
        delete episode['itunes:episode']
        delete episode.subtitle
    }

    return episodes
}

async function getEpisodesArrayFromPatreonRSS(isPatron = false) {
    const options = {
        fields: {
            episodes: ['title', 'description', 'pubDate', 'link', 'enclosure'],
        },
    }
    const rss = await podcastFeedParser.getPodcastFromURL(
        PATREON_RSS_URL,
        options
    )

    let episodes = rss.episodes
    shortEpisodes = []

    episodes.forEach((episode, index) => {
        if (
            episode.title.includes('Короткий Newочём') ||
            episode.title.includes('Один день на Венере') ||
            episode.title.includes('Нечеловеческая жизнь внутри нас') ||
            episode.title.includes(
                'История об охотнике за привидением в лаборатории'
            )
        ) {
            episode.id = 'p' + (episodes.length - index + 1)
            episode.duration = Math.round(
                ((episode.enclosure.length / 1024) * 8) / 192
            )
            episode.patreon = true
            if (!isPatron) {
                episode.enclosure.url = null
            }
            shortEpisodes.push(episode)
        }
    })

    return shortEpisodes
}
// getEpisodesArrayFromPatreonRSS()
async function getPatrons() {
    let patreonJSON = new Promise((resolve, reject) => {
        const dirpath = path.join(__dirname, '/patreon/')
        return fs.readdir(dirpath, (err, files) => {
            const csv = files.filter((el) => /\.csv$/.test(el))
            csv.sort((a, b) => b.replace(/[D]+/g, '') - a.replace(/[D]+/g, ''))
            let json = csvToJson
                .fieldDelimiter(',')
                .getJsonFromCsv(dirpath + csv[0])

            resolve(json)
        })
    })

    return await patreonJSON
}
// getPatrons().then(console.log)

async function checkIsPatron(email) {
    if (!email) {
        return false
    }
    let patrons = await getPatrons()
    for (let i = 0; i < patrons.length; i++) {
        const patron = patrons[i]
        console.log(patron)
        if (patron['Email'].toLowerCase() == email.toLowerCase()) {
            return true
        }
    }
    return false
}

// TOOLS: DB
async function cacheEpisodesFromDB() {
    getEpisodesFromDB().then((episodes) => {
        episodesCachedFromDB = episodes
        console.log('Episodes is cached')
    })
}

async function getEpisodesFromDB() {
    let client, db
    try {
        client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })
        db = client.db('newochem')
        let collection = db.collection('episodes')
        let episodes = await collection.find({}).toArray()
        return { episodes }
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
    }
}

async function insertEpisodeInDB(episode) {
    let client, db
    try {
        client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })
        db = client.db('newochem')
        let collection = db.collection('episodes')
        await collection.insertOne(episode)
        return true
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
    }
}

async function updateEpisodeInDB(episode) {
    let client, db
    try {
        client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })
        db = client.db('newochem')
        let collection = db.collection('episodes')
        await collection.replaceOne({ id: episode.id }, episode, {
            upsert: true,
        })
        await client.close()

        return true
    } catch (err) {
        console.error(err)
    } finally {
    }
}