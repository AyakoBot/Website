import { defineConfig } from 'unocss';

export default defineConfig({
	rules: [
		['bg-200', { 'background-size': '200%' }],
		['box-shadow-main', { 'box-shadow': '0 0.1em 0.3em 0.1em rgba(23, 23, 23, 0.75)' }],
		['text-fill-color', { '-webkit-text-fill-color': 'transparent' }],
		['code', { 'font-family': '"IBM Plex Mono", monospace' }],
	],
	shortcuts: {
		'btn-medium':
			'bg-white rounded-xl color-[#fe3521] px-5 py-2 hover:bg-[#fe3521] hover:color-white',
		'btn-loud':
			'bg-gradient-to-r from-[#fe3521] via-[#3dff56] to-[#fe3521] bg-200 p-2 px-6 rounded-xl transition-all bg-[position:0%_center] hover:bg-[position:100%_center] font-bold',
		'btn-quiet': 'hover:color-[#b0ff00] transition-all',
		'debug-border': 'border-2 border-red-500 border-dashed',
	},
});
