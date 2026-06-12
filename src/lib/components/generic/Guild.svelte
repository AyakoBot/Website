<script lang="ts">
	import { type Snippet } from 'svelte';
	import Tape from '$lib/components/design/Tape.svelte';

	let hovered = $state(false);

	const {
		guild,
		clickable = false,
		defaultHover = false,
		children,
	}: {
		guild: {
			icon: string | null;
			banner: string | null;
			membercount?: number;
			name: string;
		};
		clickable?: boolean;
		defaultHover?: boolean;
		children?: Snippet;
	} = $props();

	const hover = $derived(defaultHover || hovered);

	const unhoverE = () => {
		if (defaultHover) return;
		hovered = false;
	};

	const hoverE = () => {
		if (defaultHover) return;
		hovered = true;
	};
</script>

<!-- herbarium specimen card -->
<div
	onmouseover={hoverE}
	onmouseleave={unhoverE}
	onfocus={hoverE}
	onblur={unhoverE}
	tabindex="-1"
	role="button"
	class="w-75 max-h-full h-auto aspect-video flex-shrink-0 mx-8 relative card-paper !bg-paper p-1.5 flex flex-col justify-center items-center pointer-events-initial rotate-[-0.8deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-4px] hover:shadow-press-lg {clickable
		? 'cursor-pointer'
		: 'cursor-not-allowed'}"
>
	<Tape angle={-4} class="-top-2.5 left-1/2 -ml-9 z-30" />

	<div
		class="relative w-full h-full overflow-hidden rounded-[0.3rem_0.9rem_0.4rem_1rem] bg-paper-deep flex flex-col justify-center items-center"
	>
		{#if guild.banner}
			<img
				loading="lazy"
				src="{guild.banner}?size=2048"
				alt=""
				class="absolute inset-0 w-full h-full object-cover transition-all duration-500 {hover
					? 'scale-105 opacity-25'
					: ''}"
			/>
		{:else}
			<img
				loading="eager"
				src={guild.icon ? `${guild.icon}?size=2048` : '/images/ImageNotFound.webp'}
				alt=""
				width="128"
				height="128"
				class="{guild.icon
					? 'rounded-full'
					: ''} aspect-square h-24 w-24 transition-all duration-500 {hover ? 'scale-90 opacity-20' : ''}"
			/>
		{/if}

		<!-- paper scrim with the specimen's record -->
		<div
			class="absolute inset-0 z-20 flex flex-col justify-center items-center gap-1 px-3 text-center bg-paper/85 transition-all duration-400 {hover
				? 'opacity-100 scale-100'
				: 'opacity-0 scale-95 pointer-events-none'}"
		>
			<img
				loading="eager"
				src="{guild.icon}?size=2048"
				alt=""
				height="64"
				width="64"
				class="rounded-full aspect-square w-16 h-16 border-2 border-ink/15 shadow-press transition-transform duration-400 {hover
					? 'scale-100'
					: 'scale-90'}"
			/>
			<span
				class="font-display font-semibold text-ink leading-tight w-full {children
					? 'text-base'
					: 'text-lg'}"
			>
				{guild.name?.slice(0, 50)}
			</span>
			{#if children}
				<span class="font-mono text-xs text-ink-soft">
					{@render children()}
				</span>
			{/if}
		</div>
	</div>
</div>
