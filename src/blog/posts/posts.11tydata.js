export default {
	layout: "post.liquid",

	// Allow any directory structure and specify the URL paths for all blog posts
	permalink: function ({ title }) {
		return `/blog/${this.slugify(title)}`;
	},
};
