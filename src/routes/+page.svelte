<script>
	import { goto } from '$app/navigation';
	import {
		AdaptiveFormLayout,
		AdaptiveFormRow,
		AdaptiveMedia,
		ActionBar,
		Button,
		Card,
		Clamp,
		Grid,
		HBox,
		Text,
		TextField,
		TextRich,
		VBox
	} from 'fabkit';
	import { PhArrowRight, PhBookOpen, PhSquaresFour } from 'fabkit';

	const primaryActions = [
		{ label: 'Browse components', icon: PhSquaresFour, onClick: () => goto('/components') },
		{ label: 'Read docs', icon: PhBookOpen, onClick: () => goto('/docs') },
		{ label: 'Icons', icon: PhArrowRight, onClick: () => goto('/icons') }
	];

	let username = $state('');
	let email = $state('');
</script>

<Clamp max={1100} margin={[0, 16, 40, 16]}>
	<VBox spacing={28} align="fill" padding={[28, 0, 0, 0]}>
		<VBox spacing={10} align="fill">
			<TextRich>
				<h1>Fabkit</h1>
				<p>
					A component-first toolkit for Svelte. Adaptive primitives, form fields, navigation, and a
					consistent style out of the box.
				</p>
			</TextRich>

			<HBox spacing={12} align="center" style="flex-wrap: wrap;">
				<ActionBar items={primaryActions} />
			</HBox>
		</VBox>

		<Grid columns={3} gap={12} style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
			<Card>
				<VBox spacing={10} align="fill">
					<Text style="font-weight: 700;">Adaptive</Text>
					<Text style="color: var(--text-secondary);">
						Container-driven components that switch layout when space changes.
					</Text>
					<Button variant="flat" label="Responsive demo" onClick={() => goto('/responsive')} />
				</VBox>
			</Card>

			<Card>
				<VBox spacing={10} align="fill">
					<Text style="font-weight: 700;">Components</Text>
					<Text style="color: var(--text-secondary);">
						A growing collection of layout, navigation, data and form building blocks.
					</Text>
					<Button variant="flat" label="Explore" onClick={() => goto('/components')} />
				</VBox>
			</Card>

			<Card>
				<VBox spacing={10} align="fill">
					<Text style="font-weight: 700;">Docs</Text>
					<Text style="color: var(--text-secondary);">
						Browse the docs live from GitHub (no local copy).
					</Text>
					<Button variant="flat" label="Open docs" onClick={() => goto('/docs')} />
				</VBox>
			</Card>
		</Grid>

		<Card>
			<VBox spacing={14} align="fill">
				<Text style="font-weight: 700;">AdaptiveFormLayout</Text>
				<Text style="color: var(--text-secondary);">
					Inline labels on wide containers, stacked labels on compact.
				</Text>

				<AdaptiveFormLayout stackAt={640} labelWidth={200}>
					<AdaptiveFormRow label="Username">
						<TextField bind:value={username} flat />
					</AdaptiveFormRow>

					<AdaptiveFormRow label="Email" help="We’ll never share your email.">
						<TextField bind:value={email} type="email" flat />
					</AdaptiveFormRow>
				</AdaptiveFormLayout>
			</VBox>
		</Card>

		<Card>
			<VBox spacing={14} align="fill">
				<Text style="font-weight: 700;">AdaptiveMedia</Text>
				<Text style="color: var(--text-secondary);">
					Switch crop/ratio based on container width.
				</Text>

				<AdaptiveMedia
					stackAt={680}
					src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
					alt="Demo media"
					wide={{ ratio: 3 / 1, crop: 'cover', borderRadius: 16 }}
					compact={{ ratio: 16 / 9, crop: 'cover', borderRadius: 16 }}
				/>
			</VBox>
		</Card>
	</VBox>
</Clamp>
