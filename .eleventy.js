module.exports = function(config) {

  // Add filters to Nunjucks
  config.addFilter("dateDisplay", require("./filters/dates.js") );
  config.addFilter("timestamp", require("./filters/timestamp.js") );
  config.addFilter("section", require("./filters/section.js") );
  config.addFilter("squash", require("./filters/squash.js") );

  // Group posts and links into collections without leaning on tags
  config.addCollection("links", function(collection) {
    return collection.getFilteredByGlob("src/site/links/*.md").reverse();
  });
  config.addCollection("blogposts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  });

  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };

};
