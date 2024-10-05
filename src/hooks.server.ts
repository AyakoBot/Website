import { redirect, type Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: (event) =>
			event.html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles'),
	});

	response.headers.delete('x-sveltekit-page');
	response.headers.append(
		'Content-Security-Policy',
		"frame-ancestors 'self' https://top.gg; default-src 'self'; script-src 'report-sample' 'self' https://static.cloudflareinsights.com/beacon.min.js https://static.hotjar.com/c/hotjar-2589609.js https://www.freeprivacypolicy.com/public/cookie-consent/4.1.0/cookie-consent.js https://www.googletagmanager.com/gtag/js; style-src 'report-sample' 'self' https://fonts.googleapis.com; object-src 'none'; base-uri 'self'; connect-src 'self'; font-src 'self' https://fonts.gstatic.com; frame-src 'self'; img-src 'self' https://cdn.ayakobot.com https://cdn.discordapp.com; manifest-src 'self'; media-src 'self'; report-uri https://6701672cc106bee79990a81f.endpoint.csper.io/?v=0; worker-src 'none';",
	);
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
