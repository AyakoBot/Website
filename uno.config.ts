import { defineConfig } from 'unocss';

export default defineConfig({
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
			'bg-white rounded-xl color-[#fe3521] px-5 py-2 hover:bg-[#fe3521] hover:color-white transition-all text-shadow-none',
		'btn-loud':
			'bg-gradient-to-r from-[#fe3521] via-[#3dff56] to-[#fe3521] bg-[length:200%] p-2 px-6 rounded-xl transition-all bg-[position:0%_center] hover:bg-[position:100%_center] font-bold text-shadow-none',
		'btn-quiet': 'hover:color-[#b0ff00] transition-all text-shadow-none',
		'debug-border': 'border-2 border-red-500 border-dashed',
  'mention': 'bg-[rgba(88,101,242,0.3)] px-1 rounded-md'
	},
});
