<script lang="ts">
	const {
		text,
		arrowPath,
		arrowWidth,
		arrowHeight,
		arrowViewBox,
		direction = 'down-left',
		position
	}: {
		text: string;
		arrowPath: string;
		arrowWidth: number;
		arrowHeight: number;
		arrowViewBox: string;
		direction?: 'down-left' | 'down-right' | 'up-left' | 'up-right';
		position: string;
	} = $props();

	const isReversed = direction === 'up-left' || direction === 'up-right' || direction === 'down-right';
</script>

<div class="absolute flex items-center gap-1.5 pointer-events-none z-10" class:flex-row-reverse={isReversed} style={position}>
	{#if !isReversed}
		<span class="hint-text">{@html text}</span>
	{/if}
	<svg class="hint-arrow {direction}" width={arrowWidth} height={arrowHeight} viewBox={arrowViewBox}><path d={arrowPath} fill="#fde047"/></svg>
	{#if isReversed}
		<span class="hint-text">{@html text}</span>
	{/if}
</div>

<style>
	.hint-text {
		font-family: 'Caveat', 'Comic Neue', cursive;
		font-size: 17px;
		font-weight: 600;
		color: #fde047;
		line-height: 1.2;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5);
		white-space: nowrap;
	}

	.hint-arrow {
		display: block;
		filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6));
	}

	.hint-arrow.down-left { transform: rotate(0deg); }
	.hint-arrow.down-right { transform: scaleX(-1); }
	.hint-arrow.up-left { transform: scaleY(-1); }
	.hint-arrow.up-right { transform: scale(-1, -1); }
</style>
