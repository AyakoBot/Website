<script lang="ts">
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
	let query = $state('');
</script>

<div class="max-w-5xl mx-auto px-5 py-12">
	<header class="text-center mb-10" use:reveal>
		<span class="label-specimen block mb-3">Appeals</span>
		<h1 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">Your Punishments</h1>
		<p class="annotation text-2xl">pick the punishment you want to appeal</p>
		<div class="flex justify-center mt-5">
			<Flourish width={220} color="var(--ink-faint)" />
		</div>
	</header>

	{#if data.enabled}
		<div class="mb-14" use:reveal={{ delay: 0.1 }}>
			<SearchBar onany={(e) => (query = e.query)} options={[]} />
		</div>

		{#if !data.punishments.filter((p) => p.reason.toLowerCase().includes(query)).length}
			<div class="flex flex-col justify-center items-center gap-4 py-10 text-center" use:reveal>
				<div class="relative px-4 pt-5">
					<Tape angle={-5} class="-top-1 left-1/2 -ml-9" />
					<img src="/emotes/AyakoHappy.webp" alt="Ayako smiling" width="96" height="96" loading="lazy" />
				</div>
				<span class="font-display font-semibold text-2xl text-ink">No Punishments found</span>
				<span class="annotation text-xl">a clean record - nothing to appeal</span>
			</div>
		{/if}

		<ul class="flex flex-col justify-center items-center gap-16 list-none p-0 m-0">
			{#each [...new Set(data.punishments.map((p) => p.type))].filter((type) => data.punishments
						.filter((p) => p.type === type)
						.filter((p) => p.reason.toLowerCase().includes(query)).length) as type, j (j)}
				<li class="w-full">
					{#if j !== 0}
						<div class="flex justify-center mb-14" aria-hidden="true">
							<Flourish width={190} color="var(--ink-faint)" />
						</div>
					{/if}

					<div class="text-center" use:reveal>
						<span class="label-specimen block mb-1">Group {String(j + 1).padStart(2, '0')}</span>
						<h2 class="font-display font-semibold text-2xl sm:text-3xl text-ink">
							{type[0].toUpperCase() + type.slice(1, -1)}s
						</h2>
					</div>

					<ul class="flex flex-col items-center mt-8 gap-6 list-none p-0 m-0">
						{#each data.punishments
							.filter((p) => p.type === type)
							.filter((p) => p.reason.toLowerCase().includes(query)) as punishment, i (i)}
							<Punishment p={punishment} showAppealButton={true} showStatusButton={punishment.appealed} />
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="flex flex-col justify-center items-center gap-4 py-10 text-center" use:reveal>
			<div class="relative px-4 pt-5">
				<Tape angle={4} class="-top-1 left-1/2 -ml-9" />
				<img src="/emotes/AyakoCry.webp" alt="Ayako crying" width="96" height="96" loading="lazy" />
			</div>
			<span class="font-display font-semibold text-2xl text-ink">
				Punishment appeals are not enabled on this Server
			</span>
			<span class="annotation text-xl">ask a server admin to turn them on</span>
			<div class="flex justify-center" aria-hidden="true">
				<Flourish width={170} color="var(--ink-faint)" />
			</div>
			<a class="btn-petal mt-2" href="/appeals">Back</a>
		</div>
	{/if}
</div>
