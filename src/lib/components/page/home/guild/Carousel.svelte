<script lang="ts">
	import Guild from '$lib/components/generic/Guild.svelte';
	import type { Returned as GETGuilds } from '@ayako/server/src/routes/guilds/+server.js';

	export let guilds: GETGuilds;

	const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
</script>

<div class="mt-20 flex flex-col justify-center items-center [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
style="
		--slide-width: 400px;
  --slide-count: {guilds.length};
  --time-per-slide: 10s;
">
	<div
		class="flex w-full of-hidden relative h-100px md:h-unset pointer-events-none h-full
 after:content-empty after:h-300px after:absolute after:z-2 after:right-0 after:top-0 after:rotate-z-180deg after:w-full
  before:content-empty before:h-300px before:absolute before:z-2 before:left-0 before:top-0 before:w-full"
	>
		<div
			class="flex animate-[scroll_calc(var(--time-per-slide)*var(--slide-count))_linear_infinite_reverse] min-w-[max-w-[calc(var(--slide-width)*var(--slide-count))]] max-w-[calc(var(--slide-width)*var(--slide-count))]"
		>
			{#each new Array(2).fill(null) as _}
				{#each guilds as guild (guild.guildid)}
					<div
						class="h-200px min-w-[var(--slide-width)] max-w-[var(--slide-width)] flex flex-col items-start justify-center pointer-events-none"
					>
						<Guild {guild} clickable={false}>
							{numberWithCommas(guild.membercount)} Members
						</Guild>
					</div>
				{/each}
			{/each}
		</div>
	</div>
	<span class="color-neutral-500">A selection of large Discord Servers Ayako manages</span>
	<span class="text-xs color-neutral-500">hover/tap to see more info</span>
</div>

<style>

@keyframes scroll {
   0% {
    transform: translateX(0);
   }
   100% {
    transform: translateX(
     calc(calc(var(--slide-width) * -1) * var(--slide-count))
    );
   }
  }
</style>
