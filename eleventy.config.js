import { compileAsync } from "sass";
import { VentoPlugin } from "eleventy-plugin-vento";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(VentoPlugin);
  eleventyConfig.addWatchTarget("src/scss");

  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent, inputPath) {
      if (inputPath.split("/").pop().startsWith("_")) return;

      const result = await compileAsync(inputPath, {
        loadPaths: ["src/scss"],
        style: "compressed",
      });

      return async () => result.css;
    },
  });

  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "vto",
    htmlTemplateEngine: "vto",
  };
}
