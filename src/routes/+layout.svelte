<script lang="ts">
	import '$lib/scripts/index.js';
	import './main.css';

	import { page } from '$app/state';
	import VineSpine from '$lib/components/design/VineSpine.svelte';
	import Footer from '$lib/components/page/Footer.svelte';
	import NavBar from '$lib/components/page/NavBar.svelte';
	import Sidebar from '$lib/components/page/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();

	/**
	 * /embed/* is served inside a cross-origin iframe on bot listing sites, where
	 * site chrome would be nonsense. SvelteKit's `@` layout reset cannot help
	 * here - it resets *to* this root layout, which is where the chrome lives -
	 * so the decision belongs to this component.
	 */
	const isEmbed = $derived(page.url.pathname.startsWith('/embed'));
</script>

{#if isEmbed}
	<div class="bg-paper text-ink">
		{@render children()}
	</div>
{:else}
	<div class="relative flex flex-col min-h-100lvh bg-paper text-ink overflow-x-clip">
		<VineSpine />

		<NavBar />
		<Sidebar />

		<main class="relative z-1 flex-1 w-full">
			{@render children()}
		</main>

		<Footer />
	</div>
{/if}
