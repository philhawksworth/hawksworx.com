---
title: Eleventail - A helper for TailwindCSS and Eleventy
date: 2020-01-02
allowcomments: true
tags: ["ssg", "development", "jamstack", "eleventy"]

pageClass: "dark-theme theme-teal"
---

I often find myself making sites as side projects. My starting point for these tends to evolve and, of course, depends on the requirements of the project, but I have a very common basic set of needs and tools that I like to use. Lately, I've been learning and enjoying using Tailwind CSS for utility-first CSS. Combining that with Eleventy, which I often use as a static site generator, is fun and productive, so I've made a simple project bootstrap and shared it as a project template on GitHub.

All I need now is a silly pun or portmanteau for a name and... wait... behold! [ElevenTail](https://eleventail.netlify.com) is born!


[![ElevenTail screenshot](/images/eleventail-screenshot.jpg "ElevenTail screenshot")](https://eleventail.netlify.com)

<!--more-->

## What does ElevenTail provide?

ElevenTail is just the starting point that I use when building a site where I want to have:

- [Eleventy](https://11ty.dev) for site generation configured with some common conventions
- [Tailwind CSS](https://tailwindcss.com) for a utility-based CSS pipeline
- [Purge CSS](https://www.purgecss.com/) for stripping unused CSS and minifying the result
- [Uglify JS ](https://www.npmjs.com/package/uglify-js)for basic JavaScript build pipeline
- Serverless functions development pipeline via [Netlify Functions](https://netlify.com/products/functions)
- Local support of [Netlify CDN ](https://netlify.com/products/edge) abilities such as [redirects](https://docs.netlify.com/routing/redirects/redirect-options/) and [custom headers](https://docs.netlify.com/routing/headers)

[ElevenTail](https://eleventail.netlify.com) is not a product, it's just something I maintain to use for myself. If you think it might be useful to you too, then great, go for it! Suggestions and contributions as pull requests are also welcome.


## One-click deploy

Ok, it might be 2 clicks. But you can try [ElevenTail](https://eleventail.netlify.com) for yourself with this speedy automated deploy. Clicking the button below will:

1. Clone [the ElevenTail git repo](https://github.com/philhawksworth/eleventail) into your GitHub account. (You will be asked for the required permissions to add the repo for you)
1. A new site will be created for you in Netlify, and linked to your shiny new repo.
1. A CI/CD pipeline will have been set up, so you'll then be able to deploy changes simply by pushing changes to your repo.
1. That's it really.

Try it. I double-dare you.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/eleventail)
