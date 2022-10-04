let env = process.env.ELEVENTY_ENV;

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const sass = require("sass");

module.exports = function(eleventyConfig) {

  // syntax highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight, {
    templateFormats: ["md"]
  });

  // RSS plugin
  eleventyConfig.addPlugin(pluginRss);


  // Sass pipeline
  eleventyConfig.addTemplateFormats("scss");
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
 


  // Add filters to Nunjucks
  eleventyConfig.addFilter("dateDisplay", require("./src/site/_filters/dates.js") );
  eleventyConfig.addFilter("section", require("./src/site/_filters/section.js") );
  eleventyConfig.addFilter("squash", require("./src/site/_filters/squash.js") );
  eleventyConfig.addFilter("kebab", require("./src/site/_filters/kebab.js") );

  // Assemble some collections
  eleventyConfig.addCollection("tagList", require("./src/site/_filters/getTagList.js"));
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  });
  eleventyConfig.addCollection("cards", function(collection) {
    return collection.getAll().filter(function(item) {
      return "card" in item.data;
    });
  });


  // static passthroughs
  eleventyConfig.addPassthroughCopy("src/site/fonts");
  eleventyConfig.addPassthroughCopy("src/site/images");
  eleventyConfig.addPassthroughCopy("src/site/manifest.json");
  eleventyConfig.addPassthroughCopy("src/site/browserconfig.xml");


  // Avoid orphans
  eleventyConfig.addFilter("orphanWrap", function(text) {
    if(!text) return;
    let splitSpace = text.split(" ");
    let after = "";
    if(splitSpace.length > 2) {
      after += " ";
      let lastWord = splitSpace.pop();
      let secondLastWord = splitSpace.pop();
      after += `${secondLastWord}&nbsp;${lastWord}`;
    }
    return splitSpace.join(" ") + after;
  });

  // other config settings

  // make the prime target act like prod
  env = (env=="prime") ? "prod" : env;
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
