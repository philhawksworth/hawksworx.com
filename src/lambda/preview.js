'use strict';

var request = require("request");


export function handler(event, context, callback) {

  // define the desired URL
  var url = event.queryStringParameters['q'];
  console.log("Requesting ", url);

  // go get it
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      console.log("...we got a result");
      callback(null, {
        statusCode: 200,
        body: body
      })
    }
  });
}

