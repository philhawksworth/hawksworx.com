import * as sass from "sass";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAnchor from "markdown-it-anchor";
import slugify from "slugify";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { DateTime } from "luxon";

export default async function(eleventyConfig) {

  // markdown upgrades
  function markdownItSlugify(s) {
    return slugify(s, { lower: true, remove: /[\=\":’'`,]/g });
  }
  let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true,
	})
    .use(markdownItAttrs)
		.use(markdownItAnchor, {
			slugify: markdownItSlugify,
			level: [2, 3, 4],
			permalink: markdownItAnchor.permalink.linkInsideHeader({
				symbol: `<span aria-hidden="true" data-pagefind-ignore>#</span>`,
				class: "direct-link",
				placement: "before",
        space: false
			}),
		});
  eleventyConfig.setLibrary("md", mdIt);

  eleventyConfig.addPlugin(syntaxHighlight);

  // CSS pipeline
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
  eleventyConfig.addBundle("css");

  // Content collections
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/blog/posts/*.md").filter(function (item) {
			return item.data.draft !== true;
		}).reverse();
  });
  eleventyConfig.addCollection("localposts", function(collection) {
    return collection.getFilteredByGlob("src/blog/posts/*.md").filter(function (item) {
			return !(("externalurl" in item.data) || (item.data.draft === true));
		}).reverse();
  });
  eleventyConfig.addCollection("allTags", (collection) => {
    const posts = collection.getFilteredByGlob("src/blog/posts/*.md");
    let ret = {};
    for (let post of posts) {
      for (let tag of post.data.tags) {
        let normaltag = tag.toLowerCase();
        ret[normaltag] ??= [];
        ret[normaltag].push(post);
      }
    }
    ret = Object.fromEntries(Object.entries(ret).sort());
    return ret;
  });


  // Filters
  eleventyConfig.addFilter("section",  function(str, section) {
    var content = new String(str);
    var delimit = "<!--more-->";
    var parts = content.split(delimit);
    var which = section == 'remainder' ? 1 : 0;
    if(parts.length) {
      return parts[which];
    } else {
      return str
    }
  });

	eleventyConfig.addFilter("formatDate", (dateObj, format = "LLLL dd, yyyy") => {
		if (typeof dateObj === "string") {
			return DateTime.fromISO(dateObj).toFormat(format);
		} else if (typeof dateObj === "number") {
			dateObj = new Date(dateObj);
		}
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

  eleventyConfig.addFilter("previously",  function(obj, property) {
    const today = new Date();
    return Object.keys(obj).reduce(function(r, e) {
      let date = new Date(obj[e][property]);
      if (date <= today) r.push(obj[e]);
      return r;
    }, [])

  });
  eleventyConfig.addFilter("upcoming",  function(obj, property) {
    const today = new Date();
    return Object.keys(obj).reduce(function(r, e) {
      let date = new Date(obj[e][property]);
      if (date > today) r.push(obj[e]);
      return r;
    }, [])

  });

  // Passthrough
  eleventyConfig.addPassthroughCopy({"public/": "/"});

  // Locations
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_includes/layouts",
    }
  };
};
