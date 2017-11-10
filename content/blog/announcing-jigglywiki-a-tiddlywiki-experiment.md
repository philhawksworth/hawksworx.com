---
title: Announcing JigglyWiki. A TiddlyWiki experiment with jQuery
date: 2008-08-27T00:00:00Z
publishdate: 2008-08-27T00:00:00Z
draft: false
description: Jigglywiki. An experimental version of Tiddlywiki based on jQuery
pageclass: blog
tags:
  - javascript
  - jquery
  - tiddlywiki
---

Once upon a time I was resistant to the idea of Javascript libraries. That was due to a couple of things. Firstly, I was comfortable with writing the Javascript for my projects myself and didn't like the idea of relying on someone else's code which I couldn't easily inspect. Secondly, at the time there weren't really any libraries. Then there were a few, but they were all, well, to be blunt, a bit pants.

<img src="/images/jigglywiki.jpg" alt="">
<!--more-->


<p>
    That all changed for me when <a href="http://jquery.com">jQuery</a> came along. <a href="http://jquery.com">jQuery</a> is a lightweight, elegant but powerful Javascript library originally developed by <a href="http://ejohn.org">John Resig</a>. <a href="http://jquery.com">jQuery</a> provides fast and efficient interrogation and manipulation of the DOM and borrows conventions from CSS and <a>XPATH</a> to provide concise and expressive queries to be constructed. It's worth checking out if you haven't already.  <a href="http://tiddlyWiki.com">TiddlyWiki</a> has been around since before the existence of Javascript libraries and long before <a href="http://jquery.com">jQuery</a> came along, so it was never developed in a way to take advantage of such things. It could easily be argued that TiddlyWiki is itself, a Javascript library since it provides helper functions for many common Javascript tasks.  The extent of this library though, is a little limited since it has evolved to serve a single purpose: To drive TiddlyWiki.
</p>
<p>
    Recently I have been longing to experiment with replacing a lot of the TiddlyWiki core with code built to take advantage of <a href="http://jquery.com">jQuery</a>. The idea of developing TiddlyWiki with a Javascript library turns out not to be a new one as similar discussions have occurred in the past and different libraries considered.  I then began to imagine other benefits from reengineering TiddlyWiki from first principles taking advantage of all of the lessons learned over its lifetime.   It became too hard to resist.  Over the course of 2 reasonably long train journeys, I set about building my own version of TiddlyWiki with <a href="http://jquery.com">jQuery</a> at its core. I settled on a number of objectives:
</p>
<ol>
    <li>To use <a href="http://jquery.com">jQuery</a> to provide the core TiddlyWiki functions.</li>
    <li>To make the code modular such that the core could be very small and additional functionality could easily be included via bespoke <a href="http://jquery.com">jQuery</a> plugins.</li>
    <li>To use <a href="http://en.wikipedia.org/wiki/Unobtrusive_JavaScript">unobtrusive Javascript</a></li>
    <li>For the document to be sensibly parsed by screen readers and web crawlers.</li>
    <li>To allow navigation of the document even without Javascript</li>
    <li>To use HTML and CSS which is valid according to the <a href="http://www.w3.org/">W3C</a></li>
    <li>To conform to the TiddlyWiki naming convention and adopt a suitably ridiculous working title for the project</li>
</ol>
<p>
    An important thing to note, is that I am not attempting to replace TiddlyWiki. I see JigglyWiki as an experimental prototype to explore ways that TiddlyWiki 3.0 might evolve.  I also hoped to keep this quiet for long enough to allow it to progress to the point that I was happy to reveal a working prototype for general discussion. That proved tricky thanks to my own excitement and the way that gossip spreads around the web and discussion groups!
</p>
<p>
    In its current state, it provides some of the more basic TiddlyWiki functions in terms of displaying tiddlers and allowing editing. It also demonstrates how it might elegantly degrade when CSS or Javascript are not available.  Below are a few different build which demonstrate those scenarios.
</p>
<ol>
    <li><a href="http://static.hawksworx.com/playground/jigglywiki/html_only.html">Just the HTML</a>. I've not included CSS or any of the Javascript here. The data store is visible and you can navigate the document via the tiddler links.</li>
    <li><a href="http://static.hawksworx.com/playground/jigglywiki/html_css.html">The HTML and CSS</a>. This will function just as the version above, only it will look a bit prettier. In environments where Javascript is not available or is slow to be initialised, this is how things look until the Javascript kicks in.</li>
    <li><a href="http://static.hawksworx.com/playground/jigglywiki/html_css_js.html">HTML, CSS and Javascript</a>. Now the data store is hidden and the default content is displayed with additional, Javascript dependent functionality included.</li>
</ol>
<p>
    I'd love to get comments on this approach. I'd also be very interested to get advise on TiddlyWiki issues that we might be able to avoid if the opportunity to develop this into TiddlyWiki 3.0 really did come about. I'm less interested in bug reports though. This is a very early proof of concept which will contain many bugs and glitches.  You can get to the source of this project via the <a href="http://svn.tiddlywiki.org/Trunk/contributors/PhilHawksworth/experimental/jigglywiki/proto/">TiddlyWiki subversion repository</a> More to come!
</p>
