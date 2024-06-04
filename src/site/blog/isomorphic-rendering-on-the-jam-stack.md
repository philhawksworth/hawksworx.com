---
title: "Isomorphic Rendering on the JAMstack"
date: 2016-08-01T08:23:35Z
publishdate: 2016-08-01T08:23:35Z
draft: false
tags: ["web", "development", "static", "jamstack"]
description: A simplified yet powerful model for delivering ready-to-consume web pages which enhance to a dynamic client-side rendering approach
pageClass: dark-theme theme-ruby
---
I have been experimenting with something that seemed obvious to me for a while. A web development model which gives a pre-rendered, ready-to-consume, straight-into-the-eyeballs web page at every URL of a site. One which, once loaded then behaves like a client-side, single page app.

The fact that so many frameworks set about this with all manner of complex add-ons and machinery gave me cause to think I was missing something big. So I built a simple proof of concept with a static site generator to see if this model could work. I'm pretty pleased with it. Let me talk you through the approach and show you the result.

![comedyinthecrown.com](/images/Comedy_in_the_Crown.jpg "comedyinthecrown.com - delivered via an enhanced JAM stack")

<!--more-->


First thing's first. Let's look at the site. It's a simple site, not a big complex application, but that's precisely the type of thing I'm seeing regularly over-engineered, so it fits my purpose. Take a quick peek, then come back to read about how it was put together.

