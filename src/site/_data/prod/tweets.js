const Twitter = require('twitter');
const fs      = require("fs");

module.exports = () => {

  // load environment variables
  require('dotenv').config()

  var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: '',
    access_token_secret: ''
  });
  var params = {screen_name: 'philhawksworth', count: 50, exclude_replies: true, tweet_mode: 'extended'};

  return client.get('statuses/user_timeline', params)
    .then(function(tweets) {
      var recentTweets = {"recent" : []};
      for(var tweet in tweets) {

        // massage the data into the shape we want
        // and clean up some of the formatting from twitter
        // var split = tweets[tweet].full_text.lastIndexOf('https://t.co');
        // var text =tweets[tweet].full_text.substring(0, split);
        var text = tweets[tweet].full_text.replace(/\n/g,'<br/>');
        text = text.replace(/<br\/><br\/>/g,'<p/><p>');
        var t = {
          "text": text,
          "url": `https://twitter.com/philhawksworth/status/${tweets[tweet].id_str}`,
          "date":  tweets[tweet].created_at,
        };
        recentTweets.recent.push(t);
      }

      // Handy to save the results to a local file
      // to prime the dev data source
      if(process.env.ELEVENTY_ENV == 'prime') {
        fs.writeFile(__dirname + '/../dev/tweets.json', JSON.stringify(recentTweets), err => {
          if(err) {
            console.log(err);
          } else {
            console.log("Twitter content primed for dev.");
          }
        });
      }

      return recentTweets;
    })
    .catch(err => {
      throw err;
    })

}
