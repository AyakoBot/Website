<script lang="ts">
	import { onMount } from 'svelte';
	import PageHead from '$lib/components/seo/PageHead.svelte';

	const inviteUrl = 'https://invite.ayakobot.com';

	onMount(() => {
		window.location.replace(inviteUrl);
	});
</script>

<PageHead
	title="Add Ayako to Discord"
	description="Authorizing Ayako on your Discord server."
	url="https://ayakobot.com/invite"
/>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex flex-col items-center justify-center px-4 py-24 max-w-120 mx-auto text-center min-h-[60vh]">
	<img src="/emotes/AyakoDevil.webp" alt="Ayako" width="96" loading="eager" class="mb-6 animate-pulse" />

	<h1 class="text-7 font-700 color-warm-white mb-2">Adding Ayako to Discord…</h1>
	<p class="text-3.5 color-warm-white op-50 mb-8">You'll be redirected to Discord to authorize.</p>

	<noscript>
		<a href={inviteUrl} class="btn-primary">Continue to Discord</a>
	</noscript>

	<a href={inviteUrl} class="text-3 color-warm-white op-30 underline mt-4">
		Not redirecting? Click here.
	</a>
</div>
