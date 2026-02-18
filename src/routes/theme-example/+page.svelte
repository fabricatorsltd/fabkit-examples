<script>
	import { onMount } from 'svelte';
	import { initTheme, Button, HBox, VBox, TextField, Card, TextRich, Switcher } from 'fabkit';

	let customTheme = $state(false);
	let primaryColor = $state('#6366f1');
	let fontFamily = $state("'Inter', sans-serif");
	let borderRadius = $state(12);

	// Sample themes for quick switching
	const sampleThemes = [
		{ name: 'Default (Blue)', color: '#2196F3', font: "'Noto Sans', sans-serif", radius: 8 },
		{ name: 'Indigo', color: '#6366f1', font: "'Inter', sans-serif", radius: 12 },
		{ name: 'Coral', color: '#ff6b6b', font: "'Poppins', sans-serif", radius: 16 },
		{ name: 'Emerald', color: '#10b981', font: "'Roboto', sans-serif", radius: 6 },
		{ name: 'Purple', color: '#8b5cf6', font: "'DM Sans', sans-serif", radius: 20 }
	];

	$effect(() => {
		if (customTheme) {
			initTheme({
				fonts: { primary: fontFamily },
				colors: { primary: primaryColor },
				dimensions: { borderRadius: borderRadius }
			});
		}
	});

	function applyPreset(preset) {
		primaryColor = preset.color;
		fontFamily = preset.font;
		borderRadius = preset.radius;
		customTheme = true;
	}

	function resetToDefault() {
		customTheme = false;
		// Force page reload to reset CSS variables
		window.location.reload();
	}
</script>

<div class="theme-example">
	<VBox spacing={30} align="fill">
		<TextRich>
			<h1>🎨 Brand Theme Example</h1>
			<p>
				Questa pagina dimostra come un progetto può inizializzare fabkit con il proprio tema brand.
			</p>
		</TextRich>

		<Card>
			<VBox spacing={20} align="fill" margin={16}>
				<TextRich>
					<h2>Theme Controls</h2>
				</TextRich>

				<HBox spacing={10}>
					<span>Custom Theme:</span>
					<Switcher model={customTheme} on:change={(e) => (customTheme = e.detail)} />
				</HBox>

				{#if customTheme}
					<VBox spacing={15} align="fill">
						<TextField label="Primary Color" bind:value={primaryColor} placeholder="#6366f1" />
						<TextField
							label="Font Family"
							bind:value={fontFamily}
							placeholder="'Inter', sans-serif"
						/>
						<TextField label="Border Radius" bind:value={borderRadius} placeholder="12" />
					</VBox>
				{/if}

				<TextRich>
					<h3>Quick Presets</h3>
				</TextRich>
				<HBox spacing={10}>
					{#each sampleThemes as preset}
						<Button label={preset.name} onclick={() => applyPreset(preset)} square />
					{/each}
				</HBox>

				{#if customTheme}
					<Button label="Reset to Default" type="destructive" onclick={resetToDefault} />
				{/if}
			</VBox>
		</Card>

		<Card>
			<VBox spacing={20} align="fill" margin={16}>
				<TextRich>
					<h2>Component Preview</h2>
					<p>Questi componenti usano il tema corrente:</p>
				</TextRich>

				<HBox spacing={15}>
					<Button label="Normal" />
					<Button label="Suggested" type="suggested" icon="check" />
					<Button label="Destructive" type="destructive" icon="close" />
				</HBox>

				<TextField label="Sample Input" placeholder="Digita qualcosa..." />
			</VBox>
		</Card>

		<Card>
			<VBox spacing={15} align="fill" margin={16}>
				<TextRich>
					<h2>Usage Code</h2>
				</TextRich>
				<TextRich>
					<code
						><pre>{`import { initTheme } from 'fabkit';

// Initialize with your brand theme
initTheme({
  fonts: { primary: "${fontFamily}" },
  colors: { primary: "${primaryColor}" },
  dimensions: { borderRadius: ${borderRadius} }
});`}</pre></code
					>
				</TextRich>
			</VBox>
		</Card>
	</VBox>
</div>

<style>
	.theme-example {
		padding: 30px;
		max-width: 800px;
		margin: 0 auto;
		background: var(--background-base);
		min-height: 100vh;
	}
</style>
