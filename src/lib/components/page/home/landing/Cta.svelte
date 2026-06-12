<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import { trackInviteClick } from '$lib/scripts/tracking';
	import { reveal } from '$lib/scripts/util/reveal';
</script>

<section class="relative overflow-hidden py-28 sm:py-36 px-5 text-center">
	<PetalDrift count={6} />

	<!-- a great pressed bloom behind the closing words -->
	<div
		class="absolute inset-0 flex items-center justify-center opacity-18 pointer-events-none"
		aria-hidden="true"
	>
		<div class="[animation:sway_14s_ease-in-out_infinite]" style="transform-origin: 50% 100%;">
			<Bloom size={460} color="var(--petal-soft)" />
		</div>
	</div>

	<div class="relative z-1 max-w-2xl mx-auto" use:reveal>
		<span class="label-specimen block mb-4">One Last Thing</span>

		<h2 class="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-ink mb-5">
			Ready to watch your server <span class="italic text-petal">bloom</span>?
		</h2>

		<p class="text-lg text-ink-soft leading-relaxed max-w-xl mx-auto mb-10">
			Join thousands of communities using Ayako. Free forever, no credit card required.
		</p>

		<div class="flex items-center justify-center gap-4 sm:gap-8">
			<!-- sprigs lean in toward the button -->
			<span
				class="hidden sm:block rotate-[28deg] translate-y-2 pointer-events-none"
				aria-hidden="true"
			>
				<Sprig size={64} color="var(--leaf-soft)" />
			</span>

			<a
				href="https://invite.ayakobot.com"
				target="_blank"
				onclick={trackInviteClick}
				class="btn-petal text-lg"
			>
				<span class="i-tabler-seeding w-5 h-5" aria-hidden="true"></span>
				Add Ayako to Discord
			</a>

			<span
				class="hidden sm:block -rotate-[28deg] translate-y-2 pointer-events-none"
				aria-hidden="true"
			>
				<Sprig size={64} color="var(--leaf-soft)" />
			</span>
		</div>
	</div>
</section>
