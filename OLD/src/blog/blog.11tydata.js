import { DateTime } from "luxon";

export default {
	tags: ["posts"],
	layout: "layouts/post.njk",
	css: "prism",
	eleventyComputed: {
		dateString: ({ page }) =>
			DateTime.fromJSDate(page.date, { zone: "utc" }).toLocaleString(DateTime.DATE_FULL),
	},
};
