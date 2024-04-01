<script lang="ts">
	import Loading from '$lib/components/generic/Loading.svelte';
	import Switch from '$lib/components/generic/Switch.svelte';

	$: checked = true;
</script>

{#if location.href.includes('code')}
	<Loading />
{:else}
	<div class="flex flex-col justify-center items-center">
		<Switch bind:checked title="Join Support Server" />

		<a
			href="https://discord.com/oauth2/authorize?client_id={import.meta.env
				.VITE_ID}&response_type=code&redirect_uri=${encodeURIComponent(
				`${import.meta.env.VITE_HOSTNAME}/login`,
			)}&scope=identify+guilds{checked ? '+guilds.join' : ''}"
			class="text-xl btn-loud"
		>
			Log-In with Discord
		</a>
	</div>
{/if}
