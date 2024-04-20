<script lang="ts">
	import { page } from '$app/stores';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import type { Returned as GETPunishments } from '../../../api/guilds/[guildId]/appeals/+server.js';
	import Punishment from './../../../../lib/components/page/appeals/Punishment.svelte';

	const getPunishments = async () => {
		const res = await fetch(`/api/guilds/${$page.params.guildId}/appeals`);
		return res.json() as Promise<GETPunishments>;
	};

	const punishments = getPunishments();
</script>

{#await punishments}
	<div class="flex justify-center items-center flex-col">
		<Loading />
		<h1>Loading your Punishments...</h1>
	</div>
{:then punishments}
	{#if punishments.length}
		<ul class="flex flex-col gap-20 mx-5">
			{#each [...new Set(punishments.map((p) => p.type))] as type, j (j)}
				<li>
					{#if j !== 0}
						<FancyBorder />
					{/if}
					<h1 class="text-2xl my-5">{type[0].toUpperCase() + type.slice(1, -1)}s</h1>

					<ul class="flex flex-col gap-4 flex-wrap justify-center items-center mt-7.5 gap-5">
						{#each punishments.filter((p) => p.type === type) as punishment, i (i)}
							<Punishment p={punishment} />
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
