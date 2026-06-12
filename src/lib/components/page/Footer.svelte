<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import TornEdge from '$lib/components/design/TornEdge.svelte';
</script>

<footer class="relative z-2 mt-20">
	<!-- the hedge line: torn paper into deep green -->
	<div class="relative">
		<TornEdge fill="var(--plate)" height={48} />
	</div>

	<div class="bg-plate text-paper">
		<div class="max-w-6xl mx-auto px-6 pt-10 pb-8">
			<div class="flex flex-row flex-wrap justify-between items-start gap-x-12 gap-y-10">
				<a href="/" class="flex flex-row items-center gap-4 group">
					<img
						src="/images/Icon.webp"
						alt="Ayako's Icon"
						width="72"
						height="72"
						class="rounded-full border-2 border-plate-line transition-transform duration-500 group-hover:rotate-12"
						loading="lazy"
					/>
					<span class="flex flex-col items-start">
						<span class="font-display font-semibold text-3xl">Ayako</span>
						<span class="font-mono text-xs tracking-[0.14em] text-leaf-soft">ayakobot.com</span>
					</span>
				</a>

				<div class="flex flex-row flex-wrap gap-x-16 gap-y-8">
					<div class="flex flex-col items-start gap-2">
						<span class="label-specimen !text-leaf-soft mb-1">Help</span>
						<a
							class="link-garden"
							href="https://support.ayakobot.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							Support
						</a>
						<a class="link-garden text-gold" href="/donate">Premium</a>
						<a
							class="link-garden"
							href="https://top.gg/bot/650691698409734151/vote"
							target="_blank"
							rel="noopener noreferrer"
						>
							Vote
						</a>
						<a class="link-garden" href="/donate">Donate</a>
					</div>

					<div class="flex flex-col items-start gap-2">
						<span class="label-specimen !text-leaf-soft mb-1">Explore</span>
						<a class="link-garden" href="/features">Features</a>
						<a class="link-garden" href="https://animekos.com" target="_blank" rel="noopener noreferrer">
							Animekos
						</a>
						<a class="link-garden" href="/credits">Creators</a>
						<a class="link-garden" href="/terms">Terms</a>
						<a class="link-garden" href="/privacy">Privacy</a>
					</div>
				</div>
			</div>

			<!-- garden row -->
			<div
				class="flex flex-row items-end justify-center gap-6 mt-10 opacity-50 pointer-events-none"
				aria-hidden="true"
			>
				<Sprig size={44} color="var(--plate-line)" />
				<Bloom size={34} color="var(--plate-line)" />
				<Sprig size={56} color="var(--plate-line)" />
				<Bloom size={28} color="var(--plate-line)" />
				<Sprig size={40} color="var(--plate-line)" />
			</div>

			<div class="flex flex-col items-center gap-1 mt-8 pt-6 border-t border-plate-line/50">
				<span class="text-sm text-leaf-soft">Copyright © {new Date().getFullYear()} Ayako</span>
				<span class="annotation !text-leaf-soft text-lg">made with care</span>
			</div>
		</div>
	</div>
</footer>
