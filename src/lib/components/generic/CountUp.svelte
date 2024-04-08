<script lang="ts">
	import { onMount } from 'svelte';

	export let num: number;
	let counterElement: HTMLDivElement;
	const counters: Map<number, NodeJS.Timeout> = new Map();
	$: currentCount = 0;

	const animateCountUp = (targetValue: number) => {
		const frameDuration = 1000 / 60;
		const animationDuration = 4000;
		const totalFrames = Math.round(animationDuration / frameDuration);

		let frame = 0;
		counters.set(
			targetValue,
			setInterval(() => {
				frame += 1;
				const progress = easeOutQuad(frame / totalFrames);
				const countNow = Math.round(targetValue * progress);

				if (currentCount !== countNow) currentCount = countNow;
				if (frame === totalFrames) clearInterval(counters.get(targetValue));
			}),
		);
	};

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) animateCountUp(num);
				else {
					counters.forEach((c) => clearInterval(c));
					counters.clear();
				}
			});
		});

		if (counterElement) observer.observe(counterElement);
	});

	const easeOutQuad = (t: number) => t * (2 - t);
	const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
</script>

<div bind:this={counterElement}>{numberWithCommas(currentCount)}</div>
