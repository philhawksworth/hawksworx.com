import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import date from "lume/plugins/date.ts";
import prism from "lume/plugins/prism.ts";
import pagefind from "lume/plugins/pagefind.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

import headingAnchors from "./utils/processors/heading-anchors.ts";

// Config
const site = lume({
  src: "./src",
  dest: "./dist",
});

// Global data
site.data("layout", "layouts/base.vto");

// Plugins
site.use(date());
site.use(sass({"format": "compressed"}));
site.use(prism());
site.use(minifyHTML({options: { minify_css: false }}));
// site.use(pagefind({
//   ui: false
// }));

// Filters and helpers
site.filter("contentExcerpt", (value) => value.split("<!--more-->")[0]);
site.filter("contentAfterExcerpt", (value) => value.split("<!--more-->")[1]);
site.filter("bydate", (arr) => { return arr.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)) });


// Static file pasthrough
site.copy("_public", ".");


// Add heading anchors across the site
site.process([".html"], (pages) => {
  for (const page of pages) {
    headingAnchors(page, "h2, h3");
  }
});


export default site;
