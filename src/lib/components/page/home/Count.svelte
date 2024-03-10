<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETStats } from '../../../../routes/api/stats/+server.js';

	const getStats = async (): Promise<GETStats> => {
		const res = await fetch('/api/stats');
		return res.json();
	};

	const stats = getStats();
</script>

<p class="text-10">Ayako manages</p>
{#await stats}
	<p class="text-15"><ColorFadeAndCountUp num={0} /></p>
	<p class="text-10">Discord Communities with</p>
	<p class="text-15"><ColorFadeAndCountUp num={0} /></p>
{:then stats}
	<p class="text-15"><ColorFadeAndCountUp num={stats.guildCount} /></p>
	<p class="text-10">Discord Communities with</p>
	<p class="text-15"><ColorFadeAndCountUp num={stats.userCount} /></p>
{:catch error}
	{console.error(error)}
	<p class="text-15"><ColorFadeAndCountUp num={0} /></p>
	<p class="text-10">Discord Communities with</p>
	<p class="text-15"><ColorFadeAndCountUp num={0} /></p>
{/await}
<p class="text-10">Members</p>
