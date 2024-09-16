<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import NoResults from '$lib/components/generic/NoResults.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';
	import Image from '$lib/components/page/artwork/Image.svelte';
	import { ArtType } from '$lib/scripts/types.js';
	import type { PageServerData } from './$types.js';

	const { data }: { data: PageServerData } = $props();
	let type: ArtType = ArtType.all;
	let query = $state('');

	const assignFilters = async (q?: string, t?: ArtType) => {
		if (!q && !t) return data.art;

		type = t || ArtType.all;
		query = q?.toLowerCase() || '';
	};
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
			on:any={(e) => assignFilters(e.detail.query, e.detail.option as ArtType)}
		/>

		<FancyBorder />
	</div>

	<div class="w-full h-full m-auto mt-5">
		{#if data.art.length}
			<div
				class="column-count-3 md:column-count-4 xl:column-count-5 column-width-80 w-full h-full gap-0"
			>
				{#each data.art.filter((a) => (type !== ArtType.all ? a.art.type === type : true) && (a.art.description ? a.art.description
									.toLowerCase()
									.includes(query) : true) && a.user.username
							.toLowerCase()
							.includes(query)) as artwork, i (i)}
					<Image {artwork} />
				{/each}
			</div>
		{:else}
			<div class="w-100vw">
				<NoResults />
			</div>
		{/if}
	</div>
</div>
