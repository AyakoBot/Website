<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import HeroContent from '$lib/components/page/home/landing/HeroContent.svelte';
	import DiscordMockup from '$lib/components/page/home/landing/mockup/DiscordMockup.svelte';
	import Features from '$lib/components/page/home/landing/Features.svelte';
	import Servers from '$lib/components/page/home/landing/Servers.svelte';
	import Reviews from '$lib/components/page/home/landing/Reviews.svelte';
	import Cta from '$lib/components/page/home/landing/Cta.svelte';

	const { data }: { data: PageServerData } = $props();

	$effect(() => {
		const reload = $page.url.searchParams.get('reload');
		if (!reload) return;
		window.location.href = '/';
	});

	const averageRating = $derived(
		data.reviews.map((r) => r.score / 20).reduce((acc, cur) => acc + cur, 0) / data.reviews.length,
	);
</script>

<div class="w-full overflow-x-hidden">
	<!-- HERO SECTION -->
	<section
		class="min-h-100vh grid grid-cols-1 3xl:grid-cols-2 gap-16 3xl:gap-4 items-center px-8 3xl:px-40 py-24 relative overflow-hidden"
	>
		<div
			class="hero-glow [animation:pulse-glow_10s_ease-in-out_infinite] absolute w-200 h-200 top--50 left--50 pointer-events-none bg-[radial-gradient(circle,rgba(176,255,0,0.15)_0%,transparent_70%)]"
		></div>
		<div
			class="hero-glow-2 [animation:pulse-glow_10s_ease-in-out_infinite_reverse] absolute w-150 h-150 bottom--25 right--25 pointer-events-none bg-[radial-gradient(circle,rgba(254,53,33,0.1)_0%,transparent_70%)]"
		></div>

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

<style>
	@keyframes pulse-glow {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.8;
		}
	}
</style>
