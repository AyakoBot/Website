<script lang="ts">
	const {
		count = 9,
		colors = ['var(--petal-soft)', 'var(--blossom)', 'var(--leaf-soft)'],
	}: { count?: number; colors?: string[] } = $props();

	const rand = (i: number, salt: number) => (((i + 1) * 2654435761 + salt * 40503) % 1000) / 1000;

	const petals = $derived(
		Array.from({ length: count }, (_, i) => ({
			left: 4 + rand(i, 1) * 92,
			size: 9 + rand(i, 2) * 9,
			duration: 16 + rand(i, 3) * 14,
			delay: -rand(i, 4) * 30,
			spin: 160 + rand(i, 5) * 300,
			driftX: -4 - rand(i, 6) * 9,
			opacity: 0.35 + rand(i, 7) * 0.4,
			color: colors[i % colors.length],
			flip: rand(i, 8) > 0.5,
		})),
	);
</script>

<div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
	{#each petals as petal, i (i)}
		<svg
			width={petal.size}
			height={petal.size * 1.25}
			viewBox="0 0 16 20"
			fill="none"
			class="absolute top-0 will-change-transform"
			style="left:{petal.left}%; --drift-x:{petal.driftX}vw; --drift-spin:{petal.flip
				? '-'
				: ''}{petal.spin}deg; --drift-opacity:{petal.opacity}; animation: drift {petal.duration}s linear {petal.delay}s infinite;"
		>
			<path
				d="M8 1 C 12.5 4 14.5 10 12.5 15 C 11 18 5 18 3.5 15 C 1.5 10 3.5 4 8 1 Z"
				fill={petal.color}
			/>
		</svg>
	{/each}
</div>
