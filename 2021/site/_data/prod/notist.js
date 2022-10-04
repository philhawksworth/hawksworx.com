const axios = require("axios");
const fs    = require("fs");

// Were are we getting data?
// If this is defined in an environment variable in Netlify, we'll use that
// Otherwise, we'll just show you Phil's
var url = "https://noti.st/philhawksworth.json";
var now = new Date();
var today = now.setHours(0,0,0,0);

// We'll need to sort the results by date.
function compare(a,b) {
  if (a.starts_on < b.starts_on)
    return 1;
  if (a.starts_on > b.starts_on)
    return -1;
  return 0;
}

// return true if a date string is in the future
function isFuture (date) {
  var when = new Date(date);
  when.setHours(0,0,0,0);
  var future = today - when <= 0 ? true : false;
  return future;
}

// expose these results as data to eleventy.
module.exports = () => {
  return new Promise((resolve, reject) => {
    // go get it
    axios.get(url).then(response => {
      // do some walking around in the JSON returned from Notist
      // to collect all of the data sources for each event found
      var events = response.data.data[0].relationships.data;
      var eventURLs = [];
      events.forEach(element => {
        if (isFuture(element.attributes.presented_on)) {
          eventURLs.push(element.links.event);
        } else {
          eventURLs.push(
            "https://noti.st/philhawksworth/" +
            element.id.replace("pr_", "") +
            ".json"
            );
          }
        });

        // now go and get the info for each event
        axios
        .all(eventURLs.map(l => axios.get(l)))
        .then(
          axios.spread(function(...res) {
            // gather the data about for each presentation and
            // collect them in future and past arrays
            var talks = {
              future:  require("../speaking-tba.json").events, // prime the upcoming events list with any which are TBA
              past: require("../speaking-legacy.json").events // grab the legacy events not yet populated on Notist
            };

            for (var talk in res) {
              // is this an event ot a presentatoin?
              // (since we onnly ask for events if this is in the future)
              var type = res[talk].data.data[0].type;
              if (type == "events") {
                var thisTalk = res[talk].data.data[0].attributes;
                if (isFuture(thisTalk.ends_on)) {
                  talks.future.push(thisTalk);
                } else {
                  talks.past.push(thisTalk);
                }
              } else {
                var thisTalk = res[talk].data.data[0].attributes;
                if (isFuture(thisTalk.ends_on)) {
                  talks.future.push(thisTalk);
                } else {
                  thisTalk = res[talk].data.data[0].relationships.data[0].attributes;
                  talks.past.push(thisTalk);
                }
              }
            }


            // sort the events object by date because we
            // are manually inserting some legacy data too
            talks.past.sort(compare);
            talks.future.sort(compare);

            // Handy to save the results to a local file
            // to prime the dev data source
            if(process.env.ELEVENTY_ENV == 'prime') {
              fs.writeFile(__dirname + '/../dev/notist.json', JSON.stringify({'url': url, 'events': talks }), err => {
                if(err) {
                  console.log(err);
                } else {
                  console.log("Speaking content primed for dev.");
                }
              });
            }

            // we've got all the data now. So resolve the promise to return the data
            resolve({ url: url, events: talks });
          })
        )
        .catch(err => {
          reject(err);
        });
    });
  });
};
