<script>
	import {
		Accordion,
		AccordionItem,
		AdaptiveFormLayout,
		AdaptiveFormRow,
		ActionBar,
		AdaptiveTable,
		Button,
		Card,
		Checkbox,
		Chip,
		ColorPicker,
		DataTable,
		Dialog,
		EntryRow,
		FileChooser,
		Grid,
		HBox,
		HideBelow,
		Kbd,
		LevelBar,
		Menu,
		NumberField,
		Optional,
		PopOver,
		RadioGroup,
		SearchField,
		Separator,
		Skeleton,
		SlideOver,
		SlideOverContent,
		Slider,
		SwitchRow,
		Switcher,
		TagsInput,
		Text,
		TextArea,
		TextField,
		TextRich,
		Tooltip,
		VBox,
		SelectField
	} from 'fabkit';
	import { PhCopy, PhDotsThreeVertical, PhPlay } from 'fabkit';

	let { slug = '' } = $props();

	let key = $derived(String(slug || '').toLowerCase());

	let flat = $state(true);
	let value = $state('');
	let value2 = $state('');
	let qty = $state(1);
	let country = $state('Italy');
	let checked = $state(false);
	let selected = $state('a');
	let tags = $state(['fabkit', 'svelte']);
	let color = $state('#ff3366');
	let dialogOpen = $state(false);
	let sheetOpen = $state(false);
	let popOpen = $state(false);
	let popBtn = $state();
	let switchRowChecked = $state(true);

	const countries = [
		{ label: 'Italy', value: 'Italy' },
		{ label: 'Germany', value: 'Germany' },
		{ label: 'Japan', value: 'Japan' },
		{ label: 'United States', value: 'United States' }
	];

	const radioOptions = [
		{ label: 'Option A', value: 'a' },
		{ label: 'Option B', value: 'b' }
	];

	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'title', label: 'Title' },
		{ key: 'state', label: 'State' }
	];

	const rows = [
		{ id: 'FAB-1', title: 'Flat fields', state: 'Done' },
		{ id: 'FAB-2', title: 'Adaptive layout', state: 'Done' },
		{ id: 'FAB-3', title: 'Docs route', state: 'In progress' }
	];

	const menuItems = [
		{ label: 'Copy install', action: () => navigator.clipboard?.writeText('npm i fabkit') },
		{
			label: 'Copy import',
			action: () => navigator.clipboard?.writeText(`import { ${slugToExport(key)} } from 'fabkit';`)
		}
	];

	function slugToExport(s) {
		const map = {
			accordion: 'Accordion',
			'accordion-item': 'AccordionItem',
			'action-bar': 'ActionBar',
			'action-row': 'ActionRow',
			'adaptive-form-layout': 'AdaptiveFormLayout',
			'adaptive-media': 'AdaptiveMedia',
			'adaptive-table': 'AdaptiveTable',
			button: 'Button',
			card: 'Card',
			checkbox: 'Checkbox',
			chip: 'Chip',
			'color-picker': 'ColorPicker',
			'context-area': 'ContextArea',
			'data-table': 'DataTable',
			dialog: 'Dialog',
			'entry-row': 'EntryRow',
			'file-chooser': 'FileChooser',
			grid: 'Grid',
			hbox: 'HBox',
			'hide-below': 'HideBelow',
			kbd: 'Kbd',
			'level-bar': 'LevelBar',
			menu: 'Menu',
			'number-field': 'NumberField',
			optional: 'Optional',
			'pop-over': 'PopOver',
			'radio-group': 'RadioGroup',
			'search-field': 'SearchField',
			'select-field': 'SelectField',
			separator: 'Separator',
			skeleton: 'Skeleton',
			'slide-over': 'SlideOver',
			'slide-over-content': 'SlideOverContent',
			slider: 'Slider',
			'switch-row': 'SwitchRow',
			switcher: 'Switcher',
			'tags-input': 'TagsInput',
			text: 'Text',
			'text-area': 'TextArea',
			'text-field': 'TextField',
			'text-rich': 'TextRich',
			'title-bar': 'TitleBar',
			tooltip: 'Tooltip',
			vbox: 'VBox'
		};
		return map[String(s || '').toLowerCase()] || '...';
	}

	const supportsFlat = $derived.by(() => {
		return [
			'text-field',
			'text-area',
			'number-field',
			'select-field',
			'tags-input',
			'color-picker'
		].includes(key);
	});

	const toolbarItems = $derived.by(() => [
		{ label: 'Run', icon: PhPlay, onClick: () => {} },
		{
			label: 'Copy import',
			icon: PhCopy,
			onClick: () =>
				navigator.clipboard?.writeText(`import { ${slugToExport(key)} } from 'fabkit';`)
		}
	]);
