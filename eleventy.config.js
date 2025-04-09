import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { InputPathToUrlTransformPlugin as pluginInputPathToURL } from "@11ty/eleventy";
import yaml from "js-yaml";

import minificationLocalPlugin from "./eleventy/config/minification.js";
import * as shortcodes from "./eleventy/shortcodes/index.js";
import * as functions from "./eleventy/functions/index.js";

export const config = {
	dir: {
		input: "src",

		layouts: "_layouts",
	},
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};

export default async function (eleventyConfig) {
	eleventyConfig.addCollection("published", (collection) => {
		return collection
			.getFilteredByTags("posts")
			.filter((post) => !post.data.draft)
			.sort((o, n) => n.date - o.date);
	});

	eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
	eleventyConfig.addPassthroughCopy("favicon.ico");
	eleventyConfig.addPassthroughCopy("resume.pdf");
	eleventyConfig.addPassthroughCopy({
		"./public": "/",
		"node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2": "fonts/Inter.woff2",
		"node_modules/@fontsource/material-icons/files/material-icons-latin-400-normal.woff2": "fonts/MaterialIcons.woff2",
	});

	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(pluginWebc, {
		components: ["./src/_components/**/*.webc"],
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

	// Shortcodes
	for (const [name, method] of Object.entries(shortcodes)) {
		eleventyConfig.addShortcode(name, method);
	}
	// Functions
	for (const [name, method] of Object.entries(functions)) {
		eleventyConfig.addJavaScriptFunction(name, method);
	}
}
