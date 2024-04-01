import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const userId = event.cookies.get('discord-id');
	if (userId) redirect(307, '/');

	const code = event.url.searchParams.get('code');
	if (!code) return;

	const res = await event.fetch('/api/login', {
		headers: { Authorization: `Bearer ${code}` },
	});
	if (!res.ok) redirect(307, '/login');

	redirect(307, '/');
};
