<script lang="ts">
	import '$lib/scripts/index.js';
	import './main.css';

	import VineSpine from '$lib/components/design/VineSpine.svelte';
	import Footer from '$lib/components/page/Footer.svelte';
	import NavBar from '$lib/components/page/NavBar.svelte';
	import Sidebar from '$lib/components/page/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="relative flex flex-col min-h-100lvh bg-paper text-ink overflow-x-clip">
	<VineSpine />

	<NavBar />
	<Sidebar />

	<main class="relative z-1 flex-1 w-full">
		{@render children()}
	</main>

	<Footer />
</div>
