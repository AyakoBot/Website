<script lang="ts">
	import { enhance } from '$app/forms';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import Question from '$lib/components/page/appeals/Question.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
	let submitted = $state(false);
</script>

<div class="max-w-5xl mx-auto px-5 py-12">
	<header class="text-center mb-10" use:reveal>
		<span class="label-specimen block mb-3">Appeals</span>
		<h1 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">Appeal Form</h1>
		<p class="annotation text-2xl">tell your side of the story</p>
		<div class="flex justify-center mt-5">
			<Flourish width={220} color="var(--ink-faint)" />
		</div>
	</header>

	<section class="mb-16" use:reveal={{ delay: 0.1 }}>
		<h2 class="label-specimen block text-center !text-sm mb-6">Appealing Punishment:</h2>
		<ul class="flex flex-col items-center list-none p-0 m-0">
			<Punishment p={data.punishment} />
		</ul>
	</section>

	{#if !('message' in data) && data.questions}
		<div class="max-w-2xl mx-auto" use:reveal={{ delay: 0.15 }}>
			<form
				class="relative card-paper !bg-paper px-6 sm:px-10 pt-12 pb-10 flex flex-col gap-10 rotate-[0.4deg]"
				method="post"
				action="?/appeal"
				use:enhance={() => {
					submitted = true;

					return async ({ update }) => {
						await update();
						submitted = false;
					};
				}}
			>
				<Tape angle={3} class="-top-2.5 left-1/2 -ml-9" />

				{#each data.questions as question, i (i)}
					{#if i}
						<div class="flex justify-center" aria-hidden="true">
							<Flourish width={170} color="var(--ink-faint)" />
						</div>
					{/if}

					<div class="flex flex-col items-center gap-2 pb-3">
						<span class="label-specimen">Q{String(i + 1).padStart(2, '0')}</span>
						<Question q={question} />
					</div>
				{/each}

				<div class="flex justify-center" aria-hidden="true">
					<Flourish width={170} color="var(--ink-faint)" />
				</div>

				<div class="w-full text-sm text-ink-soft leading-relaxed">
					The information you provide in this form will be used to process your appeal. By submitting
					this form, you agree to our
					<a
						href="/terms"
						target="_blank"
						class="text-petal pb-px bg-[linear-gradient(to_right,var(--petal),var(--petal))] bg-[length:0%_1.5px] bg-no-repeat bg-[position:0_100%] [transition:background-size_0.35s_var(--ease-organic)] hover:bg-[length:100%_1.5px]"
						>Terms of Service</a
					>
					and
					<a
						href="/privacy"
						class="text-petal pb-px bg-[linear-gradient(to_right,var(--petal),var(--petal))] bg-[length:0%_1.5px] bg-no-repeat bg-[position:0_100%] [transition:background-size_0.35s_var(--ease-organic)] hover:bg-[length:100%_1.5px]"
						>Privacy Policy</a
					>.
					<br />
					Never submit any sensitive information in this form. Provided information will be shared with selected
					members of the server you appeal to.
				</div>

				<button class="btn-petal self-center" disabled={submitted}>
					{#if submitted}
						Loading...
					{:else}
						Submit
					{/if}
				</button>
			</form>
		</div>
	{:else}
		<div class="flex flex-col justify-center items-center gap-4 py-10 text-center" use:reveal>
			<div class="relative px-4 pt-5">
				<Tape angle={-5} class="-top-1 left-1/2 -ml-9" />
				<img src="/emotes/AyakoCry.webp" alt="Ayako crying" width="96" height="96" loading="lazy" />
			</div>
			<span class="font-display font-semibold text-2xl text-ink max-w-xl">
				No Punishment, enabled Appeal-Settings, or enabled Appeal-Questions found
			</span>
			<span class="annotation text-xl">there is nothing to appeal here</span>
			<div class="flex justify-center" aria-hidden="true">
				<Flourish width={170} color="var(--ink-faint)" />
			</div>
			<a class="btn-petal mt-2" href="/appeals">Back</a>
		</div>
	{/if}
</div>
