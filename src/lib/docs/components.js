import { getDocsPaths } from './github.js';

function slugToLabel(slug) {
	return String(slug || '')
		.replace(/[-_]+/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function getComponentDocs(fetchFn) {
	const paths = await getDocsPaths(fetchFn);
	const items = paths
		.filter((p) => p.startsWith('docs/components/') && p.endsWith('.md'))
		.map((p) => {
			const base = p.split('/').pop() || '';
			const slug = base.replace(/\.md$/, '');
			return {
				key: p,
				slug,
				label: slugToLabel(slug),
				href: `/components/${slug}`
			};
		})
		.sort((a, b) => a.label.localeCompare(b.label));

	return items;
}
