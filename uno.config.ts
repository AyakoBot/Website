import { defineConfig, presetIcons, presetTypography, presetUno } from 'unocss';
import presetAnimations from 'unocss-preset-animations';

/**
 * "Herbarium Folio" design system.
 *
 * Global CSS (design tokens, base element styles, keyframes, scroll-reveal
 * classes, transform-variable defaults) lives in src/routes/main.css, imported
 * by +layout.svelte — NOT in a UnoCSS `preflights` getCSS, because
 * @unocss/svelte-scoped emits an empty global block in production builds.
 * This config only defines utilities: theme, shortcuts, rules, presets.
 */
export default defineConfig({
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
			   preset; use the [transition:...] arbitrary property instead. */
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
