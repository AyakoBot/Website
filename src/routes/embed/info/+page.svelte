<script lang="ts">
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { bots } from '$lib/scripts/bots';

	/*
	 * PLATE III - the embeddable ad panel for Ayako | Info.
	 *
	 * This is not a page. It is a 640px-tall advertisement rendered inside a
	 * cross-origin iframe that top.gg forces to sandbox="allow-scripts", so:
	 *   - nothing scrolls; anything past 640px is unreachable forever,
	 *   - there is NO call to action - target="_blank" and window.open fail
	 *     silently under an opaque origin, and a target-less anchor would drag
	 *     Discord's OAuth flow into a cookie-less 640px box. The real link lives
	 *     in the host's description, immediately below this frame, which is what
	 *     the sprig at the bottom edge points at,
	 *   - no use:reveal and no count-up: both are IntersectionObserver-driven and
	 *     never fire in a short non-scrolling frame. Motion is CSS keyframes with
	 *     animation-delay only, and every base state is already visible.
	 */

	const points = [
		{
			lead: 'It checks permissions step by step.',
			rest:
				'First @everyone, then every role, then the channel’s own settings. The same order Discord uses.',
		},
		{
			lead: 'Change the channel with a menu.',
			rest: 'The bot checks all 47 permissions again for the channel you pick.',
		},
		{
			lead: 'One command checks 17 kinds of things.',
			rest: 'User, server, channel, role, emoji, invite, webhook, AutoMod and more.',
		},
	];

	const specimens = [
		{ value: '17', label: 'things it checks' },
		{ value: '47', label: 'permissions read' },
		{ value: '4', label: 'permissions needed' },
	];

	/** The specimen in the taped-in photograph: a timed-out member in #announcements. */
	const resolved = [
		{ name: 'View Channel', allowed: true },
		{ name: 'Read Message History', allowed: true },
		{ name: 'Send Messages', allowed: false },
		{ name: 'Add Reactions', allowed: false },
	];
</script>

