const puppeteer = require('puppeteer')
const csvToJson = require('convert-csv-to-json')

const VK_LINK = 'https://vk.com/podcast-80512191_456239716'
const YOUTUBE_LINK =
	'https://www.youtube.com/channel/UCmSJlQptWjgSbd7jJEBdlvg/videos'
const YOUTUBE_API_KEY = 'AIzaSyDSka1HDHF6PILh2XBoOfmxDtyZ-mTQV_g'
const YOUTUBE_ID = 'UCmSJlQptWjgSbd7jJEBdlvg'
const YANDEX_LINK = 'https://music.yandex.ru/album/6316997'

const parseFullNewochemPodcast = async () => {
	try {
		console.log('Start browser')
		const browser = await puppeteer.launch({
			handless: false,
			slowMo: 100,
			devtools: true,
		})
		console.log('Opening new tab')

		const page = await browser.newPage()
		await page.setViewport({width: 1400, height: 900})

		//IMPORTANT
		let episodes = await getEpisodesFromRSS()
		// let episodes = epsodesCachedFromDB.episodes

		//if dont want to change
		// let episodes = require('./episodes.json')
		// episodes = episodes.episodes
		let linksAndTitlesVK = await getLinksAndTitlesFromVK(page)
		// console.log('linksAndTitlesVK')
		// console.log(linksAndTitlesVK)

		let linksAndTitlesYandex = await getLinksAndTitlesFromYandex(page)

		episodes = await addListeningsAndLinksFromYouTube(page, episodes)

		let listeningsAndTitlesYandexCSV = await listeningsAndTitlesfromYandexCSV()

		// let linksAndTitlesYouTube = await getServicesArrFromYouTube()
		let client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true})
		let db = client.db('newochem')
		let collection = db.collection('episodes')
		for (let i = 0; i < (await episodes.length); i++) {
			let episode = episodes[i]

			let podster = await getListeningsFromPodster(page, episode)
			if (podster) {
				episode.services.push(podster)
			}

			let vk = await getListeningsFromVK(page, episode, linksAndTitlesVK)
			console.log(vk)
			if (vk) {
				episode.services.push(vk)
			}

			let yandex = await listeningsAndTitlesYandexCSV.find(
				(ep) => ep.title == episode.title
			)
			let yandexLink = await linksAndTitlesYandex.find(
				(ep) => ep.title == episode.title
			)
			if (yandex) {
				if (yandexLink) {
					yandex.link = yandexLink.link
				}
				delete yandex.title
				yandex.listenings = +yandex.listenings
				episode.services.push(yandex)
			}

			// 	// let youtube = await linksAndTitlesYouTube.find((ep) => {
			// 	// 	ep.title
			// 	// 		.toLowerCase()
			// 	// 		.replace(/[^\w\s]|_/g, '') // знаки препинания
			// 	// 		.replace(' ', '')
			// 	// 		.slice(0, 8) ==
			// 	// 		episode.title
			// 	// 			.toLowerCase()
			// 	// 			.replace(/[^\w\s]|_/g, '') // знаки препинания
			// 	// 			.replace(' ', '')
			// 	// 			.slice(0, 8)
			// 	// })
			// 	// console.log(youtube)
			// 	// if (youtube) {
			// 	// 	delete youtube.title
			// 	// 	episode.services.push(youtube)
			// 	// }

			episode.services.forEach((service) => {
				episode.listenings += service.listenings
			})
			await collection.replaceOne({id: episode.id}, episode)

			// updateEpisodeInDB(episode)
		}
		await client.close()

		if (Object.keys(episodes).length == 0) {
			console.log('FAIL')
			await browser.close()

			return
		}

		console.log('SUCCESS')
		console.log('-------------------------')

		await browser.close()

		return episodes
	} catch (err) {
		console.log(err)
	}
}

// parseFullNewochemPodcast().then((episodes) => {
// 	fs.writeFileSync('episodes.json', JSON.stringify({episodes}), function (err) {
// 		if (err) {
// 			throw err
// 		}
// 		console.log('episodes.json is created')
// 		console.log('END')
// 	})
// })

const getListeningsFromYouTube = async (episode, linksAndTitlesYouTube) => {
	try {
		let linkAndtitle = linksAndTitlesYouTube.find((ep) => {
			ep.title
				.toLowerCase()
				.replace(/\s*\(.+?\)$/gm, '') //то, что в скобках
				.replace(/[^\w\s]|_/g, '') // знаки препинания
				.replace('часть', '')
				.replace(' ', '') ==
				episode.title
					.toLowerCase()
					.replace(/\s*\(.+?\)$/gm, '') //то, что в скобках
					.replace(/[^\w\s]|_/g, '') // знаки препинания
					.replace('часть', '')
					.replace(' ', '')
		})

		if (linkAndtitle) {
		}
	} catch (err) {
		console.log(err)
		return episode
	}
}

