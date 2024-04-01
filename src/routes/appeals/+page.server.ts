import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	const userId = event.cookies.get('discord-id');

	if (!userId) redirect(307, '/login');

	console.log(userId);
};
