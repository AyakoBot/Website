<script lang="ts">
	import type { Returned as GETServers } from '../../../../../routes/api/servers/+server.js';
	import { onMount } from 'svelte';
	import Server from './Server.svelte';

	const getServers = async (): Promise<GETServers> => {
		const res = await fetch('/api/servers');
		return (await res.json()).sort(() => 0.5 - Math.random());
	};

	const servers = getServers();

	let container: HTMLDivElement;
	let scroller: HTMLUListElement;

	onMount(() => {
		addAnimation();
	});

	const addAnimation = async () => {
		await servers;

		if (!container || !scroller) return;

		const scrollerContent = Array.from(scroller.children);

		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			if (scroller) scroller.appendChild(duplicatedItem);
		});
	};
</script>

<div class="mt-20 flex flex-col justify-center items-center">
 <p>A selection of large Discord Servers Ayako manages</p>
 <p class="text-xs">hover to see more info</p>
	{#await servers}
		<img
			src="https://cdn.ayakobot.com/Loading.gif"
			width="128"
			height="128"
			alt="Loading..."
			class="m-15"
		/>
	{:then servers}
		<div
			bind:this={container}
			class="relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
		>
			<ul
				bind:this={scroller}
				class="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-[scroll_240s_reverse_linear_infinite] hover:animate-paused"
			>
				{#each servers as server (server.guildid)}
					<Server {server} />
				{/each}
			</ul>
		</div>
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
