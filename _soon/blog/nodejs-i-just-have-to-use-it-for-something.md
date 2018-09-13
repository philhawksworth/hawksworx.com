---
title: Nodejs I just have to use it for something
date: 2010-02-15T00:00:00Z
publishdate: 2010-02-15T00:00:00Z
draft: false
description: Playing with NodeJS and Javascript for real-time fun and games.
tags:
  - javascript
  - mashups
  - jquery
  - nodejs
---

A little while ago, inspired by <a href="http://simonwillison.net/2009/Nov/23/node/">Simon Willison</a>'s demo of <a href="http://nodesjs.org">Nodejs</a> at the <a href="http://2009.full-frontal.org/">FullFrontal</a> conference, I felt the urge to make something, anything, using Nodejs. <a href="http://nodesjs.org">Nodejs</a> gives lightening fast, event driven IO with Javascript running server-side in the rather nippy <a href="http://code.google.com/p/v8/">V8</a> Javascript engine. Until <a href="http://nodesjs.org">Nodejs</a>, I hadn't seen much need to bring Javascript to the server other than for testing and as a bit of a novelty. <a href="http://nodesjs.org">Nodejs</a> changed all of that.

<img src="/images/nodejs.png" alt="">
<!--more-->



<p>
    Built by <a href="http://tinyclouds.org/">Ryah Dahl</a> with a strict philosophy that none of its procedures should ever perform a blocking operation, it has a single threaded architecture and relies heavily on the use of a single event loop. Anyone with a good knowledge of Javascript or even just a familiarity with <a href="http://jquery.com">jQuery</a> will be familiar with the pattern of event handlers, callbacks and closures needed to build some really rather powerful things, quickly and easily with <a href="http://nodesjs.org">Nodejs</a>. For my part, I just wanted to make something to explore the ease in which <a href="http://nodesjs.org">Nodejs</a> could support comet-style long polling for some real-time, collaborative task. The Web is already getting flooded with examples of <a href="http://chat.nodejs.org/">chat rooms</a> and IRC servers built with <a href="http://nodesjs.org">Nodejs</a>, but I really wanted to make something that felt like a real web application, not an example.
</p>
<p>
    To that end, I resurrected an old idea which I first built circa 1999 for randomly choosing someone from a list to make the tea. Not earth-shattering, but a bit of fun and simple enough for me to see through to completion. For this incarnation, dubbed <a href="http://teafr.com">Teafr.com</a>, I piggybacked on the lists feature of <a href="http://twitter.com/philhawksworth/tea-buddies">Twitter</a> to allow people to create and manage their lists of potential tea-makers somewhere they are already comfortable. <a href="http://teafr.com">My app</a> would allow a user to recall a list of their choosing and then perform a lottery, selecting a winner (or loser) from the list at random. To add a little suspense (in the loosest possible sense) I added a basic animation which gradually got slower until the winner was revealed.
</p>
<figure><img src="/images/teafr-tea-rotas-from-twitter-lists.jpg" /></figure>
<p>
    I captured a couple of <a href="http://www.vimeo.com/8144420">videos</a> showing teafr.com doing its stuff, <a href="http://www.vimeo.com/8457609">one of them</a> on an iPhone. The fun part of this for me was in allowing this lottery and the animation to be visible to everyone viewing the same list from wherever they are. <a href="http://nodesjs.org">Nodejs</a> makes it trivially simple to handle long-lived http requests so that all clients could listen out for the initiation of a new lottery event. Since this is all just lightweight HTTP, HTML, CSS and Javascript, it also runs pretty nicely on both my iPhone and Palm Pre.
</p>
<p>
    It is rather satisfying to stand next to someone who is viewing the site on a desktop machine, and then start their screen animating with a quick tap on your handset. Cheap thrills, I know. It seems to me though, that the cheapness of the thrills is what is so exciting. I'm no rocket scientist, and I managed to create this entire application, complete with real-time online views in a couple of evenings work. The short hop and low cognitive friction for a Javascript developer to be able to build these kind of things from end to end is incredibly liberating. I'm bursting at the seams with ideas for things I want to build, and am now capable of building with a new, powerful and yet familiar tool set. The only detail which kept my new toy from the masses was having a suitable place to host it.
</p>
<p>
    I've been using <a href="http://www.dreamhost.com/r.cgi?381199">Dreamhost</a> for a while now and have to say that I'm pretty happy with them, but even with the great level of control and access to your server that they give you, you need a little bit more control to compile and run <a href="http://nodesjs.org">Nodejs</a>. The easiest and cheapest way that I found to host <a href="http://nodesjs.org">Nodejs</a> powered site was with a dedicated virtual server. There is no shortage of providers in this space and as Web developers get more sophisticated, the use of this kind of solution is getting more commonplace. I opted for <a href="http://www.linode.com/?r=afc3f1becba08eb0ab33f62818cc90f396979563">Linode</a> which is working out rather nicely for me, but equally, I could have plumped for a similar offering from <a href="http://www.slicehost.com/">Slicehost</a> or <a href="http://aws.amazon.com/">Amazon Web Services</a>.
</p>
<p>
    I'll soon migrate all of my sites onto the single Linux instance that they host for me. For now though, I need to resist the temptation to spend all of my spare time (ha!) noodling away with <a href="http://nodesjs.org">Nodejs</a>, <a href="http://www.mongodb.org">MongoDB</a>, <a href="http://jquery.com">jQuery</a> and various other fun things which 'speak Javascript' that smart people on the Web keep on creating and selflessly sharing with the world for free.
</p>




