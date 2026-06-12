import { defineConfig, presetIcons, presetTypography, presetUno } from 'unocss';
import presetAnimations from 'unocss-preset-animations';

/**
 * "Herbarium Folio" design system - pure UnoCSS.
 *
 * Everything global (design tokens, base element styles, keyframes, the
 * scroll-reveal classes toggled by the reveal action) lives in the raw-CSS
 * preflight below; all component styling is utility classes. Fonts are
 * loaded via <link> tags in app.html.
 */

const GLOBAL_CSS = `
:root {
	/* paper */
	--paper: #f6efdf;
	--paper-warm: #f0e5cc;
	--paper-deep: #e6d7b4;

	/* ink */
	--ink: #2c2618;
	--ink-soft: #6b5f45;
	--ink-faint: #a3967a;

	/* flora */
	--moss: #2f4a33;
	--leaf: #5d7a48;
	--leaf-soft: #93a877;
	--petal: #b3543f;
	--petal-soft: #d99f8c;
	--blossom: #c97c92;
	--gold: #a8842f;

	/* inverted "plate" sections */
	--plate: #22372b;
	--plate-soft: #33503e;
	--plate-line: #4a6a52;

	/* type */
	--font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
	--font-body: 'Spectral', Georgia, 'Times New Roman', serif;
	--font-hand: 'Caveat', 'Segoe Script', cursive;
	--font-mono: 'IBM Plex Mono', 'Courier New', monospace;

	/* motion */
	--ease-organic: cubic-bezier(0.22, 1, 0.36, 1);
	--ease-bloom: cubic-bezier(0.34, 1.56, 0.64, 1);

	color-scheme: light;
}

html {
	scroll-behavior: smooth;
	background: var(--paper);
}

@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
}

body {
	margin: 0;
	min-height: 100lvh;
	color: var(--ink);
	background: var(--paper);
	font-family: var(--font-body);
	font-size: 17px;
	line-height: 1.65;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizeLegibility;
}

/* paper grain - one fixed overlay above everything, never interactive */
body::after {
	content: '';
	position: fixed;
	inset: 0;
	z-index: 2147483646;
	pointer-events: none;
	opacity: 0.05;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	background-size: 240px 240px;
	mix-blend-mode: multiply;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: var(--font-display);
	font-weight: 600;
	line-height: 1.12;
	letter-spacing: -0.01em;
	margin: 0;
	text-wrap: balance;
}

p {
	margin: 0;
	text-wrap: pretty;
}

a {
	color: inherit;
	text-decoration: none;
}

button {
	font-family: inherit;
	border: none;
	background: none;
	cursor: pointer;
	color: inherit;
	font-size: inherit;
}

img,
svg {
	display: block;
	max-width: 100%;
}

::selection {
	background: var(--petal);
	color: var(--paper);
}

:focus-visible {
	outline: 2px solid var(--moss);
	outline-offset: 3px;
	border-radius: 2px;
}

/* scrollbar - a thin pressed stem */
::-webkit-scrollbar {
	width: 11px;
}

::-webkit-scrollbar-track {
	background: var(--paper-warm);
}

::-webkit-scrollbar-thumb {
	background: var(--leaf-soft);
	border: 3px solid var(--paper-warm);
	border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
	background: var(--leaf);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

input[type='number'] {
	-moz-appearance: textfield;
	appearance: textfield;
}

input,
textarea,
select {
	font-family: var(--font-body);
}

::placeholder {
	color: var(--ink-faint);
	opacity: 1;
}

/* ────────────────────────────────────────────────────────────
   Keyframes - global so any component can reference them via
   [animation:…] utilities.
   ──────────────────────────────────────────────────────────── */

@keyframes drift {
	0% {
		transform: translate3d(0, -6vh, 0) rotate(0deg);
		opacity: 0;
	}
	8% {
		opacity: var(--drift-opacity, 0.8);
	}
	88% {
		opacity: var(--drift-opacity, 0.8);
	}
	100% {
		transform: translate3d(var(--drift-x, -9vw), 104vh, 0) rotate(var(--drift-spin, 300deg));
		opacity: 0;
	}
}

@keyframes sway {
	0%,
	100% {
		transform: rotate(-2.5deg);
	}
	50% {
		transform: rotate(2.5deg);
	}
}

@keyframes bloom {
	from {
		transform: scale(0) rotate(-24deg);
	}
	to {
		transform: scale(1) rotate(0deg);
	}
}

@keyframes fade-up {
	from {
		opacity: 0;
		transform: translateY(26px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes spin-slow {
	to {
		transform: rotate(360deg);
	}
}

@keyframes ink-pulse {
	0%,
	100% {
		opacity: 0.55;
		transform: scale(1);
	}
	50% {
		opacity: 1;
		transform: scale(1.06);
	}
}

@keyframes wiggle {
	0%,
	100% {
		transform: rotate(-1.2deg);
	}
	50% {
		transform: rotate(1.2deg);
	}
}

/* appeal status page: the verdict stamp pressing onto the page */
@keyframes stamp-press {
	from {
		opacity: 0;
		transform: rotate(-16deg) scale(1.7);
	}
	to {
		opacity: 0.92;
		transform: rotate(-7deg) scale(1);
	}
}

/* Servers marquee */
@keyframes press-scroll {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}

/* Loading sprout cycle */
@keyframes seed-cycle {
	0% {
		opacity: 0;
	}
	6%,
	92% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@keyframes stem-draw {
	0% {
		stroke-dashoffset: 60;
	}
	45%,
	100% {
		stroke-dashoffset: 0;
	}
}

@keyframes leaf-unfold {
	0%,
	28% {
		transform: scale(0);
	}
	48%,
	100% {
		transform: scale(1);
	}
}

@keyframes leaf-unfold-late {
	0%,
	38% {
		transform: scale(0);
	}
	58%,
	100% {
		transform: scale(1);
	}
}

@keyframes bloom-open {
	0%,
	55% {
		transform: scale(0);
	}
	74% {
		transform: scale(1.12);
	}
	82%,
	100% {
		transform: scale(1);
	}
}

/* scroll-reveal: elements with .reveal start hidden, .revealed plays in.
   The reveal action (src/lib/scripts/util/reveal.ts) toggles the class. */
.reveal {
	opacity: 0;
	transform: translateY(26px);
	transition:
		opacity 0.9s var(--ease-organic),
		transform 0.9s var(--ease-organic);
	transition-delay: var(--reveal-delay, 0s);
}

.reveal.revealed {
	opacity: 1;
	transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}

	.reveal {
		opacity: 1;
		transform: none;
	}
}
`;

