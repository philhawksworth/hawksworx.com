const sass = require("sass");

module.exports = function(eleventyConfig) {
  
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
