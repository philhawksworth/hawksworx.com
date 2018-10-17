const htmlmin = require("html-minifier");
const UglifyJS = require("uglify-js");

module.exports = function(eleventyConfig) {

  // Components
  // const PostTitle = require('./src/site/_includes/components/PostTitle.js');
  // const PostTitle = require('./src/site/_includes/components/PostTeaser.js');

  // Shortcodes
  // eleventyConfig.addShortcode('PostTitle', PostTitle);
  // eleventyConfig.addShortcode('PostTeaser', PostTeaser);

  // Add filters to Nunjucks
  eleventyConfig.addFilter("dateDisplay", require("./src/site/_filters/dates.js") );
  eleventyConfig.addFilter("section", require("./src/site/_filters/section.js") );
  eleventyConfig.addFilter("squash", require("./src/site/_filters/squash.js") );

  // Group posts into a collection without leaning on tags
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  });

  eleventyConfig.addCollection("tagList", require("./src/site/_filters/getTagList.js"));

  // static passthroughs
  eleventyConfig.addPassthroughCopy("src/site/fonts");
  eleventyConfig.addPassthroughCopy("src/site/images");

  // minify the html ouptput
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





  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: "_data"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
