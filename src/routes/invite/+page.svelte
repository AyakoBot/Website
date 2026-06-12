<script lang="ts">
	import { onMount } from 'svelte';
	import Bloom from '$lib/components/design/Bloom.svelte';
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';

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

<section
	class="relative flex flex-col items-center justify-center min-h-[70vh] px-5 py-16 text-center overflow-hidden"
>
	<PetalDrift count={7} />

	<div class="relative mb-7">
		<span class="block [animation:bloom_0.9s_var(--ease-bloom)_both]">
			<Bloom size={130} color="var(--petal)" />
		</span>
		<img
			src="/emotes/AyakoDevil.webp"
			alt="Ayako"
			width="56"
			height="56"
			loading="eager"
			class="absolute -bottom-2 -right-7 rotate-6"
		/>
	</div>

	<span class="label-specimen block mb-3">One Moment</span>
	<h1 class="font-display font-semibold text-3xl sm:text-4xl text-ink">Adding Ayako to Discord…</h1>
	<p class="text-lg text-ink-soft mt-3">You'll be redirected to Discord to authorize.</p>

	<noscript>
		<a href={inviteUrl} class="btn-petal mt-8">Continue to Discord</a>
	</noscript>

	<a
		href={inviteUrl}
		class="text-sm text-ink-soft mt-8 bg-[linear-gradient(to_right,var(--petal),var(--petal))] bg-[length:0%_2px] bg-no-repeat bg-[position:0_100%] [transition:background-size_0.35s_var(--ease-organic)] hover:bg-[length:100%_2px]"
		>Not redirecting? Click here.</a
	>
</section>
