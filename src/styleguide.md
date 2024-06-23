---
layout: "base.liquid"
title: "Styleguide"
---


<section>

{% render 'title-block.liquid', 
 title: title, 
 subtitle: "A reference for the styling of elements in the hawksworx.com site"  
%}
</section>

---

<section>

# h1. First level heading

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

## h2. Second level heading

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

### h3. Third level heading

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

#### h4. Fourth level heading

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.


<hgroup>
  <h2>Heading group h2</h2>
  <p>Subtitle in a heading group</p>
</hgroup>

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

<hr>
<div class="center">
<hgroup>
  <h2>Centered group h2</h2>
  <p>Subtitle in a heading group</p>
</hgroup>

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

</div>

<hr>

## Images, figures, and pictures

Images in `main` are displayed a little wider where possible, and where they appear as part of a `figure` with a caption, the caption is muted until you mouseover the image.

<figure>
    <img src="/images/cc-barcelona-sound-check.jpg">
    <figcaption>Sound-checking with Classical Chorus at L'Auditori, Barcelona</figcaption>
</figure>


## Paragraph styles

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

> Blockquote et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

Et Lorem sit ut ad. Culpa nisi proident ea exercitation ex exercitation laborum nulla nulla consectetur enim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

### Links and buttons

Inline links appear like so. [Culpa nisi proident](/) ea exercitation ex [exercitation](/) laborum nulla nulla consecteturenim commodo cupidatat. Commodo irure ullamco consequat mollit cillum nisi.

Absoulte links appear automatically like this: https://hawksworx.com

There is also a provision for primary, secondary, and disabled buttons with appropriately decorated button elements:

`<button class="btn-primary">Primary button</button>`

<button class="btn-primary">Primary button</button> <button class="btn-primary" disabled>Primary button disabled</button>

`<button class="btn-secondary">Secondary button</button>`

<button class="btn-secondary">Secondary button</button> <button class="btn-secondary" disabled>Secondary button disabled</button>


#### Tags

[Tag link](/){.tag} [Tag link](/){.tag} [Tag link](/){.tag}


## Lists

- Unordered
- lists 
- look like this

1. Ordered
1. lists 
1. look like this

</section>
