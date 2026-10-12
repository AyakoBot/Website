<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Accent colour of the spine, exactly as the bot sets it. Omit for containers without one. */
		accent?: string;
		/** Shrink to the content, as short containers do in Discord. */
		fit?: boolean;
		children: Snippet;
	};

	const { accent, fit = false, children }: Props = $props();
</script>

<!-- A Components V2 container: rounded panel, optional accent spine on the left. -->
<div
	class="flex rounded-lg overflow-hidden border border-white/8 bg-[#2b2d31] {fit ? 'w-fit' : 'max-w-120'}"
>
	{#if accent}
		<div class="w-1 flex-shrink-0" style:background-color={accent}></div>
	{/if}
	<div class="flex flex-col gap-2 p-4 flex-1 min-w-0 text-3.5 text-[#dbdee1] leading-snug">
		{@render children()}
	</div>
</div>
