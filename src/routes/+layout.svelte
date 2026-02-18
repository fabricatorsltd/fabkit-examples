<script>
	import favicon from '$lib/assets/favicon.svg';
	import EngineDecorator from 'snt-lib/components/EngineDecorator.svelte';
	import { initTheme } from 'snt-lib';

	initTheme({
		colors: {
			// Semantic Mappings
			primary: '#ff7d00', // ic-500
			primaryHover: '#e66b00', // ic-600
			primaryActive: '#c46854', // ic-700
			primaryDisabled: '#ffd9a0', // ic-100

			// Full Palette (Original Names)
			'ic-50': '#ffeed7',
			'ic-100': '#ffd9a0',
			'ic-200': '#ffb76f',
			'ic-300': '#ff9c3e',
			'ic-400': '#ff8200',
			'ic-500': '#ff7d00',
			'ic-600': '#e66b00',
			'ic-700': '#c46854',
			'ic-800': '#7a2b2b',
			'ic-900': '#4a1a1a',
			paper: '#fbfbfb'
		},
		fonts: {
			primary: "'Saira', sans-serif"
		},
		dimensions: {
			borderRadius: 12
		}
	});

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<EngineDecorator>
	{@render children?.()}
</EngineDecorator>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
		background: #ffeed7;
		font-family: 'Saira', sans-serif;
		--color-ic-shadow: rgba(0, 0, 0, 0.1);
		--color-ic-slate: #6a7282;
		--radius-xl: 12px;
		--spacing: 0.25rem;
	}
	:global(.TitleBar) {
		border-radius: 8px 8px 0 0;
	}

	:global(button) {
		cursor: pointer;
	}

	:global(.card:not(.ic-input)),
	:global(.Card:not(.ic-input)) {
		border-radius: var(--radius-xl);
		background-color: white;
		padding: calc(var(--spacing) * 5) calc(var(--spacing) * 4);
		border: none !important;
		box-shadow:
			0 4px 6px -1px var(--color-ic-shadow),
			0 2px 4px -2px var(--color-ic-shadow);
	}

	:global(.ic-input) {
		border: 1px solid #d4d4d8 !important;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: none !important;
	}

	:global(.ic-input:focus-within) {
		border-color: #ff8200 !important;
		box-shadow: 0 0 0 1px #ff8200 !important;
	}

	:global(.directives-tooltip) {
		position: absolute;
		bottom: 100%;
		width: max-content;
		margin-bottom: 8px;
		left: 50%;
		transform: translateX(-50%);
		background-color: black;
		color: white;
		font-size: 12px;
		border-radius: 4px;
		padding: 4px 8px;
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	:global(.directives-tooltip-visible) {
		opacity: 1;
		pointer-events: auto;
	}

	:global(.disabled),
	:global([disabled]) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.ic-focus-border) {
		/* Geometry handled by component props to prevent hover conflict */
		box-sizing: border-box;
		border-color: transparent !important;
	}

	:global(.ic-focus-border:focus-within) {
		border-color: #ff8200 !important;
	}
</style>
