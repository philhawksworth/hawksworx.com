---
title: Simplicity and performance with static files
date: 2012-11-29T00:00:00Z
publishdate: 2012-11-29T00:00:00Z
draft: false
description: Seeing fantastic results from simple architecture and avoiding CMS complexity
  on the Obama fund-raising site.
footnote: |
  Just go and read <a href="http://kylerush.net/blog/meet-the-obama-campaigns-250-million-fundraising-platform/">Kyle Rush's blog post</a>
tags:
  - development
  - observations
  - jamstack

---

 I've been beating a drum recently, and it has a lot to do with pursuing simplicity in technical architectures. I want to allow for optimizations where it matter most and avoid the kind of technical and functional bloat you can get through using some CMS platforms. So I was delighted when a colleague recently shared a link to <a href="http://kylerush.net/blog/meet-the-obama-campaigns-250-million-fundraising-platform/">Kyle Rush's post</a> which demonstrates some huge value in this approach on the Obama fund-rising campaign site.

<img src="/images/contribute_obama.jpeg" alt=""></figure>
<!--more-->


<p>
    Kyle's article is well worth a read. In it, he talks at high level about some of the principles and approaches that were used to ensure high performance on the <a href="https://contribute.barackobama.com">contribute.barackobama.com</a> site.
</p>
<p>
    Many of the techniques and technical architecture decisions map very closely to those that I have been championing recently, and I talked a little about this <a href="http://hawksworx.com/blog/i-can-smell-your-cms-a-talk-at-fronteers/">at Fronteers in Amsterdam</a> when I spoke about the complexity overhead from some Content Management Systems.
</p>
<p>Of particular interest to me, Kyle mentions some great stuff like:</p>
<ul>
    <li>Generating a static site with <a href="http://jekyllrb.com/">Jekyll</a></li>
    <li>Using <a href="http://github.com">Github</a> for version control</li>
    <li>Abstracting the payment gateway off to a RESTful API and calling it from the client</li>
    <li>Performing A/B testing with <a href="https://www.optimizely.com/">Optimizely</a> and iterating rapidly</li>
</ul>


<p>So much of this rings true to me, but it is great to read of the very tangible and financial benefits of ensuring that the site is well optimized and front-end development is not compromised by (what I call) CMS Stink.</p>

<p>A couple of quotes from Kyle that gave me real, 'Amen brother!' moments:</p>

<blockquote>
    <p>
        By using Jekyll we managed to avoid the complexity that comes with most CMS (databases, server configuration) and instead focus on things like optimizing the UI and providing a better user experience.
    </p>
</blockquote>

<p>and</p>

<blockquote>
    <p>
        There is a lot to be said about simplicity.
    </p>
</blockquote>

<p>Can I get a 'hell yeah!'</p>
