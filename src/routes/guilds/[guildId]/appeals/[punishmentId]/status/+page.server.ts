import { PUBLIC_API } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Returned as GETStatus } from '@ayako/server/src/routes/v1/punishments/[punishmentId]/status/+server.ts';

export const load: PageServerLoad = async (event) => {
	const res = await event
		.fetch(
			`${PUBLIC_API}/punishments/${event.params.punishmentId}/status`,
			{ headers: { Authorization: `Bearer ${event.cookies.get('discord-token')}` } },
		)
		.then((r) => (!r.ok ? undefined : (r.json() as Promise<GETStatus>)));
	if (!res) throw redirect(307, '/login');

	return { status: res.status };
};
