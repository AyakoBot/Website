<script lang="ts">
	const {
		angle = -4,
		width = 76,
		class: className = '',
	}: { angle?: number; width?: number; class?: string } = $props();
</script>

<span
	aria-hidden="true"
	class="absolute block h-6 z-3 pointer-events-none w-[var(--tape-width)] rotate-[var(--tape-angle)] bg-[linear-gradient(105deg,rgba(233,218,175,0.5),rgba(240,228,192,0.75)_40%,rgba(228,211,164,0.55))] shadow-[0_1px_3px_rgba(44,38,24,0.18)] [clip-path:polygon(0%_8%,4%_0%,96%_2%,100%_12%,98%_50%,100%_88%,95%_100%,5%_98%,0%_90%,2%_50%)] {className}"
	style="--tape-angle:{angle}deg; --tape-width:{width}px;"
></span>
