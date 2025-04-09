export const emoji = (emoji, alt = "") =>
	`<span aria-hidden="true" class="emoji">${emoji}</span>` + (alt ? `<span class="sr-only">${alt}</span>` : "");
