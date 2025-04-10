import { keywords } from "./keywords.js";

export const postCard = ({ url, title, summary, keywords: k }) => `
			<article class="card">
				<header>
					<hgroup>
						<h3>
							<a  href="${url}">${title}</a>
						</h3>
					</hgroup>
				</header>
				<p>
					${summary}
				</p>
				${keywords(k)}
			</article>
		`;

export const projectCard = ({ url, title, summary, keywords: k }) => `
			<article class="card">
				<header>
					<hgroup>
						<h3>
							<a rel="noopener noreferrer" target="_blank" href="${url}">${title}</a>
							<span class="icon">open_in_new</span>
						</h3>
					</hgroup>
				</header>
				<p>
					${summary}
				</p>
				${keywords(k)}
			</article>
		`;

export const raceInfoCard = ({ name, date, description, distance, format }) => `
			<article class="card">
			<h3>
				${name}
			</h3>
			<p>Distance: ${distance} / Format: ${format}</p>
			<p>${date}</p>
			</article>
`;
