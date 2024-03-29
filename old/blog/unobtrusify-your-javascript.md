---
title: Unobtrusify your Javascript
date: 2009-01-05T00:00:00Z
publishdate: 2009-01-05T00:00:00Z
draft: false
description: Looking at an example of unobtrusive Javascript
tags:
- javascript
- jquery
- development
---

Recently <a href="http://jaybyjayfresh.com" title="jaybyjayfresh">Jon Lister</a>, a colleague of mine at <a href="http://www.osmosoft.com">Osmosoft</a> showed me a website made by his friend <a href="http://joshuabradley.co.uk/" title="Joshua Bradley">Joshua Bradley</a>. The site, used some of the Javscript code from <a href="http://tiddlywiki.com" title="TiddlyWiki">TiddlyWiki</a>'s animation engine to create some nice visual effects. I loved the design, but could see some room for improvement in the implementation. I'm a big advocate of <a href="http://en.wikipedia.org/wiki/Unobtrusive_JavaScript" title="Unobtrusive JavaScript">Unobtrusive Javascript</a> and <a href="http://en.wikipedia.org/wiki/Progressive_enhancement" title="Progressive enhancement">Progressive Enhancement</a> and so I set about producing a quick demo of how a similar result could be achieved in the most Web-kind and accessible way available using <a href="http://jquery.com" title="jQuery">jQuery</a> for the behaviors.

<img src="/images/unobtrusive.jpg" alt="">
<!--more-->


<p>
    The result has been published as <a href="http://unobtrusify.hawksworx.com" title="Unobtrusify - Unobtrusive Javascript for Progressive Enhancement">unobtrusify.hawksworx.com</a>.
</p>

<h3>The aim.</h3>
<ul>
	<li>Create a similar effect to that on Josh's site, but make sure that the page is readable without Javascript.</li>
	<li>Use images to make the headings look snazzy, but make sure that they are not required in order for the content to make sense.</li>
	<li>Use only unobtrusive Javascript and keep the HTML as clean as possible.</li>
	<li>Reduce the number of http requests required to as few as possible in order to improve performance.</li>
</ul>

<h4>The approach.</h4>
<p>
    First of all, I wrote the text for the page. I chose a simple statement and tried to structure it such that it would make sense regardless of which sections were expanded.
</p>
<p>
    Then I used the simplest HTML markup I could to logically represent the content with its various headings.  <a href="http://unobtrusify.hawksworx.com/justhtml.html" title="Unobtrusify - Unobtrusive Javascript for Progressive Enhancement (HTML only)">This is how the page would look</a> to text-only browsers search engines, web-crawlers and screen-readers.
</p>
<p>
    I then used a well-known CSS technique to replace the text in the headings with images. This would ensure that the text would remain for non-human consumers of the site, while the images would be presented to those able to appreciate them.  The technique is simple.  You prevent the browser from scrolling the content of your element with <code>overflow:hidden</code> and then scoot the text out of the way with <code>text-indent</code>. Now that the way is clear, you can display an image with <code>background-image</code>.  Be sure to specify the dimensions of your desired image as the <code>background-image</code> property will not resize your element to the correct size automatically. The CSS would look something like this:
</p>

```
#myHeading {
    text-indent: -9999px;
    overflow: hidden;
    background-image: url(myImage.gif);
    width: 380px;
    height: 123px;
}
```

<p>
    My content had 6 headings to render in this way. I also wanted to have a mouseover effect to give some affordance for the click-ability of the headings so this would require another 6 images. Rather than having 12 images to download (which would require 12 separate HTTP requests), I combined all of these images into a single image.  This would have a number of effects. Firstly, combining the 12 images into one meant that the total download would be a bit smaller due to the way that the file was compressed. (A tiny saving, but every little helps.)  Secondly, there is an overhead with making HTTP requests so when it comes to performance, the fewer the better. This method cuts out 11 HTTP requests. Score!  Thirdly, as the browser uses the same image for the original heading images and their associated mouseover images, there is no need to preload the alternate images to avoid that nasty pause when mousing over. The image is already downloaded and ready to display. A nice bonus.
</p>
<p>
    In order to use this 'image sprite' for each and every heading, I just needed to specify the <code>background-position </code>for each one. Some attributes would be common to each one so I could save some code like this:
</p>

```
h1 {
    text-indent: -9999px;
    overflow: hidden;
    background-image: url(images/unobtrusive_sprite.gif);
    width: 380px;
}

h1#uj {
        background-position: 0 0;
        height: 123px;
}

h1#cmh {
        background-position: 0 -123px;
        height: 150px;
}
...
```

<p>
    At this point our <a href="http://unobtrusify.hawksworx.com/withcss.html" title="Unobtrusify - Unobtrusive Javascript for Progressive Enhancement (with CSS)">page looks like this</a>.  This is exactly how we want things to appear for those without Javascript. There is no ability to toggle the display of the various sections, the content is shown in full, and there is no mouseover behavior on the headings to suggest that they can be clicked (since they cannot).  This is the essence of <a href="http://en.wikipedia.org/wiki/Progressive_enhancement" title="Progressive enhancement">Progressive Enhancement</a>.  We have a perfectly serviceable web page (albeit a simple one) which we can now enhance for those with Javascript enabled.
</p>
<p>
    Using jQuery to easily and unobtrusively add behavior to elements on the page, we can now hide all of the expanded sections. We do this with a simple jQuery statement like this:
</p>

```
$('#wrapper > div').hide();
```


<p>
    This hides all of the div elements which are a direct descendent of the element with an ID of wrapper. (my chosen HTML structure).
</p>
<p>
    Headings are not by default clickable so we can add some behavior to suggest that the clicking a heading will have a effect by changing the cursor for them like this:
</p>
```
$('#wrapper h1').addClass('clickable');
```


<p>
    A CSS class of 'clickable' specifies the cursor with <code>cursor: pointer;</code>
</p>
<p>
    We also use jQuery to show the hover image by just repositioning the background image when we hover with the mouse and also to show the hidden div element when we click a heading. Remember, none of this will happen unless Javascript is available.
</p>

<figure><img alt="" src="/images/unobtrusifycom.jpg" /> </figure>

<p>
    I also use an additional trick to prevent a flash of unstyled content or FOUC (gratifyingly pronounced 'FOOOOOOK' by <a href="http://hicksdesign.co.uk/" title="hicksdesign: design for print and new-fangled media">John Hicks</a>) while the Javascript is being downloaded. This trick is <a href="http://www.learningjquery.com/2008/10/1-awesome-way-to-avoid-the-not-so-excellent-flash-of-amazing-unstyled-content" title="1 (Awesome) Way To Avoid the (Not So Excellent) Flash of (Amazing) Unstyled Content &raquo; Learning jQuery - Tips, Techniques, Tutorials">very well explained</a> by <a href="http://www.englishrules.com/" title="English Rules">Karl Swedberg</a> on the excellent <a href="http://www.learningjquery.com/" title="Learning jQuery - Tips, Techniques, Tutorials">learningjquery.com</a> site.
</p>
<p>
    For a better picture of exactly what is going on, why not swing by <a href="http://unobtrusify.hawksworx.com" title="Unobtrusify - Unobtrusive Javascript for Progressive Enhancement">unobtrusify.hawksworx.com</a> and exercise your right as a citizen of the Web to view the source. Hitting View Source is so often the best way to learn how things are done. Go on! Go and get your hands dirty!
</p>
