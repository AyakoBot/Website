import type { Handle } from '@sveltejs/kit';

const API_BASE = 'https://api.ayakobot.com';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		const path = event.url.pathname.replace(/^\/api/, '') + event.url.search;
		const res = await fetch(`${API_BASE}${path}`, {
			method: event.request.method,
			headers: event.request.headers,
			body:
				event.request.method !== 'GET' && event.request.method !== 'HEAD'
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
		transformPageChunk: (event) => event.html.replace('%unocss-svelte-scoped.global%', ''),
	});

	response.headers.delete('x-sveltekit-page');

	/*
	 * The /embed/* ad panels exist to be framed by bot listing sites, so they need a
	 * wider frame-ancestors than the rest of the site. Keep this list in step with
	 * the surfaces recommended in ads/copy/embed-snippets.md - a site missing here is
	 * refused by the browser and reads as "the embed is broken".
	 * Everywhere else stays 'self' + top.gg.
	 */
	const embedHosts = [
		'https://top.gg',
		'https://botlist.me',
		'https://discordextremelist.xyz',
		'https://voidbots.net',
		'https://discord.place',
		'https://discords.com',
	].join(' ');

	response.headers.append(
		'Content-Security-Policy',
		[
			event.url.pathname.startsWith('/embed')
				? `frame-ancestors 'self' ${embedHosts}`
				: "frame-ancestors 'self' https://top.gg",
			'frame-src https://www.googletagmanager.com',
			"script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://static.cloudflareinsights.com https://static.hotjar.com https://script.hotjar.com https://www.freeprivacypolicy.com",
			"connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://www.google.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://ipapi.co https://api.ayakobot.com",
			"img-src 'self' https://cdn.ayakobot.com https://cdn.discordapp.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com data: blob:",
		].join('; ') + ';',
	);
	response.headers.append(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload;',
	);
	// `ALLOW-FROM` was never implemented outside legacy IE/Firefox and the trailing
	// `;` makes the value unparseable, so modern browsers fall back to the
	// `frame-ancestors` directive above - which already names top.gg correctly.
	// On /embed/* that fallback is load-bearing rather than academic: those routes
	// only exist to be framed by bot listing sites, and an engine that rejects the
	// value outright could refuse the frame. Send nothing there and let CSP decide.
	if (!event.url.pathname.startsWith('/embed')) {
		response.headers.append('X-Frame-Options', 'ALLOW-FROM https://top.gg;');
	}
	response.headers.append('X-Content-Type-Options', 'nosniff');
	response.headers.append('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.append('Permissions-Policy', 'camera=(), microphone=(), document-domain=();');

	return response;
};
