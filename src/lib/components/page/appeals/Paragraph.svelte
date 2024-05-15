<script lang="ts">
	import type { Returned as GETAppeals } from '@ayako/server/src/routes/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';

	export let q: GETAppeals['questions'][number];
	let value = '';
</script>

<div class="relative w-full">
	<textarea
		name={String(q.uniquetimestamp)}
		required={q.required}
		maxlength="2000"
		minlength={q.required ? 1 : 0}
		class="rounded-2xl px-2 py-2 text-center w-full h-30 bg-neutral-900"
		placeholder="Type some long Text"
		bind:value
	></textarea>
	<div class="absolute -bottom-3 left-1/2 -translate-x-1/2 text-sm color-neutral-400">
		{value.length}/2000
	</div>
</div>
