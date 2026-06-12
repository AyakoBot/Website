<script lang="ts">
	import type { Returned as GETGuilds } from '@ayako/server/src/routes/v1/guilds/+server';
	import { onMount } from 'svelte';

	import Flourish from '$lib/components/design/Flourish.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import Guild from '$lib/components/generic/Guild.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import SearchBar from '$lib/components/generic/SearchBar.svelte';
	import { reveal } from '$lib/scripts/util/reveal';

	let promise: Promise<GETGuilds> | null = $state(null);
	let page = $state(0);
	let query = $state('');

	const getData = async () => {
		const res = await fetch(`/guilds/leaderboards?skip=${page * 100}&q=${query}`);
		if (!res.ok) throw new Error(await res.text());

		return (await res.json()) as GETGuilds;
	};

	onMount(() => {
		promise = getData();
	});

	const update = (q: string) => {
		query = q;
		page = 0;
		promise = getData();
	};

	const decrement = () => {
		page -= 1;
		promise = getData();
	};

	const increment = () => {
		page += 1;
		promise = getData();
	};
</script>

<div class="relative max-w-6xl w-full mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-24">
	<!-- marginalia sprig bleeding into the header -->
	<div
		class="absolute top-8 right-4 lg:right-0 rotate-[14deg] opacity-60 pointer-events-none"
		aria-hidden="true"
	>
		<Sprig size={84} color="var(--leaf-soft)" />
	</div>

	<header class="text-center mb-10 [animation:fade-up_0.8s_var(--ease-organic)_both]">
		<span class="label-specimen block mb-3">The Rankings</span>
		<h1 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">Leaderboards</h1>
		<p class="annotation text-2xl mb-4">every server, ranked</p>
		<div class="flex justify-center">
			<Flourish width={220} color="var(--ink-faint)" />
		</div>
	</header>

	<div class="max-w-2xl mx-auto mb-6">
		<SearchBar onany={(e) => update(e.query)} options={[]} />
	</div>

	<!-- the gold ledger entry: every garden at once -->
	<div class="flex flex-col items-center gap-1 mb-12">
		<a
			href="/guilds/1/leaderboard"
			class="btn-ink !border-gold !text-gold hover:!bg-gold hover:!text-paper"
		>
			<span class="block i-tabler-award" aria-hidden="true"></span>
			Global Leaderboard
		</a>
		<span class="annotation text-lg rotate-[-1deg]">all servers in one list</span>
	</div>

	<div class="flex flex-col justify-center items-center w-full">
		{#await promise}
			<Loading />
		{:then data}
			{#if data}
				{#if data.length}
					<div class="flex flex-row flex-wrap gap-y-6 justify-center items-center" use:reveal>
						{#each data as guild (guild.guildid)}
							<a href="/guilds/{guild.guildid}/leaderboard" class="py-2">
								<Guild clickable={true} {guild} defaultHover={true} />
							</a>
						{/each}
					</div>
				{:else}
					<div
						class="relative card-paper !bg-paper max-w-md mx-auto px-8 pt-10 pb-6 text-center rotate-[-0.6deg]"
						use:reveal
					>
						<Tape angle={-4} class="-top-2.5 left-1/2 -ml-9" />
						<img
							src="/emotes/AyakoCry.webp"
							alt=""
							width="64"
							height="64"
							class="mx-auto mb-3"
							loading="lazy"
						/>
						<p class="text-ink">No guilds found. Please refine your search</p>
						<p class="annotation text-lg mt-2">- nothing matched your search</p>
					</div>
				{/if}

				<!-- book pager -->
				<nav
					class="flex flex-row justify-center items-center gap-5 mt-12"
					aria-label="Leaderboard pages"
				>
					<button
						onclick={() => decrement()}
						disabled={page === 0}
						class="btn-ink !px-4 !py-2"
						aria-label="Previous Page"
					>
						<span class="block i-tabler-arrow-left" aria-hidden="true"></span>
					</button>
					<span class="font-mono text-sm text-ink-soft tracking-[0.18em] uppercase">
						Page {String(page + 1).padStart(2, '0')}
					</span>
					<button
						onclick={() => increment()}
						disabled={!data.length}
						class="btn-ink !px-4 !py-2"
						aria-label="Next Page"
					>
						<span class="block i-tabler-arrow-right" aria-hidden="true"></span>
					</button>
				</nav>
			{:else}
				<Loading />
			{/if}
		{:catch error}
			<div
				class="relative card-paper !bg-paper max-w-md mx-auto px-8 pt-10 pb-6 text-center rotate-[0.5deg]"
			>
				<Tape angle={3} class="-top-2.5 left-1/2 -ml-9" />
				<img
					src="/emotes/AyakoCry.webp"
					alt=""
					width="64"
					height="64"
					class="mx-auto mb-3"
					loading="lazy"
				/>
				<p class="font-display font-semibold text-petal mb-1">Something went wrong</p>
				<p class="text-ink-soft">{error.message}</p>
			</div>
		{/await}
	</div>
</div>
