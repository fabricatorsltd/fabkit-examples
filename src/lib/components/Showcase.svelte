<script>
	import { VBox } from 'snt-lib';

	let { title, description, children } = $props();
</script>

<div class="Showcase">
	<VBox spacing={15} margin={15} align="start">
		<h2 class="Showcase-title">{title}</h2>
		<p class="Showcase-description">{description}</p>
		<div class="Showcase-content">
			{@render children?.()}
		</div>
	</VBox>
</div>

<style>
	.Showcase {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		height: 100%;
		width: 100%;
	}

	.Showcase-title {
		font-size: 1.5rem;
		font-weight: 400;
		margin: 0;
	}

	.Showcase-description {
		font-size: 1rem;
		font-weight: 300;
		margin: 0;
	}

	.Showcase-content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		flex-grow: 1;
		height: 100%;
		width: 100%;
		background-color: var(--background-base);
		border-radius: 8px;
	}
</style>
