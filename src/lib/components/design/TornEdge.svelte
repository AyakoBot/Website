<script lang="ts">
	const {
		fill = 'var(--paper)',
		flip = false,
		height = 44,
		class: className = '',
	}: { fill?: string; flip?: boolean; height?: number; class?: string } = $props();
</script>

<svg
	viewBox="0 0 1440 48"
	preserveAspectRatio="none"
	aria-hidden="true"
	class={className}
	style="display:block; width:100%; height:{height}px; {flip ? 'transform:scaleY(-1);' : ''}"
>
	<path
		d="M0 28 C 36 22 72 33 118 29 C 158 25 186 14 232 19 C 274 23 300 34 348 31
		   C 392 28 422 15 470 17 C 514 19 542 31 590 33 C 636 35 668 22 714 18
		   C 758 14 790 27 836 30 C 880 33 912 24 958 20 C 1002 16 1034 28 1080 31
		   C 1124 34 1158 23 1202 19 C 1246 15 1280 27 1324 30 C 1366 33 1404 25 1440 22
		   L 1440 48 L 0 48 Z"
		{fill}
	/>
</svg>
