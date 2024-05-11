import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Returned as GETLogin } from '@ayako/server/src/routes/login/+server.js';
import { PUBLIC_API } from '$env/static/public';

export const load: PageServerLoad = async (event) => {
	const userId = event.cookies.get('discord-id');
	if (userId) redirect(307, '/');

	const code = event.url.searchParams.get('code');
	if (!code) return;

	const res = await event.fetch(`${PUBLIC_API}/login`, {
		headers: { Authorization: `Bearer ${code}` },
	});
	if (!res.ok) throw redirect(307, '/login');

	const json = (await res.json()) as GETLogin;

	const basicCookieOptions: Parameters<typeof event.cookies.set>[2] = {
		expires: new Date(Date.now() + json.expires * 1000),
		path: '/',
  domain: '.ayakobot.com',
		maxAge: json.expires,
		sameSite: true,
		httpOnly: false,
		secure: false,
	};

	event.cookies.set('discord-id', json.id, basicCookieOptions);
	event.cookies.set('discord-username', json.username, basicCookieOptions);
	event.cookies.set('discord-avatar', json.avatar, basicCookieOptions);

	throw redirect(307, '/?reload=true');
};