> [https://www.comedyinthecrown.com](https://www.comedyinthecrown.com)

Still with me? Ok. Let's list out the principles I wanted to demonstrate with this site:

1. A consumable page of content at every URL without the need for JavaScript to display things in the browser
2. A valid, bookmark-able entry point to the site at every URL
3. Client-side rendering with JavaScript _as an enhancement_ for reduced data over the wire and rapid (and perhaps fancy) page transition
4. Simple server-side architecture which could be served from any static web server
5. Content management through a CMS outside of a development environment


## JAM Stack

At its heart, this project would use a static site generator to build out a deployable site. This should satisfy point 4 above if we do it right and don't add anything that muddys the waters.

We'll use Gulp to run a build and generate our static assets with NodeJS on the server, and some APIs to get data. I've been calling this kind of build Short Stack development, but it fits nicely with what [Mathias Biilmann](https://vimeo.com/163522126) of [Netlify](https://netlify.com) calls the [JAM Stack](https://jamstack.org/). That is:

- **J**avaScript
- **A**PIs
- **M**arkup


## Abstracting the content management

My first step was to look at a way to abstract the content which the site would deliver so that it could be managed via a CMS. I chose to use [Contentful](https://contentful.com) which is a headless CMS as a service. It takes care of all of the CMS user interface, publishing flows and user roles. In Contentful I could define any content data model that I wanted and have it expose the data as JSON over an API.

I modeled the two main parts of [comedyinthecrown.com](https://www.comedyinthecrown.com) that I wanted to be easily managed. Information about the gig nights, and the acts who would perform. These form the basis of what is dynamic on the site.



## Consuming the data

Next, I wanted to consume the data from my CMS in 2 places:

1. During a build of the site, to generate static versions of every page.
2. In the browser for client-side render of subsequent page loads.

For the sake of portability, efficiency, and developing away from the network (like many things I make, this site would be developed mostly on my daily train ride) I chose to locally cache the data from the CMS within the site as a local instance of the API.

- [comedyinthecrown.com/dates](https://comedyinthecrown.com/dates) renders data from [comedyinthecrown.com/api/nights.json](https://comedyinthecrown.com/api/nights.json)
- [comedyinthecrown.com/acts](https://comedyinthecrown.com/acts) renders data from [comedyinthecrown.com/api/acts.json](https://comedyinthecrown.com/api/nights.json)
- ..and so on


This has a few advantages:


### It loosens the coupling between the site and the hosted CMS

If for any reason, Contentful were to go away, the site would still function and all of our content would still be abstracted in a structured form. We could move our CMS elsewhere if we had to.

### It speeds up our build

The build process doesn't need to get the latest content from the CMS every time we run it. By stashing the content locally, our build process can avoid going to the network while we our doing our development.

### We can serve our own data API

Since we've grabbed the data, we can make it available on our own domain for our templates to use when rendering in the client. This reduces our dependencies when serving the site. And since we'll be serving everything as static files from a CDN, this can be rapid.


## Templating and generating the site

  For the site to rendered on the server, and also to support client-side rendering, I chose a templating language which can be used both on the server and the client. There were several options, but I chose <a href="https://mozilla.github.io/nunjucks/">Nunjucks</a> which has some nice features and a syntax I like.

  With Nunjucks in place, I used Gulp to control some build activities:

1. Download and stash the content in a local version of the API
2. Render the HTML pages from the Nunjucks templates and our content data
3. Precompile the same Nunjucks templates for use client-side with JavaScript
4. Do the usual squashing, optimising and baking to create a deployable directory of static assets.
5. Bake our local API to our deployable directory as a set of json files

Now we have a site which has a fully populated pages, an API we can get more data from, and JavaScript templates which can render subsequent pages. Adding event listeners to all of our internal links with JavaScript as a progressive enhancement allows us to enable the client-site rendering.


## Hosting and deployments that keep things fresh

Our content can feel fresh if we make it simple to get data or code changes, run a build, and push the output to a server somewhere. That sounds like a lot to do though, and things will only really stay fresh if we can make this as friction free as possible.

Enter Netlify which serves not only as our static site host, but and also a build server. Netlify can run the same build as we run locally with Gulp and deploy the result to its static hosting infrastructure. Better than that, it can be triggered to build whenever we push code changes to our git repository.

This gives developers a frictionless way to deploy versions of our site. `git push` ..done!

Now, how about for content authors? We want changes published in our CMS on Contentful to trigger a build too. We can do this thanks to webhooks which both Netlify and Contentful support. When content is published on Contentful, it fires a webhook on Netlify which then causes our build to run. The content is pulled in from the CMS and our build gets all the latest data. Nice.


## So how did we do?

The result of this is a reasonably simple development architecture which keeps all of the guesswork out of what will run when people visit our site. What we see in development is the same as in any environment we care to deploy to.

The delivery performance of this model is great. The pages are prerendered and cached and ready to be displayed in the browser with no additional work. We get a working page into the user's eyes pretty damn quickly. After the page as loaded, JavaScript (if available) loads our client-side templates and add new behaviours to our internal links.

<div class='embed-container'>
  <iframe src="https://www.youtube.com/embed/XN9CpRT7SB4" frameborder="0" allowfullscreen></iframe>
</div>

From this point onwards, when an internal link is clicked, it no longer requests a new page, instead it makes a request for the data it needs from our API. Minified, gzipped JSON is delivered from our CDN and is then rendered by our client-side templates. It uses a fraction of the bandwidth and browser effort of a full page reload, so this goes FAST.

By taking care of the browser's History state via the History APi, we keep the Back and Forward button of our browser working as expected and everything feels pretty slick.

This is the kind of behaviour that has become popular in single page applications (SPAs), but with the distinction that here the pages all work by default with no need for JavaScript The client-side rendering is a progressive enhancement.


## Taking this further

This model already makes good use of static and cached assets, but we can go further by removing the need to go back to the network for templates and data sources if we have encountered them before. Service Workers can help with that.

A prerequisite for this is serving the site over https, which was [trivial on Netlify](https://www.netlify.com/docs/ssl). (Seriously. It took 10 seconds.)

<div class='embed-container'>
  <iframe src="https://www.youtube.com/embed/k-9T0FYd-QU" frameborder="0" allowfullscreen>
  </iframe>
</div>

You can [check out the code](https://github.com/philhawksworth/comedy-in-the-crown) for the site (warts and all) on Github.

