---
title: The next generation stack. Is NodeJS ready to go mainstream?
date: 2010-09-10T00:00:00Z
publishdate: 2010-09-10T00:00:00Z
draft: false
description: Speculating on the readiness of o new web development stack based on
  Javascript and NodeJS
tags:
  - javascript
  - nodejs
---

I've been building things with web technologies professionally for a little more than 11 years now. In that time, I've used a variety of technology stacks with varying degrees of success and comfort.  While at university, I was making use of the faculty infrastructure and so was building the simplest of sites on top of Apache on their unix environment. Then as I moved into developing Web applications for a living, I found myself working on Windows NT servers with IIS and ASP. Later on I moved into using the LAMP stack, which after the initial shock to the system, was a revelation and I have never looked back.

<img src="/images/the-next-generation-stack-is-nodejs-ready-to.png" alt="">
<!--more-->



<p>This combination of Linux, Apache, MySQL and PHP is a tried and tested technology stack which is powerful, available and free.  No wonder then, that it has become the first choice of so many web developers.  I've seen a swing in the default technology stack from Windows over to LAMP and have become comfortable in the LAMP world with it's GUI free interfaces, consistent and repeatable operations through SSH and so on.</p>
<p>The stage is set though, I think, for a new stack to emerge.  The amount of work taking place on <a href="http://nodejs.org" title="NodeJS">NodeJS</a>, both on the framework itself and utilising it to build high performance web applications is really impressive.  NodeJS really is causing quite a buzz in the Web development community, not just because it is so performant, but also because it enables Javascript developers to expand into writing the server-side application support that their web apps need, without leaving the comfortable world of Javascript. Very empowering stuff.</p>
<p>Through the work that we are doing with NodeJS, we are adopting a common usage pattern.  NodeJS can provide its own http server, and we tend to have several NodeJS projects being served on a single box.  These can all make use of different versions of NodeJS if necessary (via the handy <a href="http://github.com/visionmedia/ndistro/" title="nDistro">nDistro</a> distribution model) each publishing on its own port. We then proxy requests to those NodeJS servers through either <a href="http://http.apache.org">Apache</a> or <a href="http://nginx.net">Nginx</a>.  This brings me to my point. A stack that I now commonly employ looks less like:</p>
<ul>
    <li>Linux</li>
    <li>Apache</li>
    <li>mySQL</li>
    <li>PHP</li>
</ul>
<p>and more like:</p>
<ul>
    <li>Not Windows</li>
    <li>Nginx</li>
    <li>noSQL</li>
    <li>NodeJs</li>
</ul>
<p>I'm not just trying to be antagonistic by stating "Not Windows". Yes, this is a conceit in order to wangle nnnn or 4N or whatever, but the real point is that all of the pieces of the puzzle work beautifully on various flavours of Linux, Unix and OSX. Windows, less so.  I'm going to be using this '4N' stack for more an more projects now, and as some big players start taking a more serious look at using Node and Nginx, I think that it will become more and more common.</p>



