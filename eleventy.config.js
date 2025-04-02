import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import minificationLocalPlugin from "./config/minification.js";
import { DateTime } from "luxon";

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
		"node_modules/@fontsource-variable/alegreya/files/alegreya-latin-wght-normal.woff2":
			"fonts/Alegreya.woff2",
		"node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2":
			"fonts/Inter.woff2",
		"node_modules/@fontsource/material-icons/files/material-icons-latin-400-normal.woff2":
			"fonts/MaterialIcons.woff2",
	});

	eleventyConfig.addPlugin(minificationLocalPlugin);
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
				<span class="keyword">${post.data.keyword}</span>
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
						<span class="icon">open_in_new</span>
					</h2>
				</hgroup>
			</header>
			<p>
				${project.description}
			</p>
			<span class="keyword">${project.keyword}</span>
			</article>
			`;
	});
}

export const config = {
	dir: {
		input: "src",
	},
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};
