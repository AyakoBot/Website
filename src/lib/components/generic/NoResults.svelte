<script lang="ts">
	import Tape from '$lib/components/design/Tape.svelte';
</script>

<div class="flex flex-col items-center py-6">
	<div class="relative card-paper !bg-paper px-5 pt-6 pb-4 rotate-[-2deg]">
		<Tape angle={3} width={64} class="-top-2.5 left-1/2 -ml-8" />
		<img src="/emotes/AyakoCry.webp" alt="Ayako Crying" width="64" height="64" loading="eager" />
	</div>

	<h1 class="font-display font-semibold text-2xl text-ink mt-5">No Results</h1>
	<span class="annotation mt-1 rotate-[-1.5deg]">Try refining your query</span>
</div>
