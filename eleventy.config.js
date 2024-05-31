const sass = require("sass");
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')

module.exports = function(eleventyConfig) {

  // Markdown upgrades
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  }

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
  eleventyConfig.setLibrary('md', markdownLib) 


  // CSS pipeline
  eleventyConfig.addTemplateFormats("scss, css");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: function(contents, includePath) {
      let includePaths = [this.config.dir.includes];
      return () => {
        let ret = sass.renderSync({
          file: includePath,
          includePaths,
          data: contents,
          outputStyle: "compressed"
        });
        return ret.css.toString("utf8");
      }
    }
  });


  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    }
  }
};
