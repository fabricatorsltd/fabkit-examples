<script>
	import '$lib/style/vnt.css';
	import favicon from '$lib/assets/favicon.svg';
	import { EngineDecorator, initTheme, VBox } from 'fabkit';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	initTheme();

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<EngineDecorator>
	<VBox class="AppShell" align="fill" spacing={0}>
		<SiteHeader />
		<main class="AppMain">{@render children?.()}</main>
		<SiteFooter />
	</VBox>
</EngineDecorator>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: var(--background-base);
		color: var(--text-primary);
	}

	.AppMain {
		min-height: calc(100vh - 120px);
	}
</style>
