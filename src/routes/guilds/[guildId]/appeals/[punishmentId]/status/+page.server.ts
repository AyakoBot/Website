import { PUBLIC_API } from '$env/static/public';
import type { PageServerLoad } from './$types';

import type { Returned as GETStatus } from '@ayako/server/src/routes/guilds/[guildId]/appeals/[punishmentId]/status/+server.js';

export const load: PageServerLoad = async (event) => {
	const { status } = await event
		.fetch(
			`${PUBLIC_API}/guilds/${event.params.guildId}/appeals/${event.params.punishmentId}/status`,
			{ headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` } },
		)
		.then((r) => r.json() as Promise<GETStatus>);

	return { status };
};
