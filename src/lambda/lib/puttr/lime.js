'use strict';

var Q = require('q');
var fs = require('fs');
var http = require('http');
var fetch = require("node-fetch");
// var request = require("request");

module.exports.search = function(query) {

    var url = "http://limetorrents.cc/search/all/" + query + "/seeds/1";

    console.log("Checking limewire for " + query ) ;
    console.log("  " + url) ;


    return fetch(url).then(function(response){
      return response.text()
    });


};

// console.log("Requesting ", url);
// request(url, function(err, response, body){
//   if(!err && response.statusCode === 200){
//     console.log("...we got a result");
//     callback(null, {
//       statusCode: 200,
//       // body: JSON.stringify({msg: "Hello, World!"})
//       body: body
//     })
//   }
// })
