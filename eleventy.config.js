import { compileAsync } from "sass";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { VentoPlugin } from "eleventy-plugin-vento";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(VentoPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    widths: [640, 960, 1280, 1600, 2000],
    fixOrientation: true,
    sharpAvifOptions: { quality: 55, effort: 5 },
    sharpWebpOptions: { quality: 72 },
    sharpJpegOptions: { quality: 78, progressive: true },
    htmlOptions: {
      fallback: "largest",
      imgAttributes: {
        decoding: "async",
      },
    },
  });
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
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

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
