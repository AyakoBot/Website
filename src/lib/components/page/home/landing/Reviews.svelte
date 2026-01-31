<script lang="ts">
	import type { Returned as GETReviews } from '@ayako/server/src/routes/v1/bot/reviews/+server.js';

	const { reviews }: { reviews: GETReviews } = $props();

	const averageRating = $derived(
		reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / reviews.length
	);
</script>

<section class="py-24 px-16 max-w-350 mx-auto md:px-6">
	<div class="text-center mb-16">
		<span class="inline-block bg-[rgba(176,255,0,0.1)] text-[#b0ff00] px-4 py-2 rounded-full text-sm font-600 mb-4">Reviews</span>
		<h2 class="text-8 lg:text-12 font-800 text-white mb-4">Loved by users</h2>
		<div class="flex items-center justify-center gap-4 mt-6">
			<span class="text-12 font-800 text-white">{averageRating.toFixed(1)}</span>
			<div class="flex gap-1">
				{#each Array(5) as _, i (i)}
					<span class="i-tabler-star-filled text-2xl text-yellow-400"></span>
				{/each}
			</div>
			<span class="text-white/50 text-3.6">from {reviews.length} reviews</span>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
		{#each reviews.slice(0, 6) as review (review.userid)}
			<div class="bg-white/3 border border-white/8 rounded-4 p-6 transition-all hover:bg-white/5 hover:border-white/15">
				<div class="flex items-center gap-3 mb-4">
					{#if review.avatar}
						<img src={review.avatar} alt="" class="w-11 h-11 rounded-full object-cover" />
					{:else}
						<div class="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/50">
							<span class="i-tabler-user"></span>
						</div>
					{/if}
					<div class="flex flex-col gap-1">
						<span class="font-600 text-white text-3.8">{review.username}</span>
						<div class="flex gap-0.5">
							{#each Array(Math.floor(review.score / 20)) as _, i (i)}
								<span class="i-tabler-star-filled text-sm text-yellow-400"></span>
							{/each}
						</div>
					</div>
				</div>
				<p class="text-white/70 leading-relaxed text-3.6">{review.content?.slice(0, 150)}</p>
			</div>
		{/each}
	</div>
</section>
