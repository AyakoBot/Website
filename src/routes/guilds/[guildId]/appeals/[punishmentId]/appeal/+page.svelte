<script lang="ts">
	import type { Returned as GETAppeals } from '$api/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import Question from '$lib/components/page/appeals/Question.svelte';
	import * as Form from '$lib/components/ui/form';

	const guildId = $page.params.guildId;
	const punId = $page.params.punishmentId;
	let form: HTMLFormElement;

	const getData = async () => {
		const res = await fetch(`/api/guilds/${guildId}/appeals/${punId}/appeal`);

		return res.json() as Promise<GETAppeals>;
	};

	let submitted: boolean;
	$: submitted = false;
	let showSubmissionError: boolean;
	$: showSubmissionError = false;
	let showSuccess: boolean;
	$: showSuccess = true;

	const post = async (e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) => {
		e.preventDefault();

		const formData = new FormData(form, e.submitter);
		const formJSON: { [key: string]: string } = {};
		formData.forEach((val, k) => (formJSON[k] = val.toString()));

		const res = await fetch(`/api/guilds/${guildId}/appeals/${punId}/appeal`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formJSON),
		});

		if (res.ok) {
			showSuccess = true;
		} else {
			submitted = false;
			showSubmissionError = true;
		}
	};
</script>

{#if showSuccess}
	<div class="flex flex-col justify-center items-center">
		<p>Your Appeal has been submitted successfully</p>
		<FancyBorder />
		<a class="btn-loud" href="/appeals">Back</a>
	</div>
{:else}
	{#if showSubmissionError}
		<!-- <Modal /> -->
	{/if}

	{#await getData()}
		<div class="flex justify-center items-center flex-col">
			<Loading />
			<h1>Loading your Appeal Form...</h1>
		</div>
	{:then data}
		<ul class="flex flex-col justify-center items-center mb-20 gap-5 min-w-100vw lg:min-w-50vw">
			<li class="text-2xl">Appealing Punishment:</li>
			<Punishment p={data.punishment} />
		</ul>

		{#if !('message' in data)}
			<form class="flex flex-col justify-center items-center gap-5" on:submit={post} bind:this={form}>
				{#each data.questions as question, i (i)}
					{#if i}
						<FancyBorder />
					{/if}

					<Question q={question} />
				{/each}

				<FancyBorder />
				<p class="w-full px-2">
					The information you provide in this form will be used to process your appeal. By submitting
					this form, you agree to our <a href="/terms" target="_blank" class="underline"
						>Terms of Service</a
					>
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
	{:catch error}
		{console.error(error)}
		<p>Error</p>
	{/await}
{/if}
