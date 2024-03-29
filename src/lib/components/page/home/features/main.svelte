<script lang="ts">
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import type { Returned as GETFeatures } from '../../../../../routes/api/features/+server';
	import Item from './item.svelte';

	const getFeatures = async (): Promise<GETFeatures> => {
		const res = await fetch('/api/features?blocks=3');
		return res.json();
	};

	const featureBlocks = getFeatures();
</script>

<div class="mt-10">
	<div class="flex flex-row justify-center items-center flex-wrap">
		<p class="text-10">Add&nbsp;</p>
		<p class="text-10"><ColorFadeText text="Ayako" /></p>
		<p class="text-10">&nbsp;to your Server and get access to Features like</p>
	</div>

	<div class="flex flex-col justify-center gap-10 items-center m-10">
		{#await featureBlocks then featureBlocks}
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
		{/await}
	</div>
</div>
