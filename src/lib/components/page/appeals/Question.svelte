<script lang="ts">
	import type { Returned as GETAppealQuestions } from '@ayako/server/src/routes/v1/guilds/[guildId]/settings/appeal-questions/+server.ts';
	import Select from '$lib/components/generic/Select.svelte';
	import Switch from '$lib/components/generic/Switch.svelte';
	import Number from './Number.svelte';
	import Paragraph from './Paragraph.svelte';
	import Short from './Short.svelte';

	export let q: GETAppealQuestions[number];
</script>

<div class="flex flex-col justify-center items-center gap-2 relative w-full">
	<label for={String(q.id)} class="text-2xl">{q.question}</label>

	{#if q.answertype === 'number'}
		<Number {q} />
	{:else if q.answertype === 'paragraph'}
		<Paragraph {q} />
	{:else if q.answertype === 'short'}
		<Short {q} />
	{:else if q.answertype === 'boolean'}
		<Switch title={''} required={q.required} name={String(q.id)} />
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
		<span>
			Unknown Answer Type for Question: <span class="code">{q.question}</span>
			<br />
			Type: <span class="code">{q.answertype}</span>
		</span>
	{/if}
	{#if q.required && q.answertype !== 'text'}
		<div class="absolute text-10px top-full {q.answertype === 'boolean' ? '' : 'right-2'} color-red">
			Required
		</div>
	{/if}
</div>
