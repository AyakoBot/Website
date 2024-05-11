import { redirect, type Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.href.includes('/api/')) {
		event.url = new URL(
			event.url.href
				.replace('/api/', '/')
				.replace('https://dev.ayakobot.com', 'https://apiv2.ayakobot.com')
				.replace('http://dev.ayakobot.com', 'https://apiv2.ayakobot.com'),
		);

		return redirect(301, event.url);
	}

	const response = await resolve(event, {
		transformPageChunk: (event) =>
			event.html.replace('%unocss-svelte-scoped.global%', 'unocss_svelte_scoped_global_styles'),
	});

	return response;
};
