---
title: Keeping Sass simple and speedy on Eleventy
description: Optimising your local development pipleine, for faster Eleventy Sass compilation
date: 2018-12-12
allowcomments: true
tags: ["jamstack", "ssg", "tips"]
photoCredits:
  - name: "Jack B"
    url: "https://unsplash.com/photos/ca0TmysC14U"
pageClass: "bright-theme theme-neonblue"
---

I've experimented with quite a few different static site generators over the years. [Currently](https://5c125977f00f9a00078d2ea6--hawksworx.netlify.com/) I'm really enjoying using [Eleventy](https://www.11ty.io/docs/tutorials/#quick-tips) for this site, and feel like I've got the most simple setup I've had in years. Eleventy has [some nice tips](https://www.11ty.io/docs/tutorials/#quick-tips) for compiling your CSS and JavaScript into your site which feel very elegant to me. But for sites with very many pages, these might have a slight overhead for site generation speed, so I'm using a variation to speed things up.


![Speeding](/images/jack-b-762488-unsplash.jpg "Speeding")

<!--more-->

Eleventy is written in JavaScript and has a very logical route to customisation and extension. Its main config file, which holds various configuration settings and variables, can also contain JavaScript functions which can be executed when needed as utilities.

This feature is used to minify and inline CSS into each page. You can [read about it in more detail](https://www.11ty.io/docs/tutorials/#quick-tips) on the Eleventy site, but in essence the approach does this:

Imports the clean-css library and exposes it as a filter called `cssmin` which we can use anywhere within our Eleventy templates.

```js
// excerpt of my .eleventy.js config file
const CleanCSS = require("clean-css");
module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
};
```

Then in the HTML of our page, we pass our CSS file to the filter and receive a minified blob of CSS in return. This gets inlined into each page.

```html
{%- raw -%}
<!-- excerpt from the base page template -->
<!-- capture the CSS content as a Nunjucks variable -->
{% set css %}{% include "sample.css" %}{% endset %}
<!-- feed it through our cssmin filter to minify -->
<style>{{ css | cssmin | safe }}</style>
{% endraw %}
```

This works beautifully. The build dependencies are few, the complexity is low. The logic is easy to follow. Even for future Phil (that poor sucker) when he returns to it months from now.

## More pages, more work

I don't like to optimise things too early. So where possible, I'll stick to this approach. But I do like to use Sass for a few bits of pre-processing. And as the number of pages on a project increases, the greater the build overhead with this approach (as it is processing the Sass or CSS for every page).

## One-time pre-processing

The approach I moved to is to add a small build step in front of my eleventy build. This build step does the following:

1. Compile my Sass files into a single, minified CSS file where Eleventy is watching for changes

```js
// gulpfile.js
const gulp = require("gulp");
const sass = require("gulp-sass");

// a task to generate the css with sass
gulp.task('css', function() {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/site/_includes/css'));
});
```

2. Let Eleventy inline the pre-compiled CSS

I like to inline the CSS if possible as this removes the need for an HTTP request for the CSS which would block the render of the page. It pays to keep the amount of CSS inlined light, but for this site it is a small amount of CSS, so I'm safe to inline it and get a nice little performance bump.

No need for a filter now. Just an include of the file:

```html
{%- raw -%}
<!-- excerpt from the base page template -->
<style>{% include "sample.css" %}</style>
{% endraw %}
```

That's it. Now I only need to generate and minify the CSS once each time I build, rather than once per page. I have a very similar process for the small amount of JavaScript I use in the site.


## Watch and learn

One last step to grease the development wheels further, is to watch for changes in the Sass and recompile if changes are found. Eleventy already provides hot reloading and browsersync assistance which rebuilds and refreshes when it detects changes, but my Sass compilation happens upstream of that.

By adding a gulp task to watch for changes, and running that concurrently with `eleventy --serve` I get the best of both worlds. Changes to the Sass files trigger a rebuild of the CSS, which is output as an asset in the Eleventy build (so its changes then trigger an Eleventy rebuild and refresh too).

I run this command via a [Yarn script helper](https://github.com/philhawksworth/hawksworx.com/tree/e359bc4fd55d96f01ab90f19dae721536f17225f/package.json#L6), but doing so via NPM or directly would work nicely too:

```bash
gulp watch & eleventy --serve
```


You can look closer at the code to see:
- the source [Sass files](https://github.com/philhawksworth/hawksworx.com/tree/e359bc4fd55d96f01ab90f19dae721536f17225f/src/scss)
- the [generated CSS](https://github.com/philhawksworth/hawksworx.com/blob/e359bc4fd55d96f01ab90f19dae721536f17225f/src/site/_includes/css/main.css)
- the [template](https://github.com/philhawksworth/hawksworx.com/blob/e359bc4fd55d96f01ab90f19dae721536f17225f/src/site/_includes/layouts/base.njk#L7) which includes them
- the [gulp file](https://github.com/philhawksworth/hawksworx.com/blob/e359bc4fd55d96f01ab90f19dae721536f17225f/gulpfile.js#L11-L18) which generates them and watches for changes




