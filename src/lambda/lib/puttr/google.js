'use strict';

var fetch = require("node-fetch");
var cheerio = require('cheerio');


function inspect(html) {

  var results = [];
  var $ = cheerio.load(html);

  $('li.talk').each(function(index, item){
    results.push({
      title : $(item).find('a').text(),
      link : $(item).find('a').attr('href'),
      date : $(item).find('.publish-date').text()
    });
  })
  return results;
}


function html(response){
  return response.text()
}


module.exports.search = function(query) {

  // var url = "http://www.google.co.uk?q=" + query;
  var url = "https://www.hawksworx.com/speaking";
  console.log("Checking google for " + query ) ;
  console.log("  " + url) ;

  return fetch(url)
    .then(html)
    .then(inspect);

};
