<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETStats } from '@ayako/server/src/routes/v1/bot/stats/+server.js';

	export let stats: GETStats;
</script>

<span class="text-10">Ayako manages</span>
<div class="text-15"><ColorFadeAndCountUp num={stats.guildCount} /></div>
<span class="text-10">Discord Communities with</span>
<div class="text-15"><ColorFadeAndCountUp num={stats.userCount} /></div>
<span class="text-10">Members</span>
