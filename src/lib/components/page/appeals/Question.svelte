<script lang="ts">
	import type { Returned as GETAppealQuestions } from '@ayako/server/src/routes/v1/guilds/[guildId]/settings/appeal-questions/+server.ts';
	import Select from '$lib/components/generic/Select.svelte';
	import Switch from '$lib/components/generic/Switch.svelte';
	import Number from './Number.svelte';
	import Paragraph from './Paragraph.svelte';
	import Short from './Short.svelte';

	const { q }: { q: GETAppealQuestions[number] } = $props();
</script>

<div class="flex flex-col justify-center items-center gap-3 relative w-full">
	<label
		for={String(q.id)}
		class="font-display font-semibold text-xl sm:text-2xl text-ink text-center leading-snug"
	>
		{q.question}
	</label>

	{#if q.answertype === 'number'}
		<Number {q} />
	{:else if q.answertype === 'paragraph'}
		<Paragraph {q} />
	{:else if q.answertype === 'short'}
		<Short {q} />
	{:else if q.answertype === 'boolean'}
		<Switch title="" required={q.required} name={String(q.id)} />
	{:else if q.answertype === 'multiple_choice'}
		<Select
			options={q.options}
			required={q.required}
			label={q.question ?? 'Select an Option'}
			single={false}
			id={String(q.id)}
		/>
	{:else if q.answertype === 'single_choice'}
		<Select
			options={q.options}
			required={q.required}
			label={q.question ?? 'Select an Option'}
			single={true}
			id={String(q.id)}
		/>
	{:else if q.answertype === 'text'}{:else}
		<span class="text-ink-soft text-center">
			Unknown Answer Type for Question: <span class="code">{q.question}</span>
			<br />
			Type: <span class="code">{q.answertype}</span>
		</span>
	{/if}

	{#if q.required && q.answertype !== 'text'}
		<div
			class="absolute top-full {q.answertype === 'boolean'
				? ''
				: 'right-2'} font-mono text-[0.625rem] uppercase tracking-[0.14em] text-petal"
		>
			Required
		</div>
	{/if}
</div>
