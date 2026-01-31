import { defineConfig, presetIcons, presetTypography, presetUno } from 'unocss';
import presetAnimations from 'unocss-preset-animations';

export default defineConfig({
	theme: {
		breakpoints: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1800px',
		},
	},
	safelist: [
		// Feature card icons
		'i-tabler-certificate',
		'i-tabler-check',
		'i-tabler-external-link',
		'i-tabler-gif',
		'i-tabler-reload',
		'i-tabler-shield-check',
		'i-tabler-shield-lock',
		'i-tabler-trending-up',
		'i-tabler-tags',
		'i-tabler-list-details',
		'i-tabler-door-enter',
		'i-tabler-gift',
		'i-tabler-bulb',
		'i-tabler-coin',
		// Feature card colors
		'bg-[rgba(139,92,246,0.2)]',
		'text-[#a78bfa]',
		'bg-[rgba(239,68,68,0.2)]',
		'text-[#f87171]',
		'bg-[rgba(249,115,22,0.2)]',
		'text-[#fb923c]',
		'bg-[rgba(59,130,246,0.2)]',
		'text-[#60a5fa]',
		'bg-[rgba(6,182,212,0.2)]',
		'text-[#22d3ee]',
		'bg-[rgba(34,197,94,0.2)]',
		'text-[#4ade80]',
		'bg-[rgba(236,72,153,0.2)]',
		'text-[#f472b6]',
		'bg-[rgba(234,179,8,0.2)]',
		'text-[#facc15]',
		'bg-[rgba(99,102,241,0.2)]',
		'text-[#818cf8]',
	],
	rules: [
		['box-shadow-main', { 'box-shadow': '0 0.1em 0.3em 0.1em rgba(23, 23, 23, 0.75)' }],
		['text-fill-color', { '-webkit-text-fill-color': 'transparent' }],
		['code-font', { 'font-family': '"IBM Plex Mono", monospace' }],
		[/^column-count-(.+)$/, ([, d]) => ({ 'column-count': d })],
		[/^column-width-(\d+)$/, ([, d]) => ({ 'column-width': `${Number(d) / 4}rem` })],
	],
	shortcuts: {
		code: 'color-white bg-[#1e1e1e] py-1 px-2 rounded-2xl text-shadow-none',
		'btn-medium':
			'font-bold bg-white rounded-xl color-[#fe3521] px-5 py-2 hover:bg-[#fe3521] hover:color-white transition-all text-shadow-none',
		'btn-loud':
			'font-bold bg-gradient-to-r from-[#fe3521] via-[#3dff56] to-[#fe3521] bg-[length:200%] p-2 px-6 rounded-xl transition-all bg-[position:0%_center] hover:bg-[position:100%_center] font-bold text-shadow-none disabled:opacity-50 disabled:cursor-not-allowed',
		'btn-quiet': 'hover:color-[#b0ff00] transition-all text-shadow-none',
		'debug-border': 'border-2 border-red-500 border-dashed',
		mention: 'bg-[rgba(88,101,242,0.3)] px-1 rounded-md',
		'bg-fancy': `border-solid border-4 relative border-orange-700 rounded-2xl duration-1000 transition-all p-2
   before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:[background-image:linear-gradient(130deg,_transparent_0%_33%,_rgb(236,64,122)_66%,_rgb(253,196,53)_100%)]
   before:bg-[length:300%_300%] before:transition-all before:duration-1000 before:ease-in-out before:z-1 before:ease-in-out before:duration-1000 before:rounded-2xl
   hover:before:bg-[position:100%_100%] hover:before:border-transparent hover:before:scale-x-106 hover:before:scale-y-103 hover:before:-z-20
   hover:border-op-0`,
	},
	presets: [presetAnimations(), presetUno(), presetIcons({ scale: 1.2 }), presetTypography()],
});
