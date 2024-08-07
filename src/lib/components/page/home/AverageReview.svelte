<script lang="ts">
	import ColorFadeAndCountUp from '$lib/components/generic/ColorFadeAndCountUp.svelte';
	import type { Returned as GETReviews } from '@ayako/server/src/routes/v1/bot/reviews/+server.js';

	export let reviews: GETReviews;
</script>

<div class="text-15">
	<ColorFadeAndCountUp
		num={reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / reviews.length}
	/>
</div>

<span class="text-10">Stars per Review</span>
