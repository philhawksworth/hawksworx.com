---
title: Adding search to a JAMstack site
description: Using progressive enhancement, JavaScript and a static site generator to create site search facility.
date: 2018-10-18
allowcomments: true
tags: ["jamstack", "javascript", "tips"]
photoCredits:
  - name: "Sandro Kradolfer"
    url: "https://unsplash.com/photos/IVYZWptFt1g"
pageClass: "dark-theme theme-steelblue"
---

Search is often cited as a limitation of static sites. Searching _feels_ dynamic, so surely it is impossible on a _static_ site, right? Thankfully not. Here is a nice technique to use with most any [static site generator](https://staticgen.com) and a little JavaScript as a progressive enhancement to add search functionality to your [JAMstack](https://jamstack.org) site.

![Searching](/images/sandro-kradolfer-1077230-unsplash.jpg "Searching")

<!--more-->

There are a number of services available to can bring fully featured, rich, search functionality to your sites. If I had needed more sophisticated searching, with things like fuzzy matching, related content associations, and deep search analytics, I could have used a service like [Algolia](https://www.algolia.com/), who are experts in this sort of thing.


## Some requirements

My needs on this site are relatively simple. So rather than using an external service I wanted to roll my own simple search which would help people find content in my blog posts. I set myself the following requirements:

> 1. Using JavaScript for the best experience is fine, but searching should be possible without it.
> 1. Searching should feel very fast, and find items in my blog by looking at the blog post titles and content.
> 1. No additional overhead of JavaScript libraries or third party services, so I could keep things simple and manageable.
> 1. No impact on the perceived page speed whatsoever.


## The technique

A summary of the approach I chose to take is:

1. Provide a Google search form as a fallback on a Search page
1. Hijack the link to that Search page with JavaScript
1. When a user clicks search, silently load a [JSON index](/search.json) of the content
1. Display a search UI
1. On each keypress in the search UI, search our JSON for string matches
1. Display links to the matches found

Let's look at some of this a little more closely.


### Setting a baseline

The first step was to set a good baseline from which to progressively enhance with JavaScript. Creating a js-free fallback is much more difficult than setting a working baseline before JavaScript ever enters the picture. I'd recommend this approach no matter what you are building.

I added _Search_ to the primary navigation of the site. You can see it up at the top of the page. This is a regular old link to a page on the site which I'll hijack with JavaScript later. For now, it goes to [the search page](/search).

On the search page, I'll lean on an external search engine to provide the ability to search the site. Most leading search engines allow for this. Here's I'm using Google. An HTML form with some parameters will send a search request to Google, scoped for this site.

The HTML looks like this:

``` html
<form action="https://www.google.co.uk/search" method="get" class="search">
  <input type="hidden" name="q" id="q" value="site:http://hawksworx.com">
  <label for="search-str">Search <small></label>
  <input type="text" name="q" id="search-str"></p>
  <button type="submit" class="submit">Search with Google</button>
</form>
```

That gives us a form which will perform a Google search on this site (you can do this directly in google by scoping your search query with `site:http://hawksworx.com/`). The results are displayed on Google, and the links point back to the correct pages here on the site.

We have our baseline.


### Hijacking the search link

The search link can stay just the same. No need to add any inline JavaScript. Things can stay unobtrusive so that if JavaScript is unavailable the link is just a link.

```html
<a href="/search" id="search-link">search</a>
```

Now with JavaScript, we add an event handler to trigger our search feature if somebody clicks on search. We also suppress the standard link behavior since we're not navigating away from the current page.

```js
// attach a click handler to the search link
var btn = document.querySelector('#search-link');
btn.addEventListener('click', function(event) {

  // don't navigate to that page. Stay put.
  event.preventDefault();

  // make search magic happen instead...

}, false);
```

### Loading an index object to inspect

Until the user indicated that they intend to search by clicking the Search link, we dont need to load in our search index. That helps to keep the page weight down. Once they have clicked the link it's time to go and get our data. While we show the UI and the user contemplates what they intend to search for, while silently fetch the data with JavaScript.

```js
// get the data
const searchIndex;
fetch('/search.json').then(function(response) {
  return response.json();
}).then(function(response) {
  searchIndex = response.search;
});
```

This [`searchIndex`](/search.json) is now available to our JavaScript for some string matching. We'll search our index for whatever the user enters into the search UI which we displayed while fetching the data. The search we perform against our index is very basic, but more than adequate for what we need here.

```js
// look for matches in each item in the JSON
var results = [];
for(var item in searchIndex ) {
  var found = searchIndex[item].text.indexOf(searchString);
  if(found != -1 ) {
    results.push(searchIndex[item])
  }
}

// now display the items in our results array...
```



### Generating our search index

So far so good. We can load some JSON when required, and perform some rudimentary string matching against it. but where does this search index come from? That's where a static site generator can really help us.

> A static site generate creates the output we need by applying templates to structured data

Since this site is built using a static site generator, it is already interpreting the its content as structured data and outputting that data in whatever shape I need. All I need to do is create a suitable template which will output the content of my blog not as html, but as a JSON object.

generating this search index can be done at build time, so it is ready to serve up as a static resource when my JavaScript needs it. A nice performance and resilience bonus.

Currently, I am using a static site generator called [Eleventy](https://11ty.io) to generate this site. With Eleventy, making a template to output my search.json is straight forward.

{% raw %}
```js
---
permalink: search.json
---
{"search" : [
{%- for item in collections.posts -%}
  {
    "url" : "{{ item.url }}",
    "title" : "{{ item.data.title }}",
    "text" : "{{ (item.data.title + " " + item.templateContent) | squash }}"
  }{% if not loop.last %},{% else %}{%- endif -%}
{%- endfor -%}
]}
```
{% endraw %}

By iterating over the collection of posts for the site, I can construct the JSON to suit my needs later. For convenience I chose:

- A url: To link the user to the correct page
- A title: The page title to display to the user inn the results
- A text index: Which contains every unique word contained in that post's title and text

To make things a little more efficient, I condensed that text property a little. By passing the content to a filter that I created called _sqaush_ I can massage it into shape a little more. The [squash filter](https://github.com/philhawksworth/hawksworx.com/blob/8c96ba2541c8fd6fe6f521cdb5e17848c231636c/src/site/_filters/squash.js) does the following:

- Makes every word lowercase
- Removes all duplicated words.
- Removes words that are less meaningfully for searching. Like _on, in, me, my_ and so on.

Many static site generators will give you the ability to add filters and utilities in this way. I like [how filters work in Eleventy](https://www.11ty.io/docs/filters/) since everything is JavaScript. I don't need to learn Ruby (as I did when I implemented the same thing with less confidence in an earlier version of this site built with Jekyll)

## The building blocks we need

When we bring these building blocks together, we can assemble whatever behaviors we like in our UI. This is a simple search capability, but give it a try. It works nicely.

When we have the ability to inspect and manipulate the data and content that makes up our sites. And generate data services to expose whatever we like, we gain the ability to craft a wide variety of experiences in our website.  Delivering search functionalities like this prove to be far more simple than we might have originally expected.

With a little imagination, adding this and other dynamic features to JAMstack sites is really satisfying.
