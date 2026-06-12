<script lang="ts">
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import TornEdge from '$lib/components/design/TornEdge.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import FeatureIcon from './FeatureIcon.svelte';

	type IconName =
		| 'moderation'
		| 'security'
		| 'leveling'
		| 'roles'
		| 'logging'
		| 'welcome'
		| 'giveaways'
		| 'suggestions'
		| 'economy';

	const features: {
		icon: IconName;
		accent: string;
		title: string;
		description: string;
		note?: string;
	}[] = [
		{
			icon: 'moderation',
			accent: 'var(--moss)',
			title: 'Powerful Moderation',
			description:
				'Ban, kick, mute, warn with a complete strike system. Auto-escalation, appeals workflow, temp-bans, channel bans, and punishment expiry. Everything you need to keep your server safe.',
			note: 'keeps the garden tidy',
		},
		{
			icon: 'security',
			accent: 'var(--petal)',
			title: 'Anti-Spam & Security',
			description:
				'Anti-spam detection, anti-virus link scanning, invite filtering, and word censoring',
		},
		{
			icon: 'leveling',
			accent: 'var(--leaf)',
			title: 'Leveling System',
			description: 'XP with multiple formulas, per-channel/role multipliers, voice XP, and rank cards',
			note: 'watch them grow',
		},
		{
			icon: 'roles',
			accent: 'var(--gold)',
			title: 'Advanced Role Management',
			description:
				'Auto-roles, self-roles, reaction roles, button roles, custom user-created roles, sticky roles that persist across leave/rejoin, and nitro booster rewards.',
		},
		{
			icon: 'logging',
			accent: 'var(--ink-soft)',
			title: 'Comprehensive Logging',
			description: 'Moderation, message, member, role, channel, voice, and server event logs',
			note: 'everything written down',
		},
		{
			icon: 'welcome',
			accent: 'var(--blossom)',
			title: 'Welcome & Verification',
			description: 'Custom welcome messages with images, and configurable member verification',
		},
		{
			icon: 'giveaways',
			accent: 'var(--petal)',
			title: 'Giveaways',
			description: 'Timed giveaways with fair winner selection and reroll support',
		},
		{
			icon: 'suggestions',
			accent: 'var(--gold)',
			title: 'Suggestions',
			description: 'Community feedback with voting system and mod approval workflow',
			note: 'ideas, planted',
		},
		{
			icon: 'economy',
			accent: 'var(--leaf)',
			title: 'Economy & Currency',
			description: 'Server currency, balance tracking, and shop system for roles/items',
		},
	];
</script>

<section id="features" class="relative mt-4 scroll-mt-20">
	<TornEdge fill="var(--paper-warm)" />

	<div class="bg-paper-warm px-5 sm:px-8 pt-16 pb-24 relative">
		<!-- marginalia ornaments bleeding over the edges -->
		<div
			class="absolute -top-8 right-8 lg:right-24 rotate-[18deg] opacity-60 pointer-events-none"
			aria-hidden="true"
		>
			<Sprig size={90} color="var(--leaf-soft)" />
		</div>

		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-14" use:reveal>
				<span class="label-specimen block mb-3">Plate II · Field Guide</span>
				<h2 class="font-display font-semibold text-4xl sm:text-5xl text-ink mb-2">
					Everything you need
				</h2>
				<p class="annotation text-2xl mb-4">all gathered in one place</p>
				<p class="text-lg text-ink-soft max-w-xl mx-auto">
					Strong tools to manage, protect, and grow your Discord community
				</p>
				<div class="flex justify-center mt-6">
					<Flourish width={230} color="var(--ink-faint)" />
				</div>
			</div>

			<div class="columns-1 md:columns-2 lg:columns-3 gap-7">
				{#each features as feature, i (feature.title)}
					<div class="break-inside-avoid mb-7" use:reveal={{ delay: (i % 3) * 0.1 }}>
						<article
							class="group relative card-paper !bg-paper px-6 pt-9 pb-6 transition-[transform,box-shadow] duration-450 ease-[var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg {i %
								3 ===
							0
								? 'rotate-[-1.1deg]'
								: i % 3 === 1
									? 'rotate-[0.9deg]'
									: 'rotate-[-0.4deg]'}"
						>
							<Tape angle={i % 2 === 0 ? -4 : 3} class="-top-2.5 left-1/2 -ml-9" />

							<span class="label-specimen absolute top-3 right-4 opacity-70">
								Fig. {String(i + 1).padStart(2, '0')}
							</span>

							<div class="flex items-center gap-4 mb-3">
								<span
									class="w-14 h-14 shrink-0 rounded-full border-[1.6px] border-current flex items-center justify-center group-hover:[&>svg]:[animation:bloom_0.55s_var(--ease-bloom)]"
									style="color: {feature.accent};"
								>
									<FeatureIcon name={feature.icon} />
								</span>
								<h3 class="font-display font-semibold text-xl text-ink leading-tight">
									{feature.title}
								</h3>
							</div>

							<p class="text-[0.97rem] text-ink-soft leading-relaxed">{feature.description}</p>

							{#if feature.note}
								<p class="annotation text-lg mt-3 rotate-[-1.5deg]">- {feature.note}</p>
							{/if}
						</article>
					</div>
				{/each}
			</div>

			<div class="flex flex-col items-center gap-2 mt-12" use:reveal>
				<p class="annotation text-xl rotate-[-1deg]">and that’s just the start…</p>
				<a href="/features" class="btn-ink">
					See all features
					<span class="i-tabler-arrow-right w-4.5 h-4.5" aria-hidden="true"></span>
				</a>
			</div>
		</div>
	</div>

	<TornEdge fill="var(--paper-warm)" flip />
</section>
