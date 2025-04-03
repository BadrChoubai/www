import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import minificationLocalPlugin from "./config/minification.js";

import shortcodes from "./src/shortcodes/index.js";

export default async function (eleventyConfig) {
	eleventyConfig.addCollection("published", (collection) => {
		return collection
			.getFilteredByTags("posts")
			.filter((post) => !post.data.draft)
			.sort((o, n) => n.date - o.date);
	});

	eleventyConfig.addPassthroughCopy("favicon.ico");
	eleventyConfig.addPassthroughCopy("resume.pdf");
	eleventyConfig.addPassthroughCopy({
		"node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2":
			"fonts/Inter.woff2",
		"node_modules/@fontsource/material-icons/files/material-icons-latin-400-normal.woff2":
			"fonts/MaterialIcons.woff2",
	});

	eleventyConfig.addPlugin(minificationLocalPlugin);
	eleventyConfig.addPlugin(syntaxHighlightPlugin);
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed.rss",
		collection: {
			name: "posts",
			limit: 10,
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

	Object.entries(shortcodes).forEach(([key, value]) => {
		eleventyConfig.addShortcode(key, value);
	});
}

export const config = {
	dir: {
		input: "src",
	},
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};
