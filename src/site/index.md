---
layout: layouts/base.njk
title: Phil Hawksworth
description: Phil Hawksworth's home on the Web. Blog posts, conference talks, links and other knick knacks.
---

# Hawksworx

some blurb in here I expect

<ul class="listing">
{%- for i in range(0, 10) -%}
  {% set item = collections.posts[i] %}
  <li>
    <h3><a href="{{ item.url }}">{{ item.data.title }}</a></h3>
    <p><time datetime="{{ item.date }}">{{ item.date | dateDisplay }}</time></p>
  </li>
{%- endfor -%}
</ul>


