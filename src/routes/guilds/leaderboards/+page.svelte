<script lang="ts">
	import type { Returned as GETGuilds } from '@ayako/server/src/routes/v1/guilds/+server';

	import Guild from '$lib/components/generic/Guild.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';

	let promise: Promise<GETGuilds> | null = $state(null);
	let page = $state(0);
	let query = $state('');

	const getData = async () => {
		const res = await fetch(`/guilds/leaderboards?skip=${page * 100}&q=${query}`);
		if (!res.ok) throw new Error(await res.text());

		return (await res.json()) as GETGuilds;
	};

	const update = (q: string) => {
		query = q;
		promise = getData();
	};

	$effect(() => {
		promise = getData();
	});

	const decrement = () => {
		page -= 1;
		promise = getData();
	};

	const increment = () => {
		page += 1;
		promise = getData();
	};
</script>

<div class="w-100dvw">
	<SearchBar onany={(e) => update(e.query)} options={[]} />
	<a class="btn-medium" href="/guilds/1/leaderboard"> Global Leaderboard </a>
</div>

<div class="flex flex-col m-auto w-full justify-center items-center">
	{#await promise}
		<Loading />
	{:then data}
		{#if data && data.length}
			<div class="flex flex-row flex-wrap gap-4 justify-center items-center mt-7.5">
				{#if !data.length}
					<p>No guilds found. Please refine your search</p>
				{/if}

				{#each data as guild}
					<a href="/guilds/{guild.guildid}/leaderboard" class="py-2">
						<Guild clickable={true} {guild} defaultHover={true} />
					</a>
				{/each}
			</div>

			<div class="w-100dvw flex flex-row justify-center items-center mt-10">
				<button
					onclick={() => decrement()}
					onkeydown={() => decrement()}
					disabled={page === 0}
					class="bg-[#171717] hover:bg-[#888] p-3 rounded-r rounded-full border-r border-solid border-black pl-4"
					aria-label="Previous Page"
				>
					<span class="block i-tabler-arrow-left"></span>
				</button>
				<button
					onclick={() => increment()}
					onkeydown={() => decrement()}
					disabled={!data.length}
					class="bg-[#171717] hover:bg-[#888] p-3 rounded-l rounded-full border-l border-solid border-black pr-4"
					aria-label="Next Page"
				>
					<span class="block i-tabler-arrow-right"></span>
				</button>
			</div>
		{:else if !data}
			<Loading />
		{:else}
			<p>No guilds found. Please refine your search</p>
		{/if}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
