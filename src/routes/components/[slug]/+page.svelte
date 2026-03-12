<script>
	import { page } from '$app/stores';
	import { VBox, Text } from 'fabkit';
	import { getDocMarkdown } from '$lib/docs/github.js';
	import DocsMarkdown from '$lib/components/docs/DocsMarkdown.svelte';
	import ComponentDemo from '$lib/components/components/ComponentDemo.svelte';

	let loading = $state(true);
	let error = $state('');
	let markdown = $state('');

	let slug = $derived(String($page.params.slug || ''));
	let docPath = $derived(`docs/components/${slug}.md`);

	$effect(() => {
		error = '';
		loading = true;

		getDocMarkdown(fetch, docPath)
			.then((md) => {
				markdown = md;
			})
			.catch((e) => {
				error = String(e?.message || e);
				markdown = '';
			})
			.finally(() => {
				loading = false;
			});
	});
</script>

<VBox spacing={12} align="fill" padding={[18, 18, 18, 18]}>
	<ComponentDemo {slug} />

	{#if loading}
		<Text style="color: var(--text-secondary);">Loading…</Text>
	{:else}
		<DocsMarkdown {markdown} title={docPath.replace('docs/', '')} />
	{/if}

	{#if error}
		<Text style="color: var(--text-secondary);">Error: {error}</Text>
	{/if}
</VBox>
