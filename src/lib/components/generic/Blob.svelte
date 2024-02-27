<script lang="ts">
	import { spring } from 'svelte/motion';

	const coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 1,
		},
	);

	const size = spring(10);

	const classes =
		'bg-white h-52 fixed aspect-square bg-gradient-to-r from-[#b0ff00] to-[#fe3521] blur-[150px] opacity-0 z-[-9998] of-hidden';

	import { writable } from 'svelte';

	const mouseX = writable(0);
	const mouseY = writable(0);

	const handleMouseMove = (event) => {
		mouseX.set(event.clientX);
		mouseY.set(event.clientY);
	};
</script>

<svelte:window on:mousemove={handleMouseMove} />

<svg
	on:mousemove={(e) => {
		coords.set({ x: e.clientX, y: e.clientY });
	}}
	on:mousedown={() => size.set(30)}
	on:mouseup={() => size.set(10)}
	role="presentation"
	class="h-full w-full overflow-hidden content-none"
>
	<circle cx={$coords.x} cy={$coords.y} r={$size} style={classes} />
</svg>

<div></div>
