<script lang="ts">
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import NoResults from '$lib/components/generic/NoResults.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';
	import Image from '$lib/components/page/artwork/Image.svelte';
	import { ArtType } from '$lib/scripts/types.js';
	import { reveal } from '$lib/scripts/util/reveal';
	import type { PageServerData } from './$types.js';

	const { data }: { data: PageServerData } = $props();
	let type: ArtType = $state(ArtType.all);
	let query = $state('');

	const assignFilters = async (q?: string, t?: ArtType) => {
		if (!q && !t) return data.art;

		type = t || ArtType.all;
		query = q?.toLowerCase() || '';
	};
</script>

<div class="relative w-full px-5 sm:px-8 pt-16 pb-24">
	<!-- marginalia sprig peeking in from the edge -->
	<div
		class="absolute top-10 right-6 lg:right-20 rotate-[22deg] opacity-50 pointer-events-none"
		aria-hidden="true"
	>
		<Sprig size={84} color="var(--leaf-soft)" />
	</div>

	<div class="max-w-7xl mx-auto">
		<header class="text-center mb-10" use:reveal>
			<span class="label-specimen block mb-3">The Gallery</span>
			<h1 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">Artwork</h1>
			<p class="annotation text-2xl mb-4">art made by the community</p>
			<div class="flex justify-center">
				<Flourish width={230} color="var(--ink-faint)" />
			</div>
		</header>

		<div class="max-w-3xl mx-auto mb-12" use:reveal={{ delay: 0.1 }}>
			<SearchBar
				options={[
					{ key: 'all', value: 'All', default: true },
					{ key: 'emoji', value: 'Emoji' },
					{ key: 'full', value: 'Full Image' },
					{ key: 'icon', value: 'Icon' },
				]}
				onany={(e) => assignFilters(e.query, e.option as ArtType)}
			/>
		</div>

		{#if data.art.length}
			<div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6" use:reveal={{ delay: 0.15 }}>
				{#each data.art.filter((a) => (type !== ArtType.all ? a.art.type === type : true) && (a.art.description ? a.art.description
									.toLowerCase()
									.includes(query) : true) && a.user.username
							.toLowerCase()
							.includes(query)) as artwork, i (i)}
					<div class="break-inside-avoid mb-6">
						<Image {artwork} index={i} />
					</div>
				{/each}
			</div>
		{:else}
			<div class="w-full py-16" use:reveal>
				<NoResults />
			</div>
		{/if}
	</div>
</div>
