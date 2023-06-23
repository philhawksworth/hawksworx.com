---
title: Host your own Twitter archive and make it searchable with Edge functions
date: 2023-01-09
tags: ["netlify", "tips", "twitter", "edge"]
---

Recently I made the decision to reclaim my content from Twitter and [host all of my tweets](/notes/) as part of my own website. Many other people made a similar call once Twitter’s future began to look so uncertain and unhealthy. Truth be told, I’d intended to do this for some time because it’s nice to keep control of your own content.

I also wanted to ensure that my future posts on Mastodon, the platform du jour, would accumulate as part of the same searchable and addressable archive over time. Giving everything a URL on my own domain that I could be ensure would live on for as long as I wanted.

<!--more-->

I’ll describe how I made Mastodon posts automatically accrue in my own archive and website in another post, but first the more pressing matter was of how to unhitch my wagon from Twitter and sensibly incorporate every tweet I ever posted [since 2007](/note/tw/163673622) into my site. I’d be adding around 25,000 new pages to my site which is currently pre-generated using [Eleventy](https://11ty.dev) and hosted as static assets on [Netlify](https://netlify.com).

## My requirements

- A unique URL on my own domain for every tweet
- An index listing all of the tweets in chronological order
- A link back to the original location where each item was posted
- The ability to search all of my tweets

For performance, SEO, accessibility, and robustness reasons, I also had some non-functional requirements I cared very much about:

## Non functional requirements

- No client-side JavaScript would be required to fetch or display any of the content
- All the tweets and links to them would be indexable by search engines by being present in the crawl-able, pre-generated HTML of my site
- My site’s build time would remain manageable even while accommodating these 25k new pages
- The complexity of my site’s code would not explode into the realms of something I couldn’t maintain or ruin my mental model of my site and its content.

## The approach

OK, this was the plan…

1. Get my [data archive from Twitter](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive)
2. Format and condense the archive data ready to use in the build
3. Generate a paginated listing of my archived tweets in my site build
4. **Don’t** generate a page for every individual tweet until its page is requested
5. Use an Edge Function to provide a simple search 

In a little more detail:

### 1. Grab my data from Twitter by requesting an export of my archive

At time of writing you could still do that, and what you get is an archive which includes a nice web-based interface to explore your tweets which are provide as JSON files. 


### 2. Format and condense the archive data

The exported archive was massive. I want [a single JSON file](https://github.com/philhawksworth/hawksworx.com/blob/master/src/site/_data/social_archive.json) which contains all of my tweets containing just the metadata that I need when populating my site. [A little node script](https://github.com/philhawksworth/hawksworx.com/blob/master/parse-tweets.js) to massage the data into the shape I want worked perfectly. A one-time effort that gave my a leaner archive file to use in my site build. I’ll tuck the full original archive zip file away somewhere in the attic with my old DVDs and boxes.

### 3. Generate a paginated listing of my archived tweets

I already use Eleventy as a site generator to build my website. It turns data content and templates into pages very nicely indeed. Feeding it my Twitter archive JSON let me [generate a paginated set of index pages](https://github.com/philhawksworth/hawksworx.com/blob/master/src/site/%5Bnotes%5D.njk) with 25 tweets on each. 25 feels about right for the number of tweets to scroll through before having to navigate to another page, and yielded a little under 1000 new pages. Child’s play for Eleventy which now builds my site of around 1,200 pages in around 1 second (on my MacBook Pro).

### 4. Don’t generate a page for each individual tweet until it is requested

I’m eager to generate as many of the site’s pages in advance as I can. With a thousand or so URLs and a fast site generator like Eleventy I’d just pre-generate everything in each build.  But its important to be pragmatic. This is key to keeping the build time manageable. Deferring the rendering of a page until it is first requested can save me from rendering almost 24,000 pages in each build. Many of these pages might never be requested. (Don’t get me wrong, my tweets are pure gold. But [some](/note/tw/1252321499312259074) more than [others](/note/tw/163949292)).

By using a Netlify [On-demand Builder](https://www.netlify.com/products/#on-demand-builders) function, I can wait until the first person requests to see my page of a specific tweet, and then [look it up from my handy JSON archive](https://github.com/philhawksworth/hawksworx.com/blob/387f21328eb07ab406d3c9abd72a6ccb8ab7a449/netlify/functions/note-tweet.js#L14). The page generated will be added to my site’s latest deploy as if it had been part of the last build. Future requests for that URL will get the view that has now been generated, just like any other page which was part of the build.

### 5. Use an Edge Function to provide a simple search

Here’s another place where I’m rewarded for slimming down that original data export into a single JSON file. We can access that JSON from an Edge Function which means that we do some simple string matching against it to look for tweets. You can use Netlify Edge Functions along side any framework (or framework-less) site, but [Eleventy has a nice utility](https://www.11ty.dev/docs/plugins/edge/) to make this convenient. I used that to make other internals from my site, such as the tweet [archive data](https://github.com/philhawksworth/hawksworx.com/blob/387f21328eb07ab406d3c9abd72a6ccb8ab7a449/netlify/edge-functions/eleventy-edge.js#L6) and the page templates easily available. 

## The results

Happily, the [complete archive of tweets that I posted from 2007 until 2022](/notes/) are now available on unique URLs on my own site. Each being served as HTML with no client-side JavaScript dependency. I’m delighted to have control over how these look and what additional or related content I could chose to display along with them.

Visitors to my site are able to search and filter my tweets, and to bookmark and share links to any search term. I like that a lot. The search is pretty simplistic for the moment, but certainly capable for my general needs. I like the idea of evolving it to use something like Lunr which could use the same basic approach, but could swap my simple string matching to querying a generated index with Lunr’s tools. 

What about build times?

On my local development machine my site takes between 0.9 and 1.2 seconds to build. That’s Eleventy generating around 1200 files. But what about building and deploying on Netlify where I host my site? 

Mini tangent alert...

> There are 2 main elements which impact the build and deploy times on Netlify — the build time when the build script generates all of the assets, and the deployment time when Netlify makes new assets available to the CDN.  Although site deploys are atomic on Netlify, there is some cleverness behind the scenes to avoid duplicating the storage and propagation of assets. 
This means that if I deploy a build of my site where something on every single pre-generated page has changed, the deploy will take longer to complete than when I deploy a version of my site when just a few pages have been added or updated. That’s irrespective of the time it takes for the build to run first.

Most of my deployments just have a few updates and additions, resulting in times in the 35-40 second range. But occasionally I might do something global, like rollout a new design or update the global navigation, then I’m seeing those deploys take between 3.5 to 4 minutes as all those thousands of new assets are distributed following the build. Very manageable.

## What’s next?
