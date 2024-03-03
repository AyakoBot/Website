<script lang="ts">
	import Flower from '$lib/components/page/home/Flowers.svelte';
	import RandomLetters from '$lib/components/generic/RandomLetters.svelte';
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import CountUp from '$lib/components/generic/CountUp.svelte';
	import type { Returned as GETStats } from './api/stats/+server.js';

	const getServers = async (): Promise<GETStats> => {
		const res = await fetch('/api/stats');
  console.log(res.ok);
		return res.json();
	};

	const stats = getServers();
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

<div class="mt-20">
	<p>Ayako manages</p>
	{#await stats}
		<ColorFadeText><CountUp num={0} /></ColorFadeText>
		<p>Discord Communities with</p>
		<ColorFadeText><CountUp num={0} /></ColorFadeText>
	{:then stats}
		{console.log(stats)}
		<ColorFadeText><CountUp num={stats.guildCount} /></ColorFadeText>
		<p>Discord Communities with</p>
		<ColorFadeText><CountUp num={stats.userCount} /></ColorFadeText>
	{:catch error}
		{console.error(error)}
		<ColorFadeText><CountUp num={0} /></ColorFadeText>
		<p>Discord Communities with</p>
		<ColorFadeText><CountUp num={0} /></ColorFadeText>
	{/await}

	<p>Members</p>
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
