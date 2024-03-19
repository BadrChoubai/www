const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
	eleventyConfig.addCollection("published", (collection) => {
		return collection
			.getFilteredByTags("posts")
			.filter((post) => !post.data.draft);
	});

	eleventyConfig.addPassthroughCopy("src/robots.txt", "/robots.txt");

	eleventyConfig.addPlugin(syntaxHighlight);

	// Universal Shortcodes (Adds to Liquid, Nunjucks, JavaScript, Handlebars)
	eleventyConfig.addShortcode("post", function (postData) {
		return `
			<li class="post">
				<a href="${postData.url}">${postData.title}</a>
			</li>`;
	});

	eleventyConfig.addShortcode("quotation", function (quote, author, work) {
		return `
		<blockquote>
			"${quote}"
			<footer>
				<cite>- ${author} &mdash; ${work}</cite>
			</footer>
		</blockquote>
		`
	});

	return {
		dir: {
			input: "src",
			output: "_site",
		},
		pathPrefix: "/",
		templateFormats: ["md", "njk"],
	};
};
