<script lang="ts">
	import { onMount } from 'svelte';

	export let num: number;
	let counterElement: HTMLDivElement;
	const counters: Map<number, number> = new Map();

	const animateCountUp = (targetValue: number, refValue: number) => {
		const frameDuration = 1000 / 60;
		const animationDuration = 2000;
		const totalFrames = Math.round(animationDuration / frameDuration);
		const easeOutQuad = (t: number) => t * (2 - t);

		let frame = 0;
		counters.set(
			targetValue,
			setInterval(() => {
				frame += 1;
				const progress = easeOutQuad(frame / totalFrames);
				const countNow = Math.round(targetValue * progress);

				if (refValue !== countNow) refValue = countNow;
				if (frame === totalFrames) clearInterval(counters.get(targetValue));
			}),
		);
	};

	$: currentCount = 0;
 $: console.log(num);

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) animateCountUp(num, currentCount);
				else {
					counters.forEach((c) => clearInterval(c));
					counters.clear();
				}
			});
		});

		if (counterElement) observer.observe(counterElement);
	});

	const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
</script>

<div bind:this={counterElement}>{numberWithCommas(currentCount)}</div>
