<script lang="ts">
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { bots } from '$lib/scripts/bots';

	/*
	 * PLATE IV - the embeddable ad panel for Ayako | Welcome.
	 *
	 * This is not a page. It is a 640px-tall advertisement rendered inside a
	 * cross-origin iframe that top.gg forces to sandbox="allow-scripts", so:
	 *   - nothing scrolls; anything past 640px is unreachable forever,
	 *   - there is NO call to action - target="_blank" and window.open fail
	 *     silently under an opaque origin. The real link lives in the host's
	 *     description directly below this frame, which is what the sprig at the
	 *     bottom edge points at,
	 *   - no use:reveal and no count-up: both are IntersectionObserver-driven and
	 *     never fire in a short non-scrolling frame. Motion is CSS keyframes with
	 *     animation-delay only, and every base state is already visible.
	 *
	 * No photograph on this panel. The other three plates mount a real Discord
	 * capture, but the one screenshot that would sell this bot is a designed
	 * welcome embed, and no such capture exists yet (see ads/IMAGES-NEEDED.md).
	 * A fabricated one is exactly what was stripped off these pages once already,
	 * so the right-hand column carries drawn ornament instead. Swap in the
	 * capture when it lands.
	 */

	const points = [
		{
			lead: 'Design it in a real builder.',
			rest:
				'The bot brings its own embed builder and a Components-V2 builder. Save a design, point the welcome at it.',
		},
		{
			lead: 'A random GIF each time.',
			rest: 'Pick a channel. Whatever members post there becomes the pool.',
		},
		{
			lead: 'It waits for the rules screen.',
			rest: 'Members who have not accepted yet are greeted when they do, not before.',
		},
	];

	const specimens = [
		{ value: '2', label: 'builders included' },
		{ value: '6', label: 'placeholders' },
		{ value: '4', label: 'permissions needed' },
	];
</script>

<svelte:head>
	<title>{bots.welcome.name}: the greeting</title>
	<!-- duplicates /bots/welcome's copy; it must never compete with it in search -->
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="panel relative overflow-hidden p-6 sm:p-7">
	<PetalDrift count={4} />

	<div class="stack relative z-1">
		<div class="main">
			<span class="eyebrow label-specimen rise block">PLATE IV · THE GREETING</span>

			<h1 class="headline rise font-display font-semibold mt-2">A welcome worth reading</h1>

			<p class="lede soft rise d1 mt-3">
				Most greeters hand you one line of text and a colour picker. This one hands you the builder.
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
				Goodbye messages too. Free, with no paid plan.
			</p>

			<!-- directional cue: grown at the bottom edge, curving down out of the frame
			     toward the host's own link, which sits directly beneath the iframe -->
			<div class="cue -ml-1 -mb-9 mt-auto" aria-hidden="true">
				<Sprig size={76} color="var(--orn)" class="rotate-[168deg]" />
			</div>
		</div>

		<div class="aside rise d3 relative">
			<span
				class="mark flex items-center justify-center w-14 h-14 rounded-full border-[1.6px] border-current rotate-[-7deg] ml-1 mb-3"
				aria-hidden="true"
			>
				<FeatureIcon name="greeting" size={40} />
			</span>

			<!--
				Stands in for the photograph the other plates carry. It is a drawn
				specimen card, not a mock Discord message: passing off invented UI as a
				screenshot is precisely the mistake that had to be undone on these pages
				before. It reads as ornament, which is honest.
			-->
			<div class="card relative rotate-[-2deg] rounded-[0.4rem_1.1rem_0.4rem_1.1rem] px-4 py-4">
				<span class="eyebrow label-specimen block text-[0.5625rem]">The message</span>

				<p class="greeting font-display font-semibold mt-2">
					Welcome <span class="tok font-mono">{'{{user}}'}</span> to
					<span class="tok font-mono">{'{{server}}'}</span>
				</p>

				<div class="rule my-3"></div>

				<p class="soft text-[0.7rem] leading-relaxed">
					Six placeholders fill themselves in: the member, their name, your server, the member count, and
					a GIF.
				</p>
			</div>

			<p class="caption annotation rotate-[-1.5deg] mt-2.5">or design your own, and save it</p>
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
		--mark: var(--petal);

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
			--mark: var(--petal-soft);
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

	.panel .card {
		background: var(--mat);
		border: 1px solid var(--rule);
	}

	.panel .chip {
		border-top: 1px solid var(--rule);
	}

	.panel .rule {
		border-top: 1px solid var(--rule);
	}

	.panel .greeting {
		color: var(--fg);
		font-size: clamp(0.95rem, 1.9vw, 1.15rem);
		line-height: 1.3;
	}

	.panel .tok {
		color: var(--orn);
		font-size: 0.86em;
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

	/* below 600px the specimen card is dropped outright - the stack needs the height */
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
