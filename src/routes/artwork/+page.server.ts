import { PUBLIC_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { Returned as GETArt } from '@ayako/server/src/routes/artworks/+server.js';

export const load: PageServerLoad = async (event) => {
	const art = await event.fetch(`${PUBLIC_API}/artworks`).then((r) => r.json() as Promise<GETArt>);

	return { art };
};
