<script>
	import Icon from '@iconify/svelte';
	import { getIconData } from '@iconify/utils';

	export let icons;
	export let name;
	export let width = 'auto';
	export let height = '';
	export let __class = '';

	// Compatibility adaptation:
	if (!width && !height) {
		width = '1em';
		height = '1em';
	} else if (!width) {
		width = height;
	} else if (!height) {
		height = width;
	}

	let iconData = null;
	$: {
		if (icons && name) {
			iconData = getIconData(icons, name);
		}
	}
</script>

{#if iconData}
	<Icon icon={iconData} {width} {height} class={__class} />
{/if}
