<script lang="ts">
	import type { Returned as GETAppealQuestions } from '@ayako/server/src/routes/v1/guilds/[guildId]/settings/appeal-questions/+server.ts';

	const { q }: { q: GETAppealQuestions[number] } = $props();
	let value = $state('');
</script>

<div class="relative w-full">
	<input
		type="text"
		name={String(q.id)}
		required={q.required}
		maxlength="100"
		minlength={q.required ? 1 : 0}
		class="rounded-2xl px-2 py-2 text-center w-full bg-neutral-900"
		placeholder="Type some short Text"
		bind:value
	/>
	<div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-sm color-neutral-400">
		{value.length}/100
	</div>
</div>
