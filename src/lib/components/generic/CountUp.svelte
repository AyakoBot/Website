<script lang="ts">
	import { numberWithCommas } from '$lib/scripts/util/utils';

	const { num }: { num: number } = $props();
	let counterElement: HTMLDivElement;
	const counters: Map<number, NodeJS.Timeout> = new Map();
	let currentCount = $state(0);

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

	$effect(() => {
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
</script>

<div bind:this={counterElement}>{numberWithCommas(currentCount)}</div>
