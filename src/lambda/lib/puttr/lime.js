'use strict';

var fetch = require("node-fetch");
var cheerio = require('cheerio');


// Scrape the page for patterns we found
function inspect(html) {

  var results = [];
  var $ = cheerio.load(html);

  $('.table2 tr').each(function(index, item){

    // only bother with this row if we find what looks like a magnet link
    if($(item).find('.tt-name a.csprite_dl14').attr('href')) {

      var title = $(item).find('.tt-name a').text()
      var magnet = $(item).find('.tt-name a.csprite_dl14').attr('href');
      magnet = "magnet:?xt=urn:btih:" + magnet.match(/org\/torrent\/(.+)\.torrent/)[1] + "&dn=" + title;
      results.push({
        title: title,
        seeds: $(item).find('td.tdseed').text(),
        size: $(item).find('td.tdnormal').next().first().text(),
        magnet: magnet,
        date_added: $(item).find('td.tdnormal').first().text().split(' -')[0],
        source: "lime"
      });
    }

  })
  return results;
}


function html(response){
  return response.text()
}


module.exports.search = function(query) {
  var url = "http://limetorrents.cc/search/all/" + query + "/seeds/1";
  console.log("Checking limewire for " + query ) ;
  console.log("  " + url) ;
  return fetch(url).then(html).then(inspect);
};
