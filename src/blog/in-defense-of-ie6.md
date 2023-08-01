---
title: In defense of IE6
date: 2009-08-10T00:00:00Z
publishdate: 2009-08-10T00:00:00Z
draft: false
description: Discussing IE6 and how it has been victimised for some things which are
  developers fault, not Microsoft's
footnote: |
  Image credit: <a href="http://www.flickr.com/photos/robotjohnny/3629069606/">John Martz</a>
tags:
  - development
  - discussions
  - observations
---

No really! Read that title again. I'm about to argue against placing so much blame for painful Web development at the door of Internet Explorer 6. I'm not going try and claim that IE6 isn't a huge pain in the arse of all good Web developers. Let's face it, Web developers <a href="http://twitter.com/#search?q=ie6" title="Twitter - search for IE6">love to bitch</a> about it, but I do think that it's time for some accountability.

<img src="/images/defending-ie.jpg" alt=""></figure>
<!--more-->


<p>
    The problem with IE6 is simple. It has poor support for <a href="http://www.webstandards.org/">Web standards</a>. It doesn't always correctly render valid HTML and CSS, and requires nudging, tweaking and finagling in order to display the content in the desired way. Its interpretation of Javascript and interactions with the DOM are also less than perfect. That's a pain, but does it really warrant such <a href="http://iedeathmarch.org/" title="IE Death March">massive hatred</a> from Web developers? As a Web developer, my first instinct would be to answer, 'well, yes'. The cost of developing for IE6 is <a href="http://ejohn.org/blog/the-browsers-of-2009/" title="John Resig -   The Browsers of 2009">extraordinarily high</a>, even when compared to the benefit from its market share, because it is such a horrible and time consuming slog.
</p>
<p>
    But hang on a moment.  The Web is something of a meritocracy. People tend to vote with their feet (or mice) and will abandon the weak experience in favor of the strong. Doesn't this concept stretch to the browser too? Surely if IE6 was really that bad, people would have abandoned it and adopted a better, newer, more well behaved Web browser. Right? Yes and no. Many people have done exactly that. They have upgraded to <a href="http://www.microsoft.com/windows/internet-explorer/ie7/" title="Get Internet Explorer 7">IE7</a>, <a href="http://www.microsoft.com/windows/internet-explorer/default.aspx" title="Internet Explorer 8: Home page">IE8</a>, <a href="http://www.mozilla.com/en-US/firefox" title="Firefox web browser | Faster, more secure, &amp; customizable">Firefox</a>, <a href="http://www.apple.com/safari/" title="Apple - Safari - Introducing Safari 4 - See the web in a whole new way">Safari</a>, <a href="http://www.opera.com/" title="Opera Browser | Faster &amp; safer Internet | Free Download">Opera</a>, <a href="http://www.google.com/chrome" title="Google Chrome - Download a new browser">Chrome</a> or something else. Let's be honest, it isn't hard to find a better browser than IE6 these days. But it isn't quite that simple.   First of all, not everyone who uses the Web really understands what A Web browser is. Many people just know that they click an icon to get to "The Internet" (by which they often mean Google) or directly to their email (by which they mean one of the many Web based email services).  Understanding that they could choose a different application which accesses hese services to perform these tasks is something of a cognitive leap.  Others realised that they could use a better browser and have upgraded the browser on their home computers, but at work they are locked in to using whatever the company IT department dictates. Often, this means IE6. Why is that?  This is my beef. It's not that IE6 is <a href="http://iedeathmarch.org/category/things-younger-than-ie6/" title="Things Younger Than IE6 at IE Death March">out-dated</a> and <a href="http://iedeathmarch.org/category/things-you-cant-do-in-ie6/" title="Things You Can&rsquo;t Do In IE6 at IE Death March">substandard</a> (although it is), but that large organisations have needed to lock users in to using an approved Web browser.
</p>
<p>
    Having worked in a few large organisations, I'm no stranger to that scenario, and it's immensely frustrating to be a user forced to use something so sub-par, and to be required to support it when you are trying to build the Webs next new hotness. So why do they do that?  There can be many reasons, but the largest, and most difficult to dispute is actually of our own creation. We (the Web developers of the world) built expensive, bespoke Web applications for large enterprises and (naturally) ensured that they worked on the most popular browser of the time. Critically though, this was done without thought to how the code might perform in future, standards compliant browsers. In many cases, the code just wasn't future proof.  As a result we have applications and systems which depend being viewed in IE6 in order to function. This represents a huge risk to many large companies who invested so heavily in their development, and have come to depend on the applications. It's little wonder that they force their employees to use IE6.
</p>
<p>
    Remember that this isn't just the fault of IE6. There have been many poor browsers over the years, but thankfully, natural selection has let them disappear and allowed better browsers to take over. IE6 suffers from its own success. That is, it's market penetration.  Combine that with bad habits from developers and you have a browser which despite being left behind by <a href="http://webaim.org/blog/user-agent-string-history/">evolution</a>, is artificially kept alive by large enterprises as if it were on a magical life-support machine.  I imagine that it would rather be left to die in peace.
</p>
<p>
    Surely then, we Web developers have learned our lesson. We're not going let something like that happen again are we? Staggeringly, after all the grumbling and pain, I see evidence that many of us haven't learned our lesson at all. We still write code which detects which browser is being used, before going on to specify behaviour accordingly. What we should be doing is testing for the support of our chosen implementation, then implementing accordingly. Think <a href="http://www.quirksmode.org/js/support.html" title="Javascript - Object detection">object detection</a>, not browser detection. That way, when a browser improves its support, or the user starts using a new browser, the application can enjoy the benefits, rather than just falling over.  I was particularly aggravated to learn how IE8 can be <a href="http://www.microsoft.com/windows/internet-explorer/readiness/developers-new.aspx" title="Internet Explorer 8 Readiness Toolkit">set to render as if it were IE7</a>. With a meta tag to provide "Internet Explorer 7 Compatibility mode".
</p>
<p>
    Why would this feature exist? Microsoft explain that it is so that developers can opt for "backwards compatibility with Internet Explorer 7 JavaScript and layout behavior". In other words, it exists to try and get around the fact that so many developers wrote code to satisfy the quirks of IE7 without a thinking about how their code would fail when the quality of the browser is improved (have better conformance with <a href="http://www.w3.org/" title="World Wide Web Consortium - Web Standards">W3C standards</a> for HTML and CSS).   Microsoft didn't want people to be resistant to upgrading to IE8 because of so many sites failing to render correctly in their shiny, new, more compliant browsers, so they provided a way to force the browser to continue to mis-interpret the code. I'm afraid I have to call "bull-shit" on this practice. I think that all this does is create another wave of Web sites and applications which are likely to get stuck in non-compliance land and require old rendering engines and legacy browsers to be kept alive to server them.
</p>
<p>
    Only by developing for the rising tide of web standards, rather than the various quirks of specific browsers, can we hope to avoid locking our users in to a given browser. It's time to make sure that we don't get into this situation ever again. So next time you are tempted to grumble about IE6, remember that you can help avoid a similar mess in future by developing with standards in mind.
</p>
