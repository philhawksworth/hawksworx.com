---
title: Seeding local data for faster dev builds with Eleventy
date: 2019-01-03
allowcomments: true
tags: ["jamstack", "ssg", "tips"]
photoCredits:
  - name: "Markus Spiske"
    url: "https://unsplash.com/photos/4PG6wLlVag4"
pageClass: "bright-theme theme-neongreen"
---

Pulling data from remote sources to use during the pre-rendering of a site is a powerful pattern on the [JAMstack](https://jamstack.org). I use it on this site for various bits of the content. [Eleventy](https://11ty.io), my current site generator of choice, does a great job of making it simple to pull data in at build time to be used across the site's templates, but I wanted to speed this up by stashing that data locally during development. Here's how I did it.


![Seedlings](/images/markus-spiske-624932-unsplash.jpg "Seedlings")

<!--more-->

## Data files

Like many SSGs, Eleventy has concept of [data files](https://www.11ty.io/docs/data-global/). Add structured data to suitably named files in a data folder, and this data will be made available at compilation time to use in any of the site's templates.

With Eleventy, the standard format for the files is JSON. However you can also use JavaScript, which enables you to have logic in your data files while returns JSON. You might be formating some data or fetching it from elsewhere.

I love this because it simplifies a process I have been using for a while on my site:

- fetch data from various sources with Gulp
- stash it locally
- run the SSG build

Now, instead of having a bunch of Gulp tasks to fetch and stash my remote data, all I need is a function which gets data and exposes it to Eleventy.

You can find [some examples in Eleventy's documentation](https://www.11ty.io/docs/data-js/).

Currently, I use external data sources in this way to populate my [speaking](/speaking) engagements, my recent [tweets](/#tweets), and my recent [instagram](/#instagram) posts.

They look something like this:

```js
const axios  = require('axios');
const INSTAGRAM_AUTH = process.env.INSTAGRAM_AUTH;
const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${INSTAGRAM_AUTH}`;

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        resolve(response.data.data);
      })
      .catch(err => {
        reject(error);
      });
  })
}
```

You can look closer at [the code I use to grab the data]({{pkg.repository.url}}/tree/master/src/site/_data/prod) for each of these if you like)

The only downside is that my build now fetches data from those sources every time I build my site. During development that might be several times a minute, so it feels like a sensible thing to optimise.


## Using a local cache

By having a local stash of the data my build can run more quickly and I can also work on the development at times when I'm offline.

Eleventy makes it nice and easy to specify where the data files should be found. So I can define one source location for my development data files and another for the production data files (which will grab the latest data during deployment builds).

From the `.eleventy.js` config file:

```js/3
dir: {
  input: "src/site",
  output: "dist",
  data: `_data/dev`
}
```

The data files Eleventy finds in the `_data/dev` directory are all contain JSON and give me `instagram`, `notist`, and `tweets` objects for Eleventy access in my templates.

- [instagram.json]({{pkg.repository.url}}/tree/master/src/site/_data/dev/instagram.json)
- [notist.json]({{pkg.repository.url}}/tree/master/src/site/_data/dev/notist.json)
- [tweets.json]({{pkg.repository.url}}/tree/master/src/site/_data/dev/tweets.json)

Meanwhile, the data files found in the `_data/prod` directory go off and fetch data _of the same shape and structure_ for us:

```js/3
dir: {
  input: "src/site",
  output: "dist",
  data: `_data/prod`
}
```

- [instagram.js]({{pkg.repository.url}}/tree/master/src/site/_data/prod/instagram.js)
- [notist.js]({{pkg.repository.url}}/tree/master/src/site/_data/prod/notist.js)
- [tweets.js]({{pkg.repository.url}}/tree/master/src/site/_data/prod/tweets.js)


## Priming the cache

It is important that the structure of data returned from the dev and prod versions of these data files is the same. Otherwise I'm going to give myself some build headaches. So I'll use the prod versions of my data files to optionally populate the dev json files. This way, I can occasionally seed my local data sources with content, as and when I see the need.

This gives me 3 build variants:

- `prod` - Fetch the data and use it in the build
- `prime` - Fetch the data and stash it in local data files
- `start` - Use the cached data in the build


Adding the ability to prime the local cache is little more than outputting the data to a local file. So the Instagram example from above would now look like this:



```js/11
const axios  = require('axios');
const INSTAGRAM_AUTH = process.env.INSTAGRAM_AUTH;
const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${INSTAGRAM_AUTH}`;

module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {

        // Handy to save the results to a local file
        // to prime the dev data source
        fs.writeFile(__dirname + '/../dev/instagram.json', JSON.stringify(response.data.data), err => {
          if(err) {
            console.log(err);
          } else {
            console.log("Instagram content primed for dev.");
          }
        });

        resolve(response.data.data);
      })
      .catch(err => {
        reject(err);
      });
  })
}
```








## Switching source with an environment variable





