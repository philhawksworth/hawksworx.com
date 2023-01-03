const { Octokit } = require("@octokit/rest");
const GH_user = "philhawksworth";
const GH_repo = "hawksworx.com";
const GH_branch = "master";


const save = async function(path, data) {

  const octokit = new Octokit({ auth: process.env.GH_TOKEN });

  const commits = await octokit.repos.listCommits({
    owner: GH_user,
    repo: GH_repo,
  });
  const commitSHA = commits.data[0].sha;

  const archivePath = path;
  const archive = [{
		path: archivePath,
		mode: '100644',
		type: 'commit',
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
    parents: [commitSHA]
  });

    // create a commit
  const {
    data: { sha: newCommitSHA },
  } = await octokit.git.createCommit({
    owner: GH_user,
    repo: GH_repo,
    tree: currentTreeSHA,
    message: `Social media archive automatically stashed`,
    parents: [commitSHA]
  });
  
    // push the commit
  const status = await octokit.git.updateRef({
    owner: GH_user,
    repo: GH_repo,
    sha: newCommitSHA,
    ref: `heads/${GH_branch}`
  });

  if(status.status == 200) {
    console.log(`data saved to repo`);
  } else {
    console.log({status});
  }

}

module.exports.save = save;
