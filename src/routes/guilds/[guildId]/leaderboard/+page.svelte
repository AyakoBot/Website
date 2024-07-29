<script lang="ts">
	import { page } from '$app/stores';
	import type { Returned as GETLb } from '@ayako/server/src/routes/guilds/[guildId]/lb/+server';
	import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { numberWithCommas } from '$lib/scripts/util/utils.js';

	import Loading from '$lib/components/generic/Loading.svelte';

	let promise: Promise<GETLb> | null = null;

	let batch = 0;

	const getData = async () => {
		const res = await fetch(`/guilds/${$page.params.guildId}/leaderboard?skip=${batch * 100}`);
		if (!res.ok) throw new Error(await res.text());

		return (await res.json()) as GETLb;
	};

	onMount(() => {
		promise = getData();
	});

	const decrement = () => {
		batch -= 1;
		promise = getData();
	};

	const increment = () => {
		batch += 1;
		promise = getData();
	};
</script>

{#await promise}
	<div class="flex flex-col m-auto w-full justify-center items-center">
		<Loading />
	</div>
{:then data}
	{#if data && data.length}
		<div class="flex flex-row">
			{#if !data.length}
				<p>No ranks exist yet</p>
			{:else}
				<div
					class="column-count-2 md:column-count-2 2xl:column-count-3 column-width-80 w-95% m-auto h-full gap-0 rounded-3xl py-5"
				>
					{#each data as user, i}
						<div
							class="w-80% m-auto flex flex-row justify-start items-center gap-2 p-1 rounded-3xl my-2 bg-[var(--bg-color)] [box-shadow:0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-4px border-1px border-solid border-[rgba(255,255,255,0.28)] hover:scale-105 transition-all duration-0.25s ease-in-out"
							style="--bg-color: rgba({i === 0 && batch === 0
								? '212, 175, 55'
								: i === 1 && batch === 0
									? '192, 192, 192'
									: i === 2 && batch === 0
										? '205, 127, 50'
										: '254,254,254'},0.3)"
						>
							<span class="ml-2">{i + 1 + batch * 100}.</span>
							<img src={user.user.avatar} alt="User Avatar" class="rounded-full" width="48" height="48" />
							<div class="flex flex-row justify-between items-center w-full">
								<span class="text-5">
									{user.user.name}
								</span>
								<div class="mr-2 flex flex-col justify-center items-center">
									<span class="text-6 top-0 right-0">{numberWithCommas(user.level)}</span>
									<span class="text-2 top-1 right-0">{numberWithCommas(user.xp)}&nbsp;XP</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="w-100dvw flex flex-row justify-center items-center mt-10">
			<button
				on:click={() => decrement()}
				on:keydown={() => decrement()}
				disabled={batch === 0}
				class="bg-[#171717] hover:bg-[#888] p-3 rounded-r rounded-full border-r border-solid border-black pl-4"
				><Fa icon={faArrowLeft} scale="1" /></button
			>
			<button
				on:click={() => increment()}
				on:keydown={() => decrement()}
				disabled={!data.length}
				class="bg-[#171717] hover:bg-[#888] p-3 rounded-l rounded-full border-l border-solid border-black pr-4"
				><Fa icon={faArrowRight} scale="1" /></button
			>
		</div>
	{:else if !data}
		<div class="flex flex-col m-auto w-full justify-center items-center">
			<Loading />
		</div>
	{:else}
		<div class="flex flex-col m-auto w-full justify-center items-center">
			<p>No ranks exist yet</p>
		</div>
	{/if}
{:catch error}
	<div class="flex flex-col m-auto w-full justify-center items-center">
		<p>{error.message}</p>
	</div>
{/await}
