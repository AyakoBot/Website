import { json } from '@sveltejs/kit';
import DataBase from '$lib/server/database.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	// const servers = await DataBase.guilds.findMany({ where: { membercount: { gte: 1000 } } });
	// if (!servers) return json({ code: 500, error: 'No servers found' });

	const count = await DataBase.stats.findFirst();

	return json({
		// servers: servers.map((s) => ({ ...s, membercount: String(s.membercount) })),
		guildCount: Number(count?.guildcount),
		userCount: Number(count?.allusers),
	} as Returned);
};

export type Returned = {
	// servers: {
	// 	guildid: string;
	// 	name: string;
	// 	icon: string | null;
	// 	banner: string | null;
	// 	invite: string | null;
	// 	membercount: string;
	// }[];
	guildCount: number;
	userCount: number;
};
