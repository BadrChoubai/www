/**
 * Generates a list of HTML `<li>` elements for a given array of keywords.
 * @param {string[]} keywords - An array of keywords.
 * @returns {string} HTML list items as a single string.
 */
const keywordListItems = (keywords) => keywords.map((keyword) => `<li class="keyword">${keyword}</li>`).join("");

// Creates an unordered list `<ul>` from an array of keywords.
export const keywords = (keywords) => `<ul>${keywordListItems(keywords)}</ul>`;
