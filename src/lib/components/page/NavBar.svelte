<script lang="ts">
	import Buttons from '$lib/components/page/NavBar/Buttons.svelte';
</script>

<nav
	class="sticky top-0 z-50 w-full bg-paper/85 backdrop-blur-md border-b border-ink/10 flex flex-row justify-between items-center gap-4 py-2.5 pl-17 pr-4 sm:pr-6"
>
	<a href="/" class="flex flex-row items-center gap-3 group">
		<img
			src="/images/Icon.webp"
			alt="Ayako Logo Icon"
			width="44"
			height="44"
			loading="eager"
			class="rounded-full border border-ink/20 transition-transform duration-500 ease-out group-hover:rotate-12"
		/>
		<span class="flex flex-col items-start leading-none">
			<span class="font-display font-semibold text-2xl text-ink">Ayako</span>
			<span class="annotation text-base leading-tight hidden sm:block">the flower child</span>
		</span>
	</a>

	<div class="hidden sm:block">
		<Buttons />
	</div>
</nav>
