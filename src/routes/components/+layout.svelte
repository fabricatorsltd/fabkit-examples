<script>
	import { page } from '$app/stores';
	import { NavigationSplitView, VBox, Text } from 'fabkit';
	import { getComponentDocs } from '$lib/docs/components.js';
	import ComponentsSidebar from '$lib/components/components/ComponentsSidebar.svelte';

	let { children } = $props();

	let loading = $state(true);
	let error = $state('');
	let items = $state([]);
	let query = $state('');

	let current = $derived($page.url.pathname);

	$effect(() => {
		error = '';
		loading = true;

		getComponentDocs(fetch)
			.then((list) => {
				items = list;
			})
			.catch((e) => {
				error = String(e?.message || e);
				items = [];
			})
			.finally(() => {
				loading = false;
			});
	});
</script>

<NavigationSplitView stackAt={980} sidebarWidth={340}>
	{#snippet sidebar()}
		{#if loading}
			<VBox padding={[16, 16, 16, 16]}>
				<Text style="color: var(--text-secondary);">Loading…</Text>
			</VBox>
		{:else}
			<ComponentsSidebar {items} bind:query {current} />
		{/if}
	{/snippet}

	{#snippet content()}
		{@render children?.()}
	{/snippet}
</NavigationSplitView>

{#if error}
	<VBox padding={[16, 16, 16, 16]}>
		<Text style="color: var(--text-secondary);">Error: {error}</Text>
	</VBox>
{/if}
