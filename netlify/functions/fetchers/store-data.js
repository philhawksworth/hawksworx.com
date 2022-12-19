const { Octokit, App } = require("octokit");
// const dataPath = "../../src/site/_data/notes.js";
// const archiveData = require(dataPath);

const GH_user = "philhawksworth";
const GH_repo = "hawksworx.com";


const save = async function(path, data) {


  // console.log("stores executes: ", process.cwd());


  const octokit = new Octokit({ auth: process.env.GH_TOKEN });

  const commits = await octokit.rest.repos.listCommits({
    owner: GH_user,
    repo: GH_repo,
  });
  const commitSHA = commits.data[0].sha;


  const archivePath = "src/site/_data/test_social_archive.json";
  const archive = [{
		path: archivePath,
		mode: '100644',
		type: 'commit',
		// content: JSON.stringify(await archiveData())
		content: JSON.stringify(data)
	}];
  
  
  // add files to the tree
  const {
    data: { sha: currentTreeSHA } } = await octokit.rest.git.createTree({
    owner: GH_user,
    repo: GH_repo,
    tree: archive,
    base_tree: commitSHA,
    message: 'Social media archive automatically stashed',
    parents: [commitSHA],
  });

  
  // create a commit
  const {
    data: { sha: newCommitSHA },
  } = await octokit.rest.git.createCommit({
    owner: GH_user,
    repo: GH_repo,
    tree: currentTreeSHA,
    message: `Social media archive automatically stashed`,
    parents: [commitSHA],
  });
  
  console.log(newCommitSHA);
  
  // push the commit
  const status = await octokit.rest.git.updateRef({
    owner: "philhawksworth",
    repo: "hawksworx.com",
    sha: newCommitSHA,
    ref: "heads/master", // Whatever branch you want to push to
  });

  // console.log({status});
  if(status.status == 200) {
    console.log(`data saved to repo`);
  } 
  

}

module.exports.save = save;
