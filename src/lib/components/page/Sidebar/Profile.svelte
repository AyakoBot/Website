<script lang="ts">
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Cookies from 'js-cookie';

	const { close }: { close: () => void } = $props();

	const name = Cookies.get('discord-username');
	const pfp = decodeURIComponent(Cookies.get('discord-avatar') ?? '');

	const logout = () => {
		const basicCookieOptions: Parameters<typeof Cookies.remove>[1] = {
			path: '/',
			domain: '.ayakobot.com',
			sameSite: 'strict',
			httpOnly: false,
			secure: true,
		};

		Cookies.remove('discord-token', basicCookieOptions);
		Cookies.remove('discord-id', basicCookieOptions);
		Cookies.remove('discord-username', basicCookieOptions);
		Cookies.remove('discord-avatar', basicCookieOptions);

		window.location.reload();
	};
</script>

<div class="absolute bottom-1.5 h-20 left-0 w-full">
	<FancyBorder />

	<div class="absolute top-0 h-20 w-full flex flex-row justify-center items-center mt-2">
		{#if name}
			<div class="flex flex-row justify-between items-center">
				<div class="flex flex-row justify-evenly items-center mr-10">
					<img
						src={pfp}
						alt=""
						width="48"
						height="48"
						class="rounded-full mx-2 box-shadow-main"
						loading="lazy"
					/>
					<ColorFadeText text={name} />
				</div>

				<button class="btn-medium text-sm text-nowrap" onclick={logout} onkeydown={logout}
					>Log-Out</button
				>
			</div>
		{:else}
			<a href="/login" class="btn-medium text-sm text-nowrap" onclick={() => close()}>Log-In</a>
		{/if}
	</div>
</div>
