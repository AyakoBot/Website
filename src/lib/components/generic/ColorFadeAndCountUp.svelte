<script lang="ts">
	import { numberWithCommas } from '$lib/scripts/util/utils';

	const { num }: { num: number } = $props();
	let element: HTMLSpanElement;

	$effect(() => {
		const randomStartPosition = Math.floor(Math.random() * 101);
		element.animate(
			[
				{ backgroundPosition: `${randomStartPosition}% center` },
				{ backgroundPosition: `${randomStartPosition - 200}% center` },
			],
			{ duration: 3000, easing: 'linear', iterations: Infinity },
		);

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) animateCountUp(num);
				else {
					counters.forEach((c) => clearInterval(c));
					counters.clear();
				}
			});
		});

		if (element) observer.observe(element);
	});

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

	const easeOutQuad = (t: number) => t * (2 - t);
</script>

<span
	class="bg-gradient-to-r via-[#fe3521] from-[#b0ff00] to-[#b0ff00] bg-[length:200%] bg-repeat-x w-full m-auto bg-clip-text text-fill-color font-bold"
	bind:this={element}
>
	{numberWithCommas(currentCount)}
</span>
