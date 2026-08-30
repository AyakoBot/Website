<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { bots } from '$lib/scripts/bots';

	/**
	 * The embeddable ad panel for the flagship bot.
	 *
	 * This is not a page. It is a fixed 640px-tall advertisement rendered inside a
	 * cross-origin iframe on bot listing sites, under a forced
	 * `sandbox="allow-scripts"`, i.e. an opaque origin. Three consequences shape
	 * everything below:
	 *
	 *  1. NO CALL TO ACTION. `target="_blank"` and `window.open` fail silently
	 *     without `allow-popups`, and a target-less anchor would navigate the frame
	 *     itself - landing Discord's OAuth flow inside a 640px cookie-less box. The
	 *     real link lives outside the frame, in the host's description. So no
	 *     invite anchor here, and no `trackInviteClick`.
	 *  2. NO `use:reveal`, NO count-up. Both are IntersectionObserver-driven and
	 *     never fire in a short frame that cannot scroll, which would leave content
	 *     invisible - or a counter stuck at 0 - forever. Entrances are CSS
	 *     keyframes whose *base* state is already visible (see `.rise` below).
	 *  3. NOTHING MAY SCROLL. Everything is budgeted to fit 640px at every column
	 *     width between 360px and 896px. The tightest case is ~601px, where the
	 *     two-column split fires and the text column is momentarily at its
	 *     narrowest - so the type scale must not step up before 640px.
	 *
	 * Every claim traces to the strategy dossier's code evidence. No live server or
	 * user counts: this route has no server load, and a hardcoded number would rot.
	 */

	const bullets = [
		{
			icon: 'moderation',
			name: 'Warnings that get stronger.',
			desc: 'Each new warning brings a stronger punishment. You set the steps.',
		},
		{
			icon: 'security',
			name: 'Raid protection.',
			desc: 'When many accounts join at once, the bot pauses invites.',
		},
		{
			icon: 'logging',
			name: 'Each log gets its own channel.',
			desc: 'The mod log, message log and settings log never mix.',
		},
	] as const;

	const chips = [
		{ value: '30+', label: 'commands' },
		{ value: '18', label: 'log categories' },
		{ value: '40+', label: 'setting categories' },
	];
</script>

