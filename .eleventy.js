const env = process.env.ELEVENTY_ENV;

module.exports = function(eleventyConfig) {

  // syntax highlighting plugin
  const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlightPlugin, {
    templateFormats: "md"
  });


  // Add filters to Nunjucks
  eleventyConfig.addFilter("dateDisplay", require("./src/site/_filters/dates.js") );
  eleventyConfig.addFilter("section", require("./src/site/_filters/section.js") );
  eleventyConfig.addFilter("squash", require("./src/site/_filters/squash.js") );

  // Assemble some collections
  eleventyConfig.addCollection("tagList", require("./src/site/_filters/getTagList.js"));
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  });


  // static passthroughs
  eleventyConfig.addPassthroughCopy("src/site/fonts");
  eleventyConfig.addPassthroughCopy("src/site/images");

  // minify the html output
  const htmlmin = require("html-minifier");
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: false,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });


  // otehr config settings
  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data/${env}`
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
