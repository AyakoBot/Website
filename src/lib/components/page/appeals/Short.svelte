<script lang="ts">
	import type { Returned as GETAppeals } from '@ayako/server/src/routes/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';

	export let q: GETAppeals['questions'][number];
	let value = '';
</script>

<div class="relative">
	<input
		type="text"
		name={String(q.uniquetimestamp)}
		required={q.required}
		maxlength="100"
		minlength={q.required ? 1 : 0}
		class="rounded-2xl px-2 py-2 text-center w-100 bg-neutral-900"
		placeholder="Type some short Text"
		bind:value
	/>
	<div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-sm color-neutral-400">{value.length}/100</div>
</div>
