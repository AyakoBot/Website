<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import NoResults from '$lib/components/generic/NoResults.svelte';
	import Image from '$lib/components/page/artwork/Image.svelte';
	import { ArtType } from '$lib/scripts/types.js';
	import sleep from '$lib/scripts/util/sleep.js';
	import type { Returned as GETArt } from '../api/artworks/+server.js';

	const getArt = async (query?: string, type?: ArtType) => {
		const urlSearchParams = new URLSearchParams('');
		if (query) urlSearchParams.set('q', query);
		if (type) urlSearchParams.set('type', type);

		const res = await fetch(`/api/artworks?${urlSearchParams.toString()}`);
		return await (res.json() as Promise<GETArt>);
	};

	let art = getArt();
	let type: ArtType | undefined = undefined;
	$: type = undefined;
	$: query = '';

	const changeType = (e: Event & { currentTarget: EventTarget & HTMLSelectElement }) => {
		type = e.currentTarget.value as ArtType;
		art = getArt(query, type);
	};

	let wasTypingAt: null | number = null;

	const changeQuery = async (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		wasTypingAt = Date.now();
		await sleep(500);
		if (wasTypingAt > Date.now() - 500) return;

		query = e.currentTarget.value;
		art = getArt(query, type);
	};
</script>

<div class="flex flex-col justify-center items-center w-full mt-25">
	<div class="mb-5 w-full absolute top-40 left-0">
		<div class="flex flex-row justify-center items-center ">
			<input
				type="text"
				placeholder="Search"
				class="p-2 rounded-l-full w-full sm:w-3/4 md:w-1/2 mb-4 px-4"
				on:input={(e) => changeQuery(e)}
			/>
			<select
				class="p-2 rounded-r-full mb-4 border-l-black border-l-1px"
				on:change={(e) => changeType(e)}
			>
				<option value="all">All</option>
				<option value="icon">Icon</option>
				<option value="emoji">Emoji</option>
				<option value="full">Full Image</option>
			</select>
		</div>

		<FancyBorder />
	</div>

	<div class="w-full h-full mt-2">
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
