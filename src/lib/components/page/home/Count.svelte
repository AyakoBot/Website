<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETStats } from '$api/stats/+server.js';

	const getStats = async (): Promise<GETStats> => {
		const res = await fetch('/api/stats');
		return res.json();
	};

	const stats = getStats();
</script>

<p class="text-10">Ayako manages</p>
{#await stats}
	<div class="text-15"><ColorFadeAndCountUp num={0} /></div>
	<p class="text-10">Discord Communities with</p>
	<div class="text-15"><ColorFadeAndCountUp num={0} /></div>
{:then stats}
	<div class="text-15"><ColorFadeAndCountUp num={stats.guildCount} /></div>
	<p class="text-10">Discord Communities with</p>
	<div class="text-15"><ColorFadeAndCountUp num={stats.userCount} /></div>
{:catch error}
	{console.error(error)}
	<div class="text-15"><ColorFadeAndCountUp num={0} /></div>
	<p class="text-10">Discord Communities with</p>
	<div class="text-15"><ColorFadeAndCountUp num={0} /></div>
{/await}
<p class="text-10">Members</p>
