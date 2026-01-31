<script lang="ts">
	import type { Returned as GETGuilds } from '@ayako/server/src/routes/v1/bot/guilds/+server.js';

	const { guilds }: { guilds: GETGuilds } = $props();
</script>

<section class="py-24 overflow-hidden">
	<div class="text-center mb-16 px-4">
		<span class="inline-block bg-[rgba(176,255,0,0.1)] text-[#b0ff00] px-4 py-2 rounded-full text-sm font-600 mb-4">Community</span>
		<h2 class="text-8 lg:text-12 font-800 text-white mb-4">Trusted by amazing servers</h2>
		<p class="text-4.5 text-white/60 max-w-125 mx-auto">Join these incredible communities already using Ayako</p>
	</div>

	<div class="servers-scroll w-full overflow-hidden py-8" style="mask-image: linear-gradient(to right, transparent, white 5%, white 95%, transparent);">
		<div class="servers-track flex gap-6 w-fit">
			{#each [...guilds, ...guilds] as guild, idx (idx)}
				<div class="server-card flex-shrink-0 w-70 h-40 relative rounded-5 overflow-hidden transition-all cursor-pointer hover:translate-y--2 hover:scale-102">
					<div class="absolute inset-0 z-0">
						{#if guild.banner}
							<img src="{guild.banner}?size=512" alt="" class="w-full h-full object-cover transition-transform hover:scale-110" />
						{:else if guild.icon}
							<img src="{guild.icon}?size=512" alt="" class="w-full h-full object-cover blur-5 scale-120 transition-transform" />
						{/if}
					</div>
					<div class="server-card-overlay absolute inset-0 z-1 transition-colors" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.2) 100%);"></div>
					<div class="absolute inset-0 z-2 flex flex-col justify-end p-5 gap-3">
						<div class="absolute top-4 right-4">
							{#if guild.icon}
								<img src="{guild.icon}?size=128" alt="" class="w-12 h-12 rounded-full border-3 border-white/20 transition-all object-cover" />
							{:else}
								<div class="w-12 h-12 rounded-full bg-white/10 border-3 border-white/20 flex items-center justify-center text-white/50">
									<span class="i-tabler-users text-2xl"></span>
								</div>
							{/if}
						</div>
						<div class="flex flex-col gap-1">
							<span class="font-700 text-white text-4.4" style="text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);">{guild.name?.slice(0, 20)}</span>
							<span class="inline-flex items-center gap-1.4 text-3.4 text-white/70 font-500">
								<span class="i-tabler-users text-sm"></span>
								{guild.membercount?.toLocaleString()}
							</span>
						</div>
					</div>
					<div class="server-card-glow absolute inset--0.5 z--1 rounded-5.5 op-0 transition-opacity" style="background: linear-gradient(135deg, #b0ff00, #fe3521, #b0ff00); background-size: 200% 200%;"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.servers-track {
		animation: scroll 120s linear infinite;
	}
	.servers-track:hover {
		animation-play-state: paused;
	}
	@keyframes scroll {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	.server-card:hover .server-card-glow {
		opacity: 1;
	}
	.server-card:hover .server-card-overlay {
		background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.3) 100%);
	}
	.server-card-glow {
		animation: glow-rotate 3s linear infinite;
	}
	@keyframes glow-rotate {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
</style>
