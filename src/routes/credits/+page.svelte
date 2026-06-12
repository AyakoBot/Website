<script lang="ts">
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import CreditItem from '$lib/components/page/credits/item.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
</script>

<div class="relative w-full px-5 sm:px-8 pt-16 pb-24">
	<div class="max-w-6xl mx-auto">
		<header class="flex flex-col items-center text-center mb-12" use:reveal>
			<div class="relative rotate-[-3deg] mb-6">
				<Tape angle={-6} class="-top-2.5 left-1/2 -ml-9" />
				<img src="/emotes/AyakoLove.webp" width="128" alt="Ayako holding a heart" loading="lazy" />
			</div>

			<span class="label-specimen block mb-3">The Team</span>
			<h1 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">
				Creators &amp; Credits
			</h1>
			<p class="annotation text-2xl mb-4">the people behind Ayako</p>
			<Flourish width={230} color="var(--ink-faint)" />
		</header>

		<div class="grid auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
			{#each data.credits as credit, i (i)}
				<div class="h-full" use:reveal={{ delay: (i % 4) * 0.1 }}>
					<CreditItem {credit} index={i} />
				</div>
			{/each}
		</div>
	</div>
</div>
