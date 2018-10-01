
module.exports = function(eleventyConfig) {

  // Components
  const PostTitle = require('./src/site/_includes/components/PostTitle.js');
  // const PostTitle = require('./src/site/_includes/components/PostTeaser.js');

  // Shortcodes
  eleventyConfig.addShortcode('PostTitle', PostTitle);
  // eleventyConfig.addShortcode('PostTeaser', PostTeaser);

  // Add filters to Nunjucks
  eleventyConfig.addFilter("dateDisplay", require("./src/site/_filters/dates.js") );
  eleventyConfig.addFilter("section", require("./src/site/_filters/section.js") );

  // config.addFilter("timestamp", require("./filters/timestamp.js") );
  // config.addFilter("squash", require("./filters/squash.js") );

  // // Group posts and links into collections without leaning on tags
  // config.addCollection("links", function(collection) {
  //   return collection.getFilteredByGlob("src/site/links/*.md").reverse();
  // });
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/posts/*.md").reverse();
  });

  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: "_data"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };

};
