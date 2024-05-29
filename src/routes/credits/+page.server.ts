import { PUBLIC_API } from '$env/static/public';
import type { PageServerLoad } from './$types';

import type { Returned as GETCredits } from '@ayako/server/src/routes/contributers/+server.ts';

export const load: PageServerLoad = async (event) => {
	const credits = await event
		.fetch(`${PUBLIC_API}/contributers`)
		.then((r) =>
			r.ok
				? (r.json() as Promise<GETCredits>).then((j) =>
						j.sort((a, b) => b.roles.length - a.roles.length),
					)
				: [],
		);

	return { credits };
};
