<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Showcase from '$lib/components/Showcase.svelte';
	import Dummy from '$lib/components/Dummy.svelte';
	import {
		BaseField,
		Button,
		Card,
		Carousel,
		ContextArea,
		Dialog,
		HBox,
		Menu,
		MenuSwitcher,
		Notebook,
		Paned,
		PopOver,
		PopOverWrapper,
		SelectField,
		SideLayout,
		Slider,
		StaticNotebook,
		Switcher,
		TabsSwitcher,
		TextField,
		TextRich,
		TitleBar,
		VBox,
		Window,
		Engine,
		Image,
		EventBus,
		// new components
		TextArea,
		NumberField,
		Checkbox,
		RadioGroup,
		TagsInput,
		ColorPicker,
		SearchField,
		FileChooser,
		Separator,
		Accordion,
		AccordionItem,
		Tooltip,
		Chip,
		DataTable,
		Kbd,
		ActionRow,
		PreferencesGroup,
		PreferencesPage,
		EntryRow,
		SwitchRow,
		SpinRow,
		LevelBar,
		PhCheck,
		PhX,
		PhList,
		PhUser,
		PhGear,
		PhBell,
		PhStar,
		PhHouse
	} from 'fabkit';

	let activePage = $state(0);

	/**
	 * @typedef {Object} MenuItem
	 * @property {string} label
	 * @property {() => void} [action]
	 * @property {number} [pageId]
	 */

	/** @type {boolean} */
	let modalShowing = $state(false);

	/** @type {boolean} */
	let popOverShowing = $state(false);
	let popOverButton = $state();

	/** @type {boolean} */
	let switcherValue = $state(false);

	/** @type {number} */
	let sliderValue = $state(50);

	/** @type {string} */
	let textValue = $state('');

	/** @type {string} */
	let selectValue = $state('');

	/** @type {boolean} */
	let themeSwitcherValue = $state(false);

	// --- New component state ---
	let textAreaValue = $state('');
	let numberValue = $state(42);
	let checkboxValue = $state(false);
	let checkboxIndeterminate = $state(false);
	let radioValue = $state('');
	let tags = $state(['svelte', 'fabkit']);
	let colorValue = $state('#6366f1');
	let searchValue = $state('');
	let selectedFiles = $state([]);
	let accordionOpen = $state(false);
	let chipRemoved = $state(false);
	let tableSelectedRows = $state([]);
	let switchRowModel = $state(true);
	let spinRowValue = $state(5);
	let entryRowValue = $state('');
	let levelBarValue = $state(0.6);

	let textAreaValue = $state('');
	let numberValue = $state(42);
	let checkboxValue = $state(false);
	let checkboxIndeterminate = $state(false);
	let radioValue = $state('');
	let tags = $state(['svelte', 'fabkit']);
	let colorValue = $state('#6366f1');
	let searchValue = $state('');
	let files = $state([]);
	let switchRowModel = $state(false);
	let spinRowValue = $state(5);
	let entryRowValue = $state('');
	let levelBarValue = $state(0.6);
	let selectedRows = $state([]);

	// --- CONSTANTS (Static Data) ---
	// If these lists never change, they don't need $state.

	const radioOptions = [
		{ label: 'Option A', value: 'a' },
		{ label: 'Option B', value: 'b' },
		{ label: 'Option C', value: 'c' },
	];

	const tableColumns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'role', label: 'Role', sortable: true },
		{ key: 'status', label: 'Status', sortable: false },
	];

	const tableRows = [
		{ name: 'Alice', role: 'Admin', status: 'Active' },
		{ name: 'Bob', role: 'Editor', status: 'Inactive' },
		{ name: 'Carol', role: 'Viewer', status: 'Active' },
		{ name: 'Dave', role: 'Editor', status: 'Active' },
	];

	const menuItems = [
		{ label: 'Item 1', action: () => console.log('Item 1') },
		{ label: 'Item 2', action: () => console.log('Item 2') },
		{ label: 'Item 3', action: () => console.log('Item 3') }
	];

	const contextMenuItems = [
		{
			id: 1,
			text: 'Item 1',
			shortcut: 'Ctrl+1',
			icon: PhCheck,
			action: () => console.log('Item 1'),
			submenu: []
		},
		{
			id: 2,
			text: 'Item 2',
			shortcut: 'Ctrl+2',
			icon: PhX,
			action: () => console.log('Item 2'),
			submenu: []
		},
		{
			id: 3,
			text: 'Item 3',
			shortcut: 'Ctrl+3',
			icon: PhList,
			action: () => console.log('Item 3'),
			submenu: []
		}
	];

	const mainSwitcheritems = [
		{ label: 'TabsSwitcher & Notebook', pageId: 0 },
		{ label: 'Button', pageId: 1 },
		{ label: 'Switcher', pageId: 2 },
		{ label: 'Dialog', pageId: 3 },
		{ label: 'PopOver', pageId: 4 },
		{ label: 'Menu', pageId: 5 },
		{ label: 'Carousel', pageId: 6 },
		{ label: 'Paned', pageId: 7 },
		{ label: 'SideLayout', pageId: 8 },
		{ label: 'MenuSwitcher', pageId: 9 },
		{ label: 'Slider', pageId: 10 },
		{ label: 'TextField', pageId: 11 },
		{ label: 'SelectField', pageId: 12 },
		{ label: 'TextRich', pageId: 13 },
		{ label: 'Window', pageId: 14 },
		{ label: 'ContextArea', pageId: 15 },
		{ label: 'Dark Mode', pageId: 16 },
		{ label: 'Image', pageId: 17 },
		{ label: 'TextArea', pageId: 18 },
		{ label: 'NumberField', pageId: 19 },
		{ label: 'Checkbox & RadioGroup', pageId: 20 },
		{ label: 'TagsInput', pageId: 21 },
		{ label: 'ColorPicker', pageId: 22 },
		{ label: 'SearchField', pageId: 23 },
		{ label: 'FileChooser', pageId: 24 },
		{ label: 'Separator & Accordion', pageId: 25 },
		{ label: 'Tooltip & Chip', pageId: 26 },
		{ label: 'DataTable', pageId: 27 },
		{ label: 'Kbd', pageId: 28 },
		{ label: 'ActionRow & Preferences', pageId: 29 },
		{ label: 'LevelBar', pageId: 30 },
		{ label: 'Samples', pageId: 31 },
	];

	const menuSwitcherItems = [
		{ label: 'Page 1', pageId: 0 },
		{ label: 'Page 2', pageId: 1 },
		{ label: 'Page 3', pageId: 2 }
	];

	const selectOptions = [
		{ text: 'Option 1', value: 'option1' },
		{ text: 'Option 2', value: 'option2' },
		{ text: 'Option 3', value: 'option3' }
	];

	onMount(() => {
		console.log('Toolkit mounted');
	});

	$effect(() => {
		// Toggle .dark on <html> so initTheme can detect it correctly
		document.documentElement.classList.toggle('dark', themeSwitcherValue);
		document.body.classList.toggle('dark', themeSwitcherValue);
		import('fabkit').then(({ initTheme }) => initTheme());
	});

	function newPage() {
		console.log('New page');
		return {
			component: Dummy,
			props: {}
		};
	}

	function handlePageChange(e) {
		activePage = e.detail;
	}

	function showModal() {
		modalShowing = !modalShowing;
	}

	function togglePopOver() {
		popOverShowing = !popOverShowing;
	}

	function restorePanel() {
		window.dispatchEvent(new CustomEvent('mainLayout-close'));
	}
