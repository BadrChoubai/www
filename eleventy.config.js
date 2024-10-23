const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
	eleventyConfig.addCollection("published", (collection) => {
		return collection
			.getFilteredByTags("posts")
			.filter((post) => !post.data.draft)
			.sort((o, n) => n.date - o.date);
	});

	eleventyConfig.addPassthroughCopy("favicon.ico");

	eleventyConfig.addPlugin(syntaxHighlightPlugin);
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10, // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Badr Choubai",
			subtitle: "Badr Choubai's personal blog",
			base: "https://badrchoubai.dev/",
			author: {
				name: "Badr Choubai",
			},
		},
	});

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

	return {
		dir: {
			input: "src",
		},
		templateFormats: ["njk", "md"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
};
