<script lang="ts">
	import { type Snippet } from 'svelte';

	let hover = $state(false);

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

	const unhoverE = () => {
		if (defaultHover) return;
		hover = false;
	};

	const hoverE = () => {
		if (defaultHover) return;
		hover = true;
	};

	$effect(() => {
		if (defaultHover) hover = true;
	});
</script>

<div
	onmouseover={hoverE}
	onmouseleave={unhoverE}
	onfocus={hoverE}
	onblur={unhoverE}
	tabindex="-1"
	role="button"
	class="w-75 max-h-full h-auto rounded-2xl flex-shrink-0 mx-8 aspect-video hover:scale-105 transition-all ease-in-out relative flex flex-col justify-center items-center of-hidden pointer-events-initial {clickable
		? 'cursor-pointer'
		: 'cursor-not-allowed'}"
>
	<div
		class="absolute h-100rem w-100rem animate-[spin_4s_linear_infinite] [background-image:conic-gradient(from_90deg_at_50%_50%,#31de40_0%,#fe3521_50%,#31de40_100%)] transition-all ease-in-out box-shadow-main {hover
			? 'op-20'
			: ''}"
	></div>

	{#if guild.banner}
		<img
			loading="lazy"
			src="{guild.banner}?size=2048"
			alt=""
			class="w-[calc(18.75rem-3px)] h-[calc(100%-4px)] rounded-2xl aspect-video absolute {hover
				? 'scale-90 op-20'
				: ''} transition-all"
		/>
	{:else}
		<img
			loading="eager"
			src={guild.icon ? `${guild.icon}?size=2048` : '/images/ImageNotFound.webp'}
			alt=""
			width="128"
			height="128"
			class="{guild.icon ? 'rounded-full' : ''} aspect-square absolute h-128px w-128px {hover
				? 'scale-90 opacity-20'
				: ''} transition-all"
		/>
	{/if}

	<div
		class="z-20 {hover
			? 'op-100 scale-105 z-1000'
			: 'op-0 z--1'} transition-all scale-90 ease-in-out flex flex-col justify-center items-center w-full h-full"
	>
		<img
			loading="eager"
			src="{guild.icon}?size=2048"
			alt=""
			height="64"
			width="64"
			class="rounded-full aspect-square {hover ? 'scale-105' : ''} scale-90 transition-all ease-in-out"
		/>
		<span
			class="{hover ? 'scale-105' : ''} scale-90 transition-all ease-in-out w-full p-2 {children
				? 'text-4'
				: 'text-5 m-2'}"
		>
			{guild.name?.slice(0, 50)}
		</span>
		<span class="scale-90 transition-all ease-in-out">
			{#if children}
				{@render children()}
			{/if}
		</span>
	</div>
</div>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
