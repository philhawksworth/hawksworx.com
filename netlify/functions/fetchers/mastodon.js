/*
  Return any mastodon posts fresher than those in the archive
*/


const { parse } = require('rss-to-json');
const archive = require('../../../src/site/_data/social_archive.json');

async function fetchFresh () {


  const data = await parse("https://indieweb.social/@philhawksworth.rss");
  const latestToot = data.items[0];
  const latestArchived = archive[0];


  console.log(`LATEST`);
  console.log({latestArchived});
  console.log({latestToot});
  

  // only proceed if the archive is out of date
  const latestTootDate = Number(new Date(latestToot.published));
  // const latestArchiveDate = Number(new Date("2022-12-05T22:16:27.000Z"));
  const latestArchiveDate = Number(new Date(latestArchived.created_at));

  console.log(data.items.length);
  console.log(archive.length);
  

  let newPosts = [];
  let newPostsFormatted = [];

console.log(latestArchiveDate, latestTootDate);



  if(latestArchiveDate < latestTootDate) {
    console.log(`The archive needs an update`);

    // return any toots since the last archive
    newPosts = data.items.filter(obj => {
      return (Number(new Date(obj.published)) > latestArchiveDate)
    })
    

    newPosts.forEach(post => {
      
      newPostsFormatted.push({
        "id": post.link.split("@philhawksworth/")[1],
        "platform": "mastodon",
        "created_at": new Date(post.published),
        "full_text": post.description,
        "urls": [],
        "in_reply_to_status_id": null,
        "in_reply_to_screen_name": null,
        "media": []
      });
      
    });
    
    console.log(`${newPostsFormatted.length} new Mastodon posts to commit to the archive`);
    
  } 

  return newPostsFormatted;  
  
};

module.exports.fetchFresh = fetchFresh;
