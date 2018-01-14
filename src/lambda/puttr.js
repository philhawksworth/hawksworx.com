'use strict';

var fs = require('fs');
var http = require('http');
var fetch = require("node-fetch");

// var lime = require("./lib/puttr/lime.js");
var google = require("./lib/puttr/google.js");


export function handler(event, context, callback) {

  var searchStr = event.queryStringParameters['q'];

  Promise.all([
    google.search(searchStr),
    google.search("hawksworx")
  ])
  .then(function(values){
    var hits = [].concat.apply([], values); // combine all of the results arrays
    console.log(hits.length + " results returned");
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(hits)
    })
  });

}
