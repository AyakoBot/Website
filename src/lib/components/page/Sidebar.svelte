<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Fa from 'svelte-fa';
	import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

	let sidebar: HTMLElement;
	let backdrop: HTMLButtonElement;
	$: opened = false;

	const open = () => {
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

<button
	class="bg-white color-[#fe3521] rounded-full top-4 left-4 absolute z-9999 p-3 w-12 h-12 transition ease-in-out aspect-square flex justify-center items-center
hover:bg-[#fe3521] hover:color-white"
	on:click={() => open()}
	on:keydown={() => open()}
>
	<Fa icon={faBars} size="1.5x" />
</button>

<nav
	bind:this={sidebar}
	class=" z-10000 h-full w-1/3 bg-neutral-900 fixed -left-100% box-shadow-main transition ease-in-out flex flex-col"
>
	<div class="flex flex-row items-center justify-between p-2 mx-2">
		<button
			class="bg-white color-[#fe3521] rounded-full z-9999 w-12 h-12 p-3 aspect-square transition ease-in-out flex justify-center items-center
 hover:bg-[#fe3521] hover:color-white"
			on:click={() => close()}
			on:keydown={() => close()}
		>
			<Fa icon={faClose} size="1.5x" />
		</button>

		<p class="font-bold lg:text-9 text-8 color-[#b0ff00] of-unset">Ayako</p>

		<a href="/">
			<img
				src="https://cdn.ayakobot.com/website_assets/NavBarIcon.png"
				alt="Ayako Logo Icon"
				width="64"
				height="64"
			/>
		</a>
	</div>

	<FancyBorder />
</nav>

<button
	class="w-100vw h-100vh bg-neutral-900/50 {opened ? 'z-9999' : '-z-1000'} op-0"
	bind:this={backdrop}
	on:click={() => close()}
	on:keydown={() => close()}
/>
