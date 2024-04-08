<script lang="ts">
	import type { Returned as GETGuilds } from '../../../../../routes/api/guilds/+server.js';
	import { onMount } from 'svelte';
	import Guild from '$lib/components/generic/Guild.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';

	const getGuilds = async (): Promise<GETGuilds> => {
		const res = await fetch('/api/guilds');
		return (await res.json()).sort(() => 0.5 - Math.random());
	};

	const guilds = getGuilds();

	let container: HTMLDivElement;
	let scroller: HTMLUListElement;

	onMount(() => {
		addAnimation();
	});

	const addAnimation = async () => {
		await guilds;

		if (!container || !scroller) return;

		const scrollerContent = Array.from(scroller.children);

		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			if (scroller) scroller.appendChild(duplicatedItem);
		});
	};

	const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
</script>

<div class="mt-20 flex flex-col justify-center items-center">
	{#await guilds}
		<Loading />
	{:then guilds}
		<div
			bind:this={container}
			class="relative z-20 max-w-100vw overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
		>
			<ul
				bind:this={scroller}
				class="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-[scroll_80s_reverse_linear_infinite] hover:animate-paused"
			>
				{#each guilds as guild (guild.guildid)}
					<Guild {guild}>
						{numberWithCommas(guild.membercount)} Members
					</Guild>
				{/each}
			</ul>
		</div>
		<p class="color-neutral-500">A selection of large Discord Servers Ayako manages</p>
		<p class="text-xs color-neutral-500">hover to see more info</p>
	{:catch error}
		{console.error(error)}
		<p>Error</p>
	{/await}
</div>

<style>
	@keyframes scroll {
		to {
			transform: translate(calc(-50% - 0.5rem));
		}
	}
</style>
