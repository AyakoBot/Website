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
		class="input-paper w-full h-32 resize-y leading-relaxed"
		placeholder="Type some long Text"
		bind:value
	></textarea>
	<div
		class="absolute -bottom-4.5 left-1/2 -translate-x-1/2 font-mono text-xs text-ink-soft tracking-wide"
	>
		{value.length}/2000
	</div>
</div>
