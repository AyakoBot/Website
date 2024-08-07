import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Returned as GETLb } from '@ayako/server/src/routes/v1/guilds/[guildId]/lb/+server';
import { PUBLIC_API } from '$env/static/public';

export const GET: RequestHandler = async (req) => {
	const skip = req.url.searchParams.get('skip') ?? 0;

	const res = await req.fetch(`${PUBLIC_API}/guilds/${req.params.guildId}/lb?skip=${skip}&take=100`);
	const jsonRes = (await res.json()) as GETLb;

	if (!res.ok) {
		return error(400, 'message' in jsonRes ? (jsonRes.message as string) : 'Unknown error');
	}

	return json(jsonRes);
};
