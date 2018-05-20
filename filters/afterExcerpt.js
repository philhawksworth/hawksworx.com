
/*
  Split the content
*/
module.exports = function(str) {
  var content = new String(str);
  var delimit = "\n<!--more-->\n";
  var parts = content.split(delimit);
  if(parts.length) {
    return parts[1];
  } else {
    return str
  }
}

