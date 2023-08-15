const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
// const md = require('markdown-it')();
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function(eleventyConfig) {
	
  // Sass pipeline
  eleventyConfig.addPlugin(eleventySass);

  // Extend markdown
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItAttrs));

  // Create a blog collection
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
  });

  // file passthrough
  eleventyConfig.addPassthroughCopy({ "static": "/" });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }

};
