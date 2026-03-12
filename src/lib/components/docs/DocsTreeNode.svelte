<script>
	import { goto } from '$app/navigation';
	import { Button, VBox, Text } from 'fabkit';
	import DocsTreeNode from './DocsTreeNode.svelte';

	let { node, depth = 0, current = '' } = $props();

	const pad = $derived(depth * 10);
</script>

{#if node.type === 'dir'}
<VBox spacing={6} align="fill" style={`padding-left: ${pad}px;`}>
<Text style="font-weight: 700;">{node.name}</Text>
{#each node.children as child (child.key)}
	<DocsTreeNode node={child} depth={depth + 1} current={current} />
{/each}
</VBox>
{:else}
<Button
variant="flat"
label={node.name}
padding={[6, 10, 6, 10]}
style={`justify-content: flex-start; width: 100%; padding-left: ${pad + 6}px; ${
current === node.href ? 'background: var(--background-elevated);' : ''
}`}
onClick={() => goto(node.href)}
/>
{/if}
