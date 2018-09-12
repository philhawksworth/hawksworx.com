---
date: '2017-06-29T11:52:41+01:00'
draft: false
title: Ask me anything
subtitle: But you know, don't be rude.
description: Need answers? You can ask me questions via this site.
layout: layouts/base.njk
---
<img src="/images/philhawksworth-goon@2x.jpg" alt="Phil Hawksworth's face" class="avatar avatar-upclose" />

## You can ask. I don't mind.

I'm happy to answer questions if I can.

How was this site made? What do you do for a living? How did you get started? Who is your favorite Beatle? Do you only like cats or are dogs ok too?

These are all perfectly reasonable questions. I'm probably not going to give you my PIN number though.


<form name="ask-me-anything" netlify-honeypot="full-name" action="thanks" netlify>
  <p class="honey">
    <label>Your full name: <input name="full-name"></label>
  </p>
  <p>
    <label for="email">Your contact details<small>usually email or twitter works best</small></label>
    <input type="text" name="name" id="email">
  </p>
  <p>
    <label for="message">Your question<small>I'll do my best to answer if I can</small></label>
    <textarea name="message" id="message"></textarea>
  </p>
  <p>
    <button type="submit" class="btn">Ask Phil that burning question</button>
  </p>
</form>
