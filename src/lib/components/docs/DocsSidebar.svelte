<script>
import { VBox, SearchField, Text } from 'fabkit';
import DocsTreeNode from './DocsTreeNode.svelte';

let { tree = [], query = $bindable(''), current = '' } = $props();

const filteredTree = $derived.by(() => {
const q = String(query || '').trim().toLowerCase();
if (!q) return tree;

const filterNode = (node) => {
if (node.type === 'file') {
return node.name.toLowerCase().includes(q) ? node : null;
}

const children = node.children.map(filterNode).filter(Boolean);
if (node.name.toLowerCase().includes(q)) return { ...node, children: node.children };
return children.length ? { ...node, children } : null;
};

return tree.map(filterNode).filter(Boolean);
});
</script>

<VBox spacing={12} align="fill" padding={[14, 14, 14, 14]}>
<Text style="font-weight: 700;">Docs</Text>
<SearchField bind:value={query} placeholder="Search docs…" />
<VBox spacing={10} align="fill">
{#each filteredTree as node (node.key)}
<DocsTreeNode {node} depth={0} {current} />
{/each}
</VBox>
</VBox>
