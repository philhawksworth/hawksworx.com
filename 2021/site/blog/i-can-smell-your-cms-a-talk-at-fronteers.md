---
title: I can smell your CMS at Fronteers 2012
date: 2012-10-09T00:00:00Z
publishdate: 2012-10-09T00:00:00Z
draft: false
description: A summary of my talk on CMS Stink at Fronteers 2012 and a chance to answer
  the questions submitted via Twitter during the event.
footnote: |
  Photo credit: <a href="http://www.flickr.com/photos/seddy/8071135621/">Robert Sedovšek</a>
tags:
  - conferences
---

This year, I was lucky enough to be invited to speak at <a href="http://fronteers.nl/congres/2012">Fronteers</a>, the very well regarded web development conference in Amsterdam.  I was particular excited by this since the event had been high on my wishlist to attend for the last few years.  I spoke about the negative impact that content management systems regularly have on the front-end development effort, and how we might try to combat this.

<img src="/images/fronteers-theatre.jpg" alt="">
<!--more-->


<p>
    The format this year adopted a small but very positive change. The two days of the conference were MC'd by Christian Heilmann of Mozilla and Yahoo! fame, and rather than accepting questions from the floor at the end of each session, Christian interviewed the speaker and presented questions from the audience via Twitter. This worked beautifully, and he should be praised for doing a wonderful job of getting the best out of the speakers.
</p>
<p>
    Sadly, not all of the questions could be addressed in the available time, but Christian captured the questions and has presented them via a nice <a href="http://christianheilmann.com/2012/10/08/fronteers12-qa-results-quick-reviews-and-impressions-from-the-stage/">summary of the sessions on his blog</a>.  Below you can find not only the slides from my session, but also the answers to the questions that we didn't manage to get to on the day.
</p>

<h3>I Can Smell Your CMS : synopsis</h3>
<p>
    The word is getting out. Great web site experiences require careful development and crafty execution in the front end. Squeezing every drop of performance out of your user's browser is tough, but Steve Souders and friends have mobilized an army, and we are all having a bloody good go.
</p>
<p>
    But there is a common threat to doing great work in the front-end. It lurks in the back-end and clients love it. It's the content management system, and more often than not, it stinks.
</p>

<p>
    We'll look at examples of the damaging traces CMSs leave behind in the front-end and at how we might work to reduce them. We'll find ways to fight for what matters in a CMS, and ways to avoid the smell of your CMS wafting over to the user and sacrificing the craftsmanship of good front-end engineering.
</p>
<h3>Slides</h3>
    <script async class="speakerdeck-embed" data-slide="3" data-id="506eee244f4e120002096d94" data-ratio="1.3333333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<h3>Video</h3>



<div class='embed-container'><iframe src='https://player.vimeo.com/video/53317254' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>
<h3>Questions and answers</h3>

<blockquote>
    <p>
        Alexander Griffioen ‏<a href="http://twitter.com/oscaralexander">@oscaralexander</a>
    </p>
    <p>
        What degree of influence does the client have in the CMS choice? <a href="http://twitter.com/philhawksworth">@philhawksworth</a> #fqa #fron teers12
    </p>
</blockquote>
<div class="answer">
    <p>
        This varies a lot in practice, Alexander. But ultimately the client needs to be totally on board with the decisions being made about this critical technology choice. I have found that the levels of expertise, opinions and influence vary dramatically from one client to another and some arrive with preconceptions about what CMS they want to use. In many cases this can be something which is already decided or in place in the client's infrastructure so you have very little chance to change that. Others are more willing to enter a discussion and allow you, as the domain expert, to provide some carefully considered recommendations.
    </p>
</div>
<blockquote>
    <p>
        Robbert Broersma ‏<a href="http://twitter.com/RobbertAtWork">@RobbertAtWork</a>
    </p>
    <p>
        #fronteers12 I suppose <a href="http://twitter.com/"></a><a href="http://twitter.com/philhawksworth">@philhawksworth</a> means free-form editing where he says WYSIWYG. #fqa
    </p>