export default defineConfig({
	preflights: [{ getCSS: () => GLOBAL_CSS }],
	theme: {
		breakpoints: {
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1800px',
		},
		colors: {
			paper: '#f6efdf',
			'paper-warm': '#f0e5cc',
			'paper-deep': '#e6d7b4',
			ink: '#2c2618',
			'ink-soft': '#6b5f45',
			'ink-faint': '#a3967a',
			moss: '#2f4a33',
			leaf: '#5d7a48',
			'leaf-soft': '#93a877',
			petal: '#b3543f',
			'petal-soft': '#d99f8c',
			blossom: '#c97c92',
			gold: '#a8842f',
			plate: '#22372b',
			'plate-soft': '#33503e',
			'plate-line': '#4a6a52',
		},
		fontFamily: {
			display: "'Fraunces',Georgia,'Times New Roman',serif",
			body: "'Spectral',Georgia,'Times New Roman',serif",
			hand: "'Caveat','Segoe Script',cursive",
			mono: "'IBM Plex Mono','Courier New',monospace",
		},
	},
	rules: [
		['code-font', { 'font-family': '"IBM Plex Mono", monospace' }],
		[/^column-count-(.+)$/, ([, d]) => ({ 'column-count': d })],
		[/^column-width-(\d+)$/, ([, d]) => ({ 'column-width': `${Number(d) / 4}rem` })],
		[
			'shadow-press',
			{
				'box-shadow': '0 1px 2px rgba(44, 38, 24, 0.08), 0 6px 18px rgba(44, 38, 24, 0.12)',
			},
		],
		[
			'shadow-press-lg',
			{
				'box-shadow': '0 2px 4px rgba(44, 38, 24, 0.1), 0 14px 34px rgba(44, 38, 24, 0.16)',
			},
		],
	],
	shortcuts: [
		{
			/* leaf-silhouette primary CTA */
			'btn-petal':
				'inline-flex items-center justify-center gap-2 font-display font-semibold text-paper bg-petal px-7 py-3 rounded-[2rem_0.6rem_2rem_0.6rem] shadow-[0_4px_0_rgba(44,38,24,0.22)] transition-all duration-300 ease-out hover:bg-[#a04534] hover:-translate-y-0.5 hover:rotate-[-0.5deg] hover:shadow-[0_6px_0_rgba(44,38,24,0.22)] active:translate-y-0 active:shadow-[0_2px_0_rgba(44,38,24,0.22)] disabled:opacity-50 disabled:cursor-not-allowed',
			/* ink outline secondary */
			'btn-ink':
				'inline-flex items-center justify-center gap-2 font-display font-semibold text-ink bg-transparent border-2 border-ink px-7 py-3 rounded-[0.6rem_2rem_0.6rem_2rem] transition-all duration-300 ease-out hover:bg-ink hover:text-paper hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed',
			/* paper button for use on dark plate sections */
			'btn-paper':
				'inline-flex items-center justify-center gap-2 font-display font-semibold text-plate bg-paper px-7 py-3 rounded-[2rem_0.6rem_2rem_0.6rem] shadow-[0_4px_0_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:bg-paper-warm hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed',
			'btn-quiet': 'text-ink-soft transition-colors duration-300 hover:text-petal',
			/* small mono specimen label, e.g. "PLATE II - FIELD GUIDE" */
			'label-specimen': 'font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-soft',
			/* paper card with uneven, hand-cut corners */
			'card-paper':
				'bg-paper-warm border border-ink/15 rounded-[0.4rem_1.2rem_0.5rem_1.4rem] shadow-press',
			/* shared form input */
			'input-paper':
				'bg-paper border-2 border-ink/20 rounded-[0.4rem_0.9rem_0.4rem_0.9rem] px-4 py-2.5 text-ink transition-colors duration-300 focus:border-leaf focus:outline-none',
			/* handwritten marginalia */
			annotation: 'font-hand text-xl text-ink-soft',
			/* Discord-blurple mention chip - used inside the Discord mockup only */
			mention: 'bg-[rgba(88,101,242,0.3)] px-1 rounded-md',
			/* scholarly inline code */
			code: 'code-font text-[0.9em] bg-paper-deep text-ink px-1.5 py-0.5 rounded-md',
			'debug-border': 'border-2 border-red-500 border-dashed',
			/* footer garden link: thinner sage underline.
			   NOTE: @unocss/svelte-scoped only compiles STATIC shortcuts — never
			   add dynamic (regex) shortcuts here, they silently emit nothing.
			   Likewise transition-[background-size] does not parse in this
			   preset; use the [transition:…] arbitrary property instead. */
			'link-garden':
				'font-body text-[1.05rem] pb-0.5 bg-[linear-gradient(to_right,var(--leaf-soft),var(--leaf-soft))] bg-[length:0%_1.5px] bg-no-repeat bg-[position:0_100%] [transition:background-size_0.35s_var(--ease-organic)] hover:bg-[length:100%_1.5px]',
			/* organic growing underline */
			'link-vine':
				'pb-0.5 bg-[linear-gradient(to_right,var(--petal),var(--petal))] bg-[length:0%_2px] bg-no-repeat bg-[position:0_100%] [transition:background-size_0.35s_var(--ease-organic)] hover:bg-[length:100%_2px]',
			'link-vine-gold':
				'pb-0.5 bg-[linear-gradient(to_right,var(--gold),var(--gold))] bg-[length:0%_2px] bg-no-repeat bg-[position:0_100%] [transition:background-size_0.35s_var(--ease-organic)] hover:bg-[length:100%_2px]',
		},
	],
	presets: [presetAnimations(), presetUno(), presetIcons({ scale: 1.2 }), presetTypography()],
});
