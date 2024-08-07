import { PUBLIC_API } from '$env/static/public';
import type { Returned as GETArt } from '@ayako/server/src/routes/v1/bot/artworks/+server.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const art = await event
		.fetch(`${PUBLIC_API}/bot/artworks`)
		.then((r) => (r.ok ? (r.json() as Promise<GETArt>) : []));

	return { art };
};