</blockquote>
<div class="answer">
<p>
    Good point, Robbert. In fact I mean both. Each type of input has different implications in terms of introducing CMS Stink, but both can be problematic. WYSIWYG tools which allow the user to edit the content while seeing the formatted output of their work are particularly bad as they introduce all manor of inefficient code artifacts without the user being aware of this.As they often include wide formatting options they also allow the content editor to deviate from the design which can rapidly degrade the designed experience of the site.
</p>
</div>

<blockquote>
    <p>
        Martijn Saly ‏<a href="http://twitter.com/MartijnSaly">@MartijnSaly</a>
    </p>
    <p>
        <a href="http://twitter.com/codepo8">@codepo8</a> The viewstate actually still exists and it cannot be turned off completely. You can only make it smaller. #fqa #fronteers12
    </p>
</blockquote>
<div class="answer">
<p>
    I wasn't aware of that, Martijn. I gather that this is something that is improving in .net but not all CMS platforms built with .net will adopt the improved pattern right, away so you may still find this kind of smelly code finding its way into your work.
</p>
</div>

<blockquote>
   <p>
        MikeVierwind ‏<a href="http://twitter.com/mikevierwind">@mikevierwind</a>
    </p>
    <p>
        #fqa #fronteers12 The new edition of Episerver is better!! You have no big form element!! They inline js is gone etc. A lot better!
    </p>
</blockquote>
<div class="answer">
<p>
    Wonderful! They should update the implementation on their own site to make use of that.  Enterprise platforms that I have encountered often bring a high level of technical debt or friction to migrating. I'm not sure what effort is required for EPiServer to upgrade their own site to use their own latest best practices, but I'd like to see that happen.
</p>
</div>

<blockquote>
    <p>
        Darius Kruythoff ‏<a href="http://twitter.com/dkruythoff">@dkruythoff</a>
    </p>
    <p>
        Are there any true CMS solutions out there that manage content and don't mess with design at all? #fronteers12 #fqa
    </p>
</blockquote>
<blockquote>
    <p>
        Тихий Бес ‏<a href="http://twitter.com/SilentImp">@SilentImp</a>
    </p>
    <p>
        <a href="http://twitter.com/"></a><a href="http://twitter.com/dkruythoff">@dkruythoff</a> is it possible at all? Content is tied with markup. Markup tied to representation of data — design. #Fronteers12 #fqa
    </p>
</blockquote>
<div class="answer">
    <p>
    Darius, I'm sure that there must be several, but there is only one I know of at the moment. <a href="http://grabaperch.com">Perch</a> sets itself up to be a "tiny CMS" but I think that it has a lovely and powerful approach. You begin by creating your site as static templates and then declare areas in those templates which should be dynamic and managed by an admin application. This action builds an appropriate administration area for you while leaving the output untainted by CMS Stink. This allows you to have complete control over the front-end development and enhance the site with various types managed content.
</p>
<p>
    There will be limits to the projects where this is appropriate, but I'd argue that it is a viable solution more often than you might imagine.
</p>
<p>
    SilentImp, Ideally it is good to separate content from style from behavior as we have learned with HTML, CSS and JavaScript respectively. You have a good point though, that with the ability to author or generate HTML, content editors can indeed influence the style of the content.  This should really be limited to using defined styles though if we encourage them to adhere to structured markup rater than giving free reign over all.
</p>
<p>
    For total separation of content from style, then systems that allow only plain text input into defined content areas might provide an answer, but I find that those can be just too restrictive at times and have very particular useful scenarios.
</p>
</div>

<blockquote>
    <p>
        LBiNetherlands ‏<a href="http://twitter.com/LBiNetherlands">@LBiNetherlands</a>
    </p>
    <p>
        WYSIWYG is danger, but customers demand it <a href="http://twitter.com/"></a>@Fronteers #fronteers12 #fqa
    </p>
