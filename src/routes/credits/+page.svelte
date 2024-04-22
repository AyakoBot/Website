<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import CreditItem from '$lib/components/page/credits/item.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import type { Returned as GETCredits } from '$api/contributers/+server.ts';

	const getCredits = async (): Promise<GETCredits> => {
		const res = await fetch('/api/contributers');
		return (await (res.json() as Promise<GETCredits>)).sort(
			(a, b) => b.roles.length - a.roles.length,
		);
	};

	const credits = getCredits();
</script>

<div class="flex flex-col items-center justify-center w-full">
	<img
		src="https://cdn.ayakobot.com/website_assets/ayakoLove.png"
		width="128"
		alt=""
		loading="lazy"
	/>

	<h1 class="text-xl">Creators & Credits</h1>
	<FancyBorder />

	<div
		class="grid auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10"
	>
		{#await credits}
			<div class="w-full flex justify-center items-center">
				<Loading />
			</div>
		{:then credits}
			{#each credits as credit, i (i)}
				<CreditItem {credit} />
			{/each}
		{:catch error}
			{console.error(error)}
		{/await}
	</div>
</div>
