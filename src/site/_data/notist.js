var axios  = require('axios');

// Were are we getting data?
// If this is defined in an environment variable in Netlufy, we'll use that
// Otherwise, we'll just show you Phil's
var url = 'https://noti.st/philhawksworth.json';
var now = new Date();

// expose these results as data to eleventy.
module.exports = () => {

  return new Promise((resolve, reject) => {

    // go get it
    axios.get(url).then((response) => {

      // do some walking around in the JSON returned from Notist
      // to collect all of the data sources for each event found
      var events = response.data.data[0].relationships.data;
      var eventURLs = [];
      events.forEach(element => {
        var when = new Date(element.attributes.presented_on);
        var future = now - when < 0 ? true : false;
        if(future) {
          eventURLs.push(element.links.event);
        } else {
          eventURLs.push('https://noti.st/philhawksworth/' + element.id.replace('pr_','') + '.json' );
        }
      })

      // now go and get the info for each event
      axios.all(eventURLs.map(l => axios.get(l))).then(axios.spread(function (...res) {

        // gather the data about for each presentation and
        // collect them in future and past arrays
        var talks = {
          future : [],
          past : []
        };

        for (var talk in res) {

          // is this an event ot a presentatoin?
          // (since we onnly ask for events if this is in the future)
          var type = res[talk].data.data[0].type;

          console.log('type :', type);

          if(type == 'events'){
            var thisTalk = res[talk].data.data[0].attributes;
            var when = new Date(thisTalk.ends_on);
            var future = now - when < 0 ? true : false;
            if(future) {
              talks.future.push(thisTalk);
            } else {
              talks.past.push(thisTalk);
            }
          } else {
            var thisTalk = res[talk].data.data[0].attributes;
            var when = new Date(thisTalk.ends_on);
            var future = now - when < 0 ? true : false;
            if(future) {
              talks.future.push(thisTalk);
            } else {
              thisTalk = res[talk].data.data[0].relationships.data[0].attributes;
              talks.past.push(thisTalk);
            }
          }
        }



        // we've giot all the data now. So resolve the promise to return the data
        resolve({'url': url, 'events': talks  });
      }))
      .catch((error) => {
        reject(error);
      })
    })

  })
}
