import { redirect, type Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: (event) =>
			event.html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles'),
	});

	response.headers.delete('x-sveltekit-page');
	// response.headers.append(
	// 	'Content-Security-Policy',
	// 	"default-src 'self' cdn.ayakobot.com api.ayakobot.com; frame-ancestors 'self' https://top.gg; img-src 'self' cdn.ayakobot.com cdn.discordapp.com; font-src 'self' fonts.googleapis.com fonts.gstatic.com; script-src-elem 'self' www.freeprivacypolicy.com; script-src 'self' www.freeprivacypolicy.com; connect-src 'self' api.ayakobot.com;",
	// );
	response.headers.append(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload;',
	);
	response.headers.append('X-Frame-Options', 'ALLOW-FROM https://top.gg;');
	response.headers.append('X-Content-Type-Options', 'nosniff');
	response.headers.append('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.append('Permissions-Policy', 'camera=(), microphone=(), document-domain=();');

	return response;
};
