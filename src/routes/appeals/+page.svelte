<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import type { Returned as GETAppealableServers } from '../api/@me/appeals/servers/+server.js';
	import Server from '$lib/components/generic/Server.svelte';

	$: name = '';

	const getServers = async () => {
		const res = await fetch('/api/@me/appeals/servers');
		const servers = (await res.json()) as GETAppealableServers;

		return {
			appealEnabled: servers.appealEnabled.sort((a, b) => a.name.localeCompare(b.name)),
			otherMutuals: servers.otherMutuals.sort((a, b) => a.name.localeCompare(b.name)),
		};
	};

	const servers = getServers();

	const filter = (g: GETAppealableServers['appealEnabled'][0]) =>
		g.name.toLowerCase().includes(name.toLowerCase());

	const fixLinks = (g: GETAppealableServers['appealEnabled'][number]) => ({
		name: g.name,
		banner: g.banner
			? `https://cdn.discordapp.com/banners/${g.id}/${g.banner}.${g.banner.startsWith('a_') ? 'gif' : 'webp'}`
			: null,
		icon: g.icon
			? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.${g.icon.startsWith('a_') ? 'gif' : 'webp'}`
			: null,
	});
</script>

{#await servers}
	<Loading />
	<h1>Loading your Servers...</h1>
{:then servers}
	{#if servers.appealEnabled.filter(filter)}
		<h1 class="text-3xl">Appealable Servers</h1>
		<FancyBorder />
		<ul class="flex flex-row gap-4 flex-wrap justify-center items-center mt-7.5">
			{#each servers.appealEnabled.filter((g) => g.name
					.toLowerCase()
					.includes(name.toLowerCase())) as server, i (i)}
				<Server server={fixLinks(server)} />
			{/each}
		</ul>
	{/if}

	{#if servers.otherMutuals.filter(filter)}
		<h1 class="text-3xl mt-10">Unappealable Servers</h1>
		<span class="text-xs color-neutral-500">
			Consider telling a server admin to set up punishment appeals using <br />
			<code class="code code-font"> /settings appeals </code>
		</span>
		<FancyBorder />
		<ul class="flex flex-row gap-4 flex-wrap justify-center items-center mt-7.5">
			{#each servers.otherMutuals.filter((g) => g.name
					.toLowerCase()
					.includes(name.toLowerCase())) as server, i (i)}
				<Server server={fixLinks(server)} />
			{/each}
		</ul>
	{/if}
{:catch error}
	{console.error(error)}
	<p>Error</p>
{/await}
