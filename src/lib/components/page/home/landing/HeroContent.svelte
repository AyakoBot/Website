<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import { trackInviteClick } from '$lib/scripts/tracking';

	const {
		serverCount,
		userCount,
		averageRating,
	}: {
		serverCount: number;
		userCount: number;
		averageRating: number;
	} = $props();

	// Animated counters
	let currentServerCount = $state(0);
	let currentUserCount = $state(0);
	let currentRating = $state(0);
	let statsElement: HTMLDivElement;

	const easeOutQuad = (t: number) => t * (2 - t);

	const animateCountUp = (targetValue: number, setter: (val: number) => void, isDecimal = false) => {
		const frameDuration = 1000 / 60;
		const animationDuration = 3000;
		const totalFrames = Math.round(animationDuration / frameDuration);
		let frame = 0;

		const interval = setInterval(() => {
			frame += 1;
			const progress = easeOutQuad(frame / totalFrames);
			const countNow = isDecimal
				? Math.round(targetValue * progress * 10) / 10
				: Math.round(targetValue * progress);

			setter(countNow);
			if (frame === totalFrames) clearInterval(interval);
		}, frameDuration);

		return interval;
	};

	$effect(() => {
		if (!statsElement) return;

		let intervals: ReturnType<typeof setInterval>[] = [];

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					intervals.push(
						animateCountUp(serverCount, (v) => (currentServerCount = v)),
						animateCountUp(userCount, (v) => (currentUserCount = v)),
						animateCountUp(averageRating, (v) => (currentRating = v), true),
					);
				} else {
					intervals.forEach((i) => clearInterval(i));
					intervals = [];
					currentServerCount = 0;
					currentUserCount = 0;
					currentRating = 0;
				}
			});
		});

		observer.observe(statsElement);

		return () => {
			observer.disconnect();
			intervals.forEach((i) => clearInterval(i));
		};
	});

	function formatNumber(num: number): string {
		if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
		if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
		return num.toString();
	}
</script>

<div class="relative z-1 text-center 3xl:text-left max-w-2xl mx-auto 3xl:mx-0 pt-10">
	<!-- engraved bloom pressed behind the title -->
	<div
		class="absolute -top-8 -left-6 sm:-left-16 opacity-35 pointer-events-none [animation:sway_10s_ease-in-out_infinite]"
		style="transform-origin: 50% 100%;"
		aria-hidden="true"
	>
		<Bloom size={290} color="var(--petal-soft)" />
	</div>

	<span class="label-specimen block mb-5 [animation:fade-up_0.7s_var(--ease-organic)_both]">
		Herbarium Ayako · Plate I
	</span>

	<!-- inspection stamp -->
	<div
		class="inline-block border-2 border-leaf text-leaf rounded-full px-5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] rotate-[-3deg] mb-6 shadow-[inset_0_0_0_1px_var(--paper),0_0_0_1px_var(--leaf)] bg-[radial-gradient(ellipse_at_30%_110%,rgba(93,122,72,0.08),transparent_60%)] [animation:fade-up_0.7s_var(--ease-organic)_0.08s_both]"
	>
		Trusted by {formatNumber(serverCount)}+ servers
	</div>

	<div class="relative">
		<span
			class="annotation absolute -top-6 right-2 3xl:-right-10 rotate-[-5deg] text-xl sm:text-2xl [animation:fade-up_0.7s_var(--ease-organic)_0.5s_both]"
		>
			彩子 - "the flower child"
		</span>
		<h1
			class="font-display font-semibold text-[4.25rem] sm:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] text-ink [animation:fade-up_0.7s_var(--ease-organic)_0.16s_both]"
		>
			Ayako
		</h1>
	</div>

	<p
		class="font-display italic text-2xl lg:text-3xl text-ink-soft mt-3 [animation:fade-up_0.7s_var(--ease-organic)_0.24s_both]"
	>
		the Discord bot that looks after your server
	</p>

	<p
		class="text-lg text-ink-soft leading-relaxed max-w-xl mx-auto 3xl:mx-0 mt-6 [animation:fade-up_0.7s_var(--ease-organic)_0.32s_both]"
	>
		Strong moderation, anti-spam protection, leveling, role management, and 34+ commands - made with
		care. Free forever.
	</p>

	<div
		class="flex flex-wrap gap-4 justify-center 3xl:justify-start mt-9 [animation:fade-up_0.7s_var(--ease-organic)_0.4s_both]"
	>
		<a
			href="https://invite.ayakobot.com"
			target="_blank"
			onclick={trackInviteClick}
			class="btn-petal text-lg"
		>
			<span class="i-tabler-seeding w-5 h-5" aria-hidden="true"></span>
			Add to Discord
		</a>
		<a href="https://discord.gg/euTdctganf" target="_blank" class="btn-ink text-lg">
			<span class="i-tabler-message-circle w-5 h-5" aria-hidden="true"></span>
			Join Community
		</a>
	</div>

	<!-- specimen data -->
	<div
		class="flex items-center gap-6 sm:gap-9 justify-center 3xl:justify-start mt-12 [animation:fade-up_0.7s_var(--ease-organic)_0.48s_both]"
		bind:this={statsElement}
	>
		<div class="flex flex-col items-center 3xl:items-start">
			<span class="font-mono text-3xl sm:text-4xl text-ink">{formatNumber(currentServerCount)}</span>
			<span class="label-specimen mt-1">Servers</span>
		</div>

		<div
			class="w-px h-[2.6rem] bg-gradient-to-b from-transparent via-ink-faint to-transparent"
			aria-hidden="true"
		></div>

		<div class="flex flex-col items-center 3xl:items-start">
			<span class="font-mono text-3xl sm:text-4xl text-ink">{formatNumber(currentUserCount)}</span>
			<span class="label-specimen mt-1">Users</span>
		</div>

		<div
			class="w-px h-[2.6rem] bg-gradient-to-b from-transparent via-ink-faint to-transparent"
			aria-hidden="true"
		></div>

		<div class="flex flex-col items-center 3xl:items-start">
			<span class="font-mono text-3xl sm:text-4xl text-ink flex items-center gap-2">
				{currentRating.toFixed(1)}
				<Bloom size={20} color="var(--gold)" />
			</span>
			<span class="label-specimen mt-1">Rating</span>
		</div>
	</div>
</div>
