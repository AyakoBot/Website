// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { sveltekit } from '@sveltejs/kit/vite';
import Unlighthouse from '@unlighthouse/vite';
import { defineConfig } from 'vite';
import UnoCSS from '@unocss/svelte-scoped/vite';

export default defineConfig({
	plugins: [sveltekit(), Unlighthouse({}), UnoCSS({ injectReset: '' })],
	server: {
		proxy: {
			'/api': {
				target: 'https://api.ayakobot.com',
				changeOrigin: true,
			},
		},
	},
});
