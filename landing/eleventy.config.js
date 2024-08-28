module.exports = function (eleventyConfig) {
	eleventyConfig.addPairedShortcode("quote", function (children, author, work) {
		return `
		<blockquote>
			${children}
		</blockquote>
		`;
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
