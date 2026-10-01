import type { Region } from '../types/sitelist';

export const textFilterAttribute = (region: Region) =>
	`data-nfe-text-filter-${encodeURIComponent(region.id)}`;

export const textFilterSelector = (region: Region) =>
	region.selectors.map(selector => `${selector}:not([${textFilterAttribute(region)}])`).join(',');

export function updateTextFilter(root: ParentNode, region: Region) {
	if (region.keepText == null) return;
	const { selector, includes } = region.keepText;
	const attribute = textFilterAttribute(region);
	for (const element of root.querySelectorAll(region.selectors.join(','))) {
		const title = element.querySelector(selector)?.textContent;
		// Only matching titles are visible, including during incremental parsing.
		const keep = title != null && title.toLowerCase().includes(includes.toLowerCase());
		if (element.hasAttribute(attribute) !== keep) {
			element.toggleAttribute(attribute, keep);
		}
	}
}
