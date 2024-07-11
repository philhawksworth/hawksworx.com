---
layout: "base.liquid"
title: "Phil Hawksworth - posts"
---

<section>
  <hgroup>
    <h1>Writing</h1>
    <p>Blog posts and other writing, here and elsewhere</p>
  </hgroup>
</section>

---

<section>

  <div class="listing">
  {%- for post in collections.posts -%}
    {%- assign itemYear = post.date | formatDate: "yyyy" -%}
    {%- unless itemYear == displayedYear -%}  
      {%- assign displayedYear = itemYear -%}
      <h3>{{ displayedYear }}</h3>
    {%- endunless -%}
      <div class="list-item">
        <h4><a href="{{ post.url }}">{{post.data.title}}</a></h4>  
        <p>{{post.data.subtitle}}</p>
        {%- for tag in post.data.tags -%}
        <a href="/blog/tags/{{tag}}" class="tag">{{tag}}</a>
        {% endfor -%}
        </div>
  {%- endfor -%}
  </div>

</section>

