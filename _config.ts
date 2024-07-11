import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import date from "lume/plugins/date.ts";

// Config
const site = lume({
  src: "./src",
  dest: "./_site",
});

// Plugins
site.use(date());
site.use(sass({"format": "compressed"}));


// Filters and helpers
site.filter("contentExcerpt", (value) => value.split("<!--more-->")[0]);
site.filter("contentAfterExcerpt", (value) => value.split("<!--more-->")[1]);

export default site;
