<script setup lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';

	const animationOptions = {
		duration: 2000,
		delay: 500,
		fill: 'forwards',
		easing: 'cubic-bezier(0.03, 0.82, 0.13, 1.04)',
	} as KeyframeAnimationOptions;

	let flower1: HTMLElement | null;
	let flower2: HTMLElement | null;
	let flower3: HTMLElement | null;
	let flower4: HTMLElement | null;
	let flower5: HTMLElement | null;
	let blendIn: HTMLElement | null;

	const coords = {
		sm: {
			flower2: {
				left: 'calc(50% - 33vmin)',
				top: '17vmin',
			},
			flower3: {
				left: 'calc(50% + 20vmin)',
				top: '18vmin',
			},
			flower4: {
				left: 'calc(50% + 10vmin)',
				top: '12vmin',
			},
			flower5: {
				left: 'calc(50% - 17vmin)',
				top: '13vmin',
			},
		},

		md: {
			flower2: {
				left: 'calc(50% - 33vmin)',
				top: '15vmin',
			},
			flower3: {
				left: 'calc(50% + 20vmin)',
				top: '15vmin',
			},
			flower4: {
				left: 'calc(50% + 11vmin)',
				top: '10vmin',
			},
			flower5: {
				left: 'calc(50% - 18vmin)',
				top: '10vmin',
			},
		},

		lg: {
			flower2: {
				left: 'calc(50% - 32vmin)',
				top: '15vmin',
			},
			flower3: {
				left: 'calc(50% + 21vmin)',
				top: '15vmin',
			},
			flower4: {
				left: 'calc(50% - 17vmin)',
				top: '10vmin',
			},
			flower5: {
				left: 'calc(50% + 14vmin)',
				top: '10vmin',
			},
		},
	};

	let innerWidth: number = 0;

	onMount(() => {
		const sm = innerWidth < 768;
		const md = innerWidth < 1024 && innerWidth >= 768;
		const applyingCoords = coords[md ? 'md' : sm ? 'sm' : 'lg'];

		blendIn?.animate([{ opacity: '0' }, { opacity: '1' }], animationOptions);

		flower1?.animate(
			[
				{ top: '17vmin', opacity: '0' },
				{ top: '0vmin', opacity: '1' },
			],
			animationOptions,
		);

		flower2?.animate(
			[
				{
					left: 'calc(50% - 7vmin)',
					top: '15vmin',
					opacity: '0',
					rotate: '-45deg',
				},
				{ ...applyingCoords.flower2, opacity: '1', rotate: '-80deg' },
			],
			animationOptions,
		);

		flower3?.animate(
			[
				{
					left: 'calc(50% - 6vmin)',
					top: '15vmin',
					opacity: '0',
					rotate: '12deg',
				},
				{ ...applyingCoords.flower3, opacity: '1', rotate: '50deg' },
			],
			animationOptions,
		);

		flower4?.animate(
			[
				{
					left: 'calc(50% - 3vmin)',
					top: '15vmin',
					opacity: '0',
					rotate: '-10deg',
				},
				{ ...applyingCoords.flower4, opacity: '1', rotate: '-35deg' },
			],
			animationOptions,
		);

		flower5?.animate(
			[
				{
					left: 'calc(50% - 3vmin)',
					top: '15vmin',
					opacity: '0',
					rotate: '80deg',
				},
				{ ...applyingCoords.flower5, opacity: '1', rotate: '100deg' },
			],
			animationOptions,
		);
	});

	onDestroy(() => deleteElements());

	const deleteElements = () => {
		flower1?.remove();
		flower2?.remove();
		flower3?.remove();
		flower4?.remove();
		flower5?.remove();
	};

	const src = '/images/WhiteFlower.webp';
	const alt = 'Flower';
</script>

<svelte:window bind:innerWidth />

<div
	class="flex justify-center items-center relative m-auto w-90vw h-22vh md:h-30vh mt-5% of-hidden of-y-hidden z-1"
>
	<img
		id="flower1"
		bind:this={flower1}
		class="absolute w-[18vmin] h-auto opacity-0"
		{src}
		draggable="false"
		{alt}
		loading="eager"
	/>
	<img
		id="flower2"
		bind:this={flower2}
		class="absolute w-[13vmin] h-auto opacity-0 -rotate-45"
		{src}
		draggable="false"
		{alt}
		loading="eager"
	/>
	<img
		id="flower3"
		bind:this={flower3}
		class="absolute w-[11vmin] h-auto opacity-0"
		{src}
		draggable="false"
		{alt}
		loading="eager"
	/>
	<img
		id="flower4"
		bind:this={flower4}
		class="absolute w-[5vmin] h-auto opacity-0 rotate-12"
		{src}
		draggable="false"
		{alt}
		loading="eager"
	/>
	<img
		id="flower5"
		bind:this={flower5}
		class="absolute w-[4vmin] h-auto opacity-0"
		{src}
		draggable="false"
		{alt}
		loading="eager"
	/>
	<div
		class="text-15 absolute fw-bold code-font lg:text-20 xl:text-25 z-2 op-0
  top-75% left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
		bind:this={blendIn}
	>
		<ColorFadeText text="AYAKO" />
	</div>
</div>

<style scoped>
	#flower1 {
		animation: flower1 240s linear infinite;
	}

	@keyframes flower1 {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	#flower2 {
		animation: flower2 110s linear infinite;
	}

	@keyframes flower2 {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(-360deg);
		}
	}

	#flower3 {
		animation: flower3 90s linear infinite;
	}

	@keyframes flower3 {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
