import { PUBLIC_API } from '$env/static/public';
import type { Returned as GETCredits } from '@ayako/server/src/routes/v1/bot/contributers/+server.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const credits = await event
		.fetch(`${PUBLIC_API}/bot/contributers`)
		.then((r) =>
			r.ok
				? (r.json() as Promise<GETCredits>).then((j) =>
						j.sort((a, b) => b.roles.length - a.roles.length),
					)
				: [],
		);

	return { credits };
};
