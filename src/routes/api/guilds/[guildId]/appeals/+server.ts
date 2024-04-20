import user2Cookies from '$lib/scripts/util/user2Cookies';
import DataBase from '$lib/server/database.js';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (req) => {
	const authenticated = await user2Cookies(req);
	if (authenticated) return error(authenticated, 'Invalid or no token provided');

	const { guildId } = req.params;
	const userId = req.cookies.get('discord-id');
	const where = {
		where: { userid: userId, guildid: guildId },
	orderBy: { uniquetimestamp: 'desc' } as const,
	};

	return json(
		(
			await Promise.all([
				DataBase.punish_bans
					.findMany(where)
					.then((r) => r.map((r2) => ({ ...r2, type: PunishmentType.bans }))),
				DataBase.punish_channelbans
					.findMany(where)
					.then((r) => r.map((r2) => ({ ...r2, type: PunishmentType.channelbans }))),
				DataBase.punish_kicks
					.findMany(where)
					.then((r) => r.map((r2) => ({ ...r2, type: PunishmentType.kicks }))),
				DataBase.punish_mutes
					.findMany(where)
					.then((r) => r.map((r2) => ({ ...r2, type: PunishmentType.mutes }))),
				DataBase.punish_warns
					.findMany(where)
					.then((r) => r.map((r2) => ({ ...r2, type: PunishmentType.warns }))),
				DataBase.punish_tempchannelbans
					.findMany(where)
					.then((r) => r.map((r2) => ({ ...r2, type: PunishmentType.tempchannelbans }))),
				DataBase.punish_tempbans
					.findMany(where)
					.then((r) => r.map((r2) => ({ ...r2, type: PunishmentType.tempbans }))),
				DataBase.punish_tempmutes
					.findMany(where)
					.then((r) => r.map((r2) => ({ ...r2, type: PunishmentType.tempmutes }))),
			]).then((r) => r.flat().filter((p) => !!p))
		).map((p) => ({
			type: p.type,
			reason: p.reason,
			id: Number(p.uniquetimestamp),
			channelname: p.channelname,
			duration: 'duration' in p ? Number(p.duration) : undefined,
		})) as Returned,
	);
};

enum PunishmentType {
	bans = 'bans',
	channelbans = 'channelbans',
	kicks = 'kicks',
	mutes = 'mutes',
	warns = 'warns',
	tempchannelbans = 'tempchannelbans',
	tempbans = 'tempbans',
	tempmutes = 'tempmutes',
}

export type Returned = {
	type: PunishmentType;
	reason: string;
	id: number;
	channelname: string;
	duration?: number;
}[];
