<script lang="ts">
	import { page } from '$app/stores';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import type { Returned as GETPunishments } from '$api/guilds/[guildId]/appeals/+server.js';

	const getPunishments = async () => {
		const res = await fetch(`/api/guilds/${$page.params.guildId}/appeals`);
		return res.json() as Promise<GETPunishments>;
	};

	const punishments = getPunishments();

	$: query = '';
</script>

{#await punishments}
	<div class="flex justify-center items-center flex-col">
		<Loading />
		<h1>Loading your Punishments...</h1>
	</div>
{:then punishments}
	{#if punishments.length}
		<div class="w-100vw">
			<SearchBar on:any={(e) => (query = e.detail.query)} options={[]} />
		</div>

		{#if !punishments.filter((p) => p.reason.toLowerCase().includes(query)).length}
			<p>No Punishments found. Try refining your Search-Query</p>
		{/if}

		<ul class="flex flex-col justify-center items-center gap-20 mx-5">
			{#each [...new Set(punishments.map((p) => p.type))].filter((type) => punishments
						.filter((p) => p.type === type)
						.filter((p) => p.reason.toLowerCase().includes(query)).length) as type, j (j)}
				<li>
					{#if j !== 0}
						<FancyBorder />
					{/if}
					<h1 class="text-2xl my-5">{type[0].toUpperCase() + type.slice(1, -1)}s</h1>

					<ul class="flex flex-row flex-wrap justify-center items-center mt-7.5 gap-5">
						{#each punishments
							.filter((p) => p.type === type)
							.filter((p) => p.reason.toLowerCase().includes(query)) as punishment, i (i)}
							<Punishment p={punishment} appeal={true} />
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="flex flex-col justify-center items-center">
			<img src="https://cdn.ayakobot.com/website_assets/AyakoHappy.webp" loading="lazy" alt="" />
			<p>No punishments</p>
			<FancyBorder />
			<a class="btn-loud" href="/appeals">Back</a>
		</div>
	{/if}
{:catch error}
	{console.error(error)}
	<p>Error</p>
{/await}
