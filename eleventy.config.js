const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
	eleventyConfig.addCollection("published", (collection) => {
		return collection
			.getFilteredByTags("posts")
			.filter((post) => !post.data.draft)
			.sort((o, n) => n.date - o.date);
	});

	eleventyConfig.addPassthroughCopy("favicon.ico");

	eleventyConfig.addPlugin(syntaxHighlightPlugin);

	eleventyConfig.addShortcode("postCard", function (postData) {
		return `
			<article class="post-card">
				<hgroup>
					<h3>
						<a href="${postData.url}">${postData.title}</a>
					</h3>
					<p>${postData.date.toLocaleDateString("en-US")}</p>
				</hgroup>
				<p style="font-size: 1rem;">
					${postData.premise}
				<p>
			</article>
			`;
	});

	eleventyConfig.addPairedShortcode(
		"quote",
		function (children, author, source) {
			let hasAuthor = author && author.length > 0;
			let hasSource = source && source.length > 0;

			const footer =
				hasAuthor && hasSource
					? `
			<footer>
				<cite>${author}, ${source}</cite>
			</footer>
			`
					: ``;

			return `
		<blockquote class="post-blockquote">
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
