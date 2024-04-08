<script lang="ts">
	import { page } from '$app/stores';
	import RandomLetters from '$lib/components/generic/RandomLetters.svelte';
	import AverageReview from '$lib/components/page/home/AverageReview.svelte';
	import Buttons from '$lib/components/page/home/Buttons.svelte';
	import Count from '$lib/components/page/home/Count.svelte';
	import Flower from '$lib/components/page/home/Flowers.svelte';
	import LastCall from '$lib/components/page/home/LastCall.svelte';
	import FeatureTeaser from '$lib/components/page/home/features/main.svelte';
	import InfiniteReviewCarousel from '$lib/components/page/home/reviews/Carousel.svelte';
	import InfiniteGuildCarousel from '$lib/components/page/home/guild/Carousel.svelte';
	import { onMount } from 'svelte';
	import type { Returned as GETReviews } from './api/reviews/+server.js';

	onMount(async () => {
		const reload = $page.url.searchParams.get('reload');
		if (!reload) return;

		window.location.href = '/';
	});

	const getReviews = async (): Promise<GETReviews> => {
		const res = await fetch('/api/reviews');
		return (await res.json()).sort(() => 0.5 - Math.random());
	};

	const reviews = getReviews();
</script>

<Flower />

<div class="w-full h-full mt-100vh">
	<div class="flex flex-col justify-center items-center -mt-140 sm:-mt-120">
		<div class="md:text-4xl text-2xl code-font">
			<RandomLetters text="Powerful Server Management" />
			<RandomLetters text="And Moderation Bot" />
		</div>
	</div>

	<div class="w-full flex flex-row justify-center items-center mt-20">
		<div class="z-2 flex flex-col items-center justify-center items-center md:flex-row w-1/2">
			<Buttons />
		</div>
	</div>

	<div class="mt-40">
		<Count />
	</div>

	<InfiniteGuildCarousel />
	<div class="mt-10">
		<AverageReview {reviews} />
	</div>
	<InfiniteReviewCarousel {reviews} />

	<FeatureTeaser />

	<LastCall />
</div>
