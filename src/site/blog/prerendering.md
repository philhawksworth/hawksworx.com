---
title: Prerendering is the key to a tasty Jamstack
date: 2020-01-06
allowcomments: true
tags: ["jamstack", "jamuary", "static", "web"]
photoCredits:
  - name: "Taylor Grote"
    url: "https://unsplash.com/photos/LqkFX2Km1a0"
pageClass: "bright-theme theme-khaki "

---

2019 seemed to be the year that the term [JAMstack](https://jamstack.org?utm_source=devto&utm_medium=jamuary-prerendering-pnh&utm_campaign=devex) started to really grow in popularity with more web developers than ever before. It is approach that I have believed in for many years. [Netlify](https://netlify.com/?utm_source=devto&utm_medium=jamuary-prerendering-pnh&utm_campaign=devex) (where I work) was created to enable exactly this type of architecture and indeed coined the very term.

But JAMstack can sound confusing. There are a number of emerging interpretations. In my opinion, there is one aspect of JAMstack which absolutely key: Pre-rendering.

Here is a short explanation about why.

<!--more-->

![Baking, not frying](/images/muffin-tray-LqkFX2Km1a0-unsplash.jpg "Baking, not frying")

By "pre-rendering", we mean, "to generate the site in advance". This is different to generating each page view in response to a request from a user which is a more traditional model these days. Pre-rendering brings a number of advantages:

1. **Speed**. When all the work of turning data and templates into markup is done ahead of time, serving a response is faster than doing it _on demand_.
1. **Security**. Since we pre-rendered our response, we can serve it as static assets. This has huge advantages in terms of complexity and security of hosting infrastructure.
1. **Scale**. Traditional "dynamic" stacks which assemble each response _a la minute_ struggle at times of heavy load. Capacity planning is an art in itself. One strategy is to introduce complex caching layers to hold static snapshots of common database queries, commonly used assets, or even common page views. But a pre-rendered site can be cached at a CDN by default. No more fearing being "slash-dotted".
1. **Certainty**. While some are excited by the aspect of JAMstack which suggests serverless hosting (indeed, JAMstack can take maintaining a webserver refreshingly out of the equation), describing JAMstack as serverless hosting is only partially accurate. Serverless can be a wonderful companion to JAMstack sites (I'll save that for another post). But by pre-rendering our sites we can be certain that our pages are correct before we deploy them. I like to talk about putting distance between the user and the technical complexity.

## But is it new?

Back in the day, all web sites were built this way. We crafted assets and served them statically. Later we introduced mechanics like _cgi-bins_ and databases to make the content on sites dynamic. Soon we turned our backs on the advantages inherent in serving static assets.

[JAMstack](https://jamstack.org?utm_source=devto&utm_medium=jamuary-prerendering-pnh&utm_campaign=devex) is just a label for describing the modern tools and services which have emerged to help deliver website experiences, whether they be dynamic, personlised, large, or small, with the help of JavaScript talking to APIs.

But at its heart, the unsung hero of the stack, is pre-rendering as much as possible and enjoying the many benefits of working with, and serving static assets.
