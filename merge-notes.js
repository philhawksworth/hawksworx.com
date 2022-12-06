const fs = require('fs');
const tweets = require('./src/site/_data/tweets.json');
const toots = require('./src/site/_data/toots.json');


let notes = tweets.concat(toots);

notes.sort((a, b) => (new Date(a.created_at) < new Date(b.created_at)) ? 1 : -1);

fs.writeFile('src/site/_data/notes.json', JSON.stringify(notes), err => {
  if (err) {
    console.error(err);
  }
  console.error("Notes saved");
});
