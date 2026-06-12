<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import Guild from '$lib/components/generic/Guild.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import { numberWithCommas } from '$lib/scripts/util/utils.js';
	import type { Returned as GETLb } from '@ayako/server/src/routes/v1/guilds/[guildId]/lb/+server';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();

	let batch = $state(0);
	let users: GETLb | null = $state(null);
	let loading = $state(true);
	let errorMessage: string | null = $state(null);
	let lastPage = $state(false);

	let requestId = 0;

	const getData = async () => {
		const res = await fetch(`/guilds/${page.params.guildId}/leaderboard?skip=${batch * 100}`);
		if (!res.ok) throw new Error(await res.text());

		return (await res.json()) as GETLb;
	};

	const load = async () => {
		const id = ++requestId;
		loading = true;
		errorMessage = null;

		try {
			const entries = await getData();
			if (id !== requestId) return;

			if (entries.length === 0 && batch > 0) {
				lastPage = true;
				batch -= 1;
				void load();
				return;
			}

			users = entries;
			loading = false;
		} catch (error) {
			if (id !== requestId) return;
			errorMessage = error instanceof Error ? error.message : String(error);
			loading = false;
		}
	};

	afterNavigate(() => {
		void load();
	});

	const decrement = () => {
		lastPage = false;
		batch -= 1;
		void load();
	};

	const increment = () => {
		lastPage = false;
		batch += 1;
		void load();
	};
</script>

<div class="relative max-w-6xl w-full mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-24">
	<!-- marginalia sprig in the gutter -->
	<div
		class="absolute top-10 left-1 lg:left-0 rotate-[-12deg] opacity-60 pointer-events-none"
		aria-hidden="true"
	>
		<Sprig size={72} color="var(--leaf-soft)" />
	</div>

	<header
		class="flex flex-col justify-center items-center gap-3 mb-10 [animation:fade-up_0.8s_var(--ease-organic)_both]"
	>
		<span class="label-specimen">The Rankings</span>
		<h1 class="sr-only">Leaderboard</h1>

		{#if data && !('message' in data)}
			<Guild guild={data} defaultHover={true} />
		{:else}
			<Guild guild={{ name: 'Global', banner: null, icon: '/images/Icon.webp' }} defaultHover={true} />
		{/if}

		<a
			href="/guilds/leaderboards"
			class="inline-flex flex-row items-center gap-2 font-display font-semibold text-ink pb-[2px] bg-[linear-gradient(to_right,var(--petal),var(--petal))] bg-[length:0%_2px] bg-no-repeat bg-[position:0_100%] [transition:background-size_0.35s_var(--ease-organic)] hover:bg-[length:100%_2px]"
		>
			<span class="block i-tabler-arrow-left" aria-hidden="true"></span>
			Server List
		</a>

		<Flourish width={200} color="var(--ink-faint)" />
	</header>

	{#if loading}
		<div class="flex flex-col justify-center items-center w-full">
			<Loading />
		</div>
	{:else if errorMessage}
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
			<p class="text-ink-soft">{errorMessage}</p>
		</div>
	{:else if users && users.length}
		<section use:reveal>
			<div class="column-count-1 lg:column-count-2 2xl:column-count-3 gap-x-12">
				{#each users as entry, i (i)}
					<div
						class="break-inside-avoid flex flex-row items-center gap-3 px-3 py-2.5 border-b border-b-ink/15 border-l-3 [border-left-style:solid] [transition:background-color_0.3s_var(--ease-organic)] {batch ===
							0 && i === 0
							? 'border-l-gold bg-[rgba(168,132,47,0.18)] hover:bg-[rgba(168,132,47,0.28)]'
							: batch === 0 && i === 1
								? 'border-l-leaf-soft bg-[rgba(147,168,119,0.18)] hover:bg-[rgba(147,168,119,0.3)]'
								: batch === 0 && i === 2
									? 'border-l-petal bg-[rgba(179,84,63,0.18)] hover:bg-[rgba(179,84,63,0.28)]'
									: 'border-l-transparent hover:bg-paper-warm'}"
					>
						<span class="font-mono text-sm text-ink-soft min-w-12 text-right shrink-0">
							{i + 1 + batch * 100}.
						</span>
						<img
							src={entry.user.avatar}
							alt={entry.user.name}
							width="48"
							height="48"
							class="w-12 h-12 rounded-full border border-ink/15 object-cover shrink-0"
							loading="lazy"
						/>
						<span class="font-display font-semibold text-ink truncate flex-1 min-w-0">
							{entry.user.name}
						</span>
						<span class="flex flex-col items-end leading-tight shrink-0">
							<span class="font-mono text-lg text-ink">{numberWithCommas(entry.level)}</span>
							<span class="font-mono text-xs text-ink-soft">
								{numberWithCommas(entry.xp)}&nbsp;XP
							</span>
						</span>
					</div>
				{/each}
			</div>

			{#if lastPage}
				<p class="annotation text-xl text-center mt-8 rotate-[-1deg]">This is the last page</p>
			{/if}

			<!-- book pager -->
			<nav
				class="flex flex-row justify-center items-center gap-5 {lastPage ? 'mt-3' : 'mt-10'}"
				aria-label="Leaderboard pages"
			>
				<button
					onclick={() => decrement()}
					disabled={batch === 0}
					class="btn-ink !px-4 !py-2"
					aria-label="Previous Page"
				>
					<span class="block i-tabler-arrow-left" aria-hidden="true"></span>
				</button>
				<span class="font-mono text-sm text-ink-soft tracking-[0.18em] uppercase">
					Page {String(batch + 1).padStart(2, '0')}
				</span>
				<button
					onclick={() => increment()}
					disabled={!users.length}
					class="btn-ink !px-4 !py-2"
					aria-label="Next Page"
				>
					<span class="block i-tabler-arrow-right" aria-hidden="true"></span>
				</button>
			</nav>
		</section>
	{:else}
		<div
			class="relative card-paper !bg-paper max-w-md mx-auto px-8 pt-10 pb-6 text-center rotate-[-0.6deg]"
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
			<p class="text-ink">No ranks exist yet</p>
			<p class="annotation text-lg mt-2">- no entries on this page yet</p>
		</div>
	{/if}
</div>
