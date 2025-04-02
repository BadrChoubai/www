import CleanCSS from "clean-css";

export default function (eleventyConfig) {
	eleventyConfig.addFilter("cssmin", function (code) {
		if (process.env.NODE_ENV === "production") {
			return new CleanCSS({}).minify(code).styles;
		}

		return code;
	});
}
