<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API } from '$env/static/public';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import Question from '$lib/components/page/appeals/Question.svelte';
	import * as Form from '$lib/components/ui/form';
	import Cookies from 'js-cookie';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const guildId = $page.params.guildId;
	const punId = $page.params.punishmentId;
	let form: HTMLFormElement;

	let submitted: boolean;
	$: submitted = false;

	const post = async (e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => {
		e.preventDefault();

		const formData = new FormData(form, e.submitter);
		const formJSON: { [key: string]: string } = {};
		formData.forEach((val, k) => (formJSON[k] = val.toString()));

		fetch(`${PUBLIC_API}/guilds/${guildId}/appeals/${punId}/appeal`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('discord-token')}`,
			},
			body: JSON.stringify(formJSON),
		});
	};
</script>

<ul class="flex flex-col justify-center items-center mb-20 gap-5 min-w-100vw lg:min-w-50vw">
	<li class="text-2xl">Appealing Punishment:</li>
	<Punishment p={data.appeal.punishment} />
</ul>

{#if !('message' in data)}
	<form class="flex flex-col justify-center items-center gap-5" on:submit={post} bind:this={form}>
		{#each data.appeal.questions as question, i (i)}
			{#if i}
				<FancyBorder />
			{/if}

			<Question q={question} />
		{/each}

		<FancyBorder />
		<p class="w-full px-2">
			The information you provide in this form will be used to process your appeal. By submitting this
			form, you agree to our <a href="/terms" target="_blank" class="underline">Terms of Service</a>
			and
			<a href="/privacy" class="underline">Privacy Policy</a>.
			<br />
			Never submit any sensitive information in this form. Provided information will be shared with selected
			members of the server you appeal to.
		</p>

		<Form.Button class="btn-loud" disabled={submitted}>
			{#if submitted}
				Loading...
			{:else}
				Submit
			{/if}
		</Form.Button>
	</form>
{:else}
	<div class="flex flex-col justify-center items-center">
		<p>No Punishment, enabled Appeal-Settings, or enabled Appeal-Questions found</p>
		<FancyBorder />
		<a class="btn-loud" href="/appeals">Back</a>
	</div>
{/if}
