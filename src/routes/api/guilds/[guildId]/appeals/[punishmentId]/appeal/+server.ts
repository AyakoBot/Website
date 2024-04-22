import user2Cookies from '$lib/scripts/util/user2Cookies';
import DataBase from '$lib/server/database.js';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PunishmentType, type AppealPunishment } from '$lib/scripts/types';
import type { appealquestions, appealsettings } from '@prisma/client';

export const GET: RequestHandler = async (req) => {
	const authenticated = await user2Cookies(req);
	if (authenticated) return error(authenticated, 'Invalid or no token provided');

	const { guildId, punishmentId } = req.params;
	const userId = req.cookies.get('discord-id');
	const where = {
		where: { userid: userId, guildid: guildId, uniquetimestamp: punishmentId },
	} as const;

	const settings = await DataBase.appealsettings.findUnique({
		where: { guildid: guildId, active: true },
		select: { active: true },
	});
	if (!settings) return error(404, 'No appeal settings found');

	const questions = await DataBase.appealquestions.findMany({
		where: { guildid: guildId, active: true },
	});
	if (!questions.length) return error(404, 'No appeal questions found');

	const punishment = (
		await Promise.all([
			DataBase.punish_bans.findUnique(where).then((r) => ({ ...r, type: PunishmentType.bans })),
			DataBase.punish_channelbans
				.findUnique(where)
				.then((r) => ({ ...r, type: PunishmentType.channelbans })),
			DataBase.punish_kicks.findUnique(where).then((r) => ({ ...r, type: PunishmentType.kicks })),
			DataBase.punish_mutes.findUnique(where).then((r) => ({ ...r, type: PunishmentType.mutes })),
			DataBase.punish_warns.findUnique(where).then((r) => ({ ...r, type: PunishmentType.warns })),
			DataBase.punish_tempchannelbans
				.findUnique(where)
				.then((r) => ({ ...r, type: PunishmentType.tempchannelbans })),
			DataBase.punish_tempbans
				.findUnique(where)
				.then((r) => ({ ...r, type: PunishmentType.tempbans })),
			DataBase.punish_tempmutes
				.findUnique(where)
				.then((r) => ({ ...r, type: PunishmentType.tempmutes })),
		]).then((r) => r.flat().filter((p) => !!p))
	)
		.filter((p) => 'reason' in p)
		.map((p) => ({
			type: p.type,
			reason: p.reason,
			id: Number(p.uniquetimestamp),
			channelname: p.channelname,
			duration: 'duration' in p ? Number(p.duration) : undefined,
		}))[0] as AppealPunishment;

	return json({ punishment, settings, questions } as Returned);
};

export type Returned = {
	punishment: AppealPunishment;
	questions: appealquestions[];
};
