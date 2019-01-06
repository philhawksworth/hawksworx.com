---
title: Keeping a Jamstack Site Feeling Fresh With Recent Tweets
description: "Rather than using Javascript in the browser to show recent tweets, I'd rather remove that dependency and bake the tweets into the HTML. A few simple tools can automate that and keep a site fresh."
date: 2017-03-27T10:56:18Z
allowcomments: true
tags: ["web", "development", "static", "jamstack"]
pageClass: "dark-theme theme-lime"
---

Having somewhere on your site to show a few of your recent tweets is a common requirement. Twitter provides some easy ways to embed tweets or twitter feeds onto your site via Javascript, but I'm keen to remove external javascript dependencies from my site. It helps the site to render more quickly, and lets me control exactly how it looks.

But for a [static site](https://www.jamstack.org), it would be a pain to need to compile and deploy after every tweet. Luckily, by stitching together some simple tools, this can all happen automagically whenever a new tweet is posted.

![Fresh slice](/images/kiwi-slice.jpg "Keeping things fresh")

<!--more-->

My site, this site, is made with Jekyll. Perhaps the most popular static site generator. I already have a few bits of Gulp as part of my build automation and the whole thing is hosted on [Netlify](https://www.netlify.com), my very favorite static site hosting service.


## Pulling tweets into the codebase

To bring recent tweets into the site, I add a [gulp task which requests my recent tweets](https://github.com/philhawksworth/hawksworx.com/blob/f5ece4ed3d06a3caae75978155e7f091c965cfaa/gulpfile.js#L168-L206) from Twitter's API, and stashes them in a YAML Data file. [Jekyll makes YAML Data files available](https://jekyllrb.com/docs/datafiles/) to its templates so I can use the content however I need.

So far, so simple. Now to trigger a build and deployment whenever I tweet.

Netlify can run your build for you in their environment in exactly the same way that as it runs in your local development environment. The output then gets deployed to their distributed CDN.


## Triggering the build

There are lots of ways to trigger a Netlify build, but what we need here is webhook. In [Netlify's site settings](https://www.netlify.com/docs/webhooks/#incoming-webhooks), we create a webhook and now we have a URL which will trigger a build and deployment whenever it recieves a POST request.

Now to monitor a Twitter feed. I'm trying to keep away from the need to host any server or service myself, so I just turn to [If This Then That](https://ifttt.com), the service automation... um... service.

IFTTT has channels to [monitor twitter feeds](https://ifttt.com/twitter), and also has the ability to [make requests to Webhooks](https://ifttt.com/maker_webhooks), so all that is required it to configure an IFTTT Applet to tie these things together.


## Pulling it all together

With these pieces in place, things start working nicely. Each tweet will find its way to the site's HTML with no need for client-side javascript. A quick summary:

1. IFTTT monitors activity from my twitter feed
2. New tweets result in a call to a webhook
3. POST requests to the specified webhook invoke a new build on Netlify
4. The site build pulls in recent tweets from the Twitter API and [includes them in the home page of the site ](/#tweets)
5. Victory dance

