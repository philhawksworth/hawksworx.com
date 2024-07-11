import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";

const site = lume({
  src: "./src",
  dest: "./_site",
});

site.use(sass({"format": "compressed"}));

site.filter("contentExcerpt", (value) => value.split("<!--more-->")[0]);
site.filter("contentAfterExcerpt", (value) => value.split("<!--more-->")[1]);

export default site;
