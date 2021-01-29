//NPM Libraries
const mergeImages = require('merge-images')
const fs = require("fs")
const {Canvas, Image} = require('canvas')
const Twitter = require('twitter-lite')
const cron = require('node-cron')
require('dotenv').config()

//TWITTER CLIENT REGISTRATION
const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

//CALLING MAIN SCRIPT EVERY 2 MINS
cron.schedule('*/2 * * * *', () => main())

async function main() {
    const response = await client.getBearerToken()
    const app = new Twitter({
        bearer_token: response.access_token
    })
    const data = await app.get("followers/ids", {
        screen_name: "Inkuantum"
    })
    const count = await data.ids.length
    const dataJSON = fs.readFileSync('data.json')
    const currentCount = JSON.parse(dataJSON).currentCount;
    const goals = JSON.parse(dataJSON).goals
    const goal = goals.find(goal => betweenTwoNumbers(count, goal.start, goal.end))
    if(count !== currentCount){
        fs.writeFileSync('data.json', JSON.stringify({currentCount: count, goals}))
        const b64 = await mergeImages([
            {src: './img/banner.png', x: 0, y: 0}, 
            {src: `./img/goals/${goal.img}.png`, x: 0, y: 0}, 
            {src: './img/moving.png', x: scale(count, goal.start, goal.end, 186.5 - 49.5, 1312.5 - 49.5), y: 205}
        ], {Canvas: Canvas, Image: Image})
        let base64Data = b64.replace(/^data:image\/png;base64,/, "");
        await client.post("account/update_profile_banner", {
            banner: base64Data
        })
    }
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const betweenTwoNumbers = (num, num_min, num_max) => {
    if(num_min <= num && num <= num_max) return true
    return false
}