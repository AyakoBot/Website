<script lang="ts">
	const {
		size = 120,
		color = 'var(--petal)',
		class: className = '',
	}: { size?: number; color?: string; class?: string } = $props();

	const petals = [
		{ rotate: -3, scale: 1 },
		{ rotate: 74, scale: 0.97 },
		{ rotate: 143, scale: 1.03 },
		{ rotate: 220, scale: 0.98 },
		{ rotate: 288, scale: 1.01 },
	];
</script>

<svg
	width={size}
	height={size}
	viewBox="-50 -50 100 100"
	fill="none"
	aria-hidden="true"
	class={className}
>
	{#each petals as petal (petal.rotate)}
		<g transform="rotate({petal.rotate}) scale({petal.scale})">
			<path
				d="M0 -7 C -10 -14 -10 -32 0 -42 C 10 -32 10 -14 0 -7 Z"
				stroke={color}
				stroke-width="1.6"
				stroke-linejoin="round"
			/>
			<path
				d="M0 -12 C -1.5 -20 1 -28 0 -36"
				stroke={color}
				stroke-width="0.9"
				opacity="0.55"
				stroke-linecap="round"
			/>
		</g>
	{/each}

	<circle r="6.5" stroke={color} stroke-width="1.6" />
	<circle r="1.4" fill={color} />
	{#each petals as petal (petal.rotate)}
		<circle
			cx={3.8 * Math.cos(((petal.rotate - 90) * Math.PI) / 180)}
			cy={3.8 * Math.sin(((petal.rotate - 90) * Math.PI) / 180)}
			r="1"
			fill={color}
			opacity="0.7"
		/>
	{/each}
</svg>
