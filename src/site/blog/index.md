---
title: Writing
subtitle: blog posts and announcements
description: Blog posts and announcements from Phil Hawksworth
layout: layouts/base.njk
---


<ul class="listing">
{%- for item in collections.posts -%}
  <li>
    <a href="{{ item.url }}">{{ item.data.title }}</a> -
    <time datetime="{{ item.date }}">{{ item.date | dateDisplay }}</time>
  </li>
{%- endfor -%}
</ul>
