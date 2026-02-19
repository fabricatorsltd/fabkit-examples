<script>
	import * as Icons from 'fabkit';
	import { TextField, HBox, VBox, TitleBar, Window } from 'fabkit';
	import { PhMagnifyingGlass, PhX } from 'fabkit';

	// Collect only icon components (Ph* prefix)
	const allIcons = Object.entries(Icons)
		.filter(([name]) => name.startsWith('Ph'))
		.map(([name, component]) => ({
			name,
			// Display name: strip Ph prefix, add spaces before capitals
			label: name.slice(2).replace(/([A-Z])/g, ' $1').trim(),
			component
		}))
		.sort((a, b) => a.name.localeCompare(b.name));

	let query = $state('');
	let copiedName = $state('');
	let iconSize = $state(24);

	const filtered = $derived(
		query.trim() === ''
			? allIcons
			: allIcons.filter(icon =>
				icon.label.toLowerCase().includes(query.toLowerCase()) ||
				icon.name.toLowerCase().includes(query.toLowerCase())
			)
	);

	function copyToClipboard(name) {
		navigator.clipboard.writeText(`<${name} />`).then(() => {
			copiedName = name;
			setTimeout(() => { copiedName = ''; }, 1500);
		});
	}
</script>

<div class="icons-page">
	<div class="icons-header">
		<div class="icons-header-inner">
			<div class="icons-title">
				<h1>Phosphor Icons</h1>
				<span class="icons-count">{filtered.length} / {allIcons.length}</span>
			</div>
			<div class="icons-controls">
				<div class="icons-search">
					<PhMagnifyingGlass size={16} class="search-icon" />
					<input
						type="text"
						placeholder="Search icons…"
						bind:value={query}
						class="search-input"
					/>
					{#if query}
						<button class="search-clear" onclick={() => query = ''} aria-label="Clear">
							<PhX size={14} />
						</button>
					{/if}
				</div>
				<div class="size-control">
					<label for="icon-size">Size: {iconSize}px</label>
					<input id="icon-size" type="range" min="16" max="48" step="4" bind:value={iconSize} />
				</div>
			</div>
		</div>
	</div>

	<div class="icons-grid">
		{#if filtered.length === 0}
			<div class="icons-empty">
				<PhMagnifyingGlass size={40} />
				<p>No icons found for "<strong>{query}</strong>"</p>
			</div>
		{:else}
			{#each filtered as icon (icon.name)}
				{@const IconComp = icon.component}
				<button
					class="icon-cell"
					class:icon-cell--copied={copiedName === icon.name}
					onclick={() => copyToClipboard(icon.name)}
					title="Click to copy <{icon.name} />"
				>
					<div class="icon-cell-icon">
						<IconComp size={iconSize} />
					</div>
					<span class="icon-cell-label">{icon.label}</span>
					{#if copiedName === icon.name}
						<span class="icon-cell-copied-badge">Copied!</span>
					{/if}
				</button>
			{/each}
		{/if}
	</div>
</div>

<style>
	.icons-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background: var(--background-base, #fff);
		color: var(--text-primary, #111);
		font-family: inherit;
	}

	.icons-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--background-base, #fff);
		border-bottom: 1px solid var(--border-default, #e0e0e0);
		padding: 16px 24px;
	}

	.icons-header-inner {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		gap: 24px;
		flex-wrap: wrap;
	}

	.icons-title {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}

	.icons-title h1 {
		font-size: 20px;
		font-weight: 700;
		margin: 0;
	}

	.icons-count {
		font-size: 13px;
		opacity: 0.5;
		font-variant-numeric: tabular-nums;
	}

	.icons-controls {
		display: flex;
		align-items: center;
		gap: 16px;
		flex: 1;
		flex-wrap: wrap;
	}

	.icons-search {
		position: relative;
		display: flex;
		align-items: center;
		flex: 1;
		min-width: 200px;
		max-width: 400px;
		background: var(--background-elevated, #f5f5f5);
		border: 1px solid var(--border-default, #e0e0e0);
		border-radius: 8px;
		padding: 0 10px;
	}

	.icons-search :global(.search-icon) {
		opacity: 0.5;
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		padding: 8px 6px;
		font-size: 14px;
		color: inherit;
		outline: none;
	}

	.search-clear {
		background: none;
		border: none;
		cursor: pointer;
		padding: 2px;
		display: flex;
		align-items: center;
		opacity: 0.5;
		color: inherit;
	}

	.search-clear:hover {
		opacity: 1;
	}

	.size-control {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		white-space: nowrap;
	}

	.size-control label {
		min-width: 72px;
	}

	.size-control input[type="range"] {
		width: 100px;
		accent-color: var(--action-primary, #0066ff);
	}

	.icons-grid {
		flex: 1;
		overflow-y: auto;
		padding: 24px;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
		gap: 8px;
		align-content: start;
	}

	.icon-cell {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 14px 8px 10px;
		border: 1px solid transparent;
		border-radius: 10px;
		cursor: pointer;
		background: transparent;
		color: inherit;
		transition: background 0.15s, border-color 0.15s, transform 0.1s;
		font-family: inherit;
		text-align: center;
	}

	.icon-cell:hover {
		background: var(--background-elevated, #f5f5f5);
		border-color: var(--border-default, #e0e0e0);
	}

	.icon-cell:active {
		transform: scale(0.94);
	}

	.icon-cell--copied {
		background: var(--action-primary-subtle, #e8f0ff);
		border-color: var(--action-primary, #0066ff);
	}

	.icon-cell-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary, #111);
	}

	.icon-cell-label {
		font-size: 11px;
		opacity: 0.6;
		line-height: 1.2;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.icon-cell-copied-badge {
		position: absolute;
		top: 4px;
		right: 4px;
		font-size: 9px;
		font-weight: 700;
		background: var(--action-primary, #0066ff);
		color: #fff;
		padding: 2px 5px;
		border-radius: 4px;
		pointer-events: none;
	}

	.icons-empty {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 80px 0;
		opacity: 0.4;
	}

	.icons-empty p {
		margin: 0;
		font-size: 15px;
	}
</style>
