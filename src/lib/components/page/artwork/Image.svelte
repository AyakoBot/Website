<script lang="ts">
	import Tape from '$lib/components/design/Tape.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import { cdnUrl } from '$lib/scripts/util/utils';
	import type { Returned as GETArt } from '@ayako/server/src/routes/v1/bot/artworks/+server.js';

	const { artwork, index = 0 }: { artwork: GETArt[number]; index?: number } = $props();

	const src = $derived(cdnUrl(`Ayako_Artwork/${artwork.art.url}`));
	const abortLoad = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=;';
	let img: HTMLImageElement;

	let loaded = $state(false);
	let failed = $state(false);
	let loading = $state(false);
	let hovering = $state(false);

	$effect(() => {
		img = new Image();
		img.src = src;
		loading = true;

		img.onload = () => {
			loading = false;
			loaded = true;
		};
		img.onerror = () => {
			loading = false;
			failed = true;
		};

		return () => {
			if (!img) return;

			img = new Image();
			img.src = abortLoad;
			img.onload = null;
			img.onerror = null;
		};
	});
</script>

<!-- a photograph taped into the folio -->
<div
	class="relative bg-paper border border-ink/15 rounded-[0.3rem_0.7rem_0.35rem_0.8rem] shadow-press p-2 pb-3 [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg {index %
		3 ===
	0
		? 'rotate-[-1.3deg]'
		: index % 3 === 1
			? 'rotate-[1deg]'
			: 'rotate-[-0.5deg]'}"
>
	<Tape angle={index % 2 === 0 ? -4 : 3} class="-top-2.5 left-1/2 -ml-9" />

	{#if loaded}
		<div
			class="relative overflow-hidden rounded-[2px]"
			role="tooltip"
			onmouseover={() => (hovering = true)}
			onmouseleave={() => (hovering = false)}
			onfocus={() => (hovering = true)}
			onblur={() => (hovering = false)}
			aria-label="Artwork by {artwork.user.username}"
		>
			<img loading="lazy" {src} alt={artwork.art.description} class="w-full h-auto" />

			<div
				class="absolute inset-x-0 bottom-0 flex flex-row items-center justify-center gap-3 px-3 pb-2.5 pt-10 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent transition-opacity duration-300 pointer-events-none {hovering
					? 'op-100'
					: 'op-0'}"
			>
				<img
					src={artwork.user.avatar}
					alt=""
					width="32"
					height="32"
					class="w-8 h-8 rounded-full border border-paper/40"
					loading="lazy"
				/>
				<span class="font-display font-semibold text-paper text-lg leading-tight">
					{artwork.user.username}
				</span>
			</div>
		</div>
	{:else if failed}
		<img {src} alt="Not Found" class="w-full h-auto" loading="lazy" />
	{:else if loading}
		<div class="flex justify-center items-center">
			<Loading />
		</div>
	{/if}
</div>
