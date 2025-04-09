/**
 * source: https://github.com/mvsde/website/blob/3e30851415581b7d7c55b21aaafa352eb7372030/eleventy/functions/page-state.js#L28
 */
/**
 * Check if current page is homepage
 * @param {string} page Current page URL
 * @returns {boolean}
 */
export function isHomePage(page) {
	return page === "/";
}

/**
 * Check if URL is current page
 * @param {Object} options
 * @param {string} options.current Current page URL
 * @param {string} options.url Comparison URL
 * @returns {boolean}
 */
export function isCurrentPage({ current, url }) {
	return current === url;
}

/**
 * Check if URL is active page
 * @param {Object} options
 * @param {string} options.current Current page URL
 * @param {string} options.url Comparison URL
 * @returns {boolean}
 */
export function isActivePage({ current, url }) {
	if (isHomePage(url)) {
		return isCurrentPage({ current, url });
	}

	return current.startsWith(url);
}