</script>

<Card padding={[16, 16, 16, 16]}>
	<VBox spacing={14} align="fill">
		<HBox align="center" justify="space-between" spacing={12} style="flex-wrap: wrap;">
			<Text style="font-weight: 700;">Interactive demo</Text>
			{#if supportsFlat}
				<HBox align="center" spacing={10}>
					<Text style="color: var(--text-secondary);">Flat</Text>
					<Switcher bind:model={flat} />
				</HBox>
			{/if}
		</HBox>

		<ActionBar items={toolbarItems} />

		{#if key === 'button'}
			<HBox spacing={10} align="center" style="flex-wrap: wrap;">
				<Button variant="primary" label="Primary" />
				<Button variant="secondary" label="Secondary" />
				<Button variant="destructive" label="Destructive" />
				<Button variant="flat" label="Flat" />
			</HBox>
		{:else if key === 'text-field'}
			<VBox spacing={12} align="fill">
				<TextField label="Name" bind:value placeholder="Jane Doe" {flat} />
				<TextField
					label="Email"
					bind:value={value2}
					type="email"
					placeholder="jane@example.com"
					{flat}
				/>
			</VBox>
		{:else if key === 'text-area'}
			<TextArea label="Message" bind:value placeholder="Write something…" {flat} />
		{:else if key === 'number-field'}
			<NumberField label="Quantity" bind:value={qty} min={1} {flat} />
		{:else if key === 'select-field'}
			<SelectField label="Country" bind:value={country} options={countries} {flat} />
		{:else if key === 'search-field'}
			<SearchField bind:value placeholder="Search…" />
		{:else if key === 'checkbox'}
			<Checkbox bind:checked label="Accept terms" />
		{:else if key === 'radio-group'}
			<RadioGroup options={radioOptions} bind:value={selected} />
		{:else if key === 'tags-input'}
			<TagsInput bind:values={tags} placeholder="Add tag…" {flat} />
		{:else if key === 'color-picker'}
			<ColorPicker bind:value={color} {flat} />
		{:else if key === 'accordion'}
			<Accordion>
				<AccordionItem title="Section 1">Content for section 1</AccordionItem>
				<AccordionItem title="Section 2">Content for section 2</AccordionItem>
			</Accordion>
		{:else if key === 'action-bar'}
			<ActionBar items={menuItems.map((it) => ({ label: it.label, onClick: it.action }))} />
		{:else if key === 'adaptive-form-layout'}
			<AdaptiveFormLayout stackAt={720} labelWidth={240}>
				<AdaptiveFormRow label="Name">
					<TextField bind:value placeholder="Jane" {flat} />
				</AdaptiveFormRow>
				<AdaptiveFormRow label="Company" help="Labels stack on compact containers.">
					<TextField bind:value={value2} placeholder="Fabricators" {flat} />
				</AdaptiveFormRow>
			</AdaptiveFormLayout>
		{:else if key === 'adaptive-table'}
			<AdaptiveTable {columns} {rows} stackAt={760} />
		{:else if key === 'data-table'}
			<DataTable {columns} {rows} />
		{:else if key === 'dialog'}
			<VBox spacing={10} align="fill">
				<Button label="Open dialog" onClick={() => (dialogOpen = true)} />
				{#if dialogOpen}
					<Dialog
						title="Confirm"
						messages={['This action cannot be undone.', 'Are you sure?']}
						confirmText="Confirm"
						confirm={() => (dialogOpen = false)}
						cancelText="Cancel"
						cancel={() => (dialogOpen = false)}
					/>
				{/if}
			</VBox>
		{:else if key === 'slide-over'}
			<VBox spacing={10} align="fill">
				<Button label="Open panel" onClick={() => (sheetOpen = true)} />
				{#if sheetOpen}
					<SlideOver
						title="Details"
						description="SlideOver demo"
						close={() => (sheetOpen = false)}
						enter
					>
						<SlideOverContent>
							<VBox spacing={10} padding={[0, 0, 16, 0]}>
								<Text>Panel content</Text>
								<TextField label="Quick input" bind:value placeholder="Type…" flat />
							</VBox>
						</SlideOverContent>
					</SlideOver>
				{/if}
			</VBox>
		{:else if key === 'pop-over'}
			<VBox spacing={10} align="fill">
				<Button square variant="secondary" onClick={() => (popOpen = !popOpen)} bind:ref={popBtn}>
					<PhDotsThreeVertical size={18} />
				</Button>
				{#if popOpen}
					<PopOver attachTo={popBtn} onClose={() => (popOpen = false)}>
						<Menu items={menuItems} />
					</PopOver>
				{/if}
			</VBox>
		{:else if key === 'menu'}
			<Menu items={menuItems} />
		{:else if key === 'tooltip'}
			<Tooltip content="Extra info">
				<Button label="Hover me" />
			</Tooltip>
		{:else if key === 'separator'}
			<VBox spacing={10} align="fill">
				<Text>Above</Text>
				<Separator />
				<Text>Below</Text>
			</VBox>
		{:else if key === 'hide-below'}
			<HBox spacing={10} align="center" style="flex-wrap: wrap;">
				<HideBelow below={520}>
					<Text style="color: var(--text-secondary);">Wide container content</Text>
				</HideBelow>
				<Optional below={520}>
					<Text style="color: var(--text-secondary);">Compact container content</Text>
				</Optional>
			</HBox>
		{:else if key === 'skeleton'}
			<Skeleton
				element="section"
				bg="var(--background-elevated)"
				padding={[16, 16, 16, 16]}
				borderRadius={[12, 12, 12, 12]}
				borderWidth={[1, 1, 1, 1]}
				borderColor="var(--border-primary)"
			>
				<Text>Skeleton primitive</Text>
			</Skeleton>
		{:else if key === 'grid'}
			<Grid
				columns={3}
				gap={10}
				style="grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));"
			>
				<Card padding={[12, 12, 12, 12]}><Text>1</Text></Card>
				<Card padding={[12, 12, 12, 12]}><Text>2</Text></Card>
				<Card padding={[12, 12, 12, 12]}><Text>3</Text></Card>
			</Grid>
		{:else if key === 'hbox'}
			<HBox spacing={10} align="center">
				<Chip label="A" />
				<Chip label="B" />
				<Chip label="C" />
			</HBox>
		{:else if key === 'vbox'}
			<VBox spacing={10} align="fill">
				<Chip label="Top" />
				<Chip label="Middle" />
				<Chip label="Bottom" />
			</VBox>
		{:else if key === 'text'}
			<Text style="color: var(--text-secondary);">Text component</Text>
		{:else if key === 'text-rich'}
			<TextRich>
				<h3>TextRich</h3>
				<p>Rich text content using the Fabkit style.</p>
			</TextRich>
		{:else if key === 'entry-row'}
			<EntryRow label="Username" value="mirkobrombin" />
		{:else if key === 'switch-row'}
			<SwitchRow label="Enable feature" bind:checked={switchRowChecked} />
		{:else if key === 'slider'}
			<Slider bind:value={qty} min={0} max={10} />
		{:else if key === 'kbd'}
			<HBox spacing={8} align="center">
				<Kbd>Ctrl</Kbd>
				<Text>+</Text>
				<Kbd>K</Kbd>
			</HBox>
		{:else if key === 'level-bar'}
			<LevelBar value={0.7} />
		{:else}
			<Text style="color: var(--text-secondary);">
				No dedicated demo for <code>{slug}</code> yet. The docs below are the authoritative reference.
			</Text>
		{/if}
	</VBox>
</Card>
