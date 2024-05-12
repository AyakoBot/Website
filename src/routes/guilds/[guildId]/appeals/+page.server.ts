import { PUBLIC_API } from '$env/static/public';
import type { PageServerLoad } from './$types';

import type { Returned as GETPunishments } from '@ayako/server/src/routes/guilds/[guildId]/appeals/+server.js';

export const load: PageServerLoad = async (event) => {
	const punishments = await event
		.fetch(`${PUBLIC_API}/guilds/${event.params.guildId}/appeals`, {
			headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` },
		})
		.then((r) => r.json() as Promise<GETPunishments>);

	return { punishments };
};
