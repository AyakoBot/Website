<script lang="ts">
	const {
		size = 96,
		color = 'var(--leaf)',
		class: className = '',
	}: { size?: number; color?: string; class?: string } = $props();
</script>

<svg
	width={size * 0.667}
	height={size}
	viewBox="0 0 64 96"
	fill="none"
	aria-hidden="true"
	class={className}
>
	<!-- stem -->
	<path
		d="M33 94 C 30 72 35 48 31 26 C 30 18 31 10 33 4"
		stroke={color}
		stroke-width="1.7"
		stroke-linecap="round"
	/>
	<!-- leaves, alternating -->
	<path
		d="M31.5 74 C 21 71 13 62 11 51 C 22 53 30 63 31.5 74 Z"
		stroke={color}
		stroke-width="1.5"
		stroke-linejoin="round"
	/>
	<path d="M30 71 C 25 65 20 60 15 55" stroke={color} stroke-width="0.9" opacity="0.55" />
	<path
		d="M33 58 C 43 54 50 45 52 34 C 41 37 34 47 33 58 Z"
		stroke={color}
		stroke-width="1.5"
		stroke-linejoin="round"
	/>
	<path d="M34.5 55 C 39 49 44 44 49 39" stroke={color} stroke-width="0.9" opacity="0.55" />
	<path
		d="M31 40 C 23 37 17 31 15 23 C 23 25 29 32 31 40 Z"
		stroke={color}
		stroke-width="1.4"
		stroke-linejoin="round"
	/>
	<!-- bud -->
	<path
		d="M33 4 C 36 6 37 10 35 13 C 32 12 31 7 33 4 Z"
		stroke={color}
		stroke-width="1.4"
		stroke-linejoin="round"
	/>
</svg>
