'use strict';

var fetch = require("node-fetch");
var cheerio = require('cheerio');


// Scrape the page for patterns we found
function inspect(html) {

  var results = [];
  var $ = cheerio.load(html);


  // only bother parsing the results if we see candidate result rows
  if($("tr.forum_header_border").length > 0) {

    // inspect each item found
    $("tr.forum_header_border").each(function(index, torrent){
      results.push({
        title: $(torrent).find("a.epinfo").text(),
        seeds: $("td.forum_thread_post_end", torrent).prev().text(),
        size: $(torrent).find("a.epinfo").attr("title").match(/\([^)]+\)$/)[0].slice(1,-1),
        magnet: $(torrent).find("a.magnet").attr('href'),
        date_added: $("td.forum_thread_post_end", torrent).prev().prev().text(),
        source: "eztv"
      });
    })
  }
  return results;
}


function html(response){
  return response.text()
}


module.exports.search = function(query) {
  var url = "https://www.eztv.it/search/" + query.split(" ").join("-");
  console.log("Checking EZTV for " + query ) ;
  console.log("  " + url) ;
  return fetch(url).then(html).then(inspect);
};
