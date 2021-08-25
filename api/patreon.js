import { patreon } from 'patreon'
import { writeFile } from 'fs'

const patreonAPI = patreon
console.log(patreonAPI)

const accessToken = 'Y_2nC0iIO7Hy5PEnfpzJzNMnlEovrrIo584LmDfEWag' // Replace with your creator access token

const patreonAPIClient = patreonAPI(accessToken)
patreonAPIClient('/campaigns/1543693/pledges')
    .then(({ store }) => {
        console.log(store.findAll('reward'))
        return store
    })
    .then((data) => {
        writeFile(
            'dataPatreon.json',
            JSON.stringify(data.store.graph),
            function (err) {
                if (err) {
                    throw err
                }
                console.log('dataPatreon.json is created')
            }
        )
        // console.log('campaign is', campaign[0].data.relationships.rewards)
    })
    .catch((err) => {
        console.error('error!', err)
    })
