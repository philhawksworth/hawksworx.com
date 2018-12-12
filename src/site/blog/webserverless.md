---
title: Webserverless
date: 2018-04-10T06:47:03-07:00
publishdate: 2018-04-10T06:47:03-07:00
draft: false
section: blog
allowcomments: true
tags: ["jamstack", "static", "web"]
hero: /images/sledgehammer-nut.jpg
pageClass: "dark-theme theme-greyblue"
---

Today I saw a question on twitter which I have seen a few times before. It was posed by the rather excellent and lovely Drew McLellan.

> What do you think the best use cases are for a static site generator? <cite>— <a href="https://twitter.com/drewm/status/983634762433810432">Drew McLellan</a></cite>

![A sledgehammer and a nut](/images/sledgehammer-nut.jpg "A sledgehammer and a nut")

<!--more-->

There were some interesting responses, but this cheeky and playful response from the irrepressible Bruce Lawson jumped out at me:

> Making static sites <cite>— <a href="https://twitter.com/brucel/status/983634971956056064">Bruce Lawson</a></cite>

Thanks Bruce. Problem solved.

Bruce has a knack of cutting to the chase, and this made me smile. But it nudged at one of my trigger phrases, which Drew's follow up question then prodded further:

> Ok, so when/why would you make a static site? <cite>— <a href="https://twitter.com/drewm/status/983635104286281729">Drew McLellan</a></cite>


## A static site

The term _static site_ strikes me as being widely misunderstood. It is taken to describe the experiential characteristics of a site, and not, as probably intended, the attributes of the site architecture which delivers it.

It's like describing _a blue site_ or _a French site_.

In fairness, we know that naming things in computer science is hard, and as the tooling and processes around static site _architectures_ have evolved, the results no longer need to be sites which are... well.. static.

A number of people replied to Drew's follow up question by offering the scenarios of brochure sites and sites which have to change very infrequently. In other words, sites which behave statically.

Thomas Fuchs got closer to what my stock response to this question would be when [he offered](https://twitter.com/thomasfuchs/status/983647675227824130) things like improved security, performance and portability. All excellent and valuable points. But I still find myself trying to articulate this a little differently.


## Removing the web server

There have been attempts to reset the static site misnomer before. The term [JAMstack](https://www.jamstack.org) has surfaced in an effort to more conveniently describe sites which can be served as static assets, and if needs be, enriched further via progressive enhancement and client-side access to other services. I talked to Chris and Dave about that recently on their [Shop Talk Show](https://shoptalkshow.com/episodes/303-jam-stack-phil-hawksworth/) podcast.

I think of it like this:

Web servers can be difficult to secure, to scale, to optimize. When we operate or maintain our own web servers we need to ensure that they are resilient, that they are not single points of failure, that they service requests quickly under load (including all database queries and dynamic view population behind the scenes), and that they stay secure, updated, patched and healthy.

When we introduce important things like Content Management Systems (CMS) to the mix, our technical stack can get even more complex and subject to risk of attack or poor performance.

Back in 2012, when I was working at an [agency](https://www.rga.com) and exploring [Perch CMS](https://grabaperch.com/) (a self-hosted, [LAMP stack](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) CMS, which was breathing some much needed fresh air into the state of content management systems) I asked Drew:

> Can you use Perch to generate static files to serve from a dumb server? ...[I'm] trying to win arguments with talk of vastly reduced hosting infrastructure.<cite>– Younger Phil, in 2012</cite>

Drew's suggestion was to add a caching layer to my stack with something like [Varnish](https://varnish-cache.org/). That's a reasonable and popular suggestion, but not quite what I was looking for. I wanted to take moving parts _out_ of the stack which served my visitors, not add to it if I could avoid it.

Doing this at scale can be challenging. Strategies to make sites more resilient often involve taking steps which emulate serving static assets anyway. Caching technologies and Content Delivery Networks (CDN) operate by taking what a web server generates dynamically (or Just In Time) and making those resources static and caching them for distribution and repeated use.

> Caching management and invalidation is not trivial.

> Distributed CDN management is not trivial.

> Webserver management is not trivial.

I want to focus on creating web sites which deliver beautiful experiences. I don't want to design and manage infrastructure which addresses commoditized problems.

So, if I can build sites in a way that lets me cut out some of this complexity and risk?... If I can build a site in a way which, by default, is perfectly suited to deploying across distributed content delivery networks ?...

I'll choose that.

[Static site generators](https://staticgen.com) are tools for creating sites which are _capable_ of being served predictably and reliably from a CDN. Whether those sites are brochure sites which changes infrequently, blogs like this this one, or large publishing sites like [Smashing Magazine](https://www.netlify.com/blog/2017/03/16/smashing-magazine-just-got-10x-faster/) complete with comments, subscriptions and e-commerce.

Having a site which is _capable_ of being served without a webserver offers huge advantages.

I approach the technical design of each site I work on, not by asking "Can I make this static?", but by asking, "Can I avoid introducing the overhead of a web server?". Sometimes the answer is no. Usually the answer is yes.

Where possible, I'm going webserverless.



