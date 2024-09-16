<script lang="ts">
	import type { Returned as GETAppealQuestions } from '@ayako/server/src/routes/v1/guilds/[guildId]/settings/appeal-questions/+server.ts';

	const { q }: { q: GETAppealQuestions[number] } = $props();
</script>

<input
	type="number"
	name={String(q.id)}
	required={q.required}
	max={Number.MAX_SAFE_INTEGER}
	min={Number.MIN_SAFE_INTEGER}
	class="rounded-2xl px-2 py-2 text-center w-full bg-neutral-900"
	placeholder="Type a Number"
	onwheel={(e) => (e.target as HTMLInputElement)?.blur()}
/>
