<script lang="ts">
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { Returned as GETArt } from '../../../../routes/api/artworks/+server.js';
	import Loading from '$lib/components/generic/Loading.svelte';

	export let artwork: GETArt[number];

	const src = `https://cdn.ayakobot.com/Ayako_Artwork/${artwork.art.url}`;
	const abortLoad = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=;';
	const img = new Image();

	let loaded = false;
	let failed = false;
	let loading = false;
	let hovering = false;

	onMount(() => {
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
	});

	onDestroy(() => {
		img.src = abortLoad;
		img.onload = null;
		img.onerror = null;
	});
</script>

<div class="w-full h-auto rounded-2xl flex justify-center items-center">
	{#if loaded}
		<div
			class="flex flex-col justify-center items-center relative"
			role="tooltip"
			on:mouseover={() => (hovering = true)}
			on:mouseleave={() => (hovering = false)}
			on:focus={() => (hovering = true)}
			on:blur={() => (hovering = false)}
		>
			<img
				loading="lazy"
				{src}
				alt={artwork.art.description}
				class="w-100vw h-auto {hovering ? 'scale-75 -translate-y-12.5%' : ''} transition"
			/>

			<div
				class="flex flex-row justify-center items-center absolute bottom-12.5% translate-y-50% text-xl gap-5 transition {hovering
					? 'op-100'
					: 'op-0'}"
			>
				<img
					src={artwork.user.avatar}
					alt=""
					width="32"
					height="32"
					class="rounded-full"
					loading="lazy"
				/>
				<ColorFadeText text={artwork.user.username} />
			</div>
		</div>
	{:else if failed}
		<img {src} alt="Not Found" class="w-full h-auto" loading="lazy" />
	{:else if loading}
		<Loading />
	{/if}
</div>
