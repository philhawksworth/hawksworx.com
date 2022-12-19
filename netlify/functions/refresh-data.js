const saveToRepo = require('./fetchers/store-data.js')
const archiveFile = '../../src/site/_data/test_social_archive.json';
const archive = require(archiveFile);


exports.handler = async (event, context) => {

  console.log("refresh executes: ", process.cwd());

  const mastodon = require('./fetchers/mastodon.js');
  const toots = await mastodon.fetchFresh();
  if(toots.length) {
    const updatedArchive = toots.concat(archive);
    saveToRepo.save(archiveFile, updatedArchive)
  }
  
  
  return {
    statusCode: 200,
    body: "Hello, World"
  };
};
