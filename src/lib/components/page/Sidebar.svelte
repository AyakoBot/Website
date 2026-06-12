<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import NavBarButtons from '$lib/components/page/NavBar/Buttons.svelte';
	import Buttons from '$lib/components/page/Sidebar/Buttons.svelte';
	import Header from '$lib/components/page/Sidebar/Header.svelte';
	import Profile from '$lib/components/page/Sidebar/Profile.svelte';

	let opened = $state(false);

	const open = () => {
		document.documentElement.style.overflowY = 'hidden';
		opened = true;
	};

	const close = () => {
		document.documentElement.style.overflowY = '';
		opened = false;
	};

	afterNavigate(() => {
		if (opened) close();
	});
</script>

<button
	class="fixed top-2 left-3 z-60 w-12 h-12 flex justify-center items-center rounded-full bg-paper text-ink border border-ink/25 shadow-press transition-all duration-300 hover:text-petal hover:border-petal hover:rotate-90"
	onclick={open}
	name="Open Sidebar"
	aria-label="Open Sidebar"
	aria-expanded={opened}
>
	<span class="block i-tabler-menu-2 w-6 h-6" aria-hidden="true"></span>
</button>

<button
	class="fixed inset-0 z-70 bg-ink/40 backdrop-blur-sm transition-opacity duration-400 {opened
		? 'opacity-100'
		: 'opacity-0 pointer-events-none'}"
	onclick={close}
	tabindex={opened ? 0 : -1}
	aria-label="Close Sidebar"
	name="Close Sidebar"
></button>

<nav
	class="fixed inset-y-0 left-0 z-80 w-full sm:w-96 max-w-full bg-paper border-r border-ink/15 shadow-press-lg flex flex-col overflow-y-auto overflow-x-hidden transition-transform duration-450 ease-[var(--ease-organic)] motion-reduce:transition-none {opened
		? 'translate-x-0'
		: '-translate-x-full'}"
	aria-hidden={!opened}
	inert={!opened}
>
	<Header {close} />

	<div class="sm:hidden px-6 pt-4">
		<NavBarButtons />
	</div>

	<Buttons {close} />

	<Profile {close} />

	<div
		class="pointer-events-none absolute bottom-24 right-2 opacity-40 rotate-12"
		aria-hidden="true"
	>
		<Sprig size={110} color="var(--leaf-soft)" />
	</div>
</nav>
