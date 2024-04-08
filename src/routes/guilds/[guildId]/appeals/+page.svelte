<script lang="ts">
	import { page } from '$app/stores';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import type { Returned as GETPunishments } from '../../../api/guilds/[guildId]/appeals/+server.js';

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
		<h1 class="text-3xl">Punishments</h1>
		<FancyBorder />
		<ul class="flex flex-row gap-4 flex-wrap justify-center items-center mt-7.5">
			{#each punishments as punishment, i (i)}
				<div class="flex flex-col items-center">
					<p>{punishment.reason}</p>
					<p>{punishment.type}</p>
					<p>{punishment.id}</p>
				</div>
			{/each}
		</ul>
	{:else}
		<p>No punishments</p>
	{/if}
{:catch error}
	{console.error(error)}
	<p>Error</p>
{/await}
