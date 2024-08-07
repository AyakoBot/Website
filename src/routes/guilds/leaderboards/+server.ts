import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Returned as GETGuilds } from '@ayako/server/src/routes/v1/guilds/+server';
import { PUBLIC_API } from '$env/static/public';

export const GET: RequestHandler = async (req) => {
	const skip = req.url.searchParams.get('skip') ?? 0;
	const q = req.url.searchParams.get('q') ?? '';

	const res = await req.fetch(
		`${PUBLIC_API}/guilds?leastMemberCount=2&take=100&skip=${skip}&q=${q}`,
	);
	const jsonRes = (await res.json()) as GETGuilds;

	if (!res.ok) {
		return error(400, 'message' in jsonRes ? (jsonRes.message as string) : 'Unknown error');
	}

	return json(jsonRes.sort((a, b) => b.membercount - a.membercount));
};
