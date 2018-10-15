---
title: Adding a Static Comments System to My Jekyll Build
date: 2014-07-22T00:00:00Z
publishdate: 2014-07-22T00:00:00Z
draft: false
description: Building a tool to provide comments and other user generated content
  for sites built with static site generators like Jekyll.
tags:
  - ssg
  - static
  - jamstack
---

I'm a big fan of simplicity when building web sites. That's just one of the reasons I like using Jekyll, a static site generator, to build out this site. Sometimes though, it would be nice to gather content from the site visitors via a form, and hosting a site as a set of static assets doesn't cater for that.

That's why I decided to create a simple service which would provide that capability to any static sites. I'm using it to add comments to this site, and you can use it for yours too.

<img src="/images/hello-poole.png" alt="Poole">

<!--more-->

<h2>Introducing Poole</h2>
<p>
  After finding that I was not alone in having this itch, I teamed up with my friend <a href="http://madewithbytes.com/">Alfredo Aguirre</a> and we set about scratching it by building a simple service which would be easy to reuse on all kinds of projects. <a href="http://pooleapp.com">Poole</a> simply provides a place to post your content with an HTTP Post, and then an API to get it back again using an HTTP Get.
</p>
<p>
  We handle some privacy and security, but this isn't the place to put your most sensitive data. It's perfect though, for things like blog comments since they are intended to be public.
</p>

<h2>How Poole works</h2>
<p>
  We wanted getting setup and integrating Poole into your workflow to be super simple, and as flexible as possible. Currently there is one prerequisite, and that is a <a href="http://github.com">Github</a> account. We use this to authenticate you to manage your forms rather than ask you to create yet another account. <a href="https://trello.com/b/lyQEqQMq/poole">We may add</a> Twitter oAuth later too.
</p>
<p>Here is an overview of the process:</p>
<ul>
  <li>Visit <a href="http://pooleapp.com" title="PooleApp.com">PooleApp.com</a> and sign in with Github</li>
  <li>Create a new form. This generates an API key and an API secret for you.</li>
  <li>Add some form HTML to your site which posts to the end point we give you. This includes your API key.</li>
  <li>Add whatever fields you like to your form. Their data will be available in JSON or YAML format later.</li>
  <li>Use your form to post content.</li>
  <li>Retrieve your data from Poole at the obscure URL it generated for you when you. This includes your API secret.</li>
</ul>

<p>That's it.</p>
<p>
  Poole offers security by obscurity. Your data is retrievable from the "unguessable" URL containing your API secret. It does not require authentication to access this readonly API, so once again - <em>no bank details, trade secrets, or nuclear launch codes please!</em>
</p>

<h2>Managing your data</h2>
<p>
  Although your content is available without authentication from the readonly endpoint, you need to authenticate with your Github credentials in order to delete data or manage your forms.
</p>

<h2>Notifications</h2>
<p>
  For this to be useful, you may need to be notified when data is posted to your forms. Poole can be configured to send email notifications when data is posted. We might add daily digests or other settings soon.
</p>

<h2>But what about spam?</h2>
<p>
  What indeed! We are offering this for free, so we can't spring for Akismet spam filtering. You can however enable it yourself by providing your own personal Akismet API key.  That is <a href="http://akismet.com/plans/">free and very quick to setup</a> with Akismet and will allow Poole to protect your forms from spammers.
</p>

<h2>Using Poole with Jekyll</h2>
<p>
  I use <a href="http://gulpjs.com">Gulp</a> to automate my build tasks on this site. In order to add comments to the site, I added a new Gulp task which just pulls the data that has been posted to my form on Poole. That data is available as YAML which is handy since this is the format that Jekyll can treat as structured data.  Once I have the data, Jekyll does the rest. It parses the comments data and adds the comments to the appropriate blog posts.
</p>
<p>
  Since the comments are part of my pages rather than being loaded later by JavaScript, they are part of the site and available for search engines to easily parse. It also means that I automatically get to retain a store of the comments made on my site. Handy.
</p>

<h3>The Gulp task to get comments from Poole</h3>
<p>I run this when I get a notification from Poole of a new comment. I also have a command to deploy which just pushes the build to Github pages.</p>

```
// Get comments form Poole
gulp.task("comments", function() {

  var options = {
    hostname: 'pooleapp.com',
    port: 80,
    path: '/data/{API-SECRET}.json',
    method: 'GET'
  };

  http.get(options, function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
      var comments = JSON.parse(body);

      // add gravatar image links if available
      for (var i = 0; i < comments.sessions.length; i++) {
        comments.sessions[i].avatar = gravatar.url(comments.sessions[i].email, {s: '50', r: 'pg', d: '404'});
      }

      // convert the json to yaml and save it for jekyll to use.
      var ymlText = yaml.stringify(comments);
      fs.writeFile('./src/_data/comments.yml', ymlText, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Comments data saved.");
        }
      });

    });
  }).on('error', function(e) {
    console.log("Got error: ", e);
  });

});

```


<h3>The Jekyll template which adds comments to the pages</h3>
<p>
  Once I've run the Gulp task above, I just run the Jekyll build as normal. The post template includes this logic to add the comments to the page which they originated from.
</p>

```
<ul class="listing comments">
  {% for comment in site.data.comments.sessions %}
    {% if comment.path == page.url %}
    <li>
      <img src="{{ comment.avatar }}" alt="{{ comment.name }}">
      <time datetime="{{ comment.created | date_to_xmlschema }}">{{ comment.created | date_to_long_string  }}</time>
      {% if comment.url %}
        <a href="{{ comment.url }}" class="commenter">{{ comment.name }}</a>
      {% else %}
        <span class="commenter">{{ comment.name }}</span>
      {% endif %}
      <div>
        {{ comment.comment }}
      </div>
    </li>
    {% endif %}
  {% endfor %}
</ul>
```


<h3>The comments form which posts the data to Poole</h3>
<p>
  The post template adds this form to each blog post page. A hidden field keeps track of the page where a comment originates from so that it can be inserted by the template later.  Poole also lets you specify which page on your domain to redirect to after a successful post. That way the user never feels like they have been routed away to a third party service.
</p>

```
<form action="http://pooleapp.herokuapp.com/data/{API-KEY}/" method="post">
  <h2>Leave your comment</h2>
  <input type="hidden" name="redirect_to" value="/thanks" />
  <input type="hidden" name="path" value="{{ page.url }}" />
  <label for="name">Your name</label><input type="text" name="name">
  <label for="url">Your website <span>(optional)</span></label><input type="text" name="url">
  <label for="email">Your email <span>(I'll never spam you)</span></label><input type="text" name="email">
  <label for="comment">Your comment</label><textarea name="comment" class="comment-text"></textarea>
  <input type="submit" value="Post comment" class="submit" />
</form>
```

<h2>Try it out</h2>
<p>
  <a href="http://pooleapp.com">Poole is available to try now</a>. We've made it super easy to liberate your data and walk away if it's not for you, but hopefully it will be a useful tool for all kinds of use cases.
</p>
<p>
  I've keen to hear thoughts on the usefulness or otherwise of this tool, and also to receive feature requests in the comments below or on our <a href="https://trello.com/b/lyQEqQMq/poole">roadmap board on Trello</a>.
</p>






