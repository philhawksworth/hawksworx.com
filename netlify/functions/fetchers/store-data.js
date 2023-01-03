const { Octokit, App } = require("@octokit/rest");
// const dataPath = "../../src/site/_data/notes.js";
// const archiveData = require(dataPath);

const GH_user = "philhawksworth";
const GH_repo = "hawksworx.com";


const save = async function(path, data) {

  const octokit = new Octokit({ auth: process.env.GH_TOKEN });

  const user = await octokit.request("/user");
  console.log(user);
  


  const commits = await octokit.repos.listCommits({
    owner: GH_user,
    repo: GH_repo,
  });
  const commitSHA = commits.data[0].sha;

  console.log(`COMMITS: ${commits.data.length}`);
  

  const archivePath = "src/site/_data/social_archive.json";
  const archive = [{
		path: archivePath,
		mode: '100644',
		type: 'commit',
		// content: JSON.stringify(await archiveData())
		content: JSON.stringify(data)
	}];
  
  
  // add files to the tree
  const {
    data: { sha: currentTreeSHA } } = await octokit.git.createTree({
    owner: GH_user,
    repo: GH_repo,
    tree: archive,
    base_tree: commitSHA,
    message: 'Social media archive automatically stashed',
    parents: [commitSHA],
  });

  console.log(`currentTreeSHA ${currentTreeSHA}`);
  
  // create a commit
  const {
    data: { sha: newCommitSHA },
  } = await octokit.git.createCommit({
    owner: GH_user,
    repo: GH_repo,
    tree: currentTreeSHA,
    message: `Social media archive automatically stashed`,
    parents: [commitSHA],
  });
  
  console.log(`newCommitSHA ${newCommitSHA}`);
  
  // push the commit
  const status = await octokit.git.updateRef({
    owner: GH_user,
    repo: GH_repo,
    sha: newCommitSHA,
    ref: "heads/master", // Whatever branch you want to push to
  });

  if(status.status == 200) {
    console.log(`data saved to repo`);
  } else {
    console.log({status});
  }
  

}

module.exports.save = save;
