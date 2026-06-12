<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_ID } from '$env/static/public';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import Loading from '$lib/components/generic/Loading.svelte';
	import Switch from '$lib/components/generic/Switch.svelte';
	import type { ConsentCookie } from '$lib/scripts';
	import Cookies from 'js-cookie';

	let consent: ConsentCookie | null = $state(null);
	let interval: ReturnType<typeof setInterval>;

	$effect(() => {
		interval = setInterval(() => {
			consent = JSON.parse(Cookies.get('cookie_consent_level') ?? '{}') as ConsentCookie;
		}, 1000);

		return () => clearInterval(interval);
	});

	const code = page.url.searchParams.has('code');
	let checked = $state(true);
</script>

{#if code || !consent}
	<div class="flex flex-col justify-center items-center min-h-[70vh]">
		<Loading />
	</div>
{:else if !consent.functionality}
	<div class="flex flex-col justify-center items-center min-h-[70vh] px-5 py-16">
		<div
			class="relative card-paper max-w-md w-full px-7 sm:px-10 pt-12 pb-10 text-center rotate-[-0.8deg]"
		>
			<Tape angle={-4} class="-top-3 left-1/2 -ml-10" />

			<span class="label-specimen block mb-3">Log-In</span>
			<h1 class="font-display font-semibold text-3xl text-ink mb-5">One thing first</h1>

			<p class="text-lg text-ink leading-relaxed">
				Please enable the functionality cookies to use this feature.
			</p>
			<p class="text-sm text-ink-soft mt-3 leading-relaxed">
				You can edit your cookies on the bottom left of any page using the Shield Icon.
			</p>

			<div class="flex justify-center mt-8" aria-hidden="true">
				<Flourish width={170} color="var(--ink-faint)" />
			</div>
		</div>
	</div>
{:else}
	<div class="flex flex-col justify-center items-center min-h-[70vh] px-5 py-16">
		<div
			class="relative card-paper max-w-md w-full px-7 sm:px-10 pt-12 pb-10 text-center rotate-[-0.8deg]"
		>
			<Tape angle={-4} class="-top-3 left-1/2 -ml-10" />

			<span class="label-specimen block mb-3">Log-In</span>
			<h1 class="font-display font-semibold text-3xl sm:text-4xl text-ink mb-2">Sign the Guestbook</h1>
			<p class="annotation text-xl mb-7 rotate-[-1deg]">log in with your Discord account</p>

			<div class="flex justify-center mb-7">
				<Switch bind:checked title="Join Support Server" name="Join Support Server" />
			</div>

			<a
				href="https://discord.com/oauth2/authorize?client_id={PUBLIC_ID}&response_type=code&redirect_uri={encodeURIComponent(
					`https://ayakobot.com/login`,
				)}&scope=identify+guilds{checked ? '+guilds.join' : ''}"
				class="btn-petal text-xl"
			>
				Log-In with Discord
			</a>

			<div class="flex justify-center mt-9" aria-hidden="true">
				<Flourish width={170} color="var(--ink-faint)" />
			</div>
		</div>
	</div>
{/if}
