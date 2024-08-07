import { PUBLIC_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Returned as GETPunishment } from '@ayako/server/src/routes/v1/punishments/[punishmentId]/+server.ts';
import type { Returned as GETQuestions } from '@ayako/server/src/routes/v1/guilds/[guildId]/settings/appeal-questions/+server.ts';

export const load: PageServerLoad = async (event) => {
	const punishment = await event
		.fetch(`${PUBLIC_API}/punishments/${event.params.punishmentId}`, {
			headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` },
		})
		.then((r) => (!r.ok ? undefined : (r.json() as Promise<GETPunishment>)));
	if (!punishment) throw redirect(307, '/login');

	const questions = await event
		.fetch(`${PUBLIC_API}/guilds/${event.params.guildId}/settings/appeal-questions`, {
			headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` },
		})
		.then((r) => (!r.ok ? undefined : (r.json() as Promise<GETQuestions>)));

	if (punishment.appealed) {
		throw redirect(
			307,
			`/guilds/${event.params.guildId}/appeals/${event.params.punishmentId}/status`,
		);
	}

	return { punishment, questions };
};

export const actions = {
	appeal: async (event) => {
		const formData = await event.request.formData();
		const formJSON: { [key: string]: string } = {};
		formData.forEach((val, k) => (formJSON[k] = val.toString()));
		console.log(formJSON);

		const res = await event.fetch(`${PUBLIC_API}/punishments/${event.params.punishmentId}/appeal`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${event.cookies.get('discord-token')}`,
			},
			method: 'POST',
			body: JSON.stringify(formJSON),
		});

		if (res.status === 403) throw redirect(307, '/login');
		if (!res.ok) return await res.json().then((r) => r.message);
		throw redirect(
			308,
			`/guilds/${event.params.guildId}/appeals/${event.params.punishmentId}/status`,
		);
	},
} satisfies Actions;
