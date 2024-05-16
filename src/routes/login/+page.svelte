<script lang="ts">
	import Loading from '$lib/components/generic/Loading.svelte';
	import Switch from '$lib/components/generic/Switch.svelte';
	import { page } from '$app/stores';
	import { PUBLIC_HOSTNAME, PUBLIC_ID } from '$env/static/public';

	const code = $page.url.searchParams.has('code');
	let checked = true;
</script>

{#if code}
	<Loading />
{:else}
	<div class="flex flex-col justify-center items-center">
		<Switch bind:checked title="Join Support Server" />

		<a
			href="https://discord.com/oauth2/authorize?client_id={PUBLIC_ID}&response_type=code&redirect_uri={encodeURIComponent(
				`https://ayakobot.com/login`,
			)}&scope=identify+guilds{checked ? '+guilds.join' : ''}"
			class="text-xl btn-loud"
		>
			Log-In with Discord
		</a>
	</div>
{/if}
