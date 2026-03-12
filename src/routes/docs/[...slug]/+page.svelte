<script>
import { page } from '$app/stores';
import { NavigationSplitView, VBox, Text } from 'fabkit';
import { getDocsPaths, getDocMarkdown } from '$lib/docs/github.js';
import DocsSidebar from '$lib/components/docs/DocsSidebar.svelte';
import DocsMarkdown from '$lib/components/docs/DocsMarkdown.svelte';

let loadingTree = $state(true);
let loadingDoc = $state(true);
let error = $state('');

let tree = $state([]);
let query = $state('');

function buildTree(paths) {
const root = { type: 'dir', name: 'docs', key: 'docs', children: [] };

const ensureDir = (parent, name, key) => {
let dir = parent.children.find((c) => c.type === 'dir' && c.name === name);
if (!dir) {
dir = { type: 'dir', name, key, children: [] };
parent.children.push(dir);
}
return dir;
};

for (const full of paths) {
const rel = full.replace(/^docs\//, '');
const parts = rel.split('/');
let cursor = root;

for (let i = 0; i < parts.length; i++) {
const part = parts[i];
const isFile = i === parts.length - 1;

if (isFile) {
const name = part.replace(/\.md$/, '');
const slug = rel.replace(/\.md$/, '');
const href = `/docs/${slug === 'README' ? '' : slug}`.replace(/\/$/, '');
cursor.children.push({ type: 'file', name, key: full, href });
} else {
cursor = ensureDir(cursor, part, `${cursor.key}/${part}`);
}
}
}

const sortNode = (node) => {
if (node.type === 'dir') {
node.children = node.children.map(sortNode);
node.children.sort((a, b) => {
if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
return a.name.localeCompare(b.name);
});
}
return node;
};

return sortNode(root).children;
}

let docPath = $derived.by(() => {
const slug = $page.params.slug;
const rel = slug ? String(slug) : 'README';
const normalized = rel.endsWith('.md') ? rel : `${rel}.md`;
return `docs/${normalized}`;
});

let currentHref = $derived.by(() => {
const slug = $page.params.slug;
const rel = slug ? String(slug) : '';
return rel ? `/docs/${rel}` : '/docs';
});

let markdown = $state('');

$effect(() => {
error = '';
loadingTree = true;

getDocsPaths(fetch)
.then((paths) => {
tree = buildTree(paths);
})
.catch((e) => {
error = String(e?.message || e);
})
.finally(() => {
loadingTree = false;
});
});

$effect(() => {
error = '';
loadingDoc = true;

getDocMarkdown(fetch, docPath)
.then((md) => {
markdown = md;
})
.catch((e) => {
error = String(e?.message || e);
markdown = '';
})
.finally(() => {
loadingDoc = false;
});
});
</script>

<NavigationSplitView stackAt={980} sidebarWidth={340}>
{#snippet sidebar()}
{#if loadingTree}
<VBox padding={[16, 16, 16, 16]}>
<Text style="color: var(--text-secondary);">Loading…</Text>
</VBox>
{:else}
<DocsSidebar {tree} bind:query current={currentHref} />
{/if}
{/snippet}

{#snippet content()}
{#if loadingDoc}
<VBox padding={[16, 16, 16, 16]}>
<Text style="color: var(--text-secondary);">Loading…</Text>
</VBox>
{:else}
<DocsMarkdown {markdown} title={docPath.replace('docs/', '')} />
{/if}
{/snippet}
</NavigationSplitView>

{#if error}
<VBox padding={[16, 16, 16, 16]}>
<Text style="color: var(--text-secondary);">Error: {error}</Text>
</VBox>
{/if}
