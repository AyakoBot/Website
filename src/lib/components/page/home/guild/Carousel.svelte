<script lang="ts">
	import Guild from '$lib/components/generic/Guild.svelte';
	import type { Returned as GETGuilds } from '@ayako/server/src/routes/guilds/+server.js';
	import { onMount } from 'svelte';

	export let guilds: GETGuilds;

	let container: HTMLDivElement;
	let scroller: HTMLUListElement;

	onMount(() => {
		Array.from(scroller.children).forEach((item) => {
			scroller.appendChild(item.cloneNode(true));
		});
	});

	const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
</script>

<div class="mt-20 flex flex-col justify-center items-center">
	<div
		bind:this={container}
		class="relative z-20 max-w-100vw overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
	>
		<ul
			bind:this={scroller}
			class="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-[scroll_80s_reverse_linear_infinite] hover:animate-paused"
		>
			{#each guilds as guild (guild.guildid)}
				<Guild {guild}>
					{numberWithCommas(guild.membercount)} Members
				</Guild>
			{/each}
		</ul>
	</div>
	<span class="color-neutral-500">A selection of large Discord Servers Ayako manages</span>
	<span class="text-xs color-neutral-500">hover/tap to see more info</span>
</div>

<style>
	@keyframes scroll {
		to {
			transform: translate(calc(-50% - 0.5rem));
		}
	}
</style>
