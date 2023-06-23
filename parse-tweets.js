const fs = require('fs');
const data = require('./tweets.json');

var tweets = [];

const exclude = [
  "1596182186503606272",
  "1594367560375574528",
  "1594985668073005056",
  "1592471685252644864",
  "1594772054875967488",
  "1592471053699551233",
  "1592179278002917378",
  "1592176704641957888",
  "1592471237657505793",
  "1592471159689580544",
  "1592471105771827200",
  "1592177093106102272",
  "1592528967852257282"
];

for (let t = 0; t < data.length; t++) {
  const tweet = data[t].tweet;

  if(!exclude.includes(tweet.id)) {

    // linkify mentions
    if(tweet.entities?.user_mentions) {
      
      // collected user mentions of this tweet
      const names = [];
      for(const user in tweet.entities.user_mentions){
        names.push(tweet.entities.user_mentions[user].screen_name);
      }

      // replace mentions in the text
      names.forEach(name => {        
        let re = new RegExp(String.raw`@${name}`);
        tweet.full_text = tweet.full_text.replace(re, `<a href="https://twitter.com/${name}">@${name}</a>`);
      });

    }

    // remove twitter url shortener
    if(tweet.entities?.urls) {
      
      // collected shortened urls
      const links = {};
      for(const url in tweet.entities.urls){
        link = tweet.entities.urls[url];
        links[link.url] = link.expanded_url;        
      }

      // replace the shortened t.co urls in the text with their original
      for(link in links) {
        let re = new RegExp(String.raw`${link}`);
        tweet.full_text = tweet.full_text.replace(re, `<a href="${links[link]}">${links[link]}</a>`);  
      }
    }


    // resolve embedded media to a local asset
    const media = [];
    if(tweet.entities?.media) {
      
      // collect the t.co link for each piece of media in the tweet
      const links = {};
      for(const url in tweet.entities?.media){
        link = tweet.entities.media[url];
        links[link.url] = {
          url: link.id_str,
          type: link.type
        }

        if(link.media_url_https == "https://pbs.twimg.com/media/FhxYQnjacAAXkaa.jpg") {
          console.log(link.media_url_https);
      }


        media.push(link.media_url);
      }

      // collected shortened urls

      // // replace the shortened t.co urls in the text with their original
      for(link in links) {
        let re = new RegExp(String.raw`${link}`);
        tweet.full_text = tweet.full_text.replace(re, ``);  
      }
    }

    // console.log(new Date(tweet.created_at));
    

    tweets.push({
      "id": tweet.id,
      "platform": "twitter",
      "created_at": new Date(tweet.created_at),
      "full_text": tweet.full_text,
      "urls": tweet.entities?.urls || null,
      "in_reply_to_status_id": tweet.in_reply_to_status_id || null,
      "in_reply_to_screen_name": tweet.in_reply_to_screen_name || null,
      "media" : { "url" : media || null }
    });
  }


  
}

tweets.sort((a, b) => (Number(a.created_at) < Number(b.created_at)) ? 1 : -1);

fs.writeFile('src/site/_data/tweets.json', JSON.stringify(tweets), err => {
  if (err) {
    console.error(err);
  }
  console.error("Notes saved");
});
