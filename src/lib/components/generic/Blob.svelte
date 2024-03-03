<script lang="ts">
	import { onMount } from 'svelte';

	let blobSlow: HTMLDivElement;
	let blobFast: HTMLDivElement;
	let lastUpdate = Date.now();

	$: x = 0;
	$: y = 0;

	onMount(() => {
		[blobSlow, blobFast].forEach((b) => {
			b?.animate([{ opacity: `0%` }, { opacity: `50%` }], {
				duration: 3000,
				delay: 2000,
				fill: 'forwards',
			});
		});
	});

	$: {
		[blobSlow, blobFast].forEach((b) => {
			b?.animate({ left: `${x}px`, top: `${y}px` }, { duration: 3000, fill: 'forwards' });
		});
	}
</script>

<svelte:window
	on:mousemove={(e) => {
		if (lastUpdate + 10 < Date.now()) {
			lastUpdate = Date.now();
			x = e.clientX;
			y = e.clientY;
		}
	}}
/>

<div class="h-full w-full overflow-hidden content-none fixed">
	<div
		id="rotate"
		class="bg-white h-52 absolute aspect-square rounded-full bg-gradient-to-r from-[#b0ff00] to-[#fe3521] z--9998 of-hidden ml--100px mt--100px blur-150 op-0"
		bind:this={blobSlow}
	/>
	<div
		id="rotateFaster"
		class="bg-white h-52 absolute aspect-square rounded-full bg-gradient-to-r from-[#b0ff00] to-[#fe3521] z--9998 of-hidden ml--100px mt--100px blur-150 op-0"
		bind:this={blobFast}
	/>
</div>

<style scoped>
	#rotate {
		animation: spin 10s infinite;
	}

	#rotateFaster {
		animation: spinFaster 5s infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		50% {
			scale: 1 1.5;
		}

		to {
			transform: rotate(360deg);
		}
	}

	@keyframes spinFaster {
		from {
			transform: rotate(0deg);
			scale: 1 1.7;
		}

		50% {
			scale: 1.7 1;
		}

		to {
			transform: rotate(-360deg);
			scale: 1 1.7;
		}
	}
</style>
