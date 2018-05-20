
/*
  Splite the content
*/
module.exports = function(str) {
  var content = new String(str);
  var delimit = "<!--more-->";
  return content.split(delimit)[1];
}

