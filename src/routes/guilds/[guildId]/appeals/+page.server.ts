import { PUBLIC_API } from '$env/static/public';
import type { Returned as GETPunishments } from '@ayako/server/src/routes/v1/@me/punishments/+server.ts';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const punishments = await event
		.fetch(`${PUBLIC_API}/@me/punishments?guildId=${event.params.guildId}`, {
			headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` },
		})
		.then((r): Promise<GETPunishments | number> => {
			if (!r.ok) return new Promise((res) => res(r.status)) as Promise<number>;
			return r.json() as Promise<GETPunishments>;
		});

	if (punishments === 403) throw redirect(307, '/login');
	if (punishments === 400) return { punishments: [], enabled: false };
	if (typeof punishments === 'number') throw redirect(307, '/login');

	return { punishments, enabled: true };
};
