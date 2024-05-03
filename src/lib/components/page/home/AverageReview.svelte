<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETReviews } from '$api/reviews/+server.js';

	export let reviews: Promise<GETReviews>;
</script>

<p class="text-10">and an average of</p>
{#await reviews}
	<div class="text-15"><ColorFadeAndCountUp num={5} /></div>
{:then reviews}
	<div class="text-15">
		<ColorFadeAndCountUp
			num={reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / reviews.length}
		/>
	</div>
{:catch error}
	{console.error(error)}
	<div class="text-15"><ColorFadeAndCountUp num={5} /></div>
{/await}
<p class="text-10">Stars per Review</p>
