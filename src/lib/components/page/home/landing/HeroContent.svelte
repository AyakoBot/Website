<script lang="ts">
	import { trackInviteClick } from '$lib/scripts/tracking';

	const {
		serverCount,
		userCount,
		averageRating
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

	const animateCountUp = (
		targetValue: number,
		setter: (val: number) => void,
		isDecimal = false
	) => {
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

		let intervals: NodeJS.Timeout[] = [];

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					intervals.push(
						animateCountUp(serverCount, (v) => (currentServerCount = v)),
						animateCountUp(userCount, (v) => (currentUserCount = v)),
						animateCountUp(averageRating, (v) => (currentRating = v), true)
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

<div class="relative z-1 text-center 3xl:text-left">
	<div class="inline-flex items-center gap-2 bg-[rgba(176,255,0,0.1)] border border-[rgba(176,255,0,0.3)] px-4 py-2 rounded-full text-sm text-[#b0ff00] mb-6">
		<span class="badge-dot w-2 h-2 bg-[#b0ff00] rounded-full"></span>
		Trusted by {formatNumber(serverCount)}+ servers
	</div>

	<h1 class="text-12 lg:text-20 font-800 leading-tight mb-6">
		<span class="title-gradient bg-gradient-to-r from-[#b0ff00] via-[#3dff56] to-[#b0ff00] bg-clip-text text-transparent bg-[length:200%_auto]">Ayako</span>
		<span class="block text-white text-6 lg:text-10 font-600 op-90">Discord Bot</span>
	</h1>

	<p class="text-5 text-white/70 leading-relaxed max-w-125 mb-10 mx-auto 3xl:mx-0">
		Enterprise-grade Discord bot with powerful moderation, anti-spam protection, leveling,
		advanced role management, and 34+ commands. Free forever.
	</p>

	<div class="flex flex-wrap gap-4 mb-12 justify-center 3xl:justify-start">
		<a href="https://invite.ayakobot.com" target="_blank" onclick={trackInviteClick} class="inline-flex items-center gap-2 bg-gradient-to-r from-[#b0ff00] to-[#7acc00] text-black font-700 px-8 py-4 rounded-xl text-4 transition-all shadow-[0_4px_20px_rgba(176,255,0,0.3)] hover:translate-y--0.5 hover:shadow-[0_6px_30px_rgba(176,255,0,0.4)]">
			<span class="i-tabler-plus text-xl"></span>
			Add to Discord
		</a>
		<a href="https://discord.gg/euTdctganf" target="_blank" class="inline-flex items-center gap-2 bg-white/5 border border-white/20 text-white font-600 px-8 py-4 rounded-xl text-4 transition-all hover:bg-white/10 hover:border-white/30">
			<span class="i-tabler-message-circle text-xl"></span>
			Join Community
		</a>
	</div>

	<div class="flex items-center gap-8 justify-center 3xl:justify-start" bind:this={statsElement}>
		<div class="flex flex-col">
			<span class="text-8 font-800 text-white">{formatNumber(currentServerCount)}</span>
			<span class="text-sm text-white/50 uppercase tracking-wide">Servers</span>
		</div>
		<div class="w-px h-10 bg-white/20"></div>
		<div class="flex flex-col">
			<span class="text-8 font-800 text-white">{formatNumber(currentUserCount)}</span>
			<span class="text-sm text-white/50 uppercase tracking-wide">Users</span>
		</div>
		<div class="w-px h-10 bg-white/20"></div>
		<div class="flex flex-col">
			<span class="text-8 font-800 text-white">{currentRating.toFixed(1)}</span>
			<span class="text-sm text-white/50 uppercase tracking-wide">Rating</span>
		</div>
	</div>
</div>

<style>
	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}
	.badge-dot { animation: blink 2s ease-in-out infinite; }

	.title-gradient {
		animation: gradient-shift 3s ease-in-out infinite;
	}
	@keyframes gradient-shift {
		0%, 100% { background-position: 0% center; }
		50% { background-position: 100% center; }
	}
</style>
