import { onMount } from 'svelte';
import { DiscordSDK } from '@discord/embedded-app-sdk';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => ({
	name: event.cookies.get('discord-username'),
	pfp: event.cookies.get('discord-avatar')
		? decodeURIComponent(event.cookies.get('discord-avatar')!)
		: undefined,
});

onMount(async () => {
	const SDK = new DiscordSDK(import.meta.env.VITE_ActivityID, { disableConsoleLogOverride: false });
	await SDK.ready().then(() => console.log('SDK Ready'));
});
