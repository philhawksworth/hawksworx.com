/*
  Splite the content
*/
module.exports = function(str) {
  var content = new String(str);
  var delimit = "\n<!--more-->\n";
  console.log(content.split(delimit)[0]);
  return content.split(delimit)[0];
}