const parseLastEpisode = async (episodes) => {
	// let episodes = podcast.episodes

	try {
		//Open and setup browser
		const browser = await puppeteer.launch({
			handless: false,
			slowMo: 100,
			devtools: true,
		})
		const page = await browser.newPage()
		await page.setViewport({width: 1400, height: 900})

		//Open link and get the data
		await page.goto(PODSTER_LINK, {waitUntil: 'domcontentloaded'})
		const lastEpisode = await page.evaluate(() => {
			podsterLink = document.querySelector(
				'a.hap-listen-on-podster.hap-contr-btn'
			).href
			id = podsterLink.split('/').pop()

			let links = {
				podster: podsterLink,
			}

			let title = document.querySelector('div.hap-player-title').innerText

			let publishDate = document.querySelector('div.hap-player-artist')
				.innerText

			let description = document
				.querySelector('#podcast-about>div.catalog__btns')
				.innerHTML.trim()

			let src = document.querySelector('a.hap-download.hap-contr-btn').href
			src = src.split('?').shift() + '?media=rss'

			let listenings = document.querySelector('div.hap-player-stat').textContent
			listenings = parseInt(listenings)

			return {
				id,
				title,
				publishDate,
				src,
				listenings,
				links,
				description,
			}
		})

		if (episodes[0].id == lastEpisode.id) {
			console.log('There is no new episode')
			return episodes
		}

		episodes.unshift(lastEpisode)

		// podcast.episodes = await episodes
		await browser.close()

		fs.writeFile('episodes.json', JSON.stringify(episodes), function (err) {
			if (err) {
				throw err
			}
			console.log('episodes.json is created!')
		})

		return episodes
	} catch (err) {
		console.log(err)
		return episodes
	}
}

const updateListenings = async (episodes) => {
	// let episodes = podcast.episodes

	try {
		process.stdout.write('Start browser' + '\r')
		const browser = await puppeteer.launch({
			handless: false,
			slowMo: 100,
			devtools: true,
		})
		process.stdout.write('Open tab       ' + '\r')

		const page = await browser.newPage()
		await page.setViewport({width: 1400, height: 900})

		episodes = await updateListeningsFromPodster(page, episodes)
		episodes = await addListeningsFromYouTube(page, episodes)
		episodes = await getListeningsFromVK(page, episodes)
		episodes = await addListeningsFromYandex(episodes)

		// await browser.close()

		// podcast.episodes = await episodes

		fs.writeFile('episodes.json', JSON.stringify(episodes), function (err) {
			if (err) {
				throw err
			}
			console.log('episodes.json is updated!')
		})
	} catch (err) {
		console.log(err)
	}
}

const getListeningsFromPodster = async (page, episode) => {
	try {
		await page.goto(episode.link, {
			waitUntil: 'domcontentloaded',
		})

		const listeningsPodster = await page.evaluate(() => {
			let counter = document.querySelector('div.hap-player-stat').textContent
			counter = parseInt(counter)

			return counter
		})

		console.log('------------')
		console.log(episode.title)
		console.log(`Listenings from Podster: ${listeningsPodster} `)
		console.log('------------')

		return {
			site: 'podster',
			link: episode.link,
			listenings: listeningsPodster,
		}
	} catch (err) {
		console.log(err)

		return {site: 'podster', link: episode.link, listenings: 0}
	}
}

