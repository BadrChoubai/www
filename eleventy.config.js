import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import minificationLocalPlugin from "./config/minification.js";

import { keywordList } from "./shortcodes/keywords.js";

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

	eleventyConfig.addShortcode("emoji", function (emoji, alt = "") {
		return (
			`<span aria-hidden="true" class="emoji">${emoji}</span>` +
			(alt ? `<span class="sr-only">${alt}</span>` : "")
		);
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
				${keywordList(post.data.keywords)}
			</article>
			`;
	});

	eleventyConfig.addShortcode("projectCard", function (project) {
		return `
			<article class="card">
				<header>
					<hgroup>
						<h2>
							<a rel="noopener noreferrer" target="_blank" href="${project.url}">${project.name}</a>
							<span class="icon">open_in_new</span>
						</h2>
					</hgroup>
				</header>
				<p>
					${project.description}
				</p>
				${keywordList(project.keywords)}
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
