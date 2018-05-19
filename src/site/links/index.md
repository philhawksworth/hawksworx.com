---
date: '2017-06-29T11:52:41+01:00'
draft: false
title: Links and resources
subtitle: found on the internet
description: Odds and ends that I've found around the web and thinks are snazzy or interesting
---

## I'll just put these here

A list of things that I've found on the web and thought, "oooh, that'll come in handy", or that perhaps just amused me. Either way, here they are.

<ul class="listing">
{%- for page in collections.links -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>
