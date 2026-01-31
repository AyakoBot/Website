// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
// import Unlighthouse from '@unlighthouse/vite';
import UnoCSS from '@unocss/svelte-scoped/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), UnoCSS({ injectReset: '' })],
	server: {
		proxy: {
			'/cdn-proxy': {
				target: 'https://cdn.ayakobot.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/cdn-proxy/, ''),
				headers: {
					Referer: 'https://ayakobot.com/',
				},
			},
		},
	},
});
