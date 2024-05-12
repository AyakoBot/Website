<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETReviews } from '@ayako/server/src/routes/reviews/+server.js';

	export let reviews: GETReviews;
</script>

<div class="text-15">
	<ColorFadeAndCountUp
		num={reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / reviews.length}
	/>
</div>

<p class="text-10">Stars per Review</p>
