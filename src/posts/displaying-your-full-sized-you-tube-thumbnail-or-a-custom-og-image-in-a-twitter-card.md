---
title: "Displaying your full-sized YouTube thumbnail or a custom OG image in a Twitter card"
description: How to override Twitter's default small link previews for YouTube videos or provide your own custom open graph image using your own custom link shortener
tags: ["development", "tips", "serverless"]
date: 2023-07-05
pageClass: "bright-theme theme-neonblue" 
---

In days past, links to YouTube videos on Twitter used to show a nice full-sized thumbnail image. You could specify the poster image you wanted over in YouTube and it would appear along with an embedded video player. 

These days, links to YouTube videos have been downgraded to only show a small image card which is frustrating for anyone wanting to share their videos on Twitter with a visible and inviting call to action to watch them. In an effort to make their videos stand out and attract clicks again, some have taken to attaching a thumbnail images directly to their tweets which, while making them visually appealing, get in the way of click-throughs as people find themselves just seeing a larger version of the image rather than viewing the video.

We can fix this with a crafty use of [Netlify's Edge Functions](https://www.netlify.com/products/?utm_source=hawksworx&utm_medium=findthatat-pnh&utm_campaign=devrel#netlify-edge-functions).

![A custom OG image in a tweet](/images/custom-og-in-a-tweet.jpg "A custom opn graph image displayed in a tweet "){responsive}

<!--more-->



## How I enriched my link shortener

For some time, I've been using [Netlify's redirects API](https://docs.netlify.com/routing/overview/?utm_source=hawksworx&utm_medium=findthatat-pnh&utm_campaign=devrel) to make [my own simple link shortener](https://findthat.at). It lets me create short URLs for sharing resources using a domain that I own and the knowledge that I don't need to depend on a third party link-sharing service.

You can read about that in this blog post I wrote explaining it, including [a handy little utility Kent C Dodds wrote](https://github.com/kentcdodds/netlify-shortener) to expand on this technique. (Also see [Kent's video explainer](https://findthat.at/kcd-short) for even more background info)

These days I use it in combination with [a little Raycast script](https://gist.github.com/philhawksworth/b77d876e865ac190a6bb849913d4a744) to make creating new URLs a snap.

<figure>
    <img src="/images/raycast-short-url.jpg" responsive>
    <figcaption>Making a new short URL using Raycast</figcaption>
</figure>


Having a link shortener like this provides a nice opportunity. It offers the chance to add some logic to customise what everyone (and everything) that follows those links will see.

So, rather links to YouTube videos unfurling in Twitter like this:

<figure>
    <img src="/images/unfurl-small-card.jpg" responsive>
    <figcaption>The small, default preview that Twitter shoes for links a YouTube video </figcaption>
</figure>

They can look [like this](https://twitter.com/philhawksworth/status/1676503469350346753):

<figure>
    <img src="/images/unfurl-large-card.jpg" responsive>
    <figcaption>The larger preview that Twitter shows when we ask it nicely with a custom OG view</figcaption>
</figure>


## How to offer a different view to crawlers and unfurlers

When you share a link on Twitter and on other tools and social networks, they visit the URL and "[unfurl](https://indieweb.org/unfurl)" it in order to display a preview of what can be found there. We can give services like this hints about what we'd like them to show using metatags in the head of our HTML.

Since Netlify introduced [Edge Functions](https://www.netlify.com/blog/edge-functions-general-availability/?utm_source=hawksworx&utm_medium=findthatat-pnh&utm_campaign=devrel) we've had an ideal way to add a tiny bit of logic into our link shortener which will return a page template of our own to anything looking to unfurl the URL to display its [opengraph](https://ogp.me/) image.


## How to detect if Twitter is visiting your URL

While serving different experiences to visitors based on their brand of browser is [generally understood to be a bad idea](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent), and we should instead use feature detection if we are trying to work around differences in browser support for features we need, here it is the ideal match for our needs. So we can use [UserAgent sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) to decide if we should just redirect the visitor to the page our short URL points at, or to show our own custom page instead.

The [code to do this in a netlify Edge Function](https://github.com/philhawksworth/shortener-with-custom-og/blob/a0218f52e89a2b70453e45a8ee593dfe2bd928e2/netlify/edge-functions/is-it-og.ts#L23-L38) is nice simple JavaScript (or TypeScript if you prefer)

```js

// Detecting if Twitter is the requesting user agent
const agent = request.headers.get("user-agent");
if(agent.includes("Twitter")) {
  // Got something just for you, Twitter!
} 

```

The URL we shared with Twitter is not a YouTube domain, it is on our custom domain, so Twitter won't automatically impose its own decisions about defaulting to a mini card. All we need to do is show it an HTML page with the appropriate opengraph data (which we can automatically get from the YouTube page that we're pointing at).

To do this, our edge function fetches the open graph data from the destination URL 

```js
// fetching the open graph data from the destination page, 
// and rendering it in a template

// Import Cheerio for easy DOM interrogation
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

// get the og data from the final destination page via our redirect lookup
const destination = await fetch(`https://custom-short-link.netlify.app/${url.pathname}`);
const html = await destination.text();
const $ = cheerio.load(html);

// Grab some OG data from the site
const title =  $('meta[property="og:title"]').attr('content') || "";
const description =  $('meta[property="og:description"]').attr('content') || "";
const site =  $('meta[property="og:site_name"]').attr('content') || "";
const orginal_image =  $('meta[property="og:image"]').attr('content') || "";

```

Now we have the open graph data from the destination page, we can [use it in our own page template](https://github.com/philhawksworth/shortener-with-custom-og/blob/a0218f52e89a2b70453e45a8ee593dfe2bd928e2/netlify/edge-functions/is-it-og.ts#L40-L71) to render our custom view when a request is made with Twitter's user agent string.

```js

// Our page template. 
// Just a string literal into which we can poke some variables
import page from "../og-page.js";

// Populate our OG page template
// and return it as HTML
const ogPage = page({
  site: site,
  title: title,
  description: description,
  path: url.pathname,
  domain: rootDomain,
  orginal_image: site == "YouTube" ? orginal_image : null
});
return new Response(ogPage, {
  headers: { "content-type": "text/html" },
});


```

## The results

Now, just by making a convenient short link to any YouTube, when we share that link on Twitter it will display the large format image card within the tweet, but anyone clicking that preview card or following the link directly, will be taken to the video on YouTube. Nice.


## Bonus. How to show custom OG images for third party URLs

There's more! Now that we have this logic which displays a custom page view to Twitter, we can use it to show any OG image we like and not just relay the one specified at the destination URL.

This lets us use _our own branding_ when we share a shortened link on Twitter. By expanding the list of user agent strings that we detect, we can add the same support for other places that unfurl URLs to show a preview image, like Slack, Mastodon, LinkedIn and others.

A few more lines of logic in our function, and we can populate our custom template with our own OG image if we have one that matches the path in our short link. If not, not problem, just show the one intended by the owners of the destination page.

I've used this to add my own OG image when the link I'm sharing doesn't have one of its own, or I've wanted to enhance it for my own purposes, like the one below.

<figure>
    <img src="/images/custom-og-mfe.jpg" responsive>
    <figcaption>How <a href="https://twitter.com/philhawksworth/status/1671930204275589146">Twitter previews</a> my <a href="https://findthat.at/mfe">custom link</a> to a conference where I'll be speaking.</figcaption>
</figure>

## Try it for yourself

You can experiment with this without needing to buy a domain or pay for anything. [Try deploying](https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/shortener-with-custom-og&utm_source=hawksworx&utm_medium=findthatat-pnh&utm_campaign=devrel) this [demo repo](https://github.com/philhawksworth/shortener-with-custom-og) to Netlify to get a your own URL shortener including the edge function which detects unfurlers and renders its custom template. It also includes Kent's netlify-shortener utility script which has instructions on how to add a system wide command to quickly shorten links for you.

The hardest part? Thinking of a good, short domain that you can register to use as your own short code domain. (You can register domains directly at Netlify too if you want to do the whole thing)

## Resources

- Link shortener with custom OG image support [GitHub repo](https://github.com/philhawksworth/shortener-with-custom-og) 
- Automatically [clone the repo and deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/shortener-with-custom-og&utm_source=hawksworx&utm_medium=findthatat-pnh&utm_campaign=devrel)
- [Kent C Dodd's Netlify-Shortener](https://github.com/kentcdodds/netlify-shortener) helper
- How to add [a Raycast script to make a new short link](https://gist.github.com/philhawksworth/b77d876e865ac190a6bb849913d4a744)
- [Custom domains on Netlify](https://docs.netlify.com/domains-https/netlify-dns/domain-registration/?&utm_source=hawksworx&utm_medium=findthatat-pnh&utm_campaign=devrel)
- How my [findthat.at](https://findtaht.at) link shortener works

