import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const basicCookieOptions = {
		path: '/',
		sameSite: true,
		httpOnly: false,
		secure: false,
	};

	event.cookies.delete('discord-token', {
		...basicCookieOptions,
		secure: import.meta.env.VITE_ENV === 'prod',
		httpOnly: true,
	});
	event.cookies.delete('discord-id', basicCookieOptions);
	event.cookies.delete('discord-username', basicCookieOptions);
	event.cookies.delete('discord-avatar', basicCookieOptions);

	redirect(307, '/');
};
