import { regionId, siteId, type Site } from '../types/sitelist';

const site: Site = {
	id: siteId('thediff'),
	title: 'The Diff',
	hosts: ['www.thediff.co', 'thediff.co'],
	paths: [{ regexp: '^/archive(?:/page/[0-9]+)?/?$' }],
	regions: [
		{
			id: regionId('non-longreads'),
			title: 'Non-Longreads entries and premium cards',
			type: 'remove',
			paths: 'inherit',
			selectors: [
				'.post-list > li:has(article.post-item)',
				// Premium cards have no post title and remain hidden by the text filter.
				'.post-list > li:has(aside.cta .button-premium)',
			],
			keepText: { selector: '.post-item-header h3', includes: 'longreads' },
		},
	],
};

export default site;
