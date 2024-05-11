<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETStats } from '@ayako/server/src/routes/stats/+server.js';
 import { PUBLIC_API } from '$env/static/public';

	const getStats = async (): Promise<GETStats> => {
		const res = await fetch(`${PUBLIC_API}/stats`);
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
