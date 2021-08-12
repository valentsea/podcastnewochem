/* eslint-disable */

const express = require('express')
const cors = require('cors')
const podcastFeedParser = require('podcast-feed-parser')
const {MongoClient} = require('mongodb')

const mongoUrl =
	'mongodb+srv://tarasowalentin:Xy6EnM4ZGibsYKn@cluster0.7saxp.mongodb.net/newochem?retryWrites=true&w=majority'
const RSS_URL = 'https://podster.fm/rss.xml?pid=48291'
let intervalOfUpdating = 14400000 // 4 hours
let epsodesCachedFromDB

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
setInterval(() => {
	updateEpisodesAPI()
}, intervalOfUpdating)

// end of main logic

// Express
const app = express()
app.use(cors())
const port = 80

app.get('/api/episodes', async (req, res) => {
	res.send(epsodesCachedFromDB)
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

// TOOLS: DB
async function cacheEpisodesFromDB() {
	getEpisodesFromDB().then((episodes) => {
		epsodesCachedFromDB = episodes
		console.log('Episodes is cached')
	})
}

async function getEpisodesFromDB() {
	let client, db
	try {
		client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true})
		db = client.db('newochem')
		let collection = db.collection('episodes')
		let episodes = await collection.find({}).toArray()
		return {episodes}
	} catch (err) {
		console.error(err)
	} finally {
		await client.close()
	}
}

async function insertEpisodeInDB(episode) {
	let client, db
	try {
		client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true})
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
		client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true})
		db = client.db('newochem')
		let collection = db.collection('episodes')
		await collection.replaceOne({id: episode.id}, episode, {
			upsert: true,
		})
		await client.close()

		return true
	} catch (err) {
		console.error(err)
	} finally {
	}
}
