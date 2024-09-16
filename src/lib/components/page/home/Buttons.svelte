<a
	class="btn-medium op-0 font-bold w-full sm:w-40% md:w-30% px-0 animate-[1s_ease-in-out_2s_invite_forwards]"
	href="https://invite.ayakobot.com"
>
	Invite Ayako
</a>
<img
	class="animate-[flowerSpin_1s_ease-in-out_2s]"
	src="/images/GreenFlower.webp"
	alt="Flower"
	width="64"
	height="64"
	loading="eager"
/>
<a
	class="btn-loud op-0 opacity-0 font-bold w-full sm:w-40% md:w-30% px-0 animate-[1s_ease-in-out_2s_support_forwards]"
	href="https://invite.ayakobot.com"
	id="support"
>
	Support Server
</a>

<style scoped>
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
