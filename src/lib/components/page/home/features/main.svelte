<script lang="ts">
	import type { Returned as GETFeatures } from '@ayako/server/src/routes/v1/bot/features/+server';
	import Item from './item.svelte';

	const { featureBlocks }: { featureBlocks: GETFeatures } = $props();
</script>

<section id="features" class="scroll-mt-20 px-4">
	<div class="flex flex-col items-center text-center mb-12">
		<h2 class="text-3xl md:text-5xl font-bold mb-4">Everything your server needs</h2>
		<p class="text-lg md:text-xl text-neutral-300 max-w-150">
			Ayako comes packed with powerful tools for moderation, customization, and community
			engagement.
		</p>
	</div>

	<div class="flex flex-col justify-center gap-10 items-center">
		{#each featureBlocks as features}
			<div class="flex flex-row justify-center gap-10 items-center flex-wrap">
				{#each features as feature}
					<Item
						subtitle={feature.subtitle}
						title={feature.title}
						img={feature.image}
						placeholder={feature.placeholder}
					/>
				{/each}
			</div>
		{/each}
	</div>
</section>
