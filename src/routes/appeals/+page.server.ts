import { PUBLIC_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { Returned as GETAppealableGuilds } from '@ayako/server/src/routes/@me/appeals/guilds/+server.js';

export const load: PageServerLoad = async (event) => {
	const userId = event.cookies.get('discord-id');
	if (!userId) throw redirect(307, '/login');

	const guilds = await event
		.fetch(`${PUBLIC_API}/@me/appeals/guilds`, {
			headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` },
		})
		.then((r) => (!r.ok ? undefined : (r.json() as Promise<GETAppealableGuilds>)));
	if (!guilds) throw redirect(307, '/login');

	return {
		appealEnabled: guilds.appealEnabled.sort((a, b) => a.name.localeCompare(b.name)),
		otherMutuals: guilds.otherMutuals.sort((a, b) => a.name.localeCompare(b.name)),
	};
};
