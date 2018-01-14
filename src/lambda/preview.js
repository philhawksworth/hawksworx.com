'use strict';

var Q = require('q');
var fs = require('fs');
var http = require('http');
var request = require("request");

export function handler(event, context, callback) {

  // define the desired URL
  var url = event.queryStringParameters['q'];

  // go get it
  console.log("Requesting ", url);
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      console.log("...we got a result");
      callback(null, {
        statusCode: 200,
        // body: JSON.stringify({msg: "Hello, World!"})
        body: body
      })
    }
  })

}
