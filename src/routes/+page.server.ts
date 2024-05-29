import { DEBUG_ID, DEBUG_TOKEN } from '$env/static/private';
import { PUBLIC_API } from '$env/static/public';

import type { PageServerLoad } from './$types.js';

import type { Returned as GETFeatures } from '@ayako/server/src/routes/features/+server';
import type { Returned as GETGuilds } from '@ayako/server/src/routes/guilds/+server.js';
import type { Returned as GETReviews } from '@ayako/server/src/routes/reviews/+server.js';
import type { Returned as GETStats } from '@ayako/server/src/routes/stats/+server.js';

const handleError = async (
	fetch: Parameters<PageServerLoad>[0]['fetch'],
	r: Response,
	fallback: any,
) => {
	const text = await r.text();

	fetch(`https://discord.com/api/webhooks/${DEBUG_ID}/${DEBUG_TOKEN}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			content: `Request to \`${r.url}\` failed with Status Code \`${r.status}\` - \`${r.statusText}\``,
			embeds: [
				{
					color: 0xff0000,
					author: { name: 'Error', icon_url: 'https://cdn.ayakobot.com/Ayako_Assets/Warning.png' },
					description: `\`\`\`${
						text.startsWith('<!doctype html>')
							? text.split('<div class="error">')[1].split('</div>').slice(0, -1).join('</div>') ?? text
							: text
					}\`\`\``,
				},
			],
		}),
	});

	console.log(
		`Request to \`${r.url}\` failed with Status Code \`${r.status}\` - \`${r.statusText}\``,
		text,
	);

	return fallback;
};

export const load: PageServerLoad = async (event) => {
	console.log('Handling Request to', event.url);

	const [reviews, stats, features, guilds] = await Promise.all([
		event
			.fetch(`${PUBLIC_API}/reviews`)
			.then((r) => (r.ok ? (r.json() as Promise<GETReviews>) : handleError(event.fetch, r, []))),
		event
			.fetch(`${PUBLIC_API}/stats`)
			.then((r) =>
				r.ok
					? (r.json() as Promise<GETStats>)
					: handleError(event.fetch, r, { guildCount: 0, userCount: 0 }),
			),
		event
			.fetch(`${PUBLIC_API}/features?blocks=3`)
			.then((r) => (r.ok ? (r.json() as Promise<GETFeatures>) : handleError(event.fetch, r, []))),
		event
			.fetch(`${PUBLIC_API}/guilds`)
			.then((r) => (r.ok ? (r.json() as Promise<GETGuilds>) : handleError(event.fetch, r, []))),
	]);

	return {
		reviews: reviews.sort(() => 0.5 * Math.random()),
		stats,
		features,
		guilds: guilds.sort(() => 0.5 * Math.random()),
	};
};
