import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => ({
	name: event.cookies.get('discord-username'),
	pfp: event.cookies.get('discord-avatar')
		? decodeURIComponent(event.cookies.get('discord-avatar')!)
		: undefined,
});
