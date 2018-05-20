/*
  Splite the content
*/
module.exports = function(str) {
  var content = new String(str);
  var delimit = "\n<!--more-->\n";
  var parts = content.split(delimit)[0];
  if(parts.length) {
    return parts[0];
  } else {
    return str
  }
}

