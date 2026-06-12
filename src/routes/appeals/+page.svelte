<script lang="ts">
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Guild from '$lib/components/generic/Guild.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import type { Returned as GETAppealableGuilds } from '@ayako/server/src/routes/v1/@me/appeals/guilds/+server.ts';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
	let name = $state('');

	const filter = (g: GETAppealableGuilds['appealEnabled'][0]) =>
		g.name.toLowerCase().includes(name.toLowerCase());

	const fixLinks = (g: GETAppealableGuilds['appealEnabled'][number]) => ({
		name: g.name,
		banner: g.banner
			? `https://cdn.discordapp.com/banners/${g.id}/${g.banner}.${g.banner.startsWith('a_') ? 'gif' : 'webp'}`
			: null,
		icon: g.icon
			? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.${g.icon.startsWith('a_') ? 'gif' : 'webp'}`
			: null,
	});
</script>

<div class="relative max-w-5xl mx-auto px-5 py-12">
	<div
		class="absolute top-6 right-2 sm:right-8 rotate-[14deg] opacity-50 pointer-events-none"
		aria-hidden="true"
	>
		<Sprig size={80} color="var(--leaf-soft)" />
	</div>

	<header class="text-center mb-10" use:reveal>
		<span class="label-specimen block mb-3">Appeals</span>
		<h1 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">Punishment Appeals</h1>
		<p class="annotation text-2xl">pick the server you want to appeal in</p>
		<div class="flex justify-center mt-5">
			<Flourish width={220} color="var(--ink-faint)" />
		</div>
	</header>

	<div class="mb-14" use:reveal={{ delay: 0.1 }}>
		<SearchBar onany={(e) => (name = e.query)} options={[]} />
	</div>

	{#if data.appealEnabled.filter(filter)}
		<section use:reveal>
			<div class="text-center">
				<span class="label-specimen block mb-1">Appeals are possible here</span>
				<h2 class="font-display font-semibold text-2xl sm:text-3xl text-ink">Appealable Servers</h2>
			</div>

			<ul class="flex flex-row gap-4 flex-wrap justify-center items-center mt-8 list-none p-0 m-0">
				{#each data.appealEnabled.filter(filter) as guild, i (i)}
					<li use:reveal={{ delay: (i % 3) * 0.1 }}>
						<Guild guild={fixLinks(guild)} clickable={true}>
							<a class="btn-petal !px-5 !py-1.5 text-base" href="/guilds/{guild.id}/appeals"> Appeal </a>
						</Guild>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if data.otherMutuals.filter(filter)}
		<section class="mt-20" use:reveal>
			<div class="text-center">
				<span class="label-specimen block mb-1">Appeals not possible here</span>
				<h2 class="font-display font-semibold text-2xl sm:text-3xl text-ink mb-3">
					Unappealable Servers
				</h2>
				<p class="text-sm text-ink-soft max-w-md mx-auto">
					Consider telling a server admin to set up punishment appeals using <br />
					<code class="code">/settings appeals</code>
				</p>
			</div>

			<ul class="flex flex-row gap-4 flex-wrap justify-center items-center mt-8 list-none p-0 m-0">
				{#each data.otherMutuals.filter(filter) as guild, i (i)}
					<li use:reveal={{ delay: (i % 3) * 0.1 }}>
						<Guild guild={fixLinks(guild)} clickable={false} />
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
