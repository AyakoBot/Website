<script lang="ts">
	const { close }: { close: () => void } = $props();
</script>

<div class="flex flex-row items-center justify-between px-4 py-3 border-b border-ink/10">
	<button
		class="w-11 h-11 flex justify-center items-center rounded-full bg-paper text-ink border border-ink/25 transition-all duration-300 hover:text-petal hover:border-petal hover:rotate-90"
		onclick={close}
		name="Close Sidebar"
		aria-label="Close Sidebar"
	>
		<span class="block i-tabler-x w-6 h-6" aria-hidden="true"></span>
	</button>

	<span class="font-display font-semibold text-2xl text-ink">Ayako</span>

	<a href="/" onclick={close} aria-label="Home">
		<img
			src="/images/Icon.webp"
			alt="Ayako Logo Icon"
			width="44"
			height="44"
			loading="eager"
			class="rounded-full border border-ink/20"
		/>
	</a>
</div>
