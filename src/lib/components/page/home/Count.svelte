<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETStats } from '@ayako/server/src/routes/v1/bot/stats/+server.js';

	const { stats }: { stats: GETStats } = $props();
</script>

<section class="flex flex-col items-center px-4">
	<h2 class="text-3xl md:text-4xl font-bold mb-8 text-center">Trusted by thousands</h2>

	<div class="flex flex-col md:flex-row gap-6 w-full max-w-200 justify-center">
		<!-- Servers Card -->
		<div
			class="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center gap-4 border border-white/10 hover:border-white/20 transition-all hover:scale-102"
		>
			<span class="i-tabler-server text-5xl text-[#b0ff00]"></span>
			<div class="text-12 md:text-15">
				<ColorFadeAndCountUp num={stats.guildCount} />
			</div>
			<span class="text-xl text-neutral-300">Discord Servers</span>
		</div>

		<!-- Members Card -->
		<div
			class="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center gap-4 border border-white/10 hover:border-white/20 transition-all hover:scale-102"
		>
			<span class="i-tabler-users text-5xl text-[#fe3521]"></span>
			<div class="text-12 md:text-15">
				<ColorFadeAndCountUp num={stats.userCount} />
			</div>
			<span class="text-xl text-neutral-300">Total Members</span>
		</div>
	</div>
</section>
