import { PUBLIC_API } from '$env/static/public';
import type { Returned as GETFeatures } from '@ayako/server/src/routes/v1/bot/features/+server';
import type { Returned as GETReviews } from '@ayako/server/src/routes/v1/bot/reviews/+server.js';
import type { Returned as GETStats } from '@ayako/server/src/routes/v1/bot/stats/+server.js';
import type { Returned as GETGuilds } from '@ayako/server/src/routes/v1/guilds/+server.js';
import type { PageServerLoad } from './$types';

function shuffle<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export const load: PageServerLoad = async (event) => {
	const [reviews, stats, features, guilds] = await Promise.all([
		event
			.fetch(`${PUBLIC_API}/bot/reviews`)
			.then((r) => (r.ok ? (r.json() as Promise<GETReviews>) : [])),
		event
			.fetch(`${PUBLIC_API}/bot/stats`)
			.then((r) => (r.ok ? (r.json() as Promise<GETStats>) : { guildCount: 0, userCount: 0 })),
		event
			.fetch(`${PUBLIC_API}/bot/features?blocks=3`)
			.then((r) => (r.ok ? (r.json() as Promise<GETFeatures>) : [])),
		event.fetch(`${PUBLIC_API}/guilds`).then((r) => (r.ok ? (r.json() as Promise<GETGuilds>) : [])),
	]);

	return {
		reviews: shuffle(reviews),
		stats,
		features,
		guilds: shuffle(guilds),
	};
};
