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
		class="input-paper w-full text-center"
		placeholder="Type some short Text"
		bind:value
	/>
	<div
		class="absolute -bottom-5.5 left-1/2 -translate-x-1/2 font-mono text-xs text-ink-soft tracking-wide"
	>
		{value.length}/100
	</div>
</div>