</blockquote>
<blockquote>
    <p>
        Wilfred Nas ‏<a href="http://twitter.com/wnas">@wnas</a>
    </p>
    <p>
        <a href="http://twitter.com/jashaj">@jashaj</a>WYSIWYG is danger, but customers demand it #fronteers12 #smellcms #fqa
    </p>
</blockquote>
<blockquote>
    <p>
        Rebecca Murphey ‏<a href="http://twitter.com/rmurphey">@rmurphey</a>
    </p>
    <p>
        #fqa <a href="http://twitter.com/philhawksworth">@philhawksworth</a> how do you convince clients they don’t really want a wysiwyg editor? i’ve had this argument too many times :/
    </p>
</blockquote>
<div class="answer">
    <p>
    Yes indeed. I think that one of our responsibilities in agency work, is to determine when WYSIWYG is beneficial and when it is detrimental. Projects are seldom the same and there are some cases when we can argue the point better than others. I believe that we can use examples of the effects of the use of WYSIWYG editors over time with case studies and examples to try to make the point. Presenting effective alternatives and demonstrating the different potential workflows and results can be helpful.
</p>
<p>
    I have found it very hard to persuade clients who demand WYSIWYG to reconsider. Only in a few cases have I been successful. I'm hoping that the community as a whole can help to compile case studies and communicate the alternatives.
</p>
<p>
    Halp!
</p></div>

<blockquote>
    <p>
        Norbert de Langen ‏<a href="http://twitter.com/NorbertdeLangen">@NorbertdeLangen</a>
    </p>
    <p>
        #fronteers12 #fqa <a href="http://twitter.com/codepo8">@codepo8</a> any other content editing tips besides markdown? Consider it WILL be the intern editing the site?
    </p>
</blockquote>
<div class="answer">
    <p>
    Norbert, I think that Markdown is well within reach of most people who you would be comfortable being responsible editing content on your site. Accompanying it with a simple guide to content strategy, style and markup syntax can be a huge help.
</p>
<p>
    There are many wiki markups available out there, but I like the way that Markdown is so well understood and supported.
</p>
<p>
    I have also had some good success with systems which are even more prescriptive in terms of what they allow people to enter as text. By using something like Django or other suitable MVC frameworks to build out a very structured input for content into templates, you can get the the point that you are just allowing people to enter text into the sections that you need. This allows for a complete separation of style and content but can be a little bit too rigorous for some projects.
</p></div>

<blockquote>
    <p>
        Тихий Бес ‏<a href="http://twitter.com/SilentImp">@SilentImp</a>
    </p>
    <p>
        #Fronteers12 #fqa what are you think about inplace content editors?
    </p>
</blockquote>
<div class="answer"><p>
    I have to say that I'm not a fan. I can see the temptation to allow users to navigate around the site as normal an then switch to a mode where they are able to edit the content that they see. This gives good context to the editor about how their content will appear but does a poor job of protecting the designed experience. This kind of interface always seem to add a lot of UI hooks and other CMS smells into your code which make optimising and being <a href="http://futurefriendly.org">future friendly</a> incredibly hard.
</p></div>

<blockquote>
    <p>
        Norbert de Langen <a href="http://twitter.com/NorbertdeLangen">@NorbertdeLangen</a>‏
    </p>
    <p>
        #fqa <a href="http://twitter.com/codepo8">@codepo8</a> tips for agencies wanting to do a more agile work system?
    </p>
</blockquote>
<div class="answer"><p>
    Norbert, this is a tough one. I think the biggest key to success here is complete buy-in from the client. Unless they are totally on board with that approach to the project, then you can't run it in a truly Agile manor.  I've been fortunate enough to work on a couple of projects where that has been the case, but it is very rare. The desire to define upfront the cost, scope and deadlines makes a true Agile approach impossible.
