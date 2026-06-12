<script lang="ts">
	import { page } from '$app/state';
	import Tape from '$lib/components/design/Tape.svelte';
	import Timestamp from '$lib/components/generic/Timestamp.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import type { Returned as GETPunishments } from '@ayako/server/src/routes/v1/@me/punishments/+server.ts';

	const {
		p,
		showAppealButton = false,
		showStatusButton = false,
	}: {
		p: GETPunishments[number];
		showAppealButton?: boolean;
		showStatusButton?: boolean;
	} = $props();
</script>

<li class="w-full max-w-2xl list-none" use:reveal>
	<div
		class="relative card-paper px-6 sm:px-8 pt-9 pb-6 rotate-[-0.5deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-4px] hover:shadow-press-lg"
	>
		<Tape angle={-3} class="-top-2.5 left-1/2 -ml-9" />

		<span class="label-specimen absolute top-3 right-4 opacity-70">Record No. {p.id}</span>

		<div class="flex flex-col gap-5">
			<div>
				<span class="label-specimen block mb-1">Reason:</span>
				<p class="text-ink leading-relaxed">{p.reason}</p>
			</div>

			<div class="h-px w-full bg-ink/15" aria-hidden="true"></div>

			<div class="flex flex-row flex-wrap justify-between items-end gap-x-10 gap-y-5">
				<div>
					<span class="label-specimen block mb-1.5">Date:</span>
					<div class="flex flex-col items-start gap-1 font-mono text-sm text-ink">
						<Timestamp time={p.id} type="f" />
						<span class="flex flex-row items-center">(<Timestamp time={p.id} type="R" />)</span>
					</div>
				</div>

				<div>
					<span class="label-specimen block mb-1.5">Channel:</span>
					<span class="code">#{p.channel.name}</span>
				</div>

				{#if showAppealButton || showStatusButton}
					<a
						class="{showStatusButton ? 'btn-ink' : 'btn-petal'} !px-5 !py-2 text-base self-end"
						href="/guilds/{page.params.guildId}/appeals/{p.id}/{showStatusButton ? 'status' : 'appeal'}"
					>
						{showStatusButton ? 'Status' : 'Appeal'}
					</a>
				{/if}
			</div>
		</div>
	</div>
</li>
