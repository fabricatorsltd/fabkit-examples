<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Button, HBox, VBox, TextRich, PopOver, Card } from 'fabkit';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Icon from './Icon.svelte';
	import materialSymbols from '../icons/material-symbols.json';
	import { onMount } from 'svelte';

	let {
		children,
		navItems = [
			{ name: 'home', iconName: 'speed-outline', path: '/IC/dashboard' },
			{ name: 'chats', iconName: 'forum-outline', path: '#', disabled: true },
			{ name: 'social', iconName: 'share-outline', path: '/IC/dashboard/social' },
			{ name: 'adjust', iconName: 'target', path: '#', disabled: true },
			{ name: 'team', iconName: 'work-outline', path: '/IC/dashboard/team' },
			{ name: 'settings', iconName: 'settings-outline', path: '/IC/dashboard/settings' }
		],
		activeTab,
		title = '',
		description = '',
		logo,
		sidebarExtra,
		overlay,
		style,
		fontWeight
	} = $props();

	let availableTeams = $state(['i natalizi', 'i procioni', 'le diaree']);
	let TeamLabel = $state();
	let teamsShowing = $state(false);
	let teamsButton = $state();
	let user = { name: 'User', avatar: '...' };

	let dropdownOpen = $state(false);
	let windowWidth = $state(browser ? window.innerWidth : 1500);
	let paperWidth = $state(1500);
	let isDragging = $state(false);
	let startX = $state(0);
	let startWidth = $state(0);

	let notifications = $state([
		'sei stato invitato a un unirti nel team le carozze da Andrea Di Marco',
		'Notifica 2'
	]);
	let notifsShowing = $state(false);
	let notifsButton = $state();

	let userShowing = $state(false);
	let userButton = $state();

	function handleDragStart(event) {
		if (browser) {
			if (window.innerWidth < 768) return;
			isDragging = true;
			startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
			startWidth = paperWidth;
			document.body.style.userSelect = 'none';
			window.addEventListener('mousemove', handleDragMove);
			window.addEventListener('mouseup', handleDragEnd);
			window.addEventListener('touchmove', handleDragMove);
			window.addEventListener('touchend', handleDragEnd);
		}
	}

	function handleDragMove(event) {
		if (!isDragging) return;
		const currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
		const deltaX = currentX - startX;
		const newWidth = startWidth + deltaX * 2;
		const maxAvailable = windowWidth - 120;
		paperWidth = Math.max(1000, Math.min(maxAvailable, newWidth));
	}

	function handleDragEnd() {
		isDragging = false;
		document.body.style.userSelect = '';
		if (browser) {
			window.removeEventListener('mousemove', handleDragMove);
			window.removeEventListener('mouseup', handleDragEnd);
			window.removeEventListener('touchmove', handleDragMove);
			window.removeEventListener('touchend', handleDragEnd);
		}
	}

	function toggleNotifs() {
		notifsShowing = !notifsShowing;
	}
	function toggleTeams() {
		teamsShowing = !teamsShowing;
	}
	function toggleUser() {
		userShowing = !userShowing;
	}

	onMount(() => {
		if (availableTeams.length > 0) {
			TeamLabel = availableTeams[0];
		} else {
			TeamLabel = 'Nessun team';
		}

		const handleResize = () => {
			windowWidth = window.innerWidth;
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	$effect(() => {
		const max = windowWidth - 120;
		if (paperWidth > max) {
			paperWidth = max;
		}
	});
</script>

<div class="CanvasRoot" style="{style || ''}{fontWeight ? `; font-weight: ${fontWeight}` : ''}">
	<div class="LayoutContainer">
		<div class="Keypad">
			<div
				role="button"
				tabindex="0"
				class="Logo"
				onclick={() => goto('/IC/dashboard')}
				onkeydown={(e) => e.key === 'Enter' && goto('/IC/dashboard')}
				style="cursor: pointer;"
			>
				{#if logo}{@render logo()}{:else}🏕️{/if}
			</div>

			<div class="FlexSpacer"></div>

			<div class="NavItems">
				{#each navItems as tab}
					<div
						role="button"
						tabindex="0"
						class="NavIcon"
						class:NavIcon--active={$page.url.pathname === tab.path || activeTab === tab.name}
						class:disabled={tab.disabled}
						onclick={() => !tab.disabled && goto(tab.path)}
						onkeydown={(e) => e.key === 'Enter' && !tab.disabled && goto(tab.path)}
					>
						<Icon
							icons={materialSymbols}
							name={tab.iconName}
							width="24px"
							color={$page.url.pathname === tab.path || activeTab === tab.name ? 'white' : 'black'}
						/>
					</div>
				{/each}
			</div>

			<div class="FlexSpacer"></div>

			{#if sidebarExtra}
				<div class="SidebarExtra">
					{@render sidebarExtra()}
				</div>
			{/if}
		</div>

		<div class="Paper" style="width: {paperWidth}px;">
			{#if browser && windowWidth >= 1536}
				<div class="SizeToggle">
					<Button
						square
						padding={[8, 8, 8, 8]}
						bgHover="#f4f4f5"
						bgFocus="transparent"
						bgActive="transparent"
						type="flat"
						onclick={() => {
							const max = windowWidth - 120;
							if (paperWidth >= max - 50) {
								paperWidth = 1500;
							} else {
								paperWidth = max;
							}
						}}
						style="color: #6b7280; border-radius: 9999px;"
					>
						<Icon
							icons={materialSymbols}
							name={paperWidth >= windowWidth - 170 ? 'call-received' : 'arrow-outward'}
							width="20px"
						/>
					</Button>
				</div>
			{/if}
			<div
				class="ResizeHandle"
				role="button"
				tabindex="0"
				onmousedown={handleDragStart}
				ontouchstart={handleDragStart}
			>
				<div class="ResizeBar"></div>
			</div>

			<VBox align="fill">
				<div class="PaperHeader">
					<HBox align="center">
						<VBox align="start" spacing={2}>
							<span
								style="font-weight: 800; font-size: 20px; display: block; color: black; padding-bottom: 5px;"
								>{title}</span
							>
							<span style="font-size: 16px; color: #71717a; font-weight: 400;">{description}</span>
						</VBox>

						<div class="FlexSpacer"></div>

						<HBox spacing={16} align="center">
							<div style="position: relative;">
								<Button
									label={TeamLabel}
									bg="#f4f4f5"
									bgHover="#e4e4e7"
									bgFocus="#e4e4e7"
									bgActive="#d4d4d8"
									padding={[6, 16, 6, 16]}
									style="border-radius: 9999px; font-weight: 600; color: #374151; font-size: 14px;"
									onclick={toggleTeams}
									bind:ref={teamsButton}
								/>
								{#if teamsShowing}
									<PopOver
										attachTo={teamsButton}
										onclose={toggleTeams}
										align="end"
										offset={[0, 8]}
										borderWidth={[0]}
									>
										<Card
											padding={[8, 0, 8, 0]}
											bg="white"
											bgHover="white"
											bgFocus="white"
											bgActive="white"
											style="box-shadow: 0 4px 6px -1px var(--color-ic-shadow), 0 2px 4px -2px var(--color-ic-shadow); border: none; min-width: 200px; border-radius: 12px;"
										>
											<VBox spacing={0} align="fill">
												{#if availableTeams.length > 0}
													{#each availableTeams as team, i}
														<button
															type="button"
															class="TeamMenuItem"
															onclick={() => {
																TeamLabel = team;
																teamsShowing = false;
															}}
														>
															{team}
														</button>
														{#if i < availableTeams.length - 1}
															<div style="height: 1px; background: #f4f4f5; margin: 0 12px;"></div>
														{/if}
													{/each}
												{:else}
													<div
														style="padding: 12px; text-align: center; color: #71717a; font-size: 14px;"
													>
														nessun team
													</div>
												{/if}
											</VBox>
										</Card>
									</PopOver>
								{/if}
							</div>
							<div style="position: relative;">
								<Button
									square
									bg="#f4f4f5"
									bgHover="#e4e4e7"
									bgFocus="#e4e4e7"
									bgActive="#d4d4d8"
									style="border-radius: 12px; color: #374151;"
									onclick={toggleNotifs}
									bind:ref={notifsButton}
								>
									<Icon icons={materialSymbols} name="inbox" width="20px" />
								</Button>
								{#if notifsShowing}
									<PopOver
										attachTo={notifsButton}
										onclose={toggleNotifs}
										align="end"
										offset={[0, 8]}
										borderWidth={[0]}
									>
										<Card
											padding={[8, 0, 8, 0]}
											bg="white"
											bgHover="white"
											bgFocus="white"
											bgActive="white"
											style="box-shadow: 0 4px 6px -1px var(--color-ic-shadow), 0 2px 4px -2px var(--color-ic-shadow); border: none; min-width: 200px; border-radius: 12px;"
										>
											<VBox align="fill" spacing={0}>
												{#if notifications.length > 0}
													{#each notifications as note, i}
														<button
															type="button"
															class="TeamMenuItem"
															onclick={() => (notifsShowing = false)}
														>
															{note}
														</button>
														{#if i < notifications.length - 1}
															<div style="height: 1px; background: #f4f4f5; margin: 0 16px;"></div>
														{/if}
													{/each}
												{:else}
													<div
														style="padding: 12px 16px; color: #71717a; font-size: 14px; font-weight: 500; text-align: center;"
													>
														Nessuna notifica
													</div>
												{/if}
											</VBox>
										</Card>
									</PopOver>
								{/if}
							</div>

							{#if user}
								<div class="AvatarWrapper">
									<button
										class="AvatarButton"
										onclick={toggleUser}
										bind:this={userButton}
										type="button"
									>
										<div
											style="
											width: 100%; 
											height: 100%; 
											background-color: #d1d5db; 
											display: flex; 
											align-items: center; 
											justify-content: center;
											overflow: hidden;
										"
										>
											{#if user.avatar && user.avatar !== '...'}
												<img src={user.avatar} alt={user.name} />
											{:else}
												<Icon icons={materialSymbols} name="person" width="24px" color="white" />
											{/if}
										</div>
									</button>
									<div
										style="
										position: absolute;
										top: 0;
										right: 0;
										width: 12px;
										height: 12px;
										background-color: #22c55e;
										border: 2px solid white;
										border-radius: 50%;
										pointer-events: none;
									"
									></div>
									{#if userShowing}
										<PopOver
											attachTo={userButton}
											onclose={toggleUser}
											align="end"
											offset={[0, 8]}
											borderWidth={[0]}
										>
											<Card
												padding={[8, 0, 8, 0]}
												bg="white"
												bgHover="white"
												bgFocus="white"
												bgActive="white"
												style="box-shadow: 0 4px 6px -1px var(--color-ic-shadow), 0 2px 4px -2px var(--color-ic-shadow); border: none; min-width: 150px; border-radius: 12px;"
											>
												<VBox align="fill" spacing={0}>
													<button
														type="button"
														class="TeamMenuItem"
														onclick={() => goto('/logout')}
														style="display: flex; align-items: center; justify-content: center; gap: 8px;"
													>
														<Icon icons={materialSymbols} name="logout" width="18px" />
														Esci
													</button>
												</VBox>
											</Card>
										</PopOver>
									{/if}
								</div>
							{/if}
						</HBox>
					</HBox>
				</div>

				<div class="PaperContent">
					{@render children?.()}
				</div>
			</VBox>

			{#if overlay}
				<div class="PaperOverlay">
					{@render overlay()}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.CanvasRoot {
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: stretch;
		padding-top: 16px;
		padding-bottom: 24px;
	}

	.LayoutContainer {
		display: flex;
		height: 100%;
		align-items: stretch;
		justify-content: center;
	}

	.Keypad {
		width: 70px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 24px 0;
		background: transparent;
	}

	.Logo {
		display: block;
		font-size: 32px;
		margin-bottom: 24px;
		cursor: pointer;
	}

	.FlexSpacer {
		flex-grow: 1;
	}

	.NavItems {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.NavIcon {
		display: flex;
		width: 44px;
		height: 44px;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		font-size: 20px;
		text-decoration: none;
		color: inherit;
		opacity: 1;
		transition: all 0.2s;
		cursor: pointer;
	}

	.NavIcon:hover:not(.disabled):not(.NavIcon--active) {
		opacity: 1;
		background: rgba(0, 0, 0, 0.05);
	}

	.NavIcon--active {
		background: var(--snt-color-ic-500);
		color: white;
		opacity: 1;
		/* The Glow/Lift */
		box-shadow:
			0 10px 15px -3px #e9a57173,
			0 4px 6px -4px #e9a57173;
		/* The "Lip" or Thickness */
		border-bottom: 1px solid #c46854;
	}

	.NavIcon--active:active {
		box-shadow:
			0 1px 3px 0 #e9a57173,
			0 1px 2px -1px #e9a57173;
		border-bottom: none;
		border-bottom-width: 0;
		transform: translateY(1px);
	}

	.NavIcon.disabled {
		opacity: 0.2 !important;
		cursor: not-allowed;
	}

	.SidebarExtra {
		margin-top: 24px;
	}

	.Paper {
		position: relative;
		overflow: hidden;
		background: #fbfbfb;
		border: none;
		height: 100%;
		max-width: calc(100vw - 120px);
		border-radius: 16px 16px 16px 16px;
	}

	.PaperOverlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 2000;
	}

	.PaperOverlay > :global(*) {
		pointer-events: auto;
	}

	.SizeToggle {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 2000;
	}

	.ResizeHandle {
		position: absolute;
		inset-block: 0;
		right: 0;
		width: 12px;
		cursor: ew-resize;
		z-index: 5;
	}

	.ResizeBar {
		width: 4px;
		height: 96px;
		background: rgba(0, 0, 0, 0.15);
		border-radius: 2px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: background 0.2s;
	}

	.ResizeHandle:hover .ResizeBar {
		background: rgba(0, 0, 0, 0.3);
	}

	.PaperHeader {
		padding: 24px 40px;
		padding-bottom: 0px;
		position: relative;
		z-index: 1001;
	}

	.AvatarWrapper {
		position: relative;
	}

	.AvatarButton {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: none;
		overflow: hidden;
		padding: 0;
		background: none;
		cursor: pointer;
	}

	.AvatarButton img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.TeamMenuItem {
		display: block;
		width: 100%;
		text-align: center;
		padding: 14px 20px;
		color: #18181b;
		font-size: 14px;
		font-weight: 500;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
	}

	.TeamMenuItem:hover {
		background: #f4f4f5;
	}

	.TeamMenuItem:focus {
		outline: none;
	}

	.PaperContent {
		padding: 40px;
		overflow-y: auto;
	}
</style>
