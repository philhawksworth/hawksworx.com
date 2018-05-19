---
title: Writing
subtitle: blog posts and announcements
description: Blog posts and announcements from Phil Hawksworth
layout: layouts/base.njk
---


<ul class="listing">
{%- for page in collections.blog -%}
  <li>
    <a href="{{ page.url }}">{{ page.data.title }}</a> -
    <time datetime="{{ page.date }}">{{ page.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>
