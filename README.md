# Garry the Snail
## About
It visualize your Twitter follower count on your Twitter banner in a creative way. A snail will move along the road between two signs. The snail is representing your follower count and signs are representing the range of followers you specify.
## Installation
* Download the folder
* Run `npm install`
* Create a Twitter application *(more on that you can find [here](https://developer.twitter.com/en/docs/apps/overview))*
* Create .env file in the folder `/`
* Fill out `data.json` file
* Upload the folder to the server
* Run `/index.js` script *(Script will run every two minutes. If you don't want this behaviour, remove the line under "//CALLING MAIN SCRIPT EVERY 2 MINS")*
## .env file
`CONSUMER_KEY=xxxxxxxxxxxxxxxxxx` - Twitter consumer key (API key)

`CONSUMER_SECRET=xxxxxxxxxxxxxxxxxx` - Twitter consumer secret (API secret)

`ACCESS_TOKEN_KEY=xxxxxxxxxxxxxxxxxx` - Twitter access token 

`ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxx` - Twitter access secret
## data.json file
The json file already contains a few examples of data it needs to run the script.
The "goals" array must always contain one or multiple objects structered in the following way:

`{"start":XXX,` - at which number should the snail start *(minimal follower number)*

`"end":XXX,` - until which number should the snail move *(maximal follower number)*

`"img":"XXX"}` - which image under `img/goals` should be selected for this range *(image will be maped on top of the banner)*

---
`"currentCount":"XXX"` - your last follower count *(will be updated automatically after running the script)*
##Create your own goals
You can use existing goal-images as a reference.
* Open `/img/banner.png` in your photo-editing software (f.ex. Photoshop)
* Draw/write on top of the banner on a separate layer
* Export only the separate layer into `/img/goals/` folder *(image size: 1500x500px)*
* Don't forget to create a new object for the goals array in `data.json` file
## Additional information
The program was built using JavaScript, Node.js, [Merge Images](https://www.npmjs.com/package/merge-images) and [Twitter Lite](https://www.npmjs.com/package/twitter-lite).
## Result
![Twitter Banner Image](https://pbs.twimg.com/profile_banners/4275789017/1611926218/1500x500)
