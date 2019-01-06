
/**
 * replace dots and slashes with dashes
 *
 * @param {String} str
 *s
 */
module.exports = function(str) {
  let re = /\/|\./gi;
  return str.replace(re,'-')
}