</script>

<div>
	<Window>
		{#snippet top()}
			<TitleBar>
				{#snippet area()}{/snippet}
			</TitleBar>
		{/snippet}

		{#snippet content()}
			<SideLayout class="Toolkit" context="mainLayout">
				{#snippet sidebar()}
					<MenuSwitcher
						context="mainMenu"
						items={mainSwitcheritems}
						pageId={activePage}
						on:changePage={(e) => (activePage = e.detail)}
					></MenuSwitcher>
				{/snippet}
				{#snippet content()}
					<StaticNotebook context="mainMenu">
						<Showcase
							title="TabsSwitcher & Notebook"
							description="A component to switch between tabs and pages"
						>
							<TabsSwitcher allowNewTabs context="mainTabs" />
							<Notebook newPageContent={newPage} context="mainTabs" />
						</Showcase>

						<Showcase title="Button" description="A component to trigger actions">
							<HBox spacing="15">
								<Button label="Normal" onclick={() => console.log('ciao')} />
								<Button
									label="Suggested"
									onclick={() => console.log('ciao')}
									type="suggested"
								>
									<PhCheck size={16} />
									<span class="Button-label">Suggested</span>
								</Button>
								<Button
									label="Destructive"
									onclick={() => console.log('ciao')}
									type="destructive"
								>
									<PhX size={16} />
									<span class="Button-label">Destructive</span>
								</Button>
							</HBox>
						</Showcase>

						<Showcase title="Switcher" description="A component to toggle between two states">
							<HBox spacing="40">
								<Switcher model={switcherValue} on:change={(e) => (switcherValue = e.detail)} />
								<p>Switcher value: <u>{switcherValue}</u></p>
							</HBox>
						</Showcase>

						<Showcase
							title="Dialog"
							description="A component to display messages and confirmations"
						>
							<VBox spacing={20} align="start">
								<Button label="Show Dialog" onclick={showModal} />

								{#if modalShowing}
									<Dialog
										title="Hello, World!"
										messages={[
											'This is a simple dialog to showcase the Dialog component.',
											'You can use it to display messages, confirmations, and more.'
										]}
										confirm={showModal}
										confirmText="Confirm Action"
										cancel={showModal}
										cancelText="Cancel"
									/>
								{/if}
							</VBox>
						</Showcase>
						<Showcase title="PopOver" description="A component to display a menu">
							<VBox spacing={20} align="start">
								<Button onclick={togglePopOver} bind:ref={popOverButton}>
									<PhList size={18} />
								</Button>

								{#if popOverShowing}
									<PopOver attachTo={popOverButton} onclose={togglePopOver}>
										<Menu items={menuItems} />
									</PopOver>
								{/if}
							</VBox>
						</Showcase>

						<Showcase title="Menu" description="A component to display a list of items">
							<Menu items={menuItems} />
						</Showcase>

						<Showcase title="Carousel" description="A component to show a series of items">
							<Carousel>
								<VBox align="center">
									<TextRich>
										<h1>Slide 1</h1>
									</TextRich>
								</VBox>
								<VBox align="center">
									<TextRich>
										<h1>Slide 2</h1>
									</TextRich>
								</VBox>
								<VBox align="center">
									<TextRich>
										<h1>Slide 3</h1>
									</TextRich>
								</VBox>
							</Carousel>
						</Showcase>

						<Showcase title="Paned" description="A component to resize two areas">
							<Paned>
								{#snippet left()}
									<TextRich>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit urna
											non lacus malesuada rhoncus. Nam eget nisi id magna venenatis hendrerit at ac
											augue. Sed quis ultrices tortor, eu cursus enim. Sed malesuada sit amet turpis
											non euismod. Suspendisse metus est, blandit vel fermentum ut, luctus sed nibh.
											Ut vel venenatis nibh. Nunc in eros et nulla pellentesque lobortis. Sed
											tincidunt a nibh quis feugiat. Vivamus orci dolor, interdum nec lacinia vitae,
											commodo quis metus. Fusce euismod non arcu nec elementum. Fusce volutpat vitae
											eros sit amet tempor. Sed feugiat, turpis at tincidunt posuere, erat erat
											luctus augue, ac lobortis libero libero ut sem. Proin a consequat quam.
										</p>
									</TextRich>
								{/snippet}
								{#snippet right()}
									<TextRich>
										<p>
											Pellentesque et tortor vitae dui fermentum convallis. Vivamus lacinia, elit
											sit amet eleifend interdum, dolor nunc facilisis dolor, ac aliquet mi mauris
											cursus ex. Pellentesque molestie, felis non lobortis sodales, orci dui
											suscipit elit, ac consequat lectus purus vitae justo. Curabitur vel sem
											mauris. Donec dictum malesuada commodo. Nullam in nisl mauris. Etiam in
											finibus mauris. Maecenas sed orci ac mi pharetra faucibus. Pellentesque
											sollicitudin posuere erat, eu tempor ante egestas sed. Etiam consequat
											convallis dui, vel gravida dolor tincidunt non. Duis ornare ex vitae egestas
											sodales. Morbi id enim bibendum, aliquet magna et, laoreet leo. Integer
											finibus lorem enim. Cras vel dui pellentesque, iaculis risus laoreet, pharetra
											lectus.
										</p>
									</TextRich>
								{/snippet}
							</Paned>
						</Showcase>

						<Showcase title="SideLayout" description="A component to resize two areas">
							<SideLayout>
								{#snippet sidebar()}
									<Menu items={menuItems} />
								{/snippet}
								{#snippet content()}
									<TextRich>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit urna
											non lacus malesuada rhoncus. Nam eget nisi id magna venenatis hendrerit at ac
											augue. Sed quis ultrices tortor, eu cursus enim. Sed malesuada sit amet turpis
											non euismod. Suspendisse metus est, blandit vel fermentum ut, luctus sed nibh.
											Ut vel venenatis nibh. Nunc in eros et nulla pellentesque lobortis. Sed
											tincidunt a nibh quis feugiat. Vivamus orci dolor, interdum nec lacinia vitae,
											commodo quis metus. Fusce euismod non arcu nec elementum. Fusce volutpat vitae
											eros sit amet tempor. Sed feugiat, turpis at tincidunt posuere, erat erat
											luctus augue, ac lobortis libero libero ut sem. Proin a consequat quam.
										</p>
										<p>
											Pellentesque et tortor vitae dui fermentum convallis. Vivamus lacinia, elit
											sit amet eleifend interdum, dolor nunc facilisis dolor, ac aliquet mi mauris
											cursus ex. Pellentesque molestie, felis non lobortis sodales, orci dui
											suscipit elit, ac consequat lectus purus vitae justo. Curabitur vel sem
											mauris. Donec dictum malesuada commodo. Nullam in nisl mauris. Etiam in
											finibus mauris. Maecenas sed orci ac mi pharetra faucibus. Pellentesque
											sollicitudin posuere erat, eu tempor ante egestas sed. Etiam consequat
											convallis dui, vel gravida dolor tincidunt non. Duis ornare ex vitae egestas
											sodales. Morbi id enim bibendum, aliquet magna et, laoreet leo. Integer
											finibus lorem enim. Cras vel dui pellentesque, iaculis risus laoreet, pharetra
											lectus.
										</p>
									</TextRich>
								{/snippet}
							</SideLayout>
						</Showcase>

						<Showcase title="MenuSwitcher" description="A component to switch between pages">
							<SideLayout>
								{#snippet sidebar()}
									<MenuSwitcher context="exampleMenu" items={menuSwitcherItems} />
								{/snippet}
								{#snippet content()}
									<StaticNotebook context="exampleMenu">
										<div>
											<TextRich>
												<div style="text-align: center">
													<h1>Hello, World!</h1>
													<p>This is the page 1 of the MenuSwitcher component.</p>
												</div>
											</TextRich>
										</div>
										<div>
											<TextRich>
												<div style="text-align: center">
													<h1>Ciao, Mondo!</h1>
													<p>This is the page 2 of the MenuSwitcher component.</p>
												</div>
											</TextRich>
										</div>
										<div>
											<TextRich>
												<div style="text-align: center">
													<h1>Bonjour, le Monde!</h1>
													<p>This is the page 3 of the MenuSwitcher component.</p>
												</div>
											</TextRich>
										</div>
									</StaticNotebook>
								{/snippet}
							</SideLayout>
						</Showcase>

						<Showcase title="Slider" description="A component to select a value">
							<Slider
								bind:value={sliderValue}
								min="0"
								max="100"
								labels={['Low', 'Medium', 'High']}
							/>
							<p>Slider value: <u>{sliderValue}</u></p>
						</Showcase>

						<Showcase title="TextField" description="A component to input text">
							<VBox spacing="40" margin="8" align="fill">
								<VBox spacing="20" align="fill">
									<TextField label="Name" placeholder="Type your name" bind:value={textValue} />
									<p>Text value: <u>{textValue}</u></p>
								</VBox>

								<VBox spacing="20" align="fill">
									<TextField
										label="Name"
										placeholder="Example with icon"
										bind:value={textValue}
										icon={PhUser}
									/>
								</VBox>

								<VBox spacing={20} align="fill">
									<TextField
										label="Name"
										placeholder="Example with icon (left)"
										bind:value={textValue}
										icon={PhUser}
										iconPosition="left"
									/>
								</VBox>
							</VBox>
						</Showcase>

						<Showcase title="SelectField" description="A component to select an option">
							<VBox spacing={40} margin={8} align="fill">
								<VBox spacing={20} align="fill">
									<SelectField
										label="Type your name"
										bind:value={selectValue}
										options={selectOptions}
									/>
									<p>Selected value: <u>{selectValue}</u></p>
								</VBox>

								<VBox spacing={20} align="fill">
									<SelectField
										label="Example with icon"
										bind:value={selectValue}
										options={selectOptions}
										icon={PhUser}
									/>
								</VBox>

								<VBox spacing={20} align="fill">
									<SelectField
										label="Example with icon (left)"
										bind:value={selectValue}
										options={selectOptions}
										icon={PhUser}
										iconPosition="left"
									/>
								</VBox>
							</VBox>
						</Showcase>

						<Showcase title="TextRich" description="A component to display rich text">
							<TextRich>
								<p>
									Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit. Nulla malesuada
									congue
									<s>imperdiet</s>. Aenean tincidunt urna at ipsum iaculis, eget rhoncus
									<i>ligula</i>
									vehicula. Proin tempus fringilla bibendum. Cras orci eros, cursus at cursus at, varius
									nec elit. Etiam rhoncus <u>ultrices</u> nibh. Vestibulum fermentum erat lacus, id
									tincidunt ipsum hendrerit et. <code>Suspendisse</code> odio sapien, interdum quis lacus
									eu, commodo pharetra odio. Morbi quis elit ex.
								</p>
								<h1>Heading 1</h1>
								<h2>Heading 2</h2>
								<h3>Heading 3</h3>
								<h4>Heading 4</h4>
								<h5>Heading 5</h5>
								<h6>Heading 6</h6>
								<ul>
									<li>Item 1</li>
									<li>Item 2</li>
									<li>Item 3</li>
								</ul>
								<ol>
									<li>Item 1</li>
									<li>Item 2</li>
									<li>Item 3</li>
								</ol>
								<table>
									<thead>
										<tr>
											<th>Header 1</th>
											<th>Header 2</th>
											<th>Header 3</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Row 1, Cell 1</td>
											<td>Row 1, Cell 2</td>
											<td>Row 1, Cell 3</td>
										</tr>
										<tr>
											<td>Row 2, Cell 1</td>
											<td>Row 2, Cell 2</td>
											<td>Row 2, Cell 3</td>
										</tr>
										<tr>
											<td>Row 3, Cell 1</td>
											<td>Row 3, Cell 2</td>
											<td>Row 3, Cell 3</td>
										</tr>
									</tbody>
								</table>
								<blockquote>
									<p>
										Aenean vestibulum ligula sed felis egestas, ut porta lorem finibus. Fusce
										fermentum lacinia vehicula. Mauris sodales massa eget sollicitudin varius.
										Praesent ex turpis, malesuada eget rhoncus et, pulvinar at mi. Morbi quis tellus
										eros. Nullam metus justo, porta sit amet interdum vitae, luctus a orci. Vivamus
										ac tempor purus, ac porta magna. Mauris accumsan convallis semper. In ut
										dignissim felis.
									</p>
								</blockquote>
								<code>
									<pre>
                const hello = "world";
                console.log(hello);
            </pre>
								</code>
							</TextRich>
						</Showcase>

						<Showcase title="Window" description="A component to display a window">
							<Window>
								{#snippet top()}
									<TitleBar>
										{#snippet area()}{/snippet}
									</TitleBar>
								{/snippet}

								{#snippet content()}
									<TextRich>
										<p>Content of the window</p>
									</TextRich>
								{/snippet}
							</Window>
						</Showcase>

						<Showcase title="ContextArea" description="A component to display a context menu">
							<ContextArea items={contextMenuItems}>
								{#snippet area()}
									<TextRich>
										<p>Rigth click here to show the context menu</p>
									</TextRich>
								{/snippet}
							</ContextArea>
						</Showcase>

						<Showcase title="Dark Mode" description="Switch between light and dark mode">
							<VBox spacing="10" align="fill">
								<Switcher
									model={themeSwitcherValue}
									on:change={(e) => (themeSwitcherValue = e.detail)}
								/>
								<p>Theme: <u>{themeSwitcherValue ? 'Dark' : 'Light'}</u></p>
							</VBox>
						</Showcase>

						<!-- Image -->
						<Showcase title="Image" description="Versatile image component — fit, placeholder, blur-up, fallback, overlay, zoom">
							<VBox spacing={30} align="fill">

								<!-- Row 1: fit modes -->
								<VBox spacing={8} align="fill">
									<p style="font-weight:600; margin-bottom:4px">object-fit modes (200×140)</p>
									<HBox spacing={12} wrap>
										{#each ['cover','contain','fill','scale-down'] as fitMode}
											<VBox spacing={4} align="center">
												<Image
													src="https://picsum.photos/seed/fabkit1/400/300"
													alt="fit: {fitMode}"
													fit={fitMode}
													width={180}
													height={120}
													borderRadius={[8,8,8,8]}
												/>
												<small style="opacity:.7">{fitMode}</small>
											</VBox>
										{/each}
									</HBox>
								</VBox>

								<!-- Row 2: aspect ratio helpers -->
								<VBox spacing={8} align="fill">
									<p style="font-weight:600; margin-bottom:4px">Aspect ratio helpers (width 200px)</p>
									<HBox spacing={12} wrap>
										<VBox spacing={4} align="center">
											<Image src="https://picsum.photos/seed/fabkit2/400/400" alt="square" square width={140} borderRadius={[8,8,8,8]} />
											<small style="opacity:.7">square (1:1)</small>
										</VBox>
										<VBox spacing={4} align="center">
											<Image src="https://picsum.photos/seed/fabkit3/300/400" alt="portrait" portrait width={140} borderRadius={[8,8,8,8]} />
											<small style="opacity:.7">portrait (3:4)</small>
										</VBox>
										<VBox spacing={4} align="center">
											<Image src="https://picsum.photos/seed/fabkit4/800/450" alt="landscape" landscape width={280} borderRadius={[8,8,8,8]} />
											<small style="opacity:.7">landscape (16:9)</small>
										</VBox>
									</HBox>
								</VBox>

								<!-- Row 3: blur-up -->
								<VBox spacing={8} align="fill">
									<p style="font-weight:600; margin-bottom:4px">Blur-up on load</p>
									<HBox spacing={12}>
										<VBox spacing={4} align="center">
											<Image
												src="https://picsum.photos/seed/fabkit5/600/400"
												alt="blur-up"
												blur
												blurAmount={20}
												landscape
												width={280}
												borderRadius={[8,8,8,8]}
											/>
											<small style="opacity:.7">blur=true, blurAmount=20</small>
										</VBox>
									</HBox>
								</VBox>

								<!-- Row 4: placeholder color + fallback -->
								<VBox spacing={8} align="fill">
									<p style="font-weight:600; margin-bottom:4px">Placeholder color & fallback on error</p>
									<HBox spacing={12}>
										<VBox spacing={4} align="center">
											<Image
												src="https://picsum.photos/seed/fabkit6/400/300"
												alt="placeholder color"
												placeholderColor="#d4e2ff"
												width={180}
												height={120}
												borderRadius={[8,8,8,8]}
											/>
											<small style="opacity:.7">placeholderColor</small>
										</VBox>
										<VBox spacing={4} align="center">
											<Image
												src="https://INVALID_URL_WILL_FAIL.test/img.jpg"
												alt="broken image"
												fallback="https://picsum.photos/seed/fallback/400/300"
												width={180}
												height={120}
												borderRadius={[8,8,8,8]}
											/>
											<small style="opacity:.7">fallback on error</small>
										</VBox>
										<VBox spacing={4} align="center">
											<Image
												src="https://INVALID_URL_WILL_FAIL2.test/img.jpg"
												alt="broken no fallback"
												width={180}
												height={120}
												borderRadius={[8,8,8,8]}
											/>
											<small style="opacity:.7">no fallback → default broken icon</small>
										</VBox>
									</HBox>
								</VBox>

								<!-- Row 5: overlay tint + snippet -->
								<VBox spacing={8} align="fill">
									<p style="font-weight:600; margin-bottom:4px">Overlay tint & overlay snippet</p>
									<HBox spacing={12}>
										<VBox spacing={4} align="center">
											<Image
												src="https://picsum.photos/seed/fabkit7/400/250"
												alt="tint overlay"
												landscape
												width={280}
												borderRadius={[8,8,8,8]}
											>
												{#snippet overlay()}
													<div style="position:absolute;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;">
														<div style="color:#fff; font-size:18px; font-weight:700; text-shadow:0 1px 4px rgba(0,0,0,.5)">
															overlay text
														</div>
													</div>
												{/snippet}
											</Image>
											<small style="opacity:.7">overlay tint + content</small>
										</VBox>
									</HBox>
								</VBox>

								<!-- Row 6: zoom on hover + clickable + border radius -->
								<VBox spacing={8} align="fill">
									<p style="font-weight:600; margin-bottom:4px">zoomOnHover + border-radius + shadow</p>
									<HBox spacing={12}>
										<VBox spacing={4} align="center">
											<Image
												src="https://picsum.photos/seed/fabkit8/400/300"
												alt="zoom on hover"
												zoomOnHover
												width={200}
												height={140}
												borderRadius={[16,16,16,16]}
												shadow="0 4px 20px rgba(0,0,0,0.2)"
											/>
											<small style="opacity:.7">zoomOnHover</small>
										</VBox>
										<VBox spacing={4} align="center">
											<Image
												src="https://picsum.photos/seed/fabkit9/400/400"
												alt="circle"
												square
												width={140}
												borderRadius={[999,999,999,999]}
												shadow="0 2px 12px rgba(0,0,0,0.15)"
											/>
											<small style="opacity:.7">circle (borderRadius 999)</small>
										</VBox>
									</HBox>
								</VBox>

								<!-- Row 7: loading=eager, fetchpriority=high -->
								<VBox spacing={8} align="fill">
									<p style="font-weight:600; margin-bottom:4px">loading="eager" + fetchpriority="high"</p>
									<HBox spacing={12}>
										<Image
											src="https://picsum.photos/seed/fabkit10/600/200"
											alt="eager high priority"
											lazy={false}
											fetchpriority="high"
											width={400}
											height={100}
											borderRadius={[8,8,8,8]}
										/>
									</HBox>
								</VBox>

							</VBox>
						</Showcase>

						<!-- TextArea & NumberField -->
						<Showcase title="TextArea & NumberField" description="Multi-line input and stepper field">
							<VBox spacing={24} align="fill">
								<VBox spacing={8} align="fill">
									<TextArea label="Notes" placeholder="Type something…" bind:value={textAreaValue} rows={4} />
									<TextArea label="Auto-resize" placeholder="Grows as you type…" autoResize />
								</VBox>
								<VBox spacing={8} align="fill">
									<NumberField label="Quantity" bind:value={numberValue} min={0} max={100} step={1} />
									<NumberField label="With icon" bind:value={numberValue} min={0} max={100} icon={PhStar} iconPosition="left" />
								</VBox>
							</VBox>
						</Showcase>

						<!-- Checkbox & RadioGroup -->
						<Showcase title="Checkbox & RadioGroup" description="Selection controls">
							<VBox spacing={20} align="start">
								<VBox spacing={8} align="start">
									<Checkbox bind:checked={checkboxValue} label="Enable notifications" />
									<Checkbox checked={true} label="Already checked" />
									<Checkbox indeterminate={true} label="Indeterminate state" />
									<Checkbox disabled={true} label="Disabled" />
								</VBox>
								<Separator />
								<RadioGroup
									bind:value={radioValue}
									name="demo-radio"
									options={[
										{ label: 'Option A', value: 'a' },
										{ label: 'Option B', value: 'b' },
										{ label: 'Option C', value: 'c' },
									]}
								/>
								<p>Selected: <u>{radioValue || 'none'}</u></p>
							</VBox>
						</Showcase>

						<!-- TagsInput & ColorPicker -->
						<Showcase title="TagsInput & ColorPicker" description="Tag editing and color selection">
							<VBox spacing={24} align="fill">
								<TagsInput bind:tags placeholder="Add a tag…" />
								<p>Tags: <u>{tags.join(', ')}</u></p>
								<Separator />
								<HBox spacing={16} align="center">
									<ColorPicker bind:value={colorValue} label="Brand color" />
									<span>Value: <u>{colorValue}</u></span>
								</HBox>
							</VBox>
						</Showcase>

						<!-- SearchField & FileChooser -->
						<Showcase title="SearchField & FileChooser" description="Search input and file upload">
							<VBox spacing={24} align="fill">
								<SearchField bind:value={searchValue} placeholder="Search components…" onSearch={(v) => console.log('search:', v)} />
								<p>Query: <u>{searchValue || '—'}</u></p>
								<Separator />
								<FileChooser bind:files={selectedFiles} multiple label="Drop files or click to browse" />
							</VBox>
						</Showcase>

						<!-- Separator & Accordion -->
						<Showcase title="Separator & Accordion" description="Dividers and collapsible sections">
							<VBox spacing={20} align="fill">
								<Separator />
								<Separator label="Or continue with" />
								<Separator orientation="horizontal" />
								<Separator />
								<Accordion borderWidth={[1,1,1,1]} borderColor="var(--border-primary)" borderRadius={[8,8,8,8]}> 
									<AccordionItem title="What is Fabkit?" icon={PhHouse}>
										Fabkit is a Svelte 5 UI component library with a native desktop feel.
									</AccordionItem>
									<AccordionItem title="How do I install it?">
										Run: <Kbd keys={['npm', 'i', 'fabkit']} />
									</AccordionItem>
									<AccordionItem title="Does it support dark mode?">
										Yes — toggle the `.dark` class on `&lt;html&gt;` and call `initTheme()`.
									</AccordionItem>
								</Accordion>
							</VBox>
						</Showcase>

						<!-- Tooltip & Chip -->
						<Showcase title="Tooltip & Chip" description="Hover hints and removable pills">
							<VBox spacing={24} align="start">
								<HBox spacing={16} align="center">
									<Tooltip text="This is a top tooltip" position="top">
										<Button label="Hover me (top)" />
									</Tooltip>
									<Tooltip text="Right side tooltip" position="right">
										<Button label="Hover me (right)" />
									</Tooltip>
									<Tooltip text="Bottom tooltip" position="bottom">
										<Button label="Hover me (bottom)" />
									</Tooltip>
								</HBox>
								<Separator />
								<HBox spacing={8} wrap>
									<Chip label="Svelte" />
									<Chip label="Fabkit" color="var(--action-suggested)" textColor="#fff" />
									<Chip label="With icon" icon={PhStar} />
									<Chip label="Removable" removable onRemove={() => console.log('removed')} />
									<Chip label="Destructive" color="var(--action-destructive)" textColor="#fff" removable />
								</HBox>
							</VBox>
						</Showcase>

						<!-- DataTable & Kbd -->
						<Showcase title="DataTable & Kbd" description="Sortable table and keyboard shortcuts">
							<VBox spacing={24} align="fill">
								<DataTable
									columns={[
										{ key: 'name', label: 'Name', sortable: true },
										{ key: 'role', label: 'Role', sortable: true },
										{ key: 'status', label: 'Status', sortable: false },
									]}
									rows={[
										{ name: 'Alice', role: 'Admin', status: 'Active' },
										{ name: 'Bob', role: 'Editor', status: 'Inactive' },
										{ name: 'Carol', role: 'Viewer', status: 'Active' },
										{ name: 'Dave', role: 'Editor', status: 'Active' },
									]}
									selectable
									bind:selectedRows={tableSelectedRows}
									onRowClick={(row) => console.log('clicked', row)}
								/>
								<p>Selected: <u>{tableSelectedRows.length} rows</u></p>
								<Separator />
								<HBox spacing={16} align="center" wrap>
									<Kbd keys={['Ctrl', 'K']} />
									<Kbd keys={['Ctrl', 'Shift', 'P']} />
									<Kbd keys={['⌘', 'S']} />
									<Kbd keys={['Escape']} />
									<Kbd keys={['F5']} />
								</HBox>
							</VBox>
						</Showcase>

						<!-- Preferences -->
						<Showcase title="Preferences" description="libadwaita-style settings UI">
							<PreferencesPage title="Settings" description="Manage your application preferences">
								<PreferencesGroup title="General" description="Basic application settings">
									<SwitchRow title="Enable notifications" subtitle="Show desktop notifications" bind:model={switchRowModel} />
									<EntryRow title="Display name" subtitle="Shown in the title bar" bind:value={entryRowValue} placeholder="Enter name…" />
									<SpinRow title="Max items" subtitle="Per page limit" bind:value={spinRowValue} min={1} max={100} />
									<ActionRow title="Clear cache" subtitle="Free up disk space" activatable onclick={() => console.log('clear cache')} />
								</PreferencesGroup>
								<PreferencesGroup title="Appearance">
									<ActionRow title="Theme" subtitle={switchRowModel ? 'Dark' : 'Light'} icon={PhGear}>
										{#snippet widget()}
											<Switcher bind:model={switchRowModel} />
										{/snippet}
									</ActionRow>
									<ActionRow title="Accent color" icon={PhBell}>
										{#snippet widget()}
											<ColorPicker bind:value={colorValue} />
										{/snippet}
									</ActionRow>
								</PreferencesGroup>
							</PreferencesPage>
						</Showcase>

						<!-- LevelBar -->
						<Showcase title="LevelBar" description="Segmented and continuous progress bars">
							<VBox spacing={20} align="fill">
								<VBox spacing={8} align="fill">
									<p style="font-size:13px;opacity:.6">Auto-color (value 0–1)</p>
									<LevelBar value={0.1} />
									<LevelBar value={0.5} />
									<LevelBar value={0.9} />
								</VBox>
								<VBox spacing={8} align="fill">
									<p style="font-size:13px;opacity:.6">Segmented (segments=5)</p>
									<LevelBar value={3} max={5} segments={5} />
								</VBox>
								<VBox spacing={8} align="fill">
									<p style="font-size:13px;opacity:.6">Custom color</p>
									<LevelBar value={0.65} color="var(--action-suggested)" />
								</VBox>
								<VBox spacing={8} align="fill">
									<p style="font-size:13px;opacity:.6">Interactive</p>
									<LevelBar value={levelBarValue} />
									<input type="range" min="0" max="1" step="0.01" bind:value={levelBarValue} style="width:100%;accent-color:var(--action-suggested)" />
									<p>Value: <u>{Math.round(levelBarValue * 100)}%</u></p>
								</VBox>
							</VBox>
						</Showcase>

						<!-- Samples -->
						<Showcase title="Samples" description="A collection of samples">
							<VBox spacing={20} align="start">
								<Button label="Calculator" onclick={() => goto('/calculator')} />
								<Button label="Task Manager" onclick={() => goto('/task-manager')} />
								<Button label="Notepad" onclick={() => goto('/notepad')} />
								<Button label="Icons" onclick={() => goto('/icons')} />
							</VBox>
						</Showcase>
					</StaticNotebook>
				{/snippet}
			</SideLayout>
		{/snippet}
	</Window>
</div>

<style>
	.Toolkit {
		background-color: var(--background-base);
	}
</style>
