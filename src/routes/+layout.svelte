<script lang="ts">
	import '$lib/scripts/index.js';
	import './main.css';
	import { onMount } from 'svelte';
	import { checkAndFireConversion } from '$lib/scripts/tracking';

	import Blob from '$lib/components/generic/Blob.svelte';
	import Footer from '$lib/components/page/Footer.svelte';
	import NavBar from '$lib/components/page/NavBar.svelte';
	import Sidebar from '$lib/components/page/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();

	// Check for conversion on page load (user returning from invite flow)
	onMount(() => {
		checkAndFireConversion();
	});
</script>

<div
	id="main"
	class="of-hidden flex flex-col justify-between items-center min-h-full text-center break-normal select-none min-w-100vw bg-gradient-linear bg-gradient-[142deg,rgba(0,0,0,1)_0%,rgba(98,14,14,1)_73%]
 before:block before:h-60dvh before:left-0 before:top-0 before:z-0 before:w-100vw before:fixed before:pointer-events-none before:bg-center before:bg-no-repeat before:bg-scroll before:scale-100 before:bg-[100%100%] before:h-60dvh before:pointer-events-none before:fixed
  after:bg-black after:block after:h-full after:left-0 after:opacity-0 after:fixed after:scale-100 after:top-0 after:transition-opacity after:duration-1s after:ease-in-out after:delay-0.25s after:transition-visibility after:delay-1s after:delay-0.25s after:invisible after:w-full"
>
	<Blob />

	<NavBar />
	<Sidebar />

	<hr class="op-0" />

	<main class="mx-2 z-1 w-fit max-w-100%">
		{@render children()}
	</main>

	<Footer />
</div>
