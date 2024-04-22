<script lang="ts">
	import { page } from '$app/stores';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import Question from '$lib/components/page/appeals/Question.svelte';
	import type { Returned as GETAppeals } from '$api/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';

	const getData = async () => {
		const res = await fetch(
			`/api/guilds/${$page.params.guildId}/appeals/${$page.params.punishmentId}/appeal`,
		);

		return res.json() as Promise<GETAppeals>;
	};

	const data = getData();
</script>

{#await data}
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
		<form class="flex flex-col justify-center items-center gap-5">
			{#each data.questions as question, i (i)}
				{#if i}
					<FancyBorder />
				{/if}

				<Question q={question} />
			{/each}

			<FancyBorder />
			<p>
				The information you provide in this form will be used to process your appeal. By submitting this
				form, you agree to our <a href="/terms" target="_blank" class="underline">Terms of Service</a> and
				<a href="/privacy" class="underline">Privacy Policy</a>.
    <br />
    Never submit any sensitive information in this form.
    Provided information will be shared with selected members of the server you appeal to.
			</p>

			<button class="btn-loud" type="submit">Submit</button>
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
