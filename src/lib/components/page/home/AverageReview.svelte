<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETReviews } from '@ayako/server/src/routes/v1/bot/reviews/+server.js';

	const { reviews }: { reviews: GETReviews } = $props();

	const averageScore = $derived(
		reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / reviews.length
	);
	const fullStars = $derived(Math.floor(averageScore));
</script>

<section class="flex flex-col items-center px-4">
	<h2 class="text-3xl md:text-4xl font-bold mb-4 text-center">Loved by the community</h2>

	<div class="flex flex-col items-center gap-3">
		<!-- Stars display -->
		<div class="flex items-center gap-2">
			<div class="text-10 md:text-12">
				<ColorFadeAndCountUp num={averageScore} />
			</div>
			<div class="flex gap-1">
				{#each Array(5) as _, i (i)}
					<span
						class="text-3xl md:text-4xl {i < fullStars
							? 'i-tabler-star-filled text-yellow-400'
							: 'i-tabler-star text-neutral-500'}"
					></span>
				{/each}
			</div>
		</div>

		<span class="text-lg text-neutral-400">from {reviews.length} reviews</span>
	</div>
</section>
