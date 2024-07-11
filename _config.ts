import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import date from "lume/plugins/date.ts";
import prism from "lume/plugins/prism.ts";

// Config
const site = lume({
  src: "./src",
  dest: "./_site",
});

// Global data
site.data("layout", "layouts/base.vto");

// Plugins
site.use(date());
site.use(sass({"format": "compressed"}));
site.use(prism());

// Filters and helpers
site.filter("contentExcerpt", (value) => value.split("<!--more-->")[0]);
site.filter("contentAfterExcerpt", (value) => value.split("<!--more-->")[1]);

// Static file pasthrough
site.copy("_public", ".");


site.process([".html"], (pages) => {
  for (const page of pages) {
    for (const img of page.document.querySelectorAll("h2")) {
      if (!img.hasAttribute("alt")) {
        img.setAttribute("alt", "This is a random alt");
      }
    }
  }
});


export default site;
