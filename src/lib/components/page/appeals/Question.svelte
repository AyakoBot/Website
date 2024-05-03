<script lang="ts">
	import { AnswerType } from '@prisma/client';
	import type { Returned as GETAppeals } from '$api/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';
	import Switch from '$lib/components/generic/Switch.svelte';
	export let q: GETAppeals['questions'][number];
</script>

<div class="flex flex-col justify-center items-center gap-2">
	<label for={String(q.uniquetimestamp)} class="text-2xl">
		{q.question}
	</label>

	{#if q.answertype === AnswerType.number}
		<input type="number" name={String(q.uniquetimestamp)} required={q.required} />
	{:else if q.answertype === AnswerType.paragraph}
		<textarea name={String(q.uniquetimestamp)} required={q.required}></textarea>
	{:else if q.answertype === AnswerType.short}
		<input type="text" name={String(q.uniquetimestamp)} required={q.required} />
	{:else if q.answertype === AnswerType.boolean}
		<Switch title={q.question ?? ''} required={q.required} />
	{:else if q.answertype === AnswerType.multiple_choice}
		<select name={String(q.uniquetimestamp)} required={q.required}>
			<option value="" selected={true} disabled={true}>Select an Option</option>

			{#if !q.required}
				<option value="">None</option>
			{/if}

			{#each q.options as option, j (j)}
				<option value={option}>{option}</option>
			{/each}
		</select>
	{:else if q.answertype === AnswerType.single_choice}
		<fieldset class="flex flex-row justify-evenly items-center gap-5">
			<legend class="text-2xl">{q.question}</legend>
			{#if !q.required}
				<div class="flex flex-row justify-center items-center gap-0">
					<input type="radio" name={String(q.uniquetimestamp)} value="" checked />
					<label for={String(q.uniquetimestamp)}>None</label>
				</div>
			{/if}

			{#each q.options as option, j (j)}
				<input type="radio" name={String(q.uniquetimestamp)} value={option} />
				<label for={String(q.uniquetimestamp)}>{option}</label>
			{/each}
		</fieldset>
	{:else}
		<p>Unknown Answer Type for Question: <span class="code">{q.question}</span></p>
	{/if}
</div>
