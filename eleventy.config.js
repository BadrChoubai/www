const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
	eleventyConfig.addCollection("published", (collection) => {
		return collection
			.getFilteredByTags("posts")
			.filter((post) => !post.data.draft)
			.sort((o, n) => n.date - o.date);
	});

	eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
	eleventyConfig.addPassthroughCopy("favicon.ico");
	eleventyConfig.addPassthroughCopy("resume.pdf");

	eleventyConfig.addPlugin(syntaxHighlightPlugin);
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.rss",
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

	eleventyConfig.addShortcode("postCard", function (post) {
		return `
			<article class="card">
				<header>
					<hgroup>
							<h3><a href="${post.data.url}">${post.data.title}</a></h3>
							<p>${post.data.dateString}</p>
					</hgroup>
				</header>
					<p>${post.data.premise}</p>
			</article>
			`;
	});

	eleventyConfig.addShortcode("projectCard", function (project) {
		return `
			<article class="card">
			<header>
				<hgroup>
					<h2>
						<a target="_blank" href="${project.url}">${project.name}</a>
					</h2>
				</hgroup>
			</header>
			<p>
				${project.description}
			</p>
			</article>
			`;
	});

	return {
		dir: {
			input: "src",
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
};