const addListeningsAndLinksFromYouTube = async (page, episodes) => {
	try {
		await page.goto(YOUTUBE_LINK, {
			waitUntil: 'domcontentloaded',
		})

		for (let index = 0; index < 50; index++) {
			await page.mouse.wheel({deltaY: 30000})
			await page.setDefaultTimeout(5000)
		}

		let youtubeListenings = await page.evaluate(() => {
			episodes = []
			manyViewsLinks = []

			let videos = document.querySelectorAll('ytd-grid-video-renderer')
			videos = [...videos]
			videos.forEach((video) => {
				let title = video.querySelector('a#video-title').textContent
				title = title.split('/').shift().trim()
				title.replace('')

				let youtubeLink = video.querySelector('a#video-title').href

				let views = video.querySelector('#metadata-line>span').textContent
				if (views.includes('K') || views.includes('тыс')) {
					manyViewsLinks.push(youtubeLink)
				} else {
					views = parseInt(views)
					episodes.push({title, views, youtubeLink})
				}
			})

			return {episodes, manyViewsLinks}
		})

		for (let i = 0; i < youtubeListenings.manyViewsLinks.length; i++) {
			try {
				await page.goto(youtubeListenings.manyViewsLinks[i], {
					waitUntil: 'domcontentloaded',
					timeout: 10000,
				})
				await page.waitForSelector('h1')
				await page.waitForSelector('span.view-count')

				const episodesWithManyViews = await page.evaluate(() => {
					document.querySelector('#player').remove()
					let title = document.querySelector('h1').textContent.trim()
					let views = parseInt(
						document
							.querySelector('span.view-count')
							.textContent.replace(/\s/g, '')
					)
					let youtubeLink = location.href
					return {title, views, youtubeLink}
				})

				await youtubeListenings.episodes.push(episodesWithManyViews)
			} catch {
				continue
			}
		}

		youtubeListenings = await youtubeListenings.episodes
		console.log(episodes)
		for (let i = 0; i < youtubeListenings.length; i++) {
			let index = episodes.findIndex(
				(x) =>
					x.title
						.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
						.replace(/[' ']/g, '')
						.slice(0, 9) ==
					youtubeListenings[i].title
						.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
						.replace(/[' ']/g, '')
						.slice(0, 9)
			)
			console.log(index)
			if (index != -1) {
				console.log('------------')
				console.log(youtubeListenings[i].title)
				console.log('Youtube views: ', youtubeListenings[i].views)
				episodes[index].services.push({
					site: 'youtube',
					link: await youtubeListenings[i].youtubeLink,
					listenings: await youtubeListenings[i].views,
				})
				console.log('------------')
			}
		}

		// fs.writeFile(
		// 	'youtubeListenings.json',
		// 	JSON.stringify(youtubeListenings),
		// 	function (err) {
		// 		if (err) {
		// 			throw err
		// 		}
		// 		console.log('youtubeListenings.json is created!')
		// 	}
		// )

		return episodes
	} catch (err) {
		console.log(err)
		return episodes
	}
}

const getServicesArrFromYouTube = async () => {
	try {
		async function getYoutubeLinks(list = [], pageToken = '', pageNumber = 0) {
			list = list ? list : []

			return await fetch(
				// `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_ID}&part=id,snippet&order=date&maxResults=1000&&pageToken=${pageToken}`
				`https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${YOUTUBE_ID}&part=snippet,statistics&order=date&maxResults=1000&&pageToken=${pageToken}`
			)
				.then((data) => {
					return data.json()
				})
				.then(async (page) => {
					pageToken = page.nextPageToken ? page.nextPageToken : ''
					let IDsOnPage = []
					for (let i = 0; i < page.items.length; i++) {
						const ep = page.items[i]
						IDsOnPage.push(ep.id.videoId)
						list.push({
							title: ep.snippet.title,
							id: ep.id.videoId,
							link: 'https://www.youtube.com/watch?v=' + ep.id.videoId,
						})
					}

					IDsOnPage = IDsOnPage.join(',')

					await fetch(
						`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${IDsOnPage}&key=${YOUTUBE_API_KEY}`
					)
						.then((data) => {
							return data.json()
						})
						.then((statistics) => {
							setTimeout(() => {}, 200)
							for (let i = 0; i < statistics.items.length; i++) {
								list[pageNumber * 50 + i].listenings =
									statistics.items[i].statistics.viewCount
								list[pageNumber * 50 + i].likes =
									statistics.items[i].statistics.likeCount
								list[pageNumber * 50 + i].comments =
									statistics.items[i].statistics.commentCount
							}
						})

					if (pageToken) {
						pageNumber++
						list = getYoutubeLinks(list, pageToken, pageNumber)
						return list
					} else {
						return list
					}
				})
		}
		return await getYoutubeLinks()
	} catch (err) {
		console.log(err)
		return false
	}
}
// getLinksAndTitlesFromYouTube().then((data) => {
// 	console.log(data)
// })

