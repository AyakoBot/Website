<script lang="ts">
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import RandomLetters from '$lib/components/generic/RandomLetters.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();

	const src = '/images/WhiteFlower.webp';
	const alt = 'Flower';
</script>

<section
	class="flex flex-col justify-center items-center relative m-auto w-full min-h-70dvh pt-10 pb-16 of-hidden z-1"
	style="--move: cubic-bezier(0.03, 0.82, 0.13, 1.04);"
>
	<!-- Floating flowers background -->
	<div class="absolute inset-0 flex justify-center items-start pt-10">
		<img
			class="absolute w-3.5cm h-auto opacity-0 animate-[flower_240s_linear_infinite,blendIn_2s_forwards_var(--move)_0.5s,flowerTop_2s_forwards_var(--move)_0.5s]"
			{src}
			draggable="false"
			{alt}
			loading="eager"
		/>
		<img
			class="absolute w-2.5cm h-auto opacity-0 -rotate-45 animate-[flower_110s_linear_infinite_reverse,blendIn_2s_forwards_var(--move)_0.5s,flowerLeft_2s_forwards_var(--move)_0.5s]"
			{src}
			draggable="false"
			{alt}
			loading="eager"
		/>
		<img
			class="absolute w-2cm h-auto opacity-0 animate-[flower_90s_linear_infinite,blendIn_2s_forwards_var(--move)_0.5s,flowerRight_2s_forwards_var(--move)_0.5s]"
			{src}
			draggable="false"
			{alt}
			loading="eager"
		/>
		<img
			class="absolute w-1cm h-auto opacity-0 rotate-12 animate-[flower_280s_linear_infinite_reverse,blendIn_2s_forwards_var(--move)_0.5s,flowerTopLeft_2s_forwards_var(--move)_0.5s]"
			{src}
			draggable="false"
			{alt}
			loading="eager"
		/>
		<img
			class="absolute w-0.9cm h-auto opacity-0 animate-[flower_280s_linear_infinite,blendIn_2s_forwards_var(--move)_0.5s,flowerTopRight_2s_forwards_var(--move)_0.5s]"
			{src}
			draggable="false"
			{alt}
			loading="eager"
		/>
	</div>

	<!-- Hero content -->
	<div class="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
		<!-- AYAKO title -->
		<div
			class="fw-bold code-font text-20 md:text-25 op-0 animate-[blendIn_2s_forwards_var(--move)_0.5s]"
		>
			<ColorFadeText text="AYAKO" />
		</div>

		<!-- Subtitle -->
		<div class="md:text-4xl text-2xl code-font op-0 animate-[blendIn_1s_forwards_ease-out_1s]">
			<RandomLetters text="Powerful Server Management" />
			<RandomLetters text="And Moderation Bot" />
		</div>

		<!-- Tagline -->
		<p
			class="text-lg md:text-xl text-neutral-300 max-w-150 op-0 animate-[blendIn_1s_forwards_ease-out_1.5s]"
		>
			The all-in-one Discord bot for moderation, role management, leveling, and community
			engagement.
		</p>

		<!-- CTA Buttons slot -->
		{#if children}
			<div
				class="flex flex-col md:flex-row gap-4 items-center mt-4 op-0 animate-[blendIn_1s_forwards_ease-out_2s]"
			>
				{@render children()}
			</div>
		{/if}
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-6 left-1/2 -translate-x-1/2 op-0 animate-[blendIn_1s_forwards_ease-out_2.5s]"
	>
		<div class="animate-bounce">
			<span class="i-tabler-chevron-down text-3xl text-neutral-400"></span>
		</div>
	</div>
</section>

<style scoped>
	@keyframes flower {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	@keyframes blendIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes flowerTop {
		from {
			top: 5cm;
		}
		to {
			top: 2cm;
		}
	}

	@keyframes flowerLeft {
		from {
			left: calc(50% - 7vmin);
			top: 5.5cm;
			rotate: -45deg;
		}
		to {
			left: calc(50% - 7cm);
			top: 5.5cm;
		}
	}

	@keyframes flowerRight {
		from {
			left: calc(50% - 3cm);
			top: 5.5cm;
			rotate: 12deg;
		}
		to {
			left: calc(50% + 4.5cm);
			top: 5.5cm;
		}
	}

	@keyframes flowerTopLeft {
		from {
			left: calc(50% - 1.5cm);
			top: 5.5cm;
			rotate: -10deg;
		}
		to {
			left: calc(50% - 4cm);
			top: 4cm;
		}
	}

	@keyframes flowerTopRight {
		from {
			left: calc(50% - 0.5cm);
			top: 5.5cm;
			rotate: 80deg;
		}
		to {
			left: calc(50% + 3cm);
			top: 4cm;
		}
	}
</style>
