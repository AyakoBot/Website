<script lang="ts">
	import Buttons from '$lib/components/page/NavBar/Buttons.svelte';
	$: width = 0;
</script>

<svelte:window bind:innerWidth={width} />

<nav
	class="absolute w-full p-2 bg-neutral-900/75 flex flex-col justify-between items-center box-shadow-main md:flex-row z-99"
>
	<ul id="left" class="flex flex-row items-center ml-15">
		<li class="pr-2">
			<a href="/">
				<img src="/images/Icon.webp" alt="Ayako Logo Icon" width="64" height="64" loading="eager" />
			</a>
		</li>
		<li class="flex flex-row justify-between items-end w-40%">
			<span class="font-bold lg:text-9 text-8 color-[#b0ff00] of-unset">Ayako</span>
			<span
				class="break-keep whitespace-nowrap pb-1.5 color-[#fe3521] font-bold pl-2 lg:text-5 text-4 of-unset hidden sm:display-unset"
			>
				Discord Bot
			</span>
		</li>
	</ul>

	{#if width > 640}
		<Buttons />
	{/if}
</nav>