const getLinksAndTitlesFromVK = async (page) => {
	try {
		await page.goto(VK_LINK, {waitUntil: 'domcontentloaded'})
		await page.waitForSelector('button.PodcastEpisodeLayer__listMore')

		const getLinksAndTitles = async () => {
			return await page.evaluate(async () => {
				return await new Promise((resolve) => {
					let interval = setInterval(() => {
						//click until you can
						document.querySelector('.PodcastEpisodeLayer__listMore').click()
						console.log('click')
						if (
							document.querySelector('.PodcastEpisodeLayer__listMore').style
								.display == 'none'
						) {
							clearInterval(interval)
							//return node links
							let linksAndTitles = []
							let linksNodes = document.querySelectorAll('a.audio_podcast')
							let titlesNodes = document.querySelectorAll(
								'span.audio_row__title_inner'
							)
							for (let idx = 0; idx < linksNodes.length; idx++) {
								let title = titlesNodes[idx].textContent.trim()
								let link = linksNodes[idx].href
								linksAndTitles.push({title, link})
							}
							linksAndTitles = linksAndTitles.filter(
								(v, i, a) => a.findIndex((t) => t.link === v.link) === i
							)
							console.log(linksAndTitles)
							resolve(linksAndTitles)
							return linksAndTitles
						}
					}, 500)
				})
			})
		}

		let linksAndTitles = await getLinksAndTitles()

		// for (let i = 0; i < getLinksAndTitles.length; i++) {
		// 	let episode = await episodes.find(
		// 		(ep) => ep.title.toLowerCase() == linksAndTitles[i].title.toLowerCase()
		// 	)
		// 	if (episode && !episode.link.vk) {
		// 		console.log('------------')
		// 		console.log(linksAndTitles[i].title)
		// 		console.log('Vk link added')
		// 		episode.links.vk = await linksAndTitles[i].link
		// 		console.log('------------')
		// 	}
		// }

		return linksAndTitles
	} catch (err) {
		console.log(err)
		return []
	}
}

const addVKLinksToEpisodes = async (linksAndTitlesVK, episodes) => {
	for (let i = 0; i < linksAndTitlesVK.length; i++) {
		const linkAndTitle = linksAndTitlesVK[i]
		let index = episodes.findIndex(
			(ep) => ep.title.toLowerCase() == linkAndTitle.title.toLowerCase()
		)
		if (index != -1 && !episodes[index].services.some((e) => e.site === 'vk')) {
			episodes[index].services.push({
				site: 'vk',
				link: linkAndTitle.link,
				listenings: 0,
			})
		}
	}
	return episodes
}

const addListeningsFromYouTube = async (page, episodes) => {
	try {
		for (let i = 0; i < episodes.length; i++) {
			if (episodes[i].links.youtube) {
				await page.goto(episodes[i].links.youtube, {
					waitUntil: 'domcontentloaded',
				})
				await page.waitForSelector('h1')
				await page.waitForSelector('span.view-count')

				const views = await page.evaluate(() => {
					document.querySelector('#player').remove()
					let views = parseInt(
						document
							.querySelector('span.view-count')
							.textContent.replace(/\s/g, '')
					)
					return views
				})

				episodes[i].listenings += views
			}
		}

		return await episodes
	} catch (err) {
		console.log(err)
		return episodes
	}
}

const getListeningsFromVK = async (page, episode, linksAndTitlesVK) => {
	try {
		let linkAndTitle = linksAndTitlesVK.find((e) => e.title == episode.title)

		if (linkAndTitle) {
			await page.goto(await linkAndTitle.link, {
				waitUntil: 'domcontentloaded',
			})
			await page.waitForSelector('h2.PodcastEpisodeLayer__title')
			const listeningsVK = await page.evaluate(() => {
				let listenings = document
					.querySelector('div.PodcastEpisodeLayer__descInfo')
					.textContent.trim()
					.split(' ')
				listenings = listenings[listenings.length - 2]

				if (listenings.includes('K') && listenings.includes('.')) {
					listenings = listenings.replace(/[^\d]/g, '') + '50'
				}
				if (listenings.includes('K')) {
					listenings = listenings.replace(/[^\d]/g, '') + '000'
				}

				listenings = parseInt(listenings.replace(/[^\d]/g, ''))

				return listenings
			})
			console.log('------------')
			console.log(episode.title)
			console.log('Listenings from vk: ' + listeningsVK)
			console.log('------------')

			return {site: 'vk', link: linkAndTitle.link, listenings: listeningsVK}
		}
		return false
	} catch (err) {
		console.log(err)
		return false
	}
}

