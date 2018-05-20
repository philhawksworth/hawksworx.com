module.exports = function(config) {

  // Add date formatter filters to Nunjucks
  config.addFilter("dateDisplay", require("./filters/dates.js") );
  config.addFilter("timestamp", require("./filters/timestamp.js") );

  // Add blog excerpt filters to Nunjucks
  config.addFilter("excerpt", require("./filters/excerpt.js") );
  config.addFilter("afterExcerpt", require("./filters/afterExcerpt.js") );

  // Add debug tool filters to Nunjucks
  config.addFilter("stringify", require("./filters/stringify.js") );

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
