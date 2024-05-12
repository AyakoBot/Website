<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Guild from '$lib/components/generic/Guild.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';
	import type { Returned as GETAppealableGuilds } from '@ayako/server/src/routes/@me/appeals/guilds/+server.js';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: name = '';

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

<div class="w-100vw">
	<SearchBar on:any={(e) => (name = e.detail.query)} options={[]} />
</div>

{#if data.appealEnabled.filter(filter)}
	<h1 class="text-3xl">Appealable Servers</h1>
	<FancyBorder />
	<ul class="flex flex-row gap-4 flex-wrap justify-center items-center mt-7.5">
		{#each data.appealEnabled.filter((g) => g.name.toLowerCase().includes(name)) as guild, i (i)}
			<Guild guild={fixLinks(guild)}>
				<a class="btn-medium" href="guilds/{guild.id}/appeals">Appeal</a>
			</Guild>
		{/each}
	</ul>
{/if}

{#if data.otherMutuals.filter(filter)}
	<h1 class="text-3xl mt-10">Unappealable Servers</h1>
	<span class="text-xs color-neutral-500">
		Consider telling a server admin to set up punishment appeals using <br />
		<code class="code code-font"> /settings appeals </code>
	</span>
	<FancyBorder />
	<ul class="flex flex-row gap-4 flex-wrap justify-center items-center mt-7.5">
		{#each data.otherMutuals.filter((g) => g.name
				.toLowerCase()
				.includes(name.toLowerCase())) as guild, i (i)}
			<Guild guild={fixLinks(guild)} />
		{/each}
	</ul>
{/if}
