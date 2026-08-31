<script lang="ts">
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { bots } from '$lib/scripts/bots';

	/**
	 * PLATE II - the embeddable advertisement panel for Ayako | Ticketing.
	 *
	 * This is not a page. It is a fixed 640px-tall unit rendered inside a
	 * cross-origin iframe on third-party bot lists, which force
	 * `sandbox="allow-scripts"`. Consequences that shape everything below:
	 *
	 * - Opaque origin: no cookies, no storage, no credentialed fetch.
	 * - `target="_blank"` and `window.open` fail silently, and a target-less
	 *   anchor would navigate the frame itself. So the panel carries NO
	 *   call-to-action at all - it is pure persuasion, and the real invite link
	 *   lives outside the frame, in the host's description. `trackInviteClick`
	 *   is deliberately not imported here; it is the one route exempt from it.
	 * - No `use:reveal` and no count-up: both are IntersectionObserver-driven
	 *   and never fire in a short non-scrolling frame, which would leave the
	 *   panel permanently blank. Motion is CSS keyframes with staggered
	 *   `animation-delay`, and the base state is visible, so a failed animation
	 *   still shows a complete panel.
	 * - Nothing may scroll: /embed/+layout.svelte pins `overflow: hidden`, so
	 *   anything past 640px is unreachable forever. See the height budget in the
	 *   scoped <style> block.
	 *
	 * Every claim traces to the strategy dossier's verified code evidence, and
	 * obeys its ticketing copy prohibitions - no setup-speed claim, no "complete
	 * transcripts", no auto-close-after-N-hours, no priorities, no CSAT/SLA.
	 */

	const bullets: { icon: 'relay' | 'leveling' | 'security'; name: string; qualifier: string }[] = [
		{
			icon: 'relay',
			name: 'A two-way DM chat.',
			qualifier: 'A prefix on each reply decides who sees it.',
		},
		{
			icon: 'leveling',
			name: 'Support levels.',
			qualifier: 'Move a ticket up to senior staff.',
		},
		{
			icon: 'security',
			name: '13 permissions.',
			qualifier: 'None of them is for moderation.',
		},
	];

	/*
	 * Deliberately no "4 ticket shapes" figure. BaseTicket.createDbEntry throws
	 * create_SettingsChannelNotFound when TicketSetting.channel is null, and nothing
	 * writes that column today - so the two channel-backed shapes are unreachable on
	 * a fresh setup. Restore the figure once that guard is fixed.
	 */
	const chips = [
		{ figure: '8', label: 'Actions saved' },
		{ figure: '47', label: 'Settings' },
		{ figure: '10', label: 'Logged events' },
	];
</script>

