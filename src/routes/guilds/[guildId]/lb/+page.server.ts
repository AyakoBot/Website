import { PUBLIC_API } from '$env/static/public';
import type { PageServerLoad } from './$types.js';

import type { Returned as GETLb } from '@ayako/server/src/routes/guilds/[guildId]/lb/+server';

export const load: PageServerLoad = async (event) => {
	const lb = await event
		.fetch(`${PUBLIC_API}/reviews`)
		.then((r) => (r.ok ? (r.json() as Promise<GETLb>) : []));

	return {
		lb,
	};
};
