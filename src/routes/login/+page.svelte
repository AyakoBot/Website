<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_ID } from '$env/static/public';
	import Loading from '$lib/components/generic/Loading.svelte';
	import Switch from '$lib/components/generic/Switch.svelte';
	import type { ConsentCookie } from '$lib/scripts';
	import Cookies from 'js-cookie';
	import { onDestroy, onMount } from 'svelte';

	let consent: ConsentCookie | null;

	let interval: NodeJS.Timeout;

	onMount(() => {
		interval = setInterval(() => {
			consent = JSON.parse(Cookies.get('cookie_consent_level') ?? '{}') as ConsentCookie;
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const code = $page.url.searchParams.has('code');
	let checked = true;
</script>

{#if code || !consent}
	<Loading />
{:else if !consent.functionality}
	<div class="flex flex-col justify-center items-center">
		<span class="text-2xl"> Please enable the functionality cookies to use this feature. </span>
		<span class="text-sm">
			You can edit your cookies on the bottom right of any page using the Shield Icon.
		</span>
	</div>
{:else}
	<div class="flex flex-col justify-center items-center">
		<Switch bind:checked title="Join Support Server" name="Join Support Server"/>

		<a
			href="https://discord.com/oauth2/authorize?client_id={PUBLIC_ID}&response_type=code&redirect_uri={encodeURIComponent(
				`https://ayakobot.com/login`,
			)}&scope=identify+guilds{checked ? '+guilds.join' : ''}+applications.commands.permissions.update"
			class="text-xl btn-loud"
		>
			Log-In with Discord
		</a>
	</div>
{/if}
