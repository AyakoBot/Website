<script lang="ts">
	import type { Returned as GETServers } from '../../../../../routes/api/servers/+server.js';

	$: hover = false;
	export let server: GETServers[number];
	const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
</script>

<li class="container">
	<div
		on:mouseover={() => (hover = true)}
		on:mouseleave={() => (hover = false)}
		on:focus={() => (hover = true)}
		on:blur={() => (hover = false)}
		tabindex="-1"
		role="button"
		class="w-75 max-h-full h-auto rounded-2xl flex-shrink-0 mx-8 aspect-video hover:scale-105% transition-all ease-in-out relative flex flex-col justify-center items-center of-hidden"
	>
		<div
			class="absolute h-200% w-200% animate-[spin_4s_linear_infinite] custom-gradient transition-all ease-in-out {hover
				? 'opacity-20'
				: ''}"
		/>

		{#if server.banner}
			<img
				src="{server.banner}?size=2048"
				alt=""
				class="w-[calc(18.75rem-3px)] h-[calc(100%-4px)] rounded-2xl aspect-video absolute {hover
					? 'scale-90% opacity-20'
					: ''} transition-all"
			/>
		{:else}
			<img
				src={server.icon
					? `${server.icon}?size=2048`
					: 'https://cdn.ayakobot.com/website_assets/UnknownPfp.png'}
				alt=""
				width="128"
				height="128"
				class="{server.icon ? 'rounded-full' : ''} aspect-square absolute h-128px w-129px {hover
					? 'scale-90% opacity-20'
					: ''} transition-all"
			/>
		{/if}

		<div
			class="z-20 m-5 op-0 {hover
				? 'op-100 scale-105%'
				: ''} transition-all scale-90% ease-in-out flex flex-col justify-center items-center p-5 w-full"
		>
			<img
				src="{server.icon}?size=2048"
				alt=""
				height="64"
				width="64"
				class="rounded-full aspect-square {hover
					? 'scale-105%'
					: ''} scale-90% transition-all ease-in-out"
			/>
			<span class="{hover ? 'scale-105%' : ''} scale-90% transition-all ease-in-out w-full p-2">
				{server.name.slice(0, 30)}
			</span>
			<br />
			<span class="{hover ? 'scale-105%' : ''} scale-90% transition-all ease-in-out">
				{numberWithCommas(server.membercount)} Members
			</span>
		</div>
	</div>
</li>

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.custom-gradient {
		background-image: conic-gradient(from 90deg at 50% 50%, #31de40 0%, #fe3521 50%, #31de40 100%);
	}
</style>
