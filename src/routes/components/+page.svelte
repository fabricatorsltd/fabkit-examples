<script>
	import { Clamp, TextRich, VBox, Text, Card } from 'fabkit';
</script>

<Clamp max={1100} margin={[0, 16, 40, 16]}>
	<VBox spacing={22} align="fill" padding={[28, 0, 0, 0]}>
		<TextRich>
			<h1>Components</h1>
			<p>
				Pick a component from the sidebar to see a live demo and the latest docs pulled from GitHub.
			</p>
		</TextRich>

		<Card>
			<VBox spacing={10} align="fill">
				<Text style="font-weight: 700;">What you get</Text>
				<Text style="color: var(--text-secondary);">
					A per-component page with an interactive demo (where available) and the authoritative
					markdown from
					<code>fabkit/docs/components</code>.
				</Text>
			</VBox>
		</Card>
	</VBox>
</Clamp>
