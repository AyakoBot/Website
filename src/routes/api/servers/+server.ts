import { json } from '@sveltejs/kit';
import DataBase from '$lib/server/database.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const servers = await DataBase.guilds.findMany({ where: { membercount: { gte: 10000 } } });
	if (!servers) return json([]);

	return json(servers.map((s) => ({ ...s, membercount: Number(s.membercount) })) as Returned);
};

export type Returned = {
	guildid: string;
	name: string;
	icon: string | null;
	banner: string | null;
	invite: string | null;
	membercount: number;
}[];
