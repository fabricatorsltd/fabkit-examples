<script>
	import { VBox, SearchField, Text, Button } from 'fabkit';
	import { goto } from '$app/navigation';

	let { items = [], query = $bindable(''), current = '' } = $props();

	const filtered = $derived.by(() => {
		const q = String(query || '')
			.trim()
			.toLowerCase();
		if (!q) return items;
		return items.filter(
			(it) => it.label.toLowerCase().includes(q) || it.slug.toLowerCase().includes(q)
		);
	});
</script>

<VBox spacing={12} align="fill" padding={[14, 14, 14, 14]}>
	<Text style="font-weight: 700;">Components</Text>
	<SearchField bind:value={query} placeholder="Search components…" />

	<VBox spacing={6} align="fill">
		<Button
			variant={current === '/components' ? 'secondary' : 'flat'}
			label="Overview"
			onClick={() => goto('/components')}
		/>

		{#each filtered as it (it.key)}
			<Button
				variant={current === it.href ? 'secondary' : 'flat'}
				label={it.label}
				onClick={() => goto(it.href)}
			/>
		{/each}
	</VBox>
</VBox>