const getLinksAndTitlesFromYandex = async (page) => {
	try {
		await page.goto(YANDEX_LINK, {
			waitUntil: 'domcontentloaded',
		})
		let coockieBtn = await page.waitForSelector(
			'div.gdpr-popup.local-theme-white.local-icon-theme-white.popup.deco-pane-popup > button'
		)
		let closePopupBtn = await page.waitForSelector(
			'div.page-root.page-root_no-player.deco-pane-back.page-root_empty-player > div.install-app-popup.popup_compact.popup_borderless.popup_shadowless.local-theme-black.local-icon-theme-black.popup.deco-pane-popup.popup_modal.popup_fade.popup_visible > button'
		)

		if (await coockieBtn) {
			await coockieBtn.click()
		}
		if (await closePopupBtn) {
			await closePopupBtn.click()
		}
		const getTitlesAndLinks = async () => {
			return await page.evaluate(async () => {
				return await new Promise((resolve) => {
					let episodesYandex = []
					let i = 1
					let links
					let interval = setInterval(() => {
						window.scroll(0, 1500 * i)
						links = [...document.querySelectorAll('div.d-track__name > a')]
						links.forEach((link) => {
							episodesYandex.push({
								title: link.textContent.trim(),
								link: link.href,
							})
						})
						i++

						if (
							document.body.scrollHeight ==
							window.scrollY + window.innerHeight
						) {
							clearInterval(interval)
							resolve(episodesYandex)
							return episodesYandex
						}
					}, 150)
				})
			})
		}

		let titlesAndLinksYandex = await getTitlesAndLinks()

		// const keys = ['link', 'title']
		// episodesYandex = await episodesYandex.filter(
		// 	((s) => (o) =>
		// 		((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join('|')))(
		// 		new Set()
		// 	)
		// )

		// console.log(episodesYandex.length)
		// for (let i = 0; i < episodesYandex.length; i++) {
		// 	let episode = await episodes.find(
		// 		(x) => x.title.toLowerCase() == episodesYandex[i].title.toLowerCase()
		// 	)
		// 	if (episode) {
		// 		console.log('------------')
		// 		console.log(episodesYandex[i].title)
		// 		episode.links.yandex = await episodesYandex[i].link
		// 		console.log('------------')
		// 	}
		// }

		return await titlesAndLinksYandex
	} catch (err) {
		console.log(err)
		return false
	}
}

const listeningsAndTitlesfromYandexCSV = async () => {
	let titlesAndListenings = new Promise((resolve, reject) => {
		const dirpath = path.join(__dirname, '/yandex/')
		return fs.readdir(dirpath, (err, files) => {
			const csv = files.filter((el) => /\.csv$/.test(el))
			csv.sort((a, b) => b.replace(/[D]+/g, '') - a.replace(/[D]+/g, ''))
			let json = csvToJson.getJsonFromCsv(dirpath + csv[0])
			let titlesAndListenings = []
			for (let i = 0; i < json.length; i++) {
				let title = json[i]['"Эпизод"']
				let listenings = json[i]['"Старты"']
				titlesAndListenings.push({site: 'yandex', title, listenings})
			}
			files = titlesAndListenings
			resolve(files)
		})
	})

	return titlesAndListenings.then((data) => {
		fs.writeFileSync(
			'episodesYandex.json',
			JSON.stringify({data}),
			function (err) {
				if (err) {
					throw err
				}
				console.log('episodesYandex.json is created')
			}
		)
		return data
	})

	// return await titlesAndListenings
}
// listeningsAndTitlesfromYandexCSV().then((data) => {
// 	console.log(data)
// })

const addListeningsFromYandex = async (episode, linksAndTitlesYandex) => {
	try {
		const dirpath = path.join(__dirname, '/yandex/')
		fs.readdir(dirpath, function (err, files) {
			const csv = files.filter((el) => /\.csv$/.test(el))
			csv.sort((a, b) => b.replace(/[D]+/g, '') - a.replace(/[D]+/g, ''))
			let json = csvToJson.getJsonFromCsv(dirpath + csv[0])

			for (let i = 0; i < json.length; i++) {
				let line = episode.find(
					(x) =>
						x.title.toLowerCase().replace(' ', '') ==
						json[i]['"Эпизод"'].toLowerCase().replace(' ', '')
				)
				if (episode) {
					console.log('------------')
					console.log(json[i]['"Эпизод"'])
					console.log('Yandex listenings: ', json[i]['"Старты"'])
					// episode.listenings += parseInt(json[i]['"Старты"'])
					console.log('------------')
					return {site}
				}
			}
		})

		return await episodes
	} catch (err) {
		console.log(err)
		return episodes
	}
}

// export {parseFullNewochemPodcast, updateListenings, parseLastEpisode}

// parseFullNewochemPodcast()
// parseLastEpisode(podcast)
// updateListenings(podcast)
