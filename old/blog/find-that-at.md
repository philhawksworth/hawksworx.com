---
title: findthat.at - A URL shortener powered by Netlify
date: 2019-01-04
allowcomments: true
tags: ["netlify", "tips"]
photoCredits:
  - name: "Vlad Tchompalov"
    url: "https://unsplash.com/photos/dQkXoqQLn40"
pageClass: "bright-theme theme-neongreen"
---

I've recently started to roll my own short URLs. Using Netlify's optimised edge redirects via Netlify's redirects API is incredibly efficient and gives me URLs which I manage on my own domain instead of farming that out to a third-party provider who might go away.

It is remarkably easy to set up. Here's how.


![Ant and leaf](/images/vlad-tchompalov-450777-unsplash.jpg "Ant and leaf")

<!--more-->

## The redirect API

Netlify allows you to run redirects directly on their ADN by adding a `_redirects` file to your project. You can read more details in the [documentation](https://www.netlify.com/docs/redirects/), but that file contains lines of config which look a little like this:

```bash

/a-short-path   http://some-place-on-the-web
...

```

By maintaining this file, and pushing it to a Netlify site, we can create as many redirects as we like. Mine, which drives the redirects for a domain I purchased especially for the job is public and [available to see on github](https://github.com/philhawksworth/findthat.at/blob/master/_redirects).

If no matches are found, it falls through to the last possible match in the redirects file and sends people here, to this page.

> ## 👋 Hi there!
> Sorry I couldn't find that link for you. Or maybe you just wanted to see how this thing works.

## More convenience

The rather excellent [Kent C Dodds](https://twitter.com/kentcdodds) noticed the potential in this technique and took it a stage further, adding some useful utilities to keep the redirects file orgnaised, create shortcodes automatically, and streamline the process of making new URLs with a handy script.

[His video walk-through](https://www.youtube.com/watch?v=HL6paXyx6hM&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u) of how he made [Netlify-shortener](https://github.com/kentcdodds/netlify-shortener) is very good. I recommend giving it a watch.


<div class='embed-container'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/HL6paXyx6hM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
