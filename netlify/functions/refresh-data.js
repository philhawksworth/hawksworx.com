const saveToRepo = require('./fetchers/store-data.js')
const archiveFile = '../../src/site/_data/social_archive.json';
const archive = require(archiveFile);


exports.handler = async (event, context) => {

  const mastodon = require('./fetchers/mastodon.js');
  const toots = await mastodon.fetchFresh();

  // console.log(toots);

  if(toots.length) {
    const updatedArchive = toots.concat(archive);
    saveToRepo.save(archiveFile, updatedArchive)
  }
    
  return {
    statusCode: 200,
    body: `Adding ${toots?.length || 0} posts to the Mastodon archive`
  };
};
