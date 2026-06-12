<script lang="ts">
	import { page } from '$app/state';
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Cta from '$lib/components/page/home/landing/Cta.svelte';
	import Features from '$lib/components/page/home/landing/Features.svelte';
	import HeroContent from '$lib/components/page/home/landing/HeroContent.svelte';
	import DiscordMockup from '$lib/components/page/home/landing/mockup/DiscordMockup.svelte';
	import Reviews from '$lib/components/page/home/landing/Reviews.svelte';
	import Servers from '$lib/components/page/home/landing/Servers.svelte';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();

	$effect(() => {
		const reload = page.url.searchParams.get('reload');
		if (!reload) return;
		window.location.href = '/';
	});

	const averageRating = $derived(
		data.reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / data.reviews.length,
	);
</script>

<div class="w-full overflow-x-clip">
	<!-- HERO - the title page of the folio -->
	<section
		class="relative grid grid-cols-1 3xl:grid-cols-2 gap-16 3xl:gap-8 items-center px-5 sm:px-10 3xl:px-32 pt-14 pb-24 min-h-[88vh] max-w-[120rem] mx-auto"
	>
		<PetalDrift count={10} />

		<HeroContent
			serverCount={data.stats.guildCount}
			userCount={data.stats.userCount}
			{averageRating}
		/>

		<DiscordMockup />
	</section>

	<Features />

	<Servers guilds={data.guilds} />

	<Reviews reviews={data.reviews} />

	<Cta />
</div>
