<script lang="ts">
	const { close }: { close: () => void } = $props();

	const sections = [
		{ href: '/features', label: 'Features', icon: 'i-tabler-flower' },
		{ href: '/appeals', label: 'Appeals', icon: 'i-tabler-scale' },
		{ href: '/artwork', label: 'Art', icon: 'i-tabler-brush' },
		{ href: '/guilds/leaderboards', label: 'Leaderboards', icon: 'i-tabler-plant-2' },
	];

	const meta = [
		{ href: '/credits', label: 'Creators', external: false },
		{ href: 'https://animekos.com', label: 'Animekos', external: true },
		{ href: 'https://docs.ayakobot.com', label: 'API Docs', external: true },
	];
</script>

<div class="flex-1 flex flex-col justify-between px-6 py-8">
	<div class="flex flex-col items-stretch gap-1">
		<span class="label-specimen mb-3">Explore</span>
		{#each sections as section (section.href)}
			<a
				href={section.href}
				class="group flex items-center gap-3 py-2.5 font-display text-2xl text-ink transition-colors duration-300 hover:text-petal"
				onclick={close}
			>
				<span
					class="{section.icon} w-5 h-5 text-leaf transition-transform duration-300 group-hover:scale-125"
					aria-hidden="true"
				></span>
				{section.label}
			</a>
		{/each}
	</div>

	<div class="flex flex-col items-stretch gap-1 mt-12">
		<span class="label-specimen mb-3">More</span>
		{#each meta as entry (entry.href)}
			{#if entry.external}
				<a
					href={entry.href}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 py-1.5 text-lg text-ink-soft transition-colors duration-300 hover:text-petal"
				>
					{entry.label}
					<span class="i-tabler-external-link w-3.5 h-3.5 opacity-60" aria-hidden="true"></span>
				</a>
			{:else}
				<a
					href={entry.href}
					class="py-1.5 text-lg text-ink-soft transition-colors duration-300 hover:text-petal"
					onclick={close}
				>
					{entry.label}
				</a>
			{/if}
		{/each}
	</div>
</div>
