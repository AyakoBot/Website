<script lang="ts">
	import { page } from '$app/state';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
</script>

<div class="max-w-5xl mx-auto px-5 py-12">
	<header class="text-center mb-12" use:reveal>
		<span class="label-specimen block mb-3">Appeals</span>
		<h1 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">Appeal Status</h1>
		<p class="annotation text-2xl">here is the result of your appeal</p>
		<div class="flex justify-center mt-5">
			<Flourish width={220} color="var(--ink-faint)" />
		</div>
	</header>

	<div class="flex flex-col justify-center items-center gap-12 text-center">
		<div>
			<span
				class="inline-block font-mono font-semibold uppercase tracking-[0.3em] text-3xl sm:text-5xl border-double border-6 rounded-md px-8 sm:px-12 py-4 sm:py-6 rotate-[-7deg] opacity-92 [mix-blend-mode:multiply] [animation:stamp-press_0.55s_var(--ease-bloom)_0.25s_both] {data.status ===
				'accepted'
					? 'text-leaf border-leaf'
					: data.status === 'rejected'
						? 'text-petal border-petal'
						: 'text-gold border-gold'}"
			>
				{data.status}
			</span>
		</div>

		<div class="max-w-xl text-ink-soft leading-relaxed" use:reveal={{ delay: 0.2 }}>
			{#if data.status === 'pending'}
				Your punishment appeal is pending. Please wait for a staff member to review it. <br />
				<br />
				Please do not contact Ayako Support about this appeal as we do not have any information about it.
				<br />
			{:else if data.status === 'accepted'}
				Your punishment appeal has been accepted and your punishment has been deleted. <br />
				Please notify server staff about possible limitations on your account.<br />
				<br />
			{:else if data.status === 'rejected'}
				Your punishment appeal has been rejected.<br />
				You may not re-appeal this punishment unless the appeal is deleted by a staff member.<br />
				<br />
			{/if}
			The circumstances of your punishment are between you and the staff member who issued it.
		</div>

		<div use:reveal={{ delay: 0.3 }}>
			<a class="btn-petal" href="/guilds/{page.params.guildId}/appeals">Back</a>
		</div>
	</div>
</div>
