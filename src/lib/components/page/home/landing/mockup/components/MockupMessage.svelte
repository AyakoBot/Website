<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		avatar,
		name,
		nameColor = '#b0ff00',
		isBot = false,
		time,
		children
	}: {
		avatar: string;
		name: string;
		nameColor?: string;
		isBot?: boolean;
		time: string;
		children: Snippet;
	} = $props();
</script>

<div class="flex gap-4 py-0.5">
	<img src={avatar} alt={name} class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-baseline gap-2">
			<span class="font-600 text-3.75 cursor-pointer hover:underline" style="color: {nameColor};">{name}</span>
			{#if isBot}
				<span class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75 align-top"><span class="i-tabler-check text-xs"></span> APP</span>
			{/if}
			<span class="text-3 text-white/25 font-400">{time}</span>
		</div>
		{@render children()}
	</div>
</div>
