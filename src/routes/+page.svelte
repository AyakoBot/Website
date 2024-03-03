<script lang="ts">
	import Flower from '$lib/components/page/home/Flowers.svelte';
	import RandomLetters from '$lib/components/generic/RandomLetters.svelte';
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import CountUp from '$lib/components/generic/CountUp.svelte';
	import type { Returned as GETStats } from './api/stats/+server.js';
	import type { Returned as GETServers } from './api/servers/+server.js';

	const getStats = async (): Promise<GETStats> => {
		const res = await fetch('/api/stats');
		return res.json();
	};

	const getServers = async (): Promise<GETServers> => {
		const res = await fetch('/api/servers');
		return res.json();
	};

	const stats = getStats();
	const servers = getServers();
</script>

<br class="pt-30" />
<Flower />

<div class="flex flex-col justify-center items-center absolute w-1/2 left-1/4 md:top-3/5 top-1/2">
	<p class="md:text-4xl text-2xl code">
		<RandomLetters text="Powerful Server Management" />
		<br />
		<RandomLetters text="And Moderation Bot" />
	</p>
</div>

<div
	class="z-2 flex flex-col items-center justify-around md:flex-row mt-150 md:mt-160 md:ml-6 ml-0"
>
	<a class="btn-medium op-0 transition-all font-bold" href="https://invite.ayakobot.com" id="invite">
		Invite Ayako
	</a>
	<img
		id="flowerSpin"
		src="https://cdn.ayakobot.com/website_assets/greenFlower.png"
		alt="Flower"
		width="64"
		height="64"
	/>
	<a
		class="btn-loud op-0 opacity-0 transition-all font-bold"
		href="https://invite.ayakobot.com"
		id="support"
	>
		Support Server
	</a>
</div>

<div class="mt-40">
	<p class="text-10">Ayako manages</p>
	{#await stats}
		<p class="text-15"><ColorFadeText><CountUp num={0} /></ColorFadeText></p>
		<p class="text-10">Discord Communities with</p>
		<p class="text-15"><ColorFadeText><CountUp num={0} /></ColorFadeText></p>
	{:then stats}
		<p class="text-15"><ColorFadeText><CountUp num={stats.guildCount} /></ColorFadeText></p>
		<p class="text-10">Discord Communities with</p>
		<p class="text-15"><ColorFadeText><CountUp num={stats.userCount} /></ColorFadeText></p>
	{:catch error}
		{console.error(error)}
		<p class="text-15"><ColorFadeText><CountUp num={0} /></ColorFadeText></p>
		<p class="text-10">Discord Communities with</p>
		<p class="text-15"><ColorFadeText><CountUp num={0} /></ColorFadeText></p>
	{/await}
	<p class="text-10">Members</p>
</div>

<div>
	{#await servers}
		<p>Waiting</p>
	{:then servers}
		<p>Resolved</p>
	{:catch error}
		{console.error(error)}
		<p>Error</p>
	{/await}
</div>

<style scoped>
	#invite {
		animation: 1s ease-in-out 2s invite forwards;
	}

	#support {
		animation: 1s ease-in-out 2s support forwards;
	}

	#flowerSpin {
		animation: flowerSpin 1s ease-in-out 2s;
	}

	@keyframes flowerSpin {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 1080deg;
		}
	}

	@media only screen and (min-width: 768px) {
		@keyframes invite {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
				transform: translateX(-1.5rem);
			}
		}

		@keyframes support {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
				transform: translateX(1.5rem);
			}
		}
	}

	@media only screen and (max-width: 768px) {
		@keyframes invite {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
				transform: translateY(-1.5rem);
			}
		}

		@keyframes support {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
				transform: translateY(1.5rem);
			}
		}
	}
</style>
