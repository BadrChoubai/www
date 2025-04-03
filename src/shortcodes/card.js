import { keywordList } from "./keywords.js";

export const card = ({ url, title, summary, keywords }) => `
			<article class="card">
				<header>
					<hgroup>
						<h2>
							<a rel="noopener noreferrer" target="_blank" href="${url}">${title}</a>
							<span class="icon">open_in_new</span>
						</h2>
					</hgroup>
				</header>
				<p>
					${summary}
				</p>
				${keywordList(keywords)}
			</article>
		`;
