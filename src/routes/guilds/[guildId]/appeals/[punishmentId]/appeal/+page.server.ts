import { PUBLIC_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import type { Returned as GETCredits } from '@ayako/server/src/routes/guilds/[guildId]/appeals/[punishmentId]/appeal/+server.js';

export const load: PageServerLoad = async (event) => {
	const appeal = await event
		.fetch(
			`${PUBLIC_API}/guilds/${event.params.guildId}/appeals/${event.params.punishmentId}/appeal`,
			{ headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` } },
		)
		.then((r) => r.json() as Promise<GETCredits>);

	return { appeal };
};

export const actions = {
	appeal: async (event) => {
		const formData = await event.request.formData();
		const formJSON: { [key: string]: string } = {};
		formData.forEach((val, k) => (formJSON[k] = val.toString()));

		const res = await event.fetch(
			`${PUBLIC_API}/guilds/${event.params.guildId}/appeals/${event.params.punishmentId}/appeal`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${event.cookies.get('discord-token')}`,
				},
				method: 'POST',
				body: JSON.stringify(formJSON),
			},
		);

		if (!res.ok) return await res.json().then((r) => r.message);
		throw redirect(308, `/guilds/${event.params.guildId}/appeals/${event.params.punishmentId}/status`);
	},
} satisfies Actions;
