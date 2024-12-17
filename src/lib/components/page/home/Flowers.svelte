<script lang="ts">
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';

	const src = '/images/WhiteFlower.webp';
	const alt = 'Flower';
</script>

<div
	class="flex justify-center items-center relative m-auto w-90vw h-30dvh mt-5% of-hidden of-y-hidden z-1"
	style="--move: cubic-bezier(0.03, 0.82, 0.13, 1.04);"
>
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
	<div
		class="absolute fw-bold code-font text-25 z-2 op-0 top-75% left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-[blendIn_2s_forwards_var(--move)_0.5s] z-99"
	>
		<ColorFadeText text="AYAKO" />
	</div>
</div>

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
		}
		to {
			opacity: 1;
		}
	}

	@keyframes flowerTop {
		from {
			top: 3cm;
		}
		to {
			top: 0;
		}
	}

	@keyframes flowerLeft {
		from {
			left: calc(50% - 7vmin);
			top: 3.5cm;
			rotate: -45deg;
		}
		to {
			left: calc(50% - 7cm);
			top: 3.5cm;
		}
	}

	@keyframes flowerRight {
		from {
			left: calc(50% - 3cm);
			top: 3.5cm;
			rotate: 12deg;
		}
		to {
			left: calc(50% + 4.5cm);
			top: 3.5cm;
		}
	}

	@keyframes flowerTopLeft {
		from {
			left: calc(50% - 1.5cm);
			top: 3.5cm;
			rotate: -10deg;
		}
		to {
			left: calc(50% - 4cm);
			top: 2cm;
		}
	}

	@keyframes flowerTopRight {
		from {
			left: calc(50% - 0.5cm);
			top: 3.5cm;
			rotate: 80deg;
		}
		to {
			left: calc(50% + 3cm);
			top: 2cm;
		}
	}
</style>
