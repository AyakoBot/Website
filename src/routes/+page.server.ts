import { PUBLIC_API } from '$env/static/public';
import type { PageServerLoad } from './$types.js';

import type { Returned as GETFeatures } from '@ayako/server/src/routes/features/+server';
import type { Returned as GETGuilds } from '@ayako/server/src/routes/guilds/+server.js';
import type { Returned as GETReviews } from '@ayako/server/src/routes/reviews/+server.js';
import type { Returned as GETStats } from '@ayako/server/src/routes/stats/+server.js';

export const load: PageServerLoad = async (event) => {
	const [reviews, stats, features, guilds] = await Promise.all([
		event
			.fetch(`${PUBLIC_API}/reviews`)
			.then((r) => (r.json() as Promise<GETReviews>).then((j) => j.sort(() => 0.5 * Math.random()))),
		event.fetch(`${PUBLIC_API}/stats`).then((r) => r.json() as Promise<GETStats>),
		event.fetch(`${PUBLIC_API}/features?blocks=3`).then((r) => r.json() as Promise<GETFeatures>),
		event
			.fetch(`${PUBLIC_API}/guilds`)
			.then((r) => (r.json() as Promise<GETGuilds>).then((j) => j.sort(() => 0.5 * Math.random()))),
	]);

	return { reviews, stats, features, guilds };
};
