<script lang="ts">
	import { enhance } from '$app/forms';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import Question from '$lib/components/page/appeals/Question.svelte';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
	let submitted = $state(false);
</script>

<ul class="flex flex-col justify-center items-center mb-20 gap-5 w-fit m-auto">
	<li class="text-2xl">Appealing Punishment:</li>
	<Punishment p={data.punishment} />
</ul>

{#if !('message' in data) && data.questions}
	<form
		class="flex flex-col justify-center items-center gap-5 max-w-90vw lg:max-w-50vw m-auto"
		method="post"
		action="?/appeal"
		use:enhance
	>
		{#each data.questions as question, i (i)}
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
