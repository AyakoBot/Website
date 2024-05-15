<script lang="ts">
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';
	import Punishment from '$lib/components/page/appeals/Punishment.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: query = '';
</script>

{#if data.punishments.length}
	<div class="w-100vw">
		<SearchBar on:any={(e) => (query = e.detail.query)} options={[]} />
	</div>

	{#if !data.punishments.filter((p) => p.reason.toLowerCase().includes(query)).length}
		<span>No Punishments found. Try refining your Search-Query</span>
	{/if}

	<ul class="flex flex-col justify-center items-center gap-20 mx-5">
		{#each [...new Set(data.punishments.map((p) => p.type))].filter((type) => data.punishments
					.filter((p) => p.type === type)
					.filter((p) => p.reason.toLowerCase().includes(query)).length) as type, j (j)}
			<li>
				{#if j !== 0}
					<FancyBorder />
				{/if}
				<h1 class="text-2xl my-5">{type[0].toUpperCase() + type.slice(1, -1)}s</h1>

				<ul class="flex flex-row flex-wrap justify-center items-center mt-7.5 gap-5">
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
	<div class="flex flex-col justify-center items-center">
		<img src="https://cdn.ayakobot.com/website_assets/AyakoHappy.webp" loading="lazy" alt="" />
		<span>No punishments</span>
		<FancyBorder />
		<a class="btn-loud" href="/appeals">Back</a>
	</div>
{/if}
