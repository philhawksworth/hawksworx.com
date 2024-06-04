---
layout: "base.liquid"
title: "Hawksworx"
---

<section>
<hgroup>
  <h1>hawksworx</h1>
  <p>Phil Hawksworth's home on the web</p>
</hgroup>
</section>
<hr>
<section>
 <div class="listing">
  {%- assign post = collections.posts.first  -%}
    <div class="list-item">
      <h4><a href="{{post.url}}">{{post.data.title}}</a></h4>  
      <p>{{post.data.subtitle}}</p>
      {%- for tag in post.data.tags -%}
      <a href="/blog/{{tag}}" class="tag">{{tag}}</a>
      {% endfor -%}
      </div>
  </div>
</section>
