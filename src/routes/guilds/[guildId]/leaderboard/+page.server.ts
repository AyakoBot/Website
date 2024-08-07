import { PUBLIC_API } from '$env/static/public';
import type { Returned as GETGuild } from '@ayako/server/src/routes/v1/guilds/[guildId]/+server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { guildId } = event.params;

	const guildRes = await event.fetch(`${PUBLIC_API}/guilds/${guildId}`);
	const guild = (await guildRes.json()) as GETGuild;

	return guild;
};
