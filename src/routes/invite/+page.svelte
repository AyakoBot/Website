<script lang="ts">
	import { onMount } from 'svelte';

	const inviteUrl = 'https://invite.ayakobot.com';

	onMount(() => {
		window.location.replace(inviteUrl);
	});
</script>

<svelte:head>
	<title>Add Ayako to Discord</title>
	<meta name="description" content="Authorizing Ayako on your Discord server." />
	<meta name="robots" content="noindex, nofollow" />
	<link rel="canonical" href="https://ayakobot.com/invite" />
</svelte:head>

<div class="flex flex-col items-center justify-center py-16">
	<img
		src="/emotes/AyakoDevil.webp"
		alt="Ayako"
		width="128"
		loading="eager"
		class="animate-pulse"
	/>

	<h1 class="text-xl mt-4">Adding Ayako to Discord…</h1>
	<span>You'll be redirected to Discord to authorize.</span>

	<noscript>
		<a href={inviteUrl} class="btn-loud mt-6 w-60">Continue to Discord</a>
	</noscript>

	<a href={inviteUrl} class="op-60 underline mt-6 text-sm">
		Not redirecting? Click here.
	</a>
</div>
