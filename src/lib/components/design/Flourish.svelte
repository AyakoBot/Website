<script lang="ts">
	/**
	 * Horizontal ink flourish - a small bloom with trailing stems and leaves.
	 * Used as a scholarly section divider / heading ornament.
	 */
	const {
		width = 220,
		color = 'var(--ink-soft)',
		class: className = '',
	}: { width?: number; color?: string; class?: string } = $props();
</script>

<svg
	{width}
	height={width * 0.11}
	viewBox="0 0 240 26"
	fill="none"
	aria-hidden="true"
	class={className}
>
	<!-- left stem -->
	<path d="M8 13 C 40 13 70 11 104 13" stroke={color} stroke-width="1.2" stroke-linecap="round" />
	<path
		d="M64 13 C 58 9 54 5 53 1 C 59 3 63 8 64 13 Z"
		stroke={color}
		stroke-width="1.1"
		stroke-linejoin="round"
	/>
	<path
		d="M84 13 C 79 17 76 21 76 25 C 81 22 84 18 84 13 Z"
		stroke={color}
		stroke-width="1.1"
		stroke-linejoin="round"
	/>
	<!-- center bloom -->
	<circle cx="120" cy="13" r="4.2" stroke={color} stroke-width="1.2" />
	<circle cx="120" cy="13" r="1" fill={color} />
	<circle cx="120" cy="5.6" r="1" fill={color} opacity="0.7" />
	<circle cx="127" cy="10.5" r="1" fill={color} opacity="0.7" />
	<circle cx="124.4" cy="19" r="1" fill={color} opacity="0.7" />
	<circle cx="115.6" cy="19" r="1" fill={color} opacity="0.7" />
	<circle cx="113" cy="10.5" r="1" fill={color} opacity="0.7" />
	<!-- right stem -->
	<path
		d="M232 13 C 200 13 170 11 136 13"
		stroke={color}
		stroke-width="1.2"
		stroke-linecap="round"
	/>
	<path
		d="M176 13 C 182 9 186 5 187 1 C 181 3 177 8 176 13 Z"
		stroke={color}
		stroke-width="1.1"
		stroke-linejoin="round"
	/>
	<path
		d="M156 13 C 161 17 164 21 164 25 C 159 22 156 18 156 13 Z"
		stroke={color}
		stroke-width="1.1"
		stroke-linejoin="round"
	/>
</svg>
