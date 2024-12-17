<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import NavBarButtons from '$lib/components/page/NavBar/Buttons.svelte';
	import Header from '$lib/components/page/Sidebar/Header.svelte';
	import Buttons from '$lib/components/page/Sidebar/Buttons.svelte';
	import Profile from '$lib/components/page/Sidebar/Profile.svelte';

	let sidebar: HTMLElement;
	let backdrop: HTMLButtonElement;
	let opened = $state(false);
	let width = $state(0);

	const open = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });

		document.documentElement.style.overflowY = 'hidden';

		opened = true;

		backdrop.animate([{ opacity: '0%' }, { opacity: '100%' }], {
			duration: 300,
			easing: 'ease-in-out',
			fill: 'forwards',
		});

		sidebar.animate([{ left: `-${sidebar.offsetWidth}px` }, { left: '0' }], {
			duration: 300,
			easing: 'ease-in-out',
			fill: 'forwards',
		});
	};

	const close = () => {
		opened = false;

		document.documentElement.style.overflowY = 'scroll';

		backdrop.animate([{ opacity: '100%' }, { opacity: '0%' }], {
			duration: 300,
			easing: 'ease-in-out',
			fill: 'forwards',
		});

		sidebar.animate([{ left: '0' }, { left: `-${sidebar.offsetWidth}px` }], {
			duration: 300,
			easing: 'ease-in-out',
			fill: 'forwards',
		});
	};
</script>

<svelte:window bind:innerWidth={width} />

<button
	class="bg-white color-[#fe3521] rounded-full top-4 left-4 absolute z-9999 p-3 w-12 h-12 transition ease-in-out aspect-square flex justify-center items-center
hover:bg-[#fe3521] hover:color-white"
	onclick={() => open()}
	onkeydown={() => open()}
	name="Open Sidebar"
	aria-label="Open Sidebar"
>
	<span class="block i-tabler-menu-2 w-10 h-10"></span>
</button>

<nav
	bind:this={sidebar}
	class="z-10000 h-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-neutral-900 fixed -left-100% box-shadow-main transition ease-in-out flex flex-col scroll-auto overflow-hidden"
>
	<Header {close} />

	{#if width < 640}
		<div class="px-4"><NavBarButtons /></div>
	{/if}

	<FancyBorder />

	<Buttons {close} />

	<Profile {close} />
</nav>

<button
	class="w-100vw h-100dvh bg-neutral-900/50 {opened ? 'z-9999' : '-z-1000'} op-0 absolute"
	bind:this={backdrop}
	onclick={() => close()}
	onkeydown={() => close()}
	aria-label="Open Sidebar"
	name="Open Sidebar"
></button>
