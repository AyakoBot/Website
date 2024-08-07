<script lang="ts">
	import type { Returned as GETReviews } from '@ayako/server/src/routes/v1/bot/reviews/+server.js';
	import Review from './Review.svelte';

	export let reviews: GETReviews;

	let hoveredReviewId: string | null;
	$: hoveredReviewId = null;

	let timeout: NodeJS.Timeout | null = null;
	let reviewDiv: HTMLDivElement;

	let content: string;
	$: content = '';

	let reviewWidth: number;
	$: reviewWidth = 0;

	let reviewHeight: number;
	$: reviewHeight = 0;

	let review: HTMLDivElement;

	const resetReview = (wait: boolean = true) => {
		const reset = () => {
			hoveredReviewId = null;
			content = '';
			reviewWidth = 0;
			reviewHeight = 0;
		};

		if (!wait) {
			reset();
			return;
		}

		timeout = setTimeout(() => {
			reset();
		}, 1000);
	};

	const setReview = async (newReviewId: string) => {
		if (hoveredReviewId && hoveredReviewId !== newReviewId) resetReview(false);
		if (timeout) clearTimeout(timeout);
		hoveredReviewId = newReviewId;
		reviewWidth = reviewDiv?.offsetWidth;
		reviewHeight = reviewDiv?.offsetHeight;
		content = reviews.find((r) => r.userid === hoveredReviewId)?.content ?? '';
	};

	const hoverText = () => {
		if (timeout) clearTimeout(timeout);
	};
</script>

<div
	class="mt-20 flex flex-col justify-center items-center [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
	style="
		--slide-width: 400px;
  --slide-count: {reviews.length};
  --time-per-slide: 10s;
"
>
	<div
		class="relative z-20 max-w-100vw overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
	>
		<div
			class="flex animate-[scroll_calc(var(--time-per-slide)*var(--slide-count))_linear_infinite] min-w-[max-w-[calc(var(--slide-width)*var(--slide-count))]] max-w-[calc(var(--slide-width)*var(--slide-count))]"
		>
			{#each new Array(2).fill(null) as _}
				{#each reviews as review (review.userid)}
					<div
						class="h-200px min-w-[var(--slide-width)] max-w-[var(--slide-width)] flex flex-col items-start justify-center pointer-events-none"
					>
						<Review
							{review}
							on:hovered={(e) => {
								setReview(e.detail.userid);
							}}
							on:unhovered={() => resetReview(true)}
						/>
					</div>
				{/each}
			{/each}
		</div>
	</div>
	<span class="text-xs color-neutral-500">hover/tap to see more info</span>

	<div class="op-0 absolute left--1000% z--1000 py-10 w-110%" bind:this={reviewDiv}>
		{reviews.find((r) => r.userid === hoveredReviewId)?.content}
	</div>

	<div
		role="tooltip"
		on:mouseover={hoverText}
		on:mouseleave={() => resetReview(true)}
		on:focus={hoverText}
		on:blur={() => resetReview(true)}
		class="shadow-black shadow-op-50 shadow-inner w-110% px-10 sm:px-15 md:px-20 lg:px-30 xl:px-40 rounded-2xl bg-neutral-700 text-neutral-100 transition-all ease-in-out flex flex-row flex-wrap justify-center items-center"
		style="height: {reviewHeight}px"
		aria-label="Review"
	>
		<div bind:this={review}>
			{#each content.split(/\s/g) as word, i (i)}
				<span
					class="op-0 animate-[appear_200ms_normal_linear_forwards]"
					style="animation-delay: {i * 125}ms;"
				>
					{word + ' '}
				</span>
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(calc(var(--slide-width) * -1) * var(--slide-count)));
		}
	}

	@keyframes appear {
		to {
			opacity: 1;
		}
	}
</style>
