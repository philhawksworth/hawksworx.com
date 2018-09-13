---
title: Mashing up flickr in the client with jQuery
date: 2009-02-15T00:00:00Z
publishdate: 2009-02-15T00:00:00Z
draft: false
description: Creating an animated slideshow with flickr and jQuery. No Flash required.
tags:
- javascript
- development
- jquery
- mashups
---

Recently I saw Tim Stevens <a href="http://twitter.com/san1t1/status/1193906661">post on Twitter</a> about a slide show he had built using his <a href="http://www.liveloom.com/">Liveloom</a> application. His slide show grabs some photos from Flickr tagged with 'Osmosoft' and then renders them with all manner of visual effects using Flex.  While the visual effects available via Tim's app are impressive, I'm a big advocate of open web standards and enjoy making things from HTML and Javascript, rather than using tools like Flex.

<img src="/images/polaroiderizer-a-slideshow-from-your-flickr-tags.jpg" alt=""></figure>

<!--more-->

<p>
    My first encounter with the slide show made by Liveloom was on an iPhone where it couldn't run. The temptation to cobble together a simple Flickr mashup which could operate in any Javascript capable browser was too much to resist.  Let's not pretend, that there aren't already slide show mashups galore, or that I was going to be able to rival some of the advanced visual effects that Liveloom can offer, but making a simple, attractive slide show which could run on lots of devices seemed like a fun and valuable exercise.  I was also keen to see just how quickly and easily I could produce this using jQuery.  I'm forever going on about how good jQuery is at manipulating the DOM, so this seemed like a good chance to demonstrate that.  I shared the result my efforts as the 'Poloaroiderizer' and after getting some great feedback, promoted it to its very own domain.
</p>
<p>
    Check it out over at <a href="http://polaroiderizer.com">polaroiderizer.com</a> As it turns out, the task was incredibly simple and took just a few hours one evening. The interface is rendered with HTML and CSS. As such, it will work in any modern browser.  I used jQuery to request <a href="http://ajaxian.com/archives/jsonp-json-with-padding">JSONP</a> from the Flickr API. JSPONP gets you around the cross domain scripting restrictions and delivers JSON to the browser which is a snap to parse and render.  There is no logic on the server. All of my code is run in the browser.  The animations are provided by CSS and DOM manipulation, made simple by <a href="http://docs.jquery.com/Effects/animate">jQuery's animation functions</a>.  The display needs Javascript to render, so without it Polaroiderizer is a bit toothless, but that doesn't mean we can forget about those without Javascript. If you submit a flickr tag while you don't have Javascript capabilities, the form will submit your tag to the standard flickr interface and you'll find yourself at the flickr search results page.  This is another example of progressive enhancement. A topic close to my heart that I tried to demonstrate recently on <a href="http://unobtrusify.com">Unobtrusify</a>.
</p>
<p>
    Another little bonus of building this slide show app this way, is that it is super-easy to share the results. I made sure that the tag entered was echoed into the address of the page as the page fragment identifier. Manipulating and interrogating the frag id can be useful in Ajax applications as my colleague <a href="http://softwareas.com/fun-with-fragment-identifiers">Michael Mahemoff explained recently</a>.  When the page loads, it looks for a tag stored in the frag id as its starting point. That means you can bookmark slide shows and share them as easily as email a URI. Here are a few:
</p>
<ul>
    <li><a href="http://polaroiderizer.com/#PhilHawksworth">http://polaroiderizer.com/#PhilHawksworth</a></li>
    <li><a href="http://polaroiderizer.com/#TheWebIsAgreement">http://polaroiderizer.com/#TheWebIsAgreement</a></li>
    <li><a href="http://polaroiderizer.com/#TED2009">http://polaroiderizer.com/#TED2009</a></li>
</ul>


