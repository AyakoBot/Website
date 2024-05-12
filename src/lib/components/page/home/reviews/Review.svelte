<script lang="ts">
	import type { ReviewDispatch } from '$lib/scripts/types.js';
	import { createEventDispatcher } from 'svelte';
	import type { Returned as GETReviews } from '@ayako/server/src/routes/reviews/+server.js';

	const dispatch = createEventDispatcher<ReviewDispatch>();

	$: hover = false;

	const hovered = () => {
		hover = true;
		dispatch('hovered', review);
	};

	const unhovered = () => {
		hover = false;
		dispatch('unhovered', review);
	};

	export let review: GETReviews[number];
</script>

<li class="container">
	<div
		on:mouseover={hovered}
		on:mouseleave={unhovered}
		on:focus={hovered}
		on:blur={unhovered}
		tabindex="-1"
		role="button"
		class="w-75 max-h-full h-auto rounded-2xl flex-shrink-0 mx-8 aspect-video hover:scale-105% transition-all ease-in-out relative flex flex-col justify-center items-center of-hidden cursor-default"
	>
		<div
			class="absolute h-100rem w-100rem animate-[spin_4s_linear_infinite] custom-gradient transition-all ease-in-out box-shadow-main {hover
				? 'op-20'
				: ''}"
		></div>

		{#if review.avatar}
			<img
				src={`${review.avatar.replace('?size=512', '')}?size=2048`}
				alt=""
				width="128"
				height="128"
				class="{review.avatar ? 'rounded-full' : ''} aspect-square absolute {hover
					? 'scale-90% op-20'
					: ''} transition-all"
				loading="lazy"
			/>
		{/if}

		<div
			class="z-20 op-0 {hover
				? 'op-100 scale-105% z-unset'
				: 'z--1'} transition-all scale-90% ease-in-out flex flex-col justify-center items-center w-full h-full"
		>
			<span
				class="{hover ? 'scale-105%' : ''} scale-90% transition-all ease-in-out w-full p-2 text-2xl"
			>
				{review.username.slice(0, 50)}
			</span>
			<br />
			<span class="{hover ? 'scale-105%' : ''} scale-90% transition-all ease-in-out text-2xl">
				{'⭐'.repeat(review.score / 20)}
			</span>
		</div>
	</div>
</li>

<style>
	@keyframes spin {
		0% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

	.custom-gradient {
		background-image: conic-gradient(from 90deg at 50% 50%, #31de40 0%, #fe3521 50%, #31de40 100%);
	}
</style>
