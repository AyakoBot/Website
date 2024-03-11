<script lang="ts">
	import InfiniteCarousel from '$lib/components/page/home/server/ServerCarousel.svelte';
	import RandomLetters from '$lib/components/generic/RandomLetters.svelte';
	import Buttons from '$lib/components/page/home/Buttons.svelte';
	import Count from '$lib/components/page/home/Count.svelte';
	import Flower from '$lib/components/page/home/Flowers.svelte';
</script>

<br class="pt-30" />
<Flower />

<div class="flex flex-col justify-center items-center mt-120">
	<p class="md:text-4xl text-2xl code">
		<RandomLetters text="Powerful Server Management" />
		<RandomLetters text="And Moderation Bot" />
	</p>
</div>

<div class="w-full flex flex-row justify-center items-center mt-20">
	<div
		class="z-2 flex flex-col items-center justify-center items-center md:flex-row md:ml-6 ml-0 w-1/2"
	>
		<Buttons />
	</div>
</div>

<div class="mt-40">
	<Count />
</div>

<InfiniteCarousel />