---
layout: "base.liquid"
title: "Phil Hawksworth - posts"
---

<section>
  <hgroup>
    <h1>Posts</h1>
    <p>Blog posts and brain burps on social and anti-social media</p>
  </hgroup>
</section>

---


<section>
  <!-- <hgroup>
    <h2>Features</h2>
    <p>Articles self-indulgently styled according to my wim</p>
  </hgroup>
  
  <hr> -->

  <hgroup>
    <h2>Blog posts</h2>
    <p>Semi-regular thoughts and ramblings</p>
  </hgroup>

  <div class="listing">
  {%- for post in collections.posts -%}
    {%- assign itemYear = post.date | formatDate: "yyyy" -%}
    {%- unless itemYear == displayedYear -%}  
      {%- assign displayedYear = itemYear -%}
      <h3>{{ displayedYear }}</h3>
    {%- endunless -%}
      <div class="list-item">
        <h4><a href="{{post.url}}">{{post.data.title}}</a></h4>  
        <p>{{post.data.subtitle}}</p>
        {%- for tag in post.data.tags -%}
        <a href="/blog/{{tag}}" class="tag">{{tag}}</a>
        {% endfor -%}
        </div>
  {%- endfor -%}
  </div>

  <hr>

  <hgroup>
    <h2>Social posts</h2>
    <p>Perhaps conversation, perhaps guff.</p>
  </hgroup>




</section>

