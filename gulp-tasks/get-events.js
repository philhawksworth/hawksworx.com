var project = require('./_project.js');
var gulp    = require('gulp');
const axios = require('axios');


/*
  Get presentation details from Notist
*/
gulp.task('get:events', function () {

  axios.get('https://noti.st/philhawksworth.json')
    .then(function (response) {
      var events = response.data.data[0].relationships.data;
      var eventURLs = [];
      events.forEach(element => {
        eventURLs.push(element.links.related);
      });

      // Fetch all of the presentation data
      axios.all(eventURLs.map(l => axios.get(l)))
      .then(axios.spread(function (...res) {
          // gather the data about for each presentation
          var talks = [];
          for (var talk in res) {
            talks.push(res[talk].data.data[0].relationships.data[0].attributes);
          }
          // stash the data for the SSG to use
          project.storeData("/data/events.json", JSON.stringify(talks));
        })
      );
    })
    .catch(function (error) {
      console.log(error);
    });

});
