<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETReviews } from '../../../../routes/api/reviews/+server.js';

	export let reviews: Promise<GETReviews>;
</script>

<p class="text-10">with an average of</p>
{#await reviews}
	<p class="text-15"><ColorFadeAndCountUp num={5} /></p>
{:then reviews}
	<p class="text-15">
		<ColorFadeAndCountUp
			num={reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / reviews.length}
		/>
	</p>
{:catch error}
	{console.error(error)}
	<p class="text-15"><ColorFadeAndCountUp num={5} /></p>
{/await}
<p class="text-10">Stars per Review</p>
