<script lang="ts">
	import type { Returned as GETServers } from '../../../../../routes/api/servers/+server.js';
	import { onMount } from 'svelte';
	import Server from './Server.svelte';

	export let pauseOnHover: boolean = false;
	export let speed: 'fast' | 'normal' | 'slow' = 'fast';
	export let direction: 'left' | 'right' = 'left';

	const getServers = async (): Promise<GETServers> => {
		const res = await fetch('/api/servers');
		return (await res.json()).sort(() => 0.5 - Math.random());
	};

	const servers = getServers();

	let container: HTMLDivElement;
	let scroller: HTMLUListElement;
	let start = false;

	onMount(() => {
		addAnimation();
	});

	const addAnimation = () => {
		if (container && scroller) return;
		const scrollerContent = Array.from(scroller.children);

		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			if (scroller) scroller.appendChild(duplicatedItem);
		});

		start = true;
	};
</script>

<div
	bind:this={container}
	class="animate-[scroll_40s_forwards_linear_infinite] relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
>
	<ul
		bind:this={scroller}
		class="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-[scroll_40s_forwards_linear_infinite]',
		)}"
	>
		{#await servers}
			<p>Waiting</p>
		{:then servers}
			{#each servers as server (server.guildid)}
				<Server {server} />
			{/each}
		{:catch error}
			{console.error(error)}
			<p>Error</p>
		{/await}
	</ul>
</div>
