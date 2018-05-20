/*
  Split the content
*/


function censor(censor) {
  var i = 0;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
      return '[Circular]';

    if(i >= 99) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;
  }
}
module.exports = function(obj) {

  // console.log(typeof obj);
  if(typeof obj == 'object') {
    // console.log('-------- ');
    // console.log(JSON.stringify(obj, censor(obj)));
    return JSON.stringify(obj, censor(obj))
  }



  // obj.forEach(element => {
  //   console.log('element :', element);
  // });
  // return JSON.stringify(obj);
};

