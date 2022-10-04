const axios  = require('axios');
const fs     = require("fs");

require('dotenv').config()
const INSTAGRAM_AUTH = process.env.INSTAGRAM_AUTH;
var url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${INSTAGRAM_AUTH}`;

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        // Handy to save the results to a local file
        // to prime the dev data source
        if(process.env.ELEVENTY_ENV == 'prime') {
          fs.writeFile(__dirname + '/../dev/instagram.json', JSON.stringify(response.data.data), err => {
            if(err) {
              console.log(err);
            } else {
              console.log("Instagram content primed for dev.");
            }
          });
        }
        resolve(response.data.data);
      })
      .catch(err => {
        reject(err);
      });
  })
}
