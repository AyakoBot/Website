<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import NoResults from '$lib/components/generic/NoResults.svelte';
	import SearchBar from '$lib/components/generic/SeachBar.svelte';
	import Image from '$lib/components/page/artwork/Image.svelte';
	import { ArtType } from '$lib/scripts/types.js';
	import sleep from '$lib/scripts/util/sleep.js';
	import type { Returned as GETArt } from '../api/artworks/+server.js';

	const getArt = async (query?: string, type?: ArtType) => {
		const urlSearchParams = new URLSearchParams('');
		if (query) urlSearchParams.set('q', query);
		if (type) urlSearchParams.set('type', type);

		const res = await fetch(`/api/artworks?${urlSearchParams.toString()}`);
		return res.json() as Promise<GETArt>;
	};

	$: art = getArt();
</script>

<div class="flex flex-col justify-center items-center w-full mt-25">
	<div class="mb-5 w-full absolute top-40 left-0">
		<SearchBar
			options={[
				{ key: 'all', value: 'All', default: true },
				{ key: 'emoji', value: 'Emoji' },
				{ key: 'full', value: 'Full Image' },
				{ key: 'icon', value: 'Icon' },
			]}
			on:any={(e) => (art = getArt(e.detail.query, e.detail.option as ArtType))}
		/>

		<FancyBorder />
	</div>

	<div class="w-full h-full m-auto mt-2">
		{#await art}
			<div class="w-100vw flex flex-row justify-center items-center">
				<Loading />
			</div>
		{:then art}
			{#if art.length}
				<div
					class="column-count-3 md:column-count-4 xl:column-count-5 column-width-80 w-full h-full gap-0"
				>
					{#each art as artwork, i (i)}
						<Image {artwork} />
					{/each}
				</div>
			{:else}
				<div class="w-100vw">
					<NoResults />
				</div>
			{/if}
		{:catch error}
			{console.error(error)}
			<p>Error</p>
		{/await}
	</div>
</div>