<svelte:head>
	<title>{bots.ticketing.name}: Support that arrives in their DMs.</title>
	<!-- The panel restates the marketing page's copy; it must never outrank it. -->
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="panel relative h-100lvh w-full overflow-hidden">
	<PetalDrift count={5} />

	<div class="grid-panel relative z-1 h-full px-5 py-6 sm:px-7 sm:py-7">
		<!-- ── left column: the layer cake ─────────────────────────────── -->
		<!--
			Three flow groups, `justify-between`. Below 600px the copy nearly fills
			the column, so the distribution is a no-op; on a wide frame it spends the
			slack on the gaps between blocks rather than leaving a dead band at the
			bottom - the layer cake stays in its order either way. `sm:pb-12` shrinks
			the pool being distributed, so the gaps stay in proportion.
		-->
		<div class="relative flex flex-col justify-between h-full min-w-0 sm:pb-12">
			<div>
				<span class="rise label-specimen muted block">Plate II · The Support Desk</span>

				<h1
					class="rise font-display font-semibold text-[clamp(1.75rem,4.4vw,2.5rem)] leading-[1.08] mt-2"
				>
					Support that arrives in their DMs.
				</h1>

				<p
					class="rise muted text-[clamp(0.95rem,1.9vw,1.15rem)] leading-[1.45] mt-3"
					style="animation-delay: 0.08s;"
				>
					Members message the bot. Staff answer from your server.
				</p>
			</div>

			<ul class="rise list-none flex flex-col gap-2.5 m-0 p-0 mt-5" style="animation-delay: 0.16s;">
				{#each bullets as bullet (bullet.name)}
					<li class="flex items-start gap-2.5">
						<span class="accent shrink-0 mt-[1px]" aria-hidden="true">
							<FeatureIcon name={bullet.icon} size={20} />
						</span>
						<p class="text-[0.92rem] sm:text-[1rem] leading-[1.4] m-0">
							<strong class="font-semibold">{bullet.name}</strong>
							<span class="muted"> {bullet.qualifier}</span>
						</p>
					</li>
				{/each}
			</ul>

			<div class="rise mt-5" style="animation-delay: 0.24s;">
				<div class="flex flex-wrap gap-x-5 gap-y-2">
					{#each chips as chip (chip.label)}
						<div class="hair-top pt-1.5">
							<span class="font-mono text-[1.05rem] sm:text-[1.25rem] leading-none">
								{chip.figure}
							</span>
							<span class="label-specimen muted block mt-1">{chip.label}</span>
						</div>
					{/each}
				</div>

				<p class="font-mono text-[0.8rem] sm:text-[0.9rem] leading-none mt-4">
					Free. You get everything.
				</p>
			</div>

			<!--
				Directional cue: a sprig curving down and out of the frame, aimed at
				the host's invite link sitting immediately below the iframe. Absolute,
				so it costs the flow budget nothing and clips instead of pushing.
			-->
			<span class="absolute right-2 bottom-[-38px] opacity-75 pointer-events-none" aria-hidden="true">
				<span class="block [animation:sway_11s_ease-in-out_infinite]">
					<Sprig size={64} color="var(--orn)" class="rotate-[168deg]" />
				</span>
			</span>
		</div>

		<!-- ── right column: the taped-in photograph (hidden below 600px) ── -->
		<div class="plate-col self-center relative min-w-0 pt-4">
			<div class="rise" style="animation-delay: 0.12s;">
				<figure class="relative rotate-[-2deg] m-0">
					<Tape angle={-8} width={62} class="-top-3 left-4" />
					<Tape angle={7} width={62} class="-top-3 right-4" />

					<!--
						A real capture, mounted like a photograph. The mount is folio, the photo keeps
						Discord's own dark look in both themes, per DESIGN.md. Only one fits the 640px
						frame; the staff side of this same ticket runs on /bots/ticketing.
					-->
					<div class="bg-paper p-2 shadow-press-lg [outline:1px_solid_rgba(44,38,24,0.2)]">
						<img
							src="/images/ads/ticket-dm.webp"
							alt="A member's direct messages with the bot: they report a problem, the bot opens a ticket, and a staff answer arrives in the same conversation."
							width="655"
							height="781"
							loading="lazy"
							decoding="async"
							class="block w-full h-auto rounded-[3px]"
						/>
					</div>

					<!-- the plate's mark, stamped over the corner of the print -->
					<span
						class="seal accent absolute -bottom-3 -right-3 z-4 flex items-center justify-center w-13 h-13 rounded-full rotate-[7deg]"
						aria-hidden="true"
					>
						<FeatureIcon name="ticket" size={40} />
					</span>

					<figcaption class="annotation muted leading-tight mt-2">
						the member never leaves their DMs
					</figcaption>
				</figure>
			</div>
		</div>
	</div>
</div>

<style>
	/*
	 * Colour is aliased, never invented. Light is the folio's paper plate; dark
	 * is its existing inverted plate (#22372b ground, paper text, leaf-soft
	 * ornaments) - zero new tokens, both already WCAG-checked in DESIGN.md.
	 *
	 * These have to be real declarations rather than Uno utilities: `label-specimen`
	 * and `annotation` bake in `text-ink-soft`, which is a 2:1 failure on the dark
	 * plate. A scoped class beats a shortcut's utility on specificity, so `.muted`
	 * wins deterministically wherever it is applied.
	 */
	.panel {
		--ground: var(--paper);
		--body: var(--ink);
		--muted: var(--ink-soft);
		--hair: rgba(44, 38, 24, 0.2);
		--accent: var(--leaf);
		--orn: var(--leaf-soft);

		background: var(--ground);
		color: var(--body);
	}

	.panel .muted {
		color: var(--muted);
	}

	.panel .accent {
		color: var(--accent);
	}

	.panel .hair-top {
		border-top: 1px solid var(--hair);
	}

	.panel .seal {
		background: var(--ground);
		border: 1.4px solid var(--hair);
	}

	@media (prefers-color-scheme: dark) {
		.panel {
			--ground: var(--plate);
			--body: var(--paper);
			--muted: var(--leaf-soft);
			--hair: rgba(246, 239, 223, 0.24);
			--accent: var(--leaf-soft);
			--orn: var(--leaf-soft);
		}

		/*
		 * main.css paints html/body cream; any sub-pixel gap or overscroll would
		 * flash it. `:root` and `html body` outrank its `html` / `body` selectors
		 * whichever order the two stylesheets land in.
		 */
		:global(:root),
		:global(html body) {
			background: var(--plate);
		}
	}

	/*
	 * Two columns from 600px, stacked and plate-less below it. 600 is not a theme
	 * breakpoint (xs 480 / sm 640), so it lives here rather than as a variant.
	 *
	 * Vertical budget, 640px fixed. Figures are measured, not estimated.
	 * Desktop 896px wide:
	 *   28 pad · 18 eyebrow +8 · 85 H1 (2 lines @ 39px/1.08) +12 · 25 subhead
	 *   (1 line) +20 · 109 bullets (3 x 1 line) +20 · 57 chips (1 row) +16 ·
	 *   14 trust +28 pad = 440 of 640. Content runs y=54..564, 75px clear below;
	 *   `justify-between` spends the slack on the two inter-block gaps.
	 * Mobile 360px wide, right column hidden:
	 *   24 pad · 18 +8 · 61 H1 (2 lines @ 28px/1.08) +12 · 44 subhead (2 lines)
	 *   +20 · 144 bullets (wrapped) +20 · 122 chips (2 rows) +16 · 13 trust
	 *   +24 pad = 526 of 640; trust line ends at y=617, 23px clear.
	 * The sprig is absolute and costs the flow nothing: it adds 43px to
	 * scrollHeight, which is the intended bleed and is clipped by .panel.
	 */
	.grid-panel {
		display: grid;
		grid-template-columns: 1fr;
	}

	.plate-col {
		display: none;
	}

	@media (min-width: 600px) {
		.grid-panel {
			grid-template-columns: 58fr 42fr;
			column-gap: 1.5rem;
		}

		.plate-col {
			display: block;
		}
	}

	/*
	 * Entrance motion. `backwards` so the stagger holds before it starts;
	 * the resting state is the visible one, so if the animation never runs the
	 * panel is still whole. No observers, no JS.
	 */
	.rise {
		animation: fade-up 0.55s var(--ease-organic) backwards;
	}

	@media (prefers-reduced-motion: reduce) {
		.rise {
			animation: none;
		}
	}
</style>
