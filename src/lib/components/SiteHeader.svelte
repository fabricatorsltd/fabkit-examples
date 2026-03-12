<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ActionBar, Clamp, HBox, HideBelow, Optional, Text, VBox } from 'fabkit';
	import { PhAppWindow, PhBookOpen, PhHouse, PhSquaresFour, PhPalette, PhDeviceMobile } from 'fabkit';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	const navItems = [
		{ label: 'Home', icon: PhHouse, onClick: () => goto('/') },
		{ label: 'Components', icon: PhSquaresFour, onClick: () => goto('/components') },
		{ label: 'Responsive', icon: PhDeviceMobile, onClick: () => goto('/responsive') },
		{ label: 'Docs', icon: PhBookOpen, onClick: () => goto('/docs') },
		{ label: 'Icons', icon: PhPalette, onClick: () => goto('/icons') },
		{ label: 'Window', icon: PhAppWindow, onClick: () => goto('/window') }
	];

	let isDocs = $derived($page.url.pathname.startsWith('/docs'));
</script>

<header class="SiteHeader">
	<Clamp max={1100} margin={[0, 16, 0, 16]}>
		<VBox spacing={10} align="fill" padding={[16, 0, 16, 0]}>
			<HBox align="center" justify="space-between" spacing={12}>
				<HBox align="center" spacing={10}>
					<Text style="font-weight: 700;">Fabkit</Text>
					<HideBelow below={520}>
						<Text style="color: var(--text-secondary);">UI toolkit for Svelte</Text>
					</HideBelow>
				</HBox>

				<Optional below={720} orderBelow={999}>
					<ActionBar items={navItems} />
				</Optional>
			</HBox>

			{#if !isDocs}
				<Breadcrumbs />
			{/if}
		</VBox>
	</Clamp>
</header>

<style>
	.SiteHeader {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--background-base);
		border-bottom: 1px solid var(--border-primary);
	}
</style>
