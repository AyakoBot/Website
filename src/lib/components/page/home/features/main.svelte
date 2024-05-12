<script lang="ts">
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import type { Returned as GETFeatures } from '@ayako/server/src/routes/features/+server';
	import Item from './item.svelte';

	export let featureBlocks: GETFeatures;
</script>

<div class="mt-10">
	<div class="flex flex-row justify-center items-center flex-wrap">
		<p class="text-10">Add&nbsp;</p>
		<div class="text-10"><ColorFadeText text="Ayako" /></div>
		<p class="text-10">&nbsp;to your Server and get access to Features like</p>
	</div>

	<div class="flex flex-col justify-center gap-10 items-center m-10">
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
</div>
