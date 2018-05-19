---
title: Value in a happy hack day
date: 2011-09-19T00:00:00Z
publishdate: 2011-09-19T00:00:00Z
draft: false
description: Looking at what was learned from a recent development hack day. Where
  is the value?
footnote: |
  More photos from the day <a href="http://www.flickr.com/photos/philhawksworth/tags/scampcat/">on Flickr</a>
tags:
- projects
- development
- theteam
---

A few weeks ago at <a href="http://theteam.com">The Team</a>, inspired by the <a href="http://www.atlassian.com/" title="Atlassian - Software Development Tools and Collaboration Software">Atlassian</a> model of <a href="http://blogs.atlassian.com/news/2010/11/fedex_day_in_the_wild.html" title="FedEx Day in the wild - Atlassian News">FedEx days</a> which we have have successfully employed before, we managed to make some time for the development team to spend the day away from the office to work on something for themselves. No clients and no managers, just our own requirements and some time to work in new ways together. It yielded some valuable results.

<img src="/images/scamp-python.jpg" alt="">
<!--more-->


<p>
    The notion of creating <i>value</i> from activities like this is not immediately obvious to all, but there is value to be found in many different places when working together on a project like this.  I'll try to mention a few of them here as a kind of a primer for anyone who is looking to arrange a similar day of their own. That might be useful when you need to convince the folks at work who need to look carefully at things like <i>utilisation</i>, <i>opportunity cost</i> and <i>project resourcing</i>.
</p>
<p>
    When arguing for the value of this kind of activity, it can be difficult to protect the time needed to make it really useful and valuable. I'd suggest that this is actually a vital activity in helping a development team to remain fulfilled, motivated, efficient and sharp.
</p>

<p>
    This was a modest hack day. First of all it was just a single day, while I would have preferred to have it last for two. We had just the time that we could stay awake and productive for one day to plan, design, develop and deploy our project.  Also, while I would have liked to involve a wider team in order to profit from a range of disciplines and specialisms, it was just our small development team who could be spared for one precious day. Nieman Journalism Lab recently wrote about the benefits of similar hack days at NPR which involve wider disciplines and dubbed them <a href="http://www.niemanlab.org/2011/08/npr-tries-something-new-a-day-to-let-managers-step-away-and-developers-play/" title="NPR Serendipity days">Serendipity Days</a>. I rather like that.
</p>
<p>
    We cheated a little. We had something in mind that we wanted to build. A simple need that we felt could be basically fulfilled with modest amount of development.  That idea, we labelled <a href="http://scampcat.com" title="Sampcat. Annotate and share your scamps and wireframes">Scamp Cat</a>. So named as a bit of a hat-tip to <a href="http://spritecow.com">Sprite Cow</a>, a little side project by <a href="http://jakearchibald.com">Jake Archibald</a> which we each had some fleeting involvement in, and also just because we needed a way to refer to this <i>thing</i>, and Scamp Cat made us giggle. We are easily amused.  Having something in mind to build, and having the opportunity to talk to potential users of this application ahead of time was a great way to get started quickly on the day. We already had an idea of the high-level requirements, and had identified a likely 'customer'.
</p>
<p>
    <b>Having a customer</b> was my first tactic for justifying the day to my boss and to my Financial Director.  We would be making something that has an application right here at work on a regular basis. Yes, there are tools around that provide a similar service, but none quite satisfied the needs of are colleagues in the EA and Design departments. Building this thing would be of <i>value</i> to us right here at work.
</p>
<p>
    When I presented what we built back to my elders and betters, I was eager to point out that Scamp Cat, the most tangible product of the day, was perhaps the least valuable output. More important to me, are the various processes and conventions that we used during the day, and the insights into some new technologies and conventions we gained. For instance, during the day, we made use of <a href="http://nvie.com/posts/a-successful-git-branching-model/" title="A successful Git branching model &raquo; nvie.com">Git Flow</a>, a code versioning model in Git. This served us tremendously well and resulted in very few code conflicts and high confidence in our small but active codebase over the day. We now use Git Flow on all of our active client projects. Win!
</p>
<p>
    We also started tuning our approach to provisioning our infrastructure using <a href="http://puppetlabs.com/" title="Puppet Labs: The Leading Open Source Data Center Automation Solution">Puppet</a> and normalising on virtualised development environments with <a href="http://vagrantup.com/" title="Vagrant">Vagrant</a>. More Win!  In addition there were a number of small but useful pieces of reusable code which came from the project. These got rolled into our set of code snippets and plugins which form part of our project bootstrapping suite.  Winning again!
</p>
<p>
    My favourite part of the day was the fantastic sense of team spirit which was evident. We set ourselves a tough challenge, and together we knuckled down and met that challenge. Creating an opportunity for a team to pull together away from outside influences and commitments develops some great trust and mutual respect, which is perhaps the most valuable output of all.
</p>
<p>
    But for those wanting to see an actual <i>thing</i> as an output from our day, <a href="http://scampcat.com" title="Sampcat. Annotate and share your scamps and wireframes">Scamp Cat</a> has found a little home on the Web, and is functional enough to use. Just. It can be used to upload, or reference, an image and add annotations to that image. The resulting annotated "scamp" can be freely shared via a public URL. There are similar products out there already, but none quite ht the spot for us.
</p>
<p>
    We've already got some great feedback and are planning several iterations to evolve the functionality.
</p>
