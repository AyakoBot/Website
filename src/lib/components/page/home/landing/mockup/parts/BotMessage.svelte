<script lang="ts">
	import type { Snippet } from 'svelte';

	// Every bot in the family shows the flagship's fox avatar on Discord.
	const foxAvatar =
		'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=80';

	type Props = {
		name: string;
		time: string;
		/** The slash command this message answers, shown above it as Discord does. */
		used?: { user: string; command: string };
		/** The message this one replies to. */
		replyTo?: { user: string; text: string };
		/** Default avatar (0-5) of whoever ran the command or wrote the replied-to message. */
		refAvatar?: number;
		children: Snippet;
	};

	const { name, time, used, replyTo, refAvatar = 0, children }: Props = $props();
</script>

<div class="relative flex flex-col gap-1 py-0.5">
	{#if used || replyTo}
		<div class="flex items-center gap-1.5 pl-14 text-3.25 text-white/60 min-w-0">
			<img
				src="https://cdn.discordapp.com/embed/avatars/{refAvatar}.png"
				alt=""
				class="w-4 h-4 rounded-full flex-shrink-0"
			/>
			{#if used}
				<span class="font-500 text-white/80">{used.user}</span>
				<span>used</span>
				<span class="text-[#00a8fc]">{used.command}</span>
			{:else if replyTo}
				<span class="font-500 text-white/80">@{replyTo.user}</span>
				<span class="truncate">{replyTo.text}</span>
			{/if}
		</div>
	{/if}
	<div class="flex gap-4">
		<img src={foxAvatar} alt="" class="w-10 h-10 rounded-full flex-shrink-0" />
		<div class="flex flex-col gap-1 flex-1 min-w-0">
			<div class="flex items-center gap-2">
				<span class="font-600 text-white text-3.75 whitespace-nowrap">{name}</span>
				<span class="bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 leading-3.75">APP</span>
				<span class="text-3 text-white/25 font-400">{time}</span>
			</div>
			{@render children()}
		</div>
	</div>
</div>
