import { redirect, type Handle } from '@sveltejs/kit';

const API_BASE = 'https://api.ayakobot.com';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		const path = event.url.pathname.replace(/^\/api/, '') + event.url.search;
		const res = await fetch(`${API_BASE}${path}`, {
			method: event.request.method,
			headers: event.request.headers,
			body: event.request.method !== 'GET' && event.request.method !== 'HEAD'
				? event.request.body
				: undefined,
			duplex: 'half',
		} as RequestInit);

		return new Response(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers: res.headers,
		});
	}

	const response = await resolve(event, {
		transformPageChunk: (event) =>
			event.html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles'),
	});

	response.headers.delete('x-sveltekit-page');
	response.headers.append('Content-Security-Policy', "frame-ancestors 'self' https://top.gg;");
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
