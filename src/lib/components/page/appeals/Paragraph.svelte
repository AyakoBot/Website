<script lang="ts">
	import type { Returned as GETAppealQuestions } from '@ayako/server/src/routes/v1/guilds/[guildId]/settings/appeal-questions/+server.ts';

	const { q }: { q: GETAppealQuestions[number] } = $props();
	let value = $state('');
</script>

<div class="relative w-full">
	<textarea
		name={String(q.id)}
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
