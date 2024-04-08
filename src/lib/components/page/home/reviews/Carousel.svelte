<script lang="ts">
	import Loading from '$lib/components/generic/Loading.svelte';
	import { onMount } from 'svelte';
	import type { Returned as GETReviews } from '../../../../../routes/api/reviews/+server.js';
	import Review from './Review.svelte';

	export let reviews: Promise<GETReviews>;

	let container: HTMLDivElement;
	let scroller: HTMLUListElement;

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

	onMount(() => {
		addAnimation();
	});

	const addAnimation = async () => {
		await reviews;

		if (!container || !scroller) return;

		const scrollerContent = Array.from(scroller.children);

		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			if (scroller) scroller.appendChild(duplicatedItem);
		});
	};

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
		content = (await reviews).find((r) => r.userid === hoveredReviewId)?.content ?? '';
	};

	const hoverText = () => {
		if (timeout) clearTimeout(timeout);
	};
</script>

<div class="mt-20 flex flex-col justify-center items-center">
	{#await reviews}
		<Loading />
	{:then reviews}
		<div
			bind:this={container}
			class="relative z-20 max-w-100vw overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
		>
			<ul
				bind:this={scroller}
				class="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-[scroll_60s_normal_linear_infinite] hover:animate-paused"
			>
				{#each reviews as review (review.userid)}
					<Review
						{review}
						on:hovered={(e) => {
							setReview(e.detail.userid);
						}}
						on:unhovered={() => resetReview(true)}
					/>
				{/each}
			</ul>
		</div>
		<p class="text-xs color-neutral-500">hover to see more info</p>

		<div class="op-0 absolute left--1000% z--1000 py-10 w-110%" bind:this={reviewDiv}>
			{reviews.find((r) => r.userid === hoveredReviewId)?.content}
		</div>

		<div
			role="tooltip"
			on:mouseover={hoverText}
			on:mouseleave={() => resetReview(true)}
			on:focus={hoverText}
			on:blur={() => resetReview(true)}
			class="shadow-black shadow-op-50 shadow-inner w-110% px-40 rounded-2xl bg-neutral-700 text-neutral-100 transition-all ease-in-out flex flex-row flex-wrap justify-center items-center"
			style="height: {reviewHeight}px"
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
	{:catch error}
		{console.error(error)}
		<p>Error</p>
	{/await}
</div>

<style>
	@keyframes scroll {
		to {
			transform: translate(calc(-50% - 0.5rem));
		}
	}

	@keyframes appear {
		to {
			opacity: 1;
		}
	}
</style>
