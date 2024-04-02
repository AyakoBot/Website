<script lang="ts">
	import type { Returned as GETReviews } from './api/reviews/+server.js';
	import InfiniteServerCarousel from '$lib/components/page/home/server/Carousel.svelte';
	import InfiniteReviewCarousel from '$lib/components/page/home/reviews/Carousel.svelte';
	import RandomLetters from '$lib/components/generic/RandomLetters.svelte';
	import Buttons from '$lib/components/page/home/Buttons.svelte';
	import Count from '$lib/components/page/home/Count.svelte';
	import AverageReview from '$lib/components/page/home/AverageReview.svelte';
	import Flower from '$lib/components/page/home/Flowers.svelte';
	import FeatureTeaser from '$lib/components/page/home/features/main.svelte';
	import LastCall from '$lib/components/page/home/LastCall.svelte';

	const getReviews = async (): Promise<GETReviews> => {
		const res = await fetch('/api/reviews');
		return (await res.json()).sort(() => 0.5 - Math.random());
	};

	const reviews = getReviews();
</script>

<br class="pt-30" />
<Flower />

<div class="flex flex-col justify-center items-center -mt-130">
	<p class="md:text-4xl text-2xl code">
		<RandomLetters text="Powerful Server Management" />
		<RandomLetters text="And Moderation Bot" />
	</p>
</div>

<div class="w-full flex flex-row justify-center items-center mt-20">
	<div class="z-2 flex flex-col items-center justify-center items-center md:flex-row w-1/2">
		<Buttons />
	</div>
</div>

<div class="mt-40">
	<Count />
</div>

<InfiniteServerCarousel />
<div class="mt-10">
	<AverageReview {reviews} />
</div>
<InfiniteReviewCarousel {reviews} />

<FeatureTeaser />

<LastCall />
