const archive = require('./social_archive.json');
// const newPosts = require('./mastodon.js');

// Our archive along with any newly posted mastodon toots 
// not yet committed in the archive file
module.exports = async function() {
  // const fresh = await newPosts();
  // const posts = fresh.concat(archive);
  return archive;
}
