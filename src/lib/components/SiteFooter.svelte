<script>
	import { Clamp, HBox, Text } from 'fabkit';
</script>

<footer class="SiteFooter">
	<Clamp max={1100} margin={[0, 16, 0, 16]}>
		<HBox align="center" justify="space-between">
			<Text>Fabkit Examples</Text>
			<a class="FooterLink" href="https://fabricators.ltd" target="_blank" rel="noreferrer">
				powered by fabricators.ltd
			</a>
		</HBox>
	</Clamp>
</footer>

<style>
	.SiteFooter {
		border-top: 1px solid var(--border-primary);
		padding: 18px 0;
		background: var(--background-base);
	}

	.FooterLink {
		color: var(--text-secondary);
		text-decoration: none;
	}

	.FooterLink:hover {
		color: var(--text-primary);
		text-decoration: underline;
	}
</style>