</p>
<p>
    At <a href="http://rga.com">R/GA</a> we do borrow aspects of Agile development and tailor those practices to work within the constraints of a traditional waterfall engagement.  Finding those aspects of Agile that work for you can be helpful but they tend to shift depending on how you work with each particular client.
</p>
</div>
<blockquote>
    <p>
        Wes Oudshoorn ‏<a href="http://twitter.com/wesoudshoorn">@wesoudshoorn</a>
    </p>
    <p>
        #fqa Could you describe your ideal cms for responsive design? What challenges are we facing there? #fronteers12
    </p>
</blockquote>
<blockquote>
    <p>
        Randy ‏<a href="http://twitter.com/Randynamic_4">@Randynamic_4</a>
    </p>
    <p>
        #fronteers12 #fqa CMS and responsive design (responsive content) is still a big problem any suggestions on that?
    </p>
</blockquote>
<div class="answer"><p>
Wes, Randy, I think that a good CMS should be totally transparent in the front end.  As such we should be able to adopt the kind of techniques that are emerging in front-end development to support a responsive design approach.  Stripping out the UI hooks and other smells left by many CMS platforms can actually help to enable a responsive design.
</p>
<p>
    One area of a responsive approach which gets a little overlooked does have a burden on the back-end however. Rather than delivering the same large image assets to all devices and then scaling them down in the browsers to fit the screen size, it can be important to have smaller versions of image assets and then 'upgrade' them to lager images where appropriate. Ideally the system would support the generation of different sizes of the automatically to support that.
</p></div>

<blockquote>
    <p>
        Varya ‏<a href="http://twitter.com/toivonens">@toivonens</a>
    </p>
    <p>
        #fqa <a href="http://twitter.com/philhawksworth">@phlhawksworth</a> Doesn't all what you are showing just mean that those CMS are bad coded?
    </p>
</blockquote>
<div class="answer"><p>
    Varya, Yes, but this is a tough problem and I think many large platforms try to serve many masters and provide solutions to each and every possible problem that they can imagine in this area. As a result they often focus on the capabilities without giving any consideration to front-end performance or the kind of challenges that front-end developers need to overcome.
</p>
<p>
    I think that this is a symptom of front-end development not being given the respect that it deserves. Historically platform developers seem to have considered the front-end development work as the 'easy last step' in producing a system and so not given it the attention it needs.In recent years we have come to appreciate the complexity and craftsmanship involved in front-end engineering and I think that we need to highlight that realisation, which is one of the motives for me to give this talk.
</p>
</div>

<blockquote>
    <p>
        Victor Zuydweg ‏<a href="http://twitter.com/VZuydweg">@VZuydweg</a>
    </p>
    <p>
        The CSM stink seems a lot like framework stink, dontyouthink? <a href="http://twitter.com/philhawksworth">@philhawksworth </a>#fqa #fronteers12
    </p>
</blockquote>
<div class="answer"><p>
    Yes Victor. There are many frameworks out there that can let you introduce your very own code smells into the work. Even with the best tools, we can always find ways to do a bad job - I've been guilty of that myself plenty of times in the past! The trick is in recognising the smells we should avoid!
</p>
</div>

<blockquote>
    <p>
        Тихий Бес ‏<a href="http://twitter.com/SilentImp">@SilentImp</a>
    </p>
    <p>
        <a href="http://twitter.com/philhawksworth">@philhawksworth</a> #smellcms May i have video or slides or some sing?! Talk is great!!! #Fronteers12 #fqa
    </p>
</blockquote>
<div class="answer"><p>
    Thanks SilentImp!
</p>
<p>
    You can get to the <a href="https://speakerdeck.com/u/philhawksworth/p/i-can-smell-your-cms">slides on speakerdeck</a> where they are also available to download as a PDF. Other coverage from Fronteers 2012 is collecting nicely on the event <a href="http://lanyrd.com/2012/fronteers/coverage/">coverage page at Lanyrd</a>.  A video will soon be available from the nice folks at Fronteers.
</p>
</div>
