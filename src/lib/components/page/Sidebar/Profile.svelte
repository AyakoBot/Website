<script lang="ts">
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

<div class="border-t border-ink/10 px-6 py-5 mt-auto relative z-1 bg-paper">
	{#if name}
		<div class="flex flex-row items-center justify-between gap-4">
			<div class="flex flex-row items-center gap-3 min-w-0">
				<img
					src={pfp}
					alt="Your Discord avatar"
					width="44"
					height="44"
					class="rounded-full border border-ink/25 shrink-0"
					loading="lazy"
				/>
				<span class="font-display font-medium text-lg text-ink truncate">{name}</span>
			</div>

			<button class="btn-ink !px-4 !py-1.5 text-sm whitespace-nowrap" onclick={logout}>
				Log-Out
			</button>
		</div>
	{:else}
		<a href="/login" class="btn-petal !px-5 !py-2 text-sm w-full" onclick={close}>Log-In</a>
	{/if}
</div>
