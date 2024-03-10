<script lang="ts">
	import InfiniteCarousel from '$lib/components/page/home/server/ServerCarousel.svelte';
	import RandomLetters from '$lib/components/generic/RandomLetters.svelte';
	import Buttons from '$lib/components/page/home/Buttons.svelte';
	import Count from '$lib/components/page/home/Count.svelte';
	import Flower from '$lib/components/page/home/Flowers.svelte';
</script>

<br class="pt-30" />
<Flower />

<div class="flex flex-col justify-center items-center absolute w-1/2 left-1/4 md:top-3/5 top-1/2">
	<p class="md:text-4xl text-2xl code">
		<RandomLetters text="Powerful Server Management" />
		<br />
		<RandomLetters text="And Moderation Bot" />
	</p>
</div>

<div
	class="z-2 flex flex-col items-center justify-around md:flex-row mt-150 md:mt-160 md:ml-6 ml-0"
>
	<Buttons />
</div>

<div class="mt-40">
	<Count />
</div>

<InfiniteCarousel
	items={[
		{ name: 'name1', title: 'title1', quote: 'quote1' },
		{ name: 'name2', title: 'title2', quote: 'quote2' },
		{ name: 'name3', title: 'title3', quote: 'quote3' },
		{ name: 'name4', title: 'title4', quote: 'quote4' },
		{ name: 'name5', title: 'title5', quote: 'quote5' },
	]}
/>
