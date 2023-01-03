const { AssetCache } = require("@11ty/eleventy-fetch");
const { parse } = require('rss-to-json');
let archive = require('./social_archive.json');

module.exports = async function() {

  let asset = new AssetCache("mastodon_feed");
  if(asset.isCacheValid("10m")) {
    return asset.getCachedValue();
  }

  const data = await parse("https://indieweb.social/@philhawksworth.rss");
  const latestToot = data.items[0];
  const latestArchived = archive[0];

  // only proceed if the archive is out of date
  const latestTootDate = Number(new Date(latestToot.published));
  // const latestArchiveDate = Number(new Date("2022-12-05T22:16:27.000Z"));
  const latestArchiveDate = Number(new Date(latestArchived.created_at));

  let newPosts = [];
  let newPostsFormatted = [];

  if(latestArchiveDate < latestTootDate) {
    console.log(`archive needs an update`);

    // return any toots since the last archive
    newPosts = data.items.filter(obj => {
      return (Number(new Date(obj.published)) > latestArchiveDate)
    })
    

    newPosts.forEach(post => {
      
      newPostsFormatted.unshift({
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
    
    // update the archive with the new posts and save it to the repo for future builds
    archive = newPostsFormatted.concat(archive);

    // save to gh (async)
    console.log(`${newPostsFormatted.length} new posts to commit to the archive`);
    
  } 

  // return abd stash any posts not already in the archive
  await asset.save(newPostsFormatted, "json");
  return newPostsFormatted;
  

  
};
