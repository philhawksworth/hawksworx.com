---
title: Alias your mastodon account to your own domain 
subtitle: Using a Netlify redirect
description: Learn how you can use a Netlify redirect to alias your own domain to your Mastodon account
date: 2022-12-12
tags:
  - Mastodon
  - Fediverse
  - Netlify
  - Indieweb
---

Did you know you could use your own domain for your mastodon username without hosting your own instance? It can be done with a single Netlify redirect rule.


![Mastodon client showing @phil@hawksworx.com resolving to @philhawksworth@indeweb.social](/images/mastodon-aliased-with-webfinger.jpg "Mastodon client showing @phil@hawksworx.com resolving to @philhawksworth@indeweb.social")

<!--more-->

One of the nice things of Mastodon is that you can move from one instance to another if you ever feel the need. Your username is a combination of your handle and the name of your instance. I'm currently on the [indieweb.social](https://indieweb.social) instance and very happy there. But perhaps one day I'll want to move to a different instance. If I do, it would be nice to have control of a consistent username. And to have it associated with the domain name that I control would be lovely.

As it happens this is can be simple to achieve. We can use [webfinger](https://webfinger.net/) to associate an address on a domain we control, with a username on any Mastodon instance.

So instead of sharing my username as `@philhawksworth@indieweb.social`, I could use `@phil@hawksworx.com`

[Phil Nash gave a good explanation](https://philna.sh/blog/2022/11/23/alias-your-mastodon-username-to-your-own-domain-with-jekyll/) of this on his own website. 

As Phil explains:

> Implementing WebFinger requires your domain to respond to a request to `/.well-known/webfinger` with a JSON representation of the associated accounts. If you have a Mastodon account you can check out what your WebFinger JSON looks like by making a request to `https://#{instance}/.well-known/webfinger?resource=acct:#{username}@#{instance}`. 

His solution is nice and simple, but got me thinking that we could simplify even further and achieve this with a single redirect rule, which can be achieved very simply with Netlify, where I happen to host this site.

All we need is to add a rewrite rule. This in the [netlify.toml](https://github.com/philhawksworth/hawksworx.com/blob/master/netlify.toml) will do the trick:

```toml
[[redirects]]
  from = "/.well-known/webfinger"
  to = "https://INSTANCE_NAME/.well-known/webfinger?resource=acct:USER_HANDLE@INSTANCE_NAME"
  status = 200
```

I did that for this site:

```toml
[[redirects]]
  from = "/.well-known/webfinger"
  to = "https://indieweb.social/.well-known/webfinger?resource=acct:philhawksworth@indieweb.social"
  status = 200
```

Now, requests to [hawksworx.com/.well-known/webfinger](https://hawksworx.com/.well-known/webfinger) will return the user data held by indieweb.social, and anyone searching for me by the username @phil@hawksworx.com will find me. If I ever decide to move to a new instance, I can keep the same address by simply updating this one rule.

