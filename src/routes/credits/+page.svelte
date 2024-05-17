<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import CreditItem from '$lib/components/page/credits/item.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="flex flex-col items-center justify-center w-full">
	<img
		src="/emotes/AyakoLove.webp"
		width="128"
		alt="Ayako holding a heart"
		loading="lazy"
	/>

	<h1 class="text-xl">Creators & Credits</h1>
	<FancyBorder />

	<div
		class="grid auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10"
	>
		{#each data.credits as credit, i (i)}
			<CreditItem {credit} />
		{/each}
	</div>
</div>
