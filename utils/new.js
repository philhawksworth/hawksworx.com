const fs = require('fs');

const today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}
const datestamp = yyyy + '-' + mm + '-' + dd;

// get the meaningful arguments
process.argv.splice(0,2);

if(process.argv[0] == 'link') {
  const template = require('./templates/link.js');
  process.argv.splice(0,1);

  let props = {
    filename: process.argv.join("-").toLowerCase(),
    title: process.argv.join(" "),
    date: datestamp
  }

  let path = `src/site/blog/${props.filename}.md`;
  let fileContent = template(props);

  fs.writeFile(path, fileContent, err => {
    if(err) {
      console.log(err);
    } else {
      console.log(`New file created: ${path}`);
    }
  });

} else {
  console.log('Unknown file template');
};


