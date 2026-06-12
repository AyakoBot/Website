<script lang="ts">
	import type { Returned as GETGuilds } from '@ayako/server/src/routes/v1/bot/guilds/+server.js';
	import Tape from '$lib/components/design/Tape.svelte';
	import TornEdge from '$lib/components/design/TornEdge.svelte';
	import { reveal } from '$lib/scripts/util/reveal';

	const { guilds }: { guilds: GETGuilds } = $props();
</script>

<section class="relative mt-12">
	<TornEdge fill="var(--plate)" />

	<div class="bg-plate text-paper pt-14 pb-16 overflow-hidden">
		<div class="text-center px-5 mb-10" use:reveal>
			<span class="label-specimen !text-leaf-soft block mb-3">Plate III · Our Servers</span>
			<h2 class="font-display font-semibold text-4xl sm:text-5xl text-paper mb-3">
				Trusted by amazing servers
			</h2>
			<p class="text-lg text-leaf-soft max-w-xl mx-auto">
				Join these incredible communities already using Ayako
			</p>
		</div>

		<div
			class="specimen-scroll w-full overflow-hidden py-7 [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]"
		>
			<div
				class="flex gap-8 w-fit px-4 [animation:press-scroll_120s_linear_infinite] [.specimen-scroll:hover_&]:[animation-play-state:paused] [.specimen-scroll:focus-within_&]:[animation-play-state:paused]"
			>
				{#each [...guilds, ...guilds] as guild, idx (idx)}
					<a
						href="https://discord.gg/{guild.invite}"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Join {guild.name} on Discord"
						aria-hidden={idx >= guilds.length ? true : undefined}
						tabindex={idx >= guilds.length ? -1 : undefined}
						class="specimen relative block w-72 shrink-0 bg-paper border border-ink/15 rounded-[0.4rem_1rem_0.5rem_0.9rem] p-2.5 pb-3 shadow-press [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:[box-shadow:0_2px_4px_rgba(44,38,24,0.25),0_14px_34px_rgba(44,38,24,0.35)] focus-visible:rotate-0 focus-visible:translate-y-[-5px] focus-visible:[box-shadow:0_2px_4px_rgba(44,38,24,0.25),0_14px_34px_rgba(44,38,24,0.35)] {idx %
							3 ===
						0
							? 'rotate-[-1.3deg]'
							: idx % 3 === 1
								? 'rotate-[1.1deg]'
								: 'rotate-[-0.5deg]'}"
					>
						<Tape angle={idx % 2 === 0 ? -4 : 3} class="-top-2.5 left-1/2 -ml-9" />

						<div
							class="photo relative h-36 overflow-hidden rounded-[0.3rem_0.7rem_0.4rem_0.6rem] border border-ink/10 bg-plate-soft"
						>
							{#if guild.banner}
								<img
									src="{guild.banner}?size=512"
									alt=""
									class="w-full h-full object-cover [filter:saturate(0.92)_contrast(0.98)_sepia(0.06)] [transition:transform_0.6s_var(--ease-organic)] [.specimen:hover_&]:scale-105"
									loading="lazy"
								/>
							{:else if guild.icon}
								<img
									src="{guild.icon}?size=512"
									alt=""
									class="w-full h-full object-cover scale-125 [filter:blur(6px)_saturate(0.92)_sepia(0.06)] [transition:transform_0.6s_var(--ease-organic)]"
									loading="lazy"
								/>
							{:else}
								<div class="w-full h-full flex items-center justify-center text-paper/40">
									<span class="i-tabler-photo text-3xl" aria-hidden="true"></span>
								</div>
							{/if}
						</div>

						<div class="flex items-center gap-3 pt-2.5 px-1">
							{#if guild.icon}
								<img
									src="{guild.icon}?size=128"
									alt=""
									width="44"
									height="44"
									class="w-11 h-11 rounded-full border-[1.6px] border-ink/25 object-cover bg-paper-warm shrink-0"
									loading="lazy"
								/>
							{:else}
								<span
									class="w-11 h-11 rounded-full border-[1.6px] border-ink/25 bg-paper-warm flex items-center justify-center text-ink-faint shrink-0"
								>
									<span class="i-tabler-users" aria-hidden="true"></span>
								</span>
							{/if}

							<span class="flex flex-col min-w-0">
								<span class="font-display font-semibold text-ink leading-tight truncate">
									{guild.name?.slice(0, 20)}
								</span>
								<span class="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
									{guild.membercount?.toLocaleString()} members
								</span>
							</span>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>

	<TornEdge fill="var(--plate)" flip />
</section>
