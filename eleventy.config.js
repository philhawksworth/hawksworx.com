const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
// const md = require('markdown-it')();
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function(eleventyConfig) {
	
  eleventyConfig.addPlugin(eleventySass);
  
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItAttrs));

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }

};