<svelte:head>
	<title>{bots.ayako.name} - Everything your server needs. None of it paid.</title>
	<!-- The panel duplicates the marketing page's copy; it must not compete with it. -->
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="panel relative w-full h-full overflow-hidden">
	<div class="ambience absolute inset-0 pointer-events-none" aria-hidden="true">
		<PetalDrift count={5} />
	</div>

	<div class="panel-grid relative z-1 h-full px-6 py-6 sm:px-8">
		<!-- ① … ⑦ the layer-cake stack: eyebrow, headline, subhead, bullets, chips, trust, sprig -->
		<div class="relative flex flex-col justify-center min-w-0">
			<div class="rise flex items-center gap-3 mb-3">
				<Bloom size={40} color="var(--panel-accent)" />
				<span class="label-specimen eyebrow">Plate I · The Whole Garden</span>
			</div>

			<h1
				class="headline font-display font-semibold text-[1.75rem] sm:text-[2.15rem] leading-[1.06] mb-3 rise"
			>
				Everything your server needs.
				<span class="accent italic">None of it paid.</span>
			</h1>

			<p class="lede font-body text-[0.9375rem] sm:text-base leading-[1.5] mb-4 rise rise-1">
				Moderation, anti-raid, leveling, roles, tickets, giveaways and logging in one bot. No premium
				tier, no credit card.
			</p>

			<ul class="flex flex-col gap-2.5 list-none m-0 p-0 mb-4 rise rise-2">
				{#each bullets as bullet (bullet.name)}
					<li class="flex items-start gap-2.5">
						<span class="ornament shrink-0 mt-0.5">
							<FeatureIcon name={bullet.icon} size={19} />
						</span>
						<p class="lede text-[0.8125rem] sm:text-[0.875rem] leading-[1.45]">
							<strong class="headline font-display font-semibold">{bullet.name}</strong>
							{bullet.desc}
						</p>
					</li>
				{/each}
			</ul>

			<div class="grid grid-cols-3 gap-x-3 mb-3 rise rise-3">
				{#each chips as chip (chip.label)}
					<div class="chip pt-1.5">
						<span class="headline block font-mono text-[0.9375rem] leading-none">{chip.value}</span>
						<span
							class="lede block font-mono text-[0.625rem] uppercase tracking-[0.12em] leading-[1.3] mt-1"
						>
							{chip.label}
						</span>
					</div>
				{/each}
			</div>

			<p class="lede font-mono text-[0.75rem] rise rise-3">Free forever. All features included.</p>

			<!--
				Directional cue: the sprig curves down and out of the panel, aiming at
				the host's link below the frame. Absolutely positioned so it costs the
				vertical budget nothing, and clipped by the panel's overflow-hidden.
			-->
			<span class="sprig absolute right-0 -bottom-7 pointer-events-none" aria-hidden="true">
				<Sprig size={68} color="var(--panel-ornament)" class="rotate-[168deg]" />
			</span>
		</div>

		<!--
			The taped-in photograph. Hidden below 600px, where the stack owns the
			whole panel. `aria-hidden` because it is a decorative reproduction of a
			Discord channel - every claim it illustrates is already in the bullets.
		-->
		<div class="plate-col relative min-w-0">
			<figure
				class="photo relative m-0 w-full max-w-[330px] rotate-[-2deg] border-8 border-solid shadow-press-lg rise rise-2"
				aria-hidden="true"
			>
				<Tape angle={-7} width={72} class="-top-4 left-3" />
				<Tape angle={5} width={72} class="-top-4 right-3" />

				<div class="bg-[#313338] rounded-[3px] overflow-hidden text-left">
					<div class="flex items-center gap-1.5 h-7 px-2.5 bg-[#1e1f22]">
						<span class="i-tabler-hash w-3 h-3 text-white/40"></span>
						<span class="text-[0.6875rem] text-white/60">mod-log</span>
					</div>

					<div class="flex flex-col gap-2.5 p-2.5">
						<div class="flex gap-2">
							<img src="/images/Icon.webp" alt="" class="w-7 h-7 rounded-full shrink-0" />
							<div class="flex-1 min-w-0">
								<div class="flex items-baseline gap-1.5">
									<span class="text-[0.75rem] font-600 text-[#b0ff00]">Ayako</span>
									<span
										class="inline-flex items-center bg-[#5865f2] text-white text-[0.5rem] font-500 px-1 rounded-sm"
									>
										APP
									</span>
									<span class="text-[0.5625rem] text-white/25">Today at 2:34 PM</span>
								</div>
								<div class="flex mt-1.5 bg-[#2b2d31] rounded overflow-hidden">
									<div class="w-1 shrink-0 bg-[#ed4245]"></div>
									<div class="flex flex-col gap-1 px-2.5 py-2">
										<span class="text-[0.75rem] font-700 text-white">User Banned</span>
										<span class="text-[0.6875rem] text-white/75 leading-snug">
											User <span class="mention">@spammer</span> / 123456789012345<br />was Banned by<br />Bot
											<span class="mention">@Ayako</span>
										</span>
										<span class="text-[0.6875rem] font-700 text-white mt-1">Reason</span>
										<span class="text-[0.6875rem] text-white/75">Suspected Spammer</span>
									</div>
								</div>
							</div>
						</div>

						<div class="flex gap-2">
							<img src="/images/Icon.webp" alt="" class="w-7 h-7 rounded-full shrink-0" />
							<div class="flex-1 min-w-0">
								<div class="flex items-baseline gap-1.5">
									<span class="text-[0.75rem] font-600 text-[#b0ff00]">Ayako</span>
									<span
										class="inline-flex items-center bg-[#5865f2] text-white text-[0.5rem] font-500 px-1 rounded-sm"
									>
										APP
									</span>
									<span class="text-[0.5625rem] text-white/25">Today at 2:36 PM</span>
								</div>
								<div class="flex mt-1.5 bg-[#2b2d31] rounded overflow-hidden">
									<div class="w-1 shrink-0 bg-[#f0b232]"></div>
									<div class="flex flex-col gap-1 px-2.5 py-2">
										<span class="text-[0.75rem] font-700 text-white">Message Updated</span>
										<span class="text-[0.6875rem] text-white/75 leading-snug">
											This Message<br />was updated by<br />User <span class="mention">@Alex</span>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</figure>
		</div>
	</div>
</div>

<style>
	/*
	 * Theme. Light is the folio's paper plate; dark is the folio's own inverted
	 * plate - `plate` ground, `paper` text, `leaf-soft` ornaments, `petal-soft`
	 * accents (petal on plate is under-contrast). Zero new tokens.
	 *
	 * These are custom properties rather than Uno colour utilities on purpose:
	 * @unocss/svelte-scoped hashes utility class names in production, so a
	 * `<style>` block can never target one. Custom properties inherit through the
	 * component boundary into Bloom/Sprig, which take a colour string as a prop.
	 */
	.panel {
		--panel-fg: var(--ink);
		--panel-soft: var(--ink-soft);
		--panel-ground: var(--paper);
		--panel-card: var(--paper-warm);
		--panel-rule: rgba(44, 38, 24, 0.18);
		--panel-accent: var(--petal);
		--panel-ornament: var(--leaf);

		background: var(--panel-ground);
		color: var(--panel-fg);
	}

	@media (prefers-color-scheme: dark) {
		.panel {
			--panel-fg: var(--paper);
			--panel-soft: var(--leaf-soft);
			--panel-ground: var(--plate);
			--panel-card: var(--plate-soft);
			--panel-rule: var(--plate-line);
			--panel-accent: var(--petal-soft);
			--panel-ornament: var(--leaf-soft);
		}
	}

	.headline {
		color: var(--panel-fg);
	}

	.eyebrow,
	.lede {
		color: var(--panel-soft);
	}

	.accent {
		color: var(--panel-accent);
	}

	.ornament {
		color: var(--panel-ornament);
	}

	.chip {
		border-top: 1px solid var(--panel-rule);
	}

	.photo {
		background: var(--panel-card);
		border-color: var(--panel-card);
		outline: 1px solid var(--panel-rule);
	}

	/*
	 * Two columns from 600px, text ~58% / plate ~42%. Written here rather than
	 * with Uno breakpoints because 600px is not one of them, and because the
	 * column width is non-monotonic in viewport width: at 601px the text column is
	 * NARROWER than it is at 360px. Hence no type step between 600 and 640.
	 */
	.panel-grid {
		display: grid;
		grid-template-columns: 1fr;
	}

	.plate-col {
		display: none;
	}

	@media (min-width: 600px) {
		.panel-grid {
			grid-template-columns: 58fr 42fr;
			gap: 1.25rem;
		}

		.plate-col {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	/*
	 * Entrances. The base state is VISIBLE - the animation only adds the motion -
	 * so a panel whose animations never run still renders complete. `backwards`
	 * holds the hidden frame during the delay; it is deliberately overridden below
	 * rather than left to the global reduced-motion kill-switch, which zeroes
	 * animation *duration* but not animation *delay*.
	 */
	.rise {
		animation: fade-up 0.6s var(--ease-organic) backwards;
	}

	.rise-1 {
		animation-delay: 0.08s;
	}

	.rise-2 {
		animation-delay: 0.16s;
	}

	.rise-3 {
		animation-delay: 0.24s;
	}

	.sprig {
		transform-origin: 50% 0%;
		animation: sway 9s ease-in-out infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.rise,
		.sprig {
			animation: none;
		}

		/* `drift`'s base state is opaque at the top edge; the global kill-switch
		   would freeze five petals there instead of hiding them. */
		.ambience {
			display: none;
		}
	}
</style>
