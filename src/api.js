export const loadEpisodes = async (patronEmail) => {
    let publicEpisodes = await loadPublicEpisodes()
    let patronEpisodes = await loadPatronEpisodes(patronEmail)

    let allEpisodes = publicEpisodes.concat(patronEpisodes)
    return allEpisodes
}

async function loadPublicEpisodes() {
    // fetch("http://localhost:80/api/episodes")
    return fetch('https://podcast.newochem.io/api/episodes')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data) {
                return data.episodes
            }
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

async function loadPatronEpisodes(patronEmail) {
    return fetch(
        `https://podcast.newochem.io/api/patreon-episodes?email=${patronEmail}`
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data.episodes
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}
