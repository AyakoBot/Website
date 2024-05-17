<script lang="ts">
	import type { Returned as GETAppeals } from '@ayako/server/src/routes/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';
	import Select from '$lib/components/generic/Select.svelte';
	import Switch from '$lib/components/generic/Switch.svelte';
	import { AnswerType } from '@ayako/server/node_modules/@prisma/client';
	import Number from './Number.svelte';
	import Paragraph from './Paragraph.svelte';
	import Short from './Short.svelte';

	export let q: GETAppeals['questions'][number];
</script>

<div class="flex flex-col justify-center items-center gap-2 relative w-full">
	<label for={String(q.uniquetimestamp)} class="text-2xl">{q.question}</label>

	{#if q.answertype === AnswerType.number}
		<Number {q} />
	{:else if q.answertype === AnswerType.paragraph}
		<Paragraph {q} />
	{:else if q.answertype === AnswerType.short}
		<Short {q} />
	{:else if q.answertype === AnswerType.boolean}
		<Switch title={''} required={q.required} />
	{:else if q.answertype === AnswerType.multiple_choice}
		<Select
			options={q.options}
			required={q.required}
			label={q.question ?? 'Select an Option'}
			single={false}
			id={String(q.uniquetimestamp)}
		/>
	{:else if q.answertype === AnswerType.single_choice}
		<Select
			options={q.options}
			required={q.required}
			label={q.question ?? 'Select an Option'}
			single={true}
			id={String(q.uniquetimestamp)}
		/>
	{:else if q.answertype === AnswerType.text}{:else}
		<span>
			Unknown Answer Type for Question: <span class="code">{q.question}</span>
			<br />
			Type: <span class="code">{q.answertype}</span>
		</span>
	{/if}
	{#if q.required && q.answertype !== AnswerType.text}
		<div
			class="absolute text-10px top-full {q.answertype === AnswerType.boolean
				? ''
				: 'right-2'} color-red"
		>
			Required
		</div>
	{/if}
</div>
