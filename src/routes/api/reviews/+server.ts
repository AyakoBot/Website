import { json } from '@sveltejs/kit';
import DataBase from '$lib/server/database.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const reviews = await DataBase.reviews.findMany({ where: {} });
	if (!reviews.length) return json([]);

	const users = await Promise.all(
		reviews.map((r) =>
			DataBase.users.findUnique({
				where: { userid: r.userid },
			}),
		),
	);

	return json(
		reviews.map((r, i) => ({
			...r,
			score: Number(r.score),
			username: users[i]?.username,
			avatar: users[i]?.avatar,
		})) as Returned,
	);
};

export type Returned = {
	userid: string;
	score: number;
	username: string;
	avatar: string;
	content: string;
}[];
