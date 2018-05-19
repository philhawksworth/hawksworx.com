module.exports = function(config) {

  // Add a date formatter filter to Nunjucks
  config.addFilter("dateDisplay", require("./filters/dates.js") );
  config.addFilter("timestamp", require("./filters/timestamp.js") );

  // Group posts and links into collections without leaning on tags
  config.addCollection("links", function(collection) {
    return collection.getFilteredByGlob("src/site/links/*.md").reverse();
  });
  config.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  });
  config.addCollection('all', function(collection) {
    return collection.getFilteredByGlob('src/site/+(links|blogs)/**/!(index)*.md').reverse();
  })

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
