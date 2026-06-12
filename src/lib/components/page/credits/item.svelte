<script lang="ts">
	import Tape from '$lib/components/design/Tape.svelte';

	const {
		credit,
		index = 0,
	}: {
		credit: {
			userid: string;
			username?: string;
			avatar?: string;
			roles?: string[];
			socials?: { url: string; type: string }[];
		};
		index?: number;
	} = $props();
</script>

<!-- a plant label pinned beside its gardener -->
<article
	class="relative card-paper h-full flex flex-col items-center text-center px-6 pt-10 pb-6 [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg {index %
		3 ===
	0
		? 'rotate-[-1.1deg]'
		: index % 3 === 1
			? 'rotate-[0.9deg]'
			: 'rotate-[-0.4deg]'}"
>
	<Tape angle={index % 2 === 0 ? -4 : 3} class="-top-2.5 left-1/2 -ml-9" />

	<img
		src={credit.avatar}
		alt=""
		width="112"
		height="112"
		class="w-28 h-28 rounded-full border-2 border-ink/15 bg-paper shadow-press"
		loading="lazy"
	/>

	<h2 class="font-display font-semibold text-2xl text-ink mt-4 leading-tight">
		{credit.username}
	</h2>

	<div class="flex flex-row flex-wrap justify-center gap-x-5 gap-y-1 mt-2 mb-4">
		{#if credit.socials?.length}
			{#each credit.socials as social, i (i)}
				<a
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-ink-soft pb-[2px] bg-[linear-gradient(to_right,var(--petal),var(--petal))] bg-[length:0%_2px] bg-no-repeat bg-[position:0_100%] [transition:background-size_0.35s_var(--ease-organic),color_0.35s_var(--ease-organic)] hover:bg-[length:100%_2px] hover:text-petal"
				>
					{social.type}
				</a>
			{/each}
		{:else}
			<span class="op-0 select-none" aria-hidden="true">No Socials</span>
		{/if}
	</div>

	{#if credit.roles}
		<div class="flex flex-row flex-wrap justify-center gap-2 mt-auto">
			{#each credit.roles as role, i (i)}
				<span
					class="bg-leaf-soft/35 border border-leaf-soft/70 text-ink font-mono text-[0.65rem] uppercase tracking-[0.12em] leading-none px-2.5 py-1.5 rounded-[0.25rem_0.8rem_0.25rem_0.8rem]"
				>
					{role}
				</span>
			{/each}
		</div>
	{/if}
</article>
