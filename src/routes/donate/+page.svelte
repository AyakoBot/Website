<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import { reveal } from '$lib/scripts/util/reveal';

	const voteSites = [
		{ name: 'Top.GG', url: 'https://top.gg/bot/650691698409734151' },
		{ name: 'Bots.gg', url: 'https://discord.bots.gg/bots/650691698409734151' },
		{ name: 'Discord Bot List', url: 'https://discordbotlist.com/bots/tmh' },
		{ name: 'Wumpus Store', url: 'https://wumpus.store/bot/650691698409734151' },
		{ name: 'Discords.com', url: 'https://discords.com/bots/bot/650691698409734151' },
		{ name: 'Rovelstars', url: 'https://discord.rovelstars.com/bots/650691698409734151' },
		{ name: 'Infinity Bots', url: 'https://infinitybots.gg/bot/650691698409734151' },
		{ name: 'Botlist.me', url: 'https://botlist.me/bots/650691698409734151' },
	];
</script>

<div class="relative w-full overflow-hidden px-5 sm:px-8 pt-16 pb-24">
	<PetalDrift count={7} />

	<div class="relative max-w-4xl mx-auto flex flex-col items-center text-center">
		<header class="flex flex-col items-center" use:reveal>
			<div class="relative rotate-[3deg] mb-6">
				<Tape angle={5} class="-top-2.5 left-1/2 -ml-9" />
				<img src="/emotes/AyakoDevil.webp" alt="Evil Ayako" width="128" loading="lazy" />
			</div>

			<span class="label-specimen block mb-3">Water the Garden</span>
			<h1 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-3">Premium?</h1>
			<p class="text-lg text-ink-soft">No one likes Pay-Walls.<br />Neither do we.</p>

			<div class="mt-6">
				<Flourish width={230} color="var(--ink-faint)" />
			</div>
		</header>

		<section class="flex flex-col items-center mt-12" use:reveal={{ delay: 0.1 }}>
			<h2 class="font-display font-semibold text-3xl text-ink mb-2">Consider donating</h2>
			<p class="text-lg text-ink-soft">and help Ayako stay free forever</p>

			<div class="flex flex-row flex-wrap justify-center gap-4 mt-7">
				<a href="https://www.patreon.com/Lars_und_so" class="btn-petal w-60">Donate on Patreon</a>
				<a href="https://www.paypal.me/AyakoDevelopment" class="btn-ink w-60">Donate on PayPal</a>
			</div>
		</section>

		<!-- a sprig points the way to the seed packets -->
		<div class="mt-14 mb-10 rotate-180 opacity-60 pointer-events-none" aria-hidden="true">
			<Sprig size={64} color="var(--leaf-soft)" />
		</div>

		<section class="w-full flex flex-col items-center" use:reveal={{ delay: 0.1 }}>
			<p class="annotation text-2xl mb-1">Empty pockets but still wanna help?</p>
			<p class="text-lg text-ink-soft">Vote for Ayako on Bot Voting Pages</p>

			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full mt-10">
				{#each voteSites as site, i (site.url)}
					<a
						href={site.url}
						target="_blank"
						rel="noopener noreferrer"
						class="relative card-paper flex flex-col items-center gap-3 px-3 pt-8 pb-5 [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg {i %
							3 ===
						0
							? 'rotate-[-1.4deg]'
							: i % 3 === 1
								? 'rotate-[1.1deg]'
								: 'rotate-[-0.6deg]'}"
					>
						<Tape angle={i % 2 === 0 ? -5 : 4} width={56} class="-top-2 left-1/2 -ml-7" />

						{#if i % 2 === 0}
							<Bloom size={34} color={i === 0 ? 'var(--gold)' : 'var(--petal-soft)'} />
						{:else}
							<Sprig size={36} color="var(--leaf-soft)" />
						{/if}

						<span class="font-mono text-sm text-ink tracking-wide">{site.name}</span>
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>
