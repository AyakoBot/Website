<a
	class="btn-medium op-0 font-bold w-full sm:w-40% md:w-30% px-0"
	href="https://invite.ayakobot.com"
	id="invite"
>
	Invite Ayako
</a>
<img
	id="flowerSpin"
	src="/images/GreenFlower.webp"
	alt="Flower"
	width="64"
	height="64"
	loading="eager"
/>
<a
	class="btn-loud op-0 opacity-0 font-bold w-full sm:w-40% md:w-30% px-0"
	href="https://invite.ayakobot.com"
	id="support"
>
	Support Server
</a>

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
