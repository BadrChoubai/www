const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
	eleventyConfig.addCollection("published", (collection) => {
		return collection
			.getFilteredByTags("posts")
			.filter((post) => !post.data.draft);
	});

	eleventyConfig.addPlugin(syntaxHighlightPlugin);

	// Universal Shortcodes (Adds to Liquid, Nunjucks, JavaScript, Handlebars)
	eleventyConfig.addPairedShortcode("link", function (content, to) {
		return `
		<a class="link" href="${to}">${content}</a>
		`;
	});

	eleventyConfig.addShortcode("postCard", function (postData) {
		return `
			<article class="container post-card">
					<h2>
						<a href="${postData.url}">${postData.title}</a>
					</h2>
					<p>${postData.premise || "No premise given."}</p>
			</article>
			`;
	});

	eleventyConfig.addPairedShortcode(
		"quote",
		function (children, author, source) {
			let hasAuthor = (author && author.length > 0)
			let hasSource = (source && source.length > 0)

			const footer = (hasAuthor && hasSource) ? `
			<footer>
				<cite>${author}, ${source}</cite>
			</footer>
			` : ``;

			return `
		<blockquote>
			${children}
			${footer}
		</blockquote>
		`;
		},
	);

	return {
		dir: {
			input: "src",
		},
		templateFormats: ["njk", "md"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
};
