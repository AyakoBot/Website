<script lang="ts">
	import { enhance } from '$app/forms';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import Question from '$lib/components/page/appeals/Question.svelte';
	import type { PageServerData, ActionData } from './$types';

	export let data: PageServerData;

	let submitted: boolean;
	$: submitted = false;
</script>

<ul class="flex flex-col justify-center items-center mb-20 gap-5 min-w-100vw lg:min-w-50vw">
	<li class="text-2xl">Appealing Punishment:</li>
	<Punishment p={data.appeal.punishment} />
</ul>

{#if !('message' in data)}
	<form
		class="flex flex-col justify-center items-center gap-5"
		method="post"
		action="?/appeal"
		use:enhance
	>
		{#each data.appeal.questions as question, i (i)}
			{#if i}
				<FancyBorder />
			{/if}

			<Question q={question} />
		{/each}

		<FancyBorder />
		<div class="w-full px-2">
			The information you provide in this form will be used to process your appeal. By submitting this
			form, you agree to our <a href="/terms" target="_blank" class="underline">Terms of Service</a>
			and
			<a href="/privacy" class="underline">Privacy Policy</a>.
			<br />
			Never submit any sensitive information in this form. Provided information will be shared with selected
			members of the server you appeal to.
		</div>

		<button class="btn-loud" disabled={submitted}>
			{#if submitted}
				Loading...
			{:else}
				Submit
			{/if}
		</button>
	</form>
{:else}
	<div class="flex flex-col justify-center items-center">
		<span>No Punishment, enabled Appeal-Settings, or enabled Appeal-Questions found</span>
		<FancyBorder />
		<a class="btn-loud" href="/appeals">Back</a>
	</div>
{/if}
