import { PUBLIC_API } from '$env/static/public';
import type { PageServerLoad } from './$types.js';

import type { Returned as GETFeatures } from '@ayako/server/src/routes/features/+server';
import type { Returned as GETGuilds } from '@ayako/server/src/routes/guilds/+server.js';
import type { Returned as GETReviews } from '@ayako/server/src/routes/reviews/+server.js';
import type { Returned as GETStats } from '@ayako/server/src/routes/stats/+server.js';

export const load: PageServerLoad = async (event) => {
	console.log('Handling Request to', event.url);

	const [reviews, stats, features, guilds] = await Promise.all([
		event.fetch(`${PUBLIC_API}/reviews`).then((r) => (r.ok ? (r.json() as Promise<GETReviews>) : [])),
		event
			.fetch(`${PUBLIC_API}/stats`)
			.then((r) => (r.ok ? (r.json() as Promise<GETStats>) : { guildCount: 0, userCount: 0 })),
		event
			.fetch(`${PUBLIC_API}/features?blocks=3`)
			.then((r) => (r.ok ? (r.json() as Promise<GETFeatures>) : [])),
		event.fetch(`${PUBLIC_API}/guilds`).then((r) => (r.ok ? (r.json() as Promise<GETGuilds>) : [])),
	]);

 console.log(stats);

	return {
		reviews: reviews.sort(() => 0.5 - Math.random()),
		stats,
		features,
		guilds: guilds.sort(() => 0.5 - Math.random()),
	};
};
