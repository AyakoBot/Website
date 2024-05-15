<script lang="ts">
	import type { Returned as GETAppeals } from '@ayako/server/src/routes/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';

	export let q: GETAppeals['questions'][number];
</script>

<input
	type="number"
	name={String(q.uniquetimestamp)}
	required={q.required}
	max={Number.MAX_SAFE_INTEGER}
	min={Number.MIN_SAFE_INTEGER}
	class="rounded-2xl px-2 py-2 text-center w-full bg-neutral-900"
	placeholder="Type a Number"
	on:wheel={(e) => (e.target as HTMLInputElement)?.blur()}
/>
