/**
 * @name keywords
 * @param keywords {any[]} - An array of keywords to be returned in a `<ul>` element.
 * @returns {string[]} An HTML Unordered List
 */
export const keywordList = (keywords) => {
	return `
	<ul>
		${keywordListItems(keywords).join("")}
	</ul>
	`;
};

/**
 * Generates a list of HTML `<li>` elements for a given array of keywords.
 *
 * @name keywordListItem
 * @param {string[]} keywordList - An array of keywords to be wrapped in `<li>` elements.
 * @returns {string[]} An array of HTML string representations of list items.
 */
const keywordListItems = (keywordList) =>
	keywordList.map((keyword) => {
		return `<li class="keyword">${keyword}</li>`;
	});
