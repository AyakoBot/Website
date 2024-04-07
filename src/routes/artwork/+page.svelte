<script lang="ts">
	import Loading from '$lib/components/generic/Loading.svelte';
	import Image from '$lib/components/page/artwork/Image.svelte';
	import type { ArtType } from '$lib/scripts/types.js';
	import type { Returned as GETArt } from '../api/artworks/+server.js';

	const getArt = async (query?: string, type?: ArtType) => {
		const res = await fetch(`/api/artworks?q=${query}&type=${type}`);
		return await (res.json() as Promise<GETArt>);
	};

	// const art = getArt();
</script>

<div class="column-count-3 md:column-count-4 xl:column-count-5 column-width-80 w-full h-full gap-0">
	{#await getArt()}
 <div class="w-full flex justify-center items-center">
		<Loading />
 </div>
	{:then art}
		{#each art as artwork, i (i)}
			<Image {artwork} />
		{/each}
	{:catch error}
		{console.error(error)}
		<p>Error</p>
	{/await}
</div>
