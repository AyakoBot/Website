<script lang="ts">
	import Flower from '$lib/components/page/home/Flowers.svelte';
	import RandomLetters from '$lib/components/generic/RandomLetters.svelte';
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import CountUp from '$lib/components/generic/CountUp.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
	const fetchServers = () => {
  const servers = await fetch('/servers');
  if (servers.)

		const data = await servers.json();
 }
 
 });
</script>

<br class="pt-30" />
<Flower />

<div class="flex flex-col justify-center items-center">
	<p class="text-4xl code mt-100">
		<RandomLetters text="Powerful Server Management" />
		<br />
		<RandomLetters text="And Moderation Bot" />
	</p>
</div>

<div class="z-2 mt-10 flex flex-col items-center justify-around md:flex-row mt-20">
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

<div>
	<p>Ayako manages</p>
	<ColorFadeText><CountUp num="" /></ColorFadeText>
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
