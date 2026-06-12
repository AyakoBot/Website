<script lang="ts">
	import type { Returned as GETReviews } from '@ayako/server/src/routes/v1/bot/reviews/+server.js';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import { reveal } from '$lib/scripts/util/reveal';

	const { reviews }: { reviews: GETReviews } = $props();

	const averageRating = $derived(
		reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / reviews.length,
	);
	const filledStars = $derived(Math.round(averageRating));
</script>

<section class="py-24 px-5 sm:px-8 max-w-6xl mx-auto">
	<div class="text-center mb-14" use:reveal>
		<span class="label-specimen block mb-3">Plate IV · Field Notes</span>
		<h2 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">Loved by users</h2>
		<p class="annotation text-2xl mb-4">what our users say</p>

		<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5">
			<span class="font-mono text-4xl text-ink">{averageRating.toFixed(1)}</span>
			<div class="flex gap-1" role="img" aria-label="{averageRating.toFixed(1)} out of 5 stars">
				{#each [0, 1, 2, 3, 4] as i (i)}
					<span
						class="{i < filledStars
							? 'i-tabler-star-filled text-gold'
							: 'i-tabler-star text-ink-faint'} text-2xl"
						aria-hidden="true"
					></span>
				{/each}
			</div>
			<span class="font-mono text-sm text-ink-soft">from {reviews.length} reviews</span>
		</div>

		<div class="flex justify-center mt-6">
			<Flourish width={210} color="var(--ink-faint)" />
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
		{#each reviews.slice(0, 6) as review, i (review.userid)}
			<div use:reveal={{ delay: (i % 3) * 0.12 }}>
				<article
					class="relative card-paper h-full px-5 pt-8 pb-5 [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg {i %
						3 ===
					0
						? 'rotate-[-1.2deg]'
						: i % 3 === 1
							? 'rotate-[1deg]'
							: 'rotate-[-0.5deg]'}"
				>
					<Tape angle={i % 2 === 0 ? 3 : -4} class="-top-2.5 left-1/2 -ml-9" />

					<div class="flex items-center gap-3 mb-3">
						<span class="relative w-11 h-13 shrink-0">
							<span
								class="absolute inset-0 rounded-[50%] border-[1.6px] border-ink/25 bg-paper flex items-center justify-center text-ink-faint"
							>
								<span class="i-tabler-user" aria-hidden="true"></span>
							</span>
							{#if review.avatar}
								<img
									src={review.avatar}
									alt=""
									width="44"
									height="52"
									class="absolute inset-0 w-11 h-13 rounded-[50%] border-[1.6px] border-ink/25 object-cover bg-paper"
									loading="lazy"
									onerror={(e) => e.currentTarget.remove()}
								/>
							{/if}
						</span>

						<div class="flex flex-col gap-0.5 min-w-0">
							<span class="font-display font-semibold text-ink leading-tight truncate">
								{review.username}
							</span>
							<div
								class="flex gap-0.5"
								role="img"
								aria-label="{Math.floor(review.score / 20)} out of 5 stars"
							>
								{#each [...Array(Math.floor(review.score / 20)).keys()] as j (j)}
									<span class="i-tabler-star-filled text-sm text-gold" aria-hidden="true"></span>
								{/each}
							</div>
						</div>
					</div>

					<p class="font-body italic text-[0.97rem] text-ink-soft leading-relaxed">
						“{review.content?.slice(0, 150)}{review.content && review.content.length > 150 ? '…' : ''}”
					</p>
				</article>
			</div>
		{/each}
	</div>
</section>