<svelte:head>
	<title>{bots.info.name}: the field lens</title>
	<!-- duplicates /bots/info's copy; it must never compete with it in search -->
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="panel relative overflow-hidden p-6 sm:p-7">
	<PetalDrift count={4} />

	<div class="stack relative z-1">
		<div class="main">
			<span class="eyebrow label-specimen rise block">PLATE III · THE FIELD LENS</span>

			<h1 class="headline rise font-display font-semibold mt-2">Why can’t they post here?</h1>

			<p class="lede soft rise d1 mt-3">
				One <span class="font-mono text-[0.92em]">/info</span> command checks any user, server, role, channel
				or message. It works out permissions the same way Discord does.
			</p>

			<ul class="rise d2 flex flex-col gap-2 mt-4">
				{#each points as point (point.lead)}
					<li class="point soft flex items-start gap-2">
						<span class="leaf-bullet i-tabler-leaf w-3.5 h-3.5 shrink-0 mt-1" aria-hidden="true"></span>
						<span><b class="strong font-semibold">{point.lead}</b> {point.rest}</span>
					</li>
				{/each}
			</ul>

			<div class="rise d3 flex flex-wrap gap-x-7 gap-y-2 mt-4">
				{#each specimens as specimen (specimen.label)}
					<div class="chip pt-1.5">
						<span class="strong font-mono text-[1.0625rem] leading-none">{specimen.value}</span>
						<span class="eyebrow label-specimen block text-[0.5625rem] mt-1">{specimen.label}</span>
					</div>
				{/each}
			</div>

			<p class="soft rise d3 font-mono text-[0.6875rem] tracking-[0.04em] mt-3.5">
				It only reads your server. Nothing to set up.
			</p>

			<!-- directional cue: grown at the bottom edge, curving down out of the frame
			     toward the host's own link, which sits directly beneath the iframe -->
			<div class="cue -ml-1 -mb-9 mt-auto" aria-hidden="true">
				<Sprig size={76} color="var(--orn)" class="rotate-[168deg]" />
			</div>
		</div>

		<div class="aside rise d3 relative">
			<span
				class="mark flex items-center justify-center w-14 h-14 rounded-full border-[1.6px] border-current rotate-[-7deg] ml-1 mb-2.5"
				aria-hidden="true"
			>
				<FeatureIcon name="lens" size={40} />
			</span>

			<!-- a photograph of Discord, taped into the folio: the inner surface keeps
			     its Discord-dark look in both themes; only the mat around it flips -->
			<div
				class="mat relative rotate-[-2deg] rounded-[0.4rem_1.1rem_0.4rem_1.1rem] p-2.5 pt-4 shadow-press"
			>
				<Tape angle={-8} width={94} class="-top-2.5 right-5" />

				<div class="rounded-[0.35rem] bg-[#313338] px-3 py-2.5">
					<div class="flex items-center gap-1.5">
						<span class="font-600 text-[#b0ff00] text-[0.78rem]">{bots.info.name}</span>
						<span
							class="inline-flex items-center bg-[#5865f2] text-white text-[0.5rem] px-1 rounded-sm font-500"
						>
							APP
						</span>
					</div>

					<div class="flex bg-[#2b2d31] rounded overflow-hidden mt-1.5">
						<div class="w-1 shrink-0 bg-gold"></div>
						<div class="flex flex-col gap-1.5 flex-1 min-w-0 px-2.5 py-2">
							<span class="font-700 text-[0.78rem] text-white">Permissions</span>
							<span class="text-[0.72rem] text-white/75 leading-snug">
								<span class="mention">@wanderer</span> in
								<span class="mention">#announcements</span>
							</span>

							<ul class="flex flex-col gap-1 mt-0.5">
								{#each resolved as permission (permission.name)}
									<li
										class="flex items-center gap-1.5 text-[0.72rem] leading-tight {permission.allowed
											? 'text-white/85'
											: 'text-white/70 line-through'}"
									>
										{#if permission.allowed}
											<span class="i-tabler-check w-3 h-3 shrink-0 text-[#3ba55d]" aria-hidden="true"></span>
										{:else}
											<span class="i-tabler-x w-3 h-3 shrink-0 text-[#ed4245]" aria-hidden="true"></span>
										{/if}
										{permission.name}
									</li>
								{/each}
							</ul>

							<span class="text-[0.68rem] text-white/60 leading-snug mt-0.5">
								Timed out: Send Messages turned off
							</span>
						</div>
					</div>

					<div
						class="flex items-center justify-between gap-2 rounded bg-[#1e1f22] border border-white/10 px-2.5 py-1.5 mt-2"
					>
						<span class="text-[0.72rem] text-white/85">#announcements</span>
						<span class="i-tabler-chevron-down w-3.5 h-3.5 text-white/50" aria-hidden="true"></span>
					</div>
				</div>
			</div>

			<p class="caption annotation rotate-[-1.5deg] mt-2">the role allows it. the timeout blocks it</p>
		</div>
	</div>
</div>

<style>
	/*
	 * There is no box-sizing reset on this site: UnoCSS preflights are injected
	 * through %unocss-svelte-scoped.global%, which comes out empty in the
	 * production build. A content-box panel with padding would be 48px taller
	 * than the frame and clip its own bottom edge, so reset it here.
	 */
	.panel,
	.panel :global(*) {
		box-sizing: border-box;
	}

	/*
	 * Every colour flows through these custom properties, so the dark variant is
	 * a single override block. UnoCSS colour utilities compile to literal hex and
	 * cannot be re-pointed at a token, hence the hand-written classes below - no
	 * new shortcut, no new colour, only the tokens main.css already defines.
	 */
	.panel {
		--pane: var(--paper);
		--fg: var(--ink);
		--fg-soft: var(--ink-soft);
		--mat: var(--paper-warm);
		--rule: rgba(44, 38, 24, 0.18);
		--orn: var(--leaf);
		--mark: var(--gold);

		height: 100%;
		background: var(--pane);
		color: var(--fg);
	}

	/*
	 * The frame cannot read the host's theme - no allow-same-origin, and top.gg
	 * sends no postMessage - so its own prefers-color-scheme is the only signal.
	 * Dark is the folio's existing inverted plate.
	 */
	@media (prefers-color-scheme: dark) {
		.panel {
			--pane: var(--plate);
			--fg: var(--paper);
			--fg-soft: var(--leaf-soft);
			--mat: var(--plate-soft);
			--rule: rgba(246, 239, 223, 0.24);
			--orn: var(--leaf-soft);
		}
	}

	.panel .strong {
		color: var(--fg);
	}

	.panel .soft,
	.panel .eyebrow,
	.panel .caption {
		color: var(--fg-soft);
	}

	.panel .leaf-bullet {
		color: var(--orn);
	}

	.panel .mark {
		color: var(--mark);
		background: var(--pane);
	}

	.panel .mat {
		background: var(--mat);
		border: 1px solid var(--rule);
	}

	.panel .chip {
		border-top: 1px solid var(--rule);
	}

	/*
	 * Fluid type, declared here rather than as text-[clamp(...)] utilities: the
	 * arbitrary-value form has to disambiguate size from colour and can silently
	 * emit nothing, which would drop the H1 to the browser default and burst the
	 * 640px budget with no error anywhere.
	 */
	.headline {
		font-size: clamp(1.6rem, 4.6vw, 2.5rem);
		line-height: 1.06;
	}

	.lede {
		font-size: clamp(0.85rem, 1.8vw, 1rem);
		line-height: 1.5;
	}

	.point {
		font-size: clamp(0.8rem, 1.6vw, 0.925rem);
		line-height: 1.45;
	}

	/*
	 * Layout. The 600px split is a plain media query because UnoCSS has no
	 * arbitrary min-width variant, and 600 is not one of the theme breakpoints.
	 */
	.stack {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.main {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
		min-height: 0;
	}

	/* below 600px the photograph is dropped outright - the stack needs the height */
	.aside {
		display: none;
	}

	@media (min-width: 600px) {
		.stack {
			flex-direction: row;
			align-items: stretch;
			gap: clamp(1rem, 3vw, 2rem);
		}

		.main {
			flex: 0 0 58%;
		}

		.aside {
			display: block;
			flex: 1 1 42%;
			align-self: center;
			min-width: 0;
		}
	}

	/*
	 * Motion: keyframes and delays only. `backwards` fill means a stalled or
	 * unsupported animation still resolves to the natural, fully visible state.
	 */
	.rise {
		animation: fade-up 0.7s var(--ease-organic) backwards;
	}

	.d1 {
		animation-delay: 0.08s;
	}

	.d2 {
		animation-delay: 0.16s;
	}

	.d3 {
		animation-delay: 0.24s;
	}

	.cue {
		animation: sway 11s ease-in-out infinite;
		transform-origin: 50% 0%;
	}

	/*
	 * main.css already clamps durations globally, but not delays - an element
	 * would still sit invisible for 0.24s. Kill the animations outright instead.
	 */
	@media (prefers-reduced-motion: reduce) {
		.rise,
		.cue {
			animation: none;
		}
	}
</style>
