import { PUBLIC_API } from '$env/static/public';
import type { PageServerLoad } from './$types';

import type { Returned as GETCredits } from '@ayako/server/src/routes/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';

export const load: PageServerLoad = async (event) => {
	const appeal = await event.fetch(
		`${PUBLIC_API}/guilds/${event.params.guildId}/appeals/${event.params.punishmentId}/appeal`,
		{
			headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` },
		},
	).then((r) => r.json() as Promise<GETCredits>);

	return { appeal };
};
