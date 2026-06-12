<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Tape from '$lib/components/design/Tape.svelte';

	const reload = async () => {
		if (!page.url.searchParams.has('reload')) return;

		await invalidateAll();
		await goto('/');
	};

	$effect(() => {
		reload();
	});
</script>

<section class="flex flex-col items-center justify-center min-h-[70vh] px-5 py-16 text-center">
	<div class="relative inline-block rotate-[-2deg] mb-7">
		<Tape angle={-6} class="-top-3 left-1/2 -ml-9" />
		<img
			src="/emotes/AyakoCry.webp"
			alt="Ayako Crying"
			width="128"
			height="128"
			loading="lazy"
			class="block"
		/>
	</div>

	<span class="label-specimen block mb-3">Error {page.status}</span>
	<h1 class="font-display font-semibold text-3xl sm:text-4xl text-ink">I think you got lost :c</h1>
	<p class="text-lg text-ink-soft mt-3">The page you were looking for doesn't exist</p>
	<p class="annotation text-xl mt-2 rotate-[-1.5deg]">maybe the link is wrong?</p>

	<div class="my-7" aria-hidden="true">
		<Flourish width={190} color="var(--ink-faint)" />
	</div>

	<a href="/" class="btn-petal">Take me back</a>
</section>
