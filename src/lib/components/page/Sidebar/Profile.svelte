<script lang="ts">
	import { page } from '$app/stores';
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Cookies from 'js-cookie';

	export let close: Function;

	const logout = () => {
		const basicCookieOptions: Parameters<typeof Cookies.remove>[1] = {
			path: '/',
			domain: '.ayakobot.com',
			sameSite: 'strict',
			httpOnly: false,
			secure: false,
		};

		Cookies.remove('discord-token', {
			...basicCookieOptions,
			secure: import.meta.env.VITE_ENV === 'prod',
		});

		Cookies.remove('discord-id', basicCookieOptions);
		Cookies.remove('discord-username', basicCookieOptions);
		Cookies.remove('discord-avatar', basicCookieOptions);
	};
</script>

<div class="absolute bottom-1.5 h-20 left-0 w-full">
	<FancyBorder />

	<div class="absolute top-0 h-20 w-full flex flex-row justify-center items-center mt-2">
		{#if $page.data.name}
			<div class="flex flex-row justify-between items-center">
				<div class="flex flex-row justify-evenly items-center mr-10">
					<img
						src={$page.data.pfp}
						alt=""
						width="48"
						height="48"
						class="rounded-full mx-2 box-shadow-main"
						loading="lazy"
					/>
					<ColorFadeText text={$page.data.name} />
				</div>

				<button class="btn-medium" on:click={logout} on:keydown={logout}>Log-Out</button>
			</div>
		{:else}
			<a href="/login" class="btn-medium" on:click={() => close()}>Log-In</a>
		{/if}
	</div>
</div>
