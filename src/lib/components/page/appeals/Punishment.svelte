<script lang="ts">
	import { page } from '$app/stores';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
	import Timestamp from '$lib/components/generic/Timestamp.svelte';
	import type { Returned as GETPunishments } from '@ayako/server/src/routes/guilds/[guildId]/appeals/+server.js';

	export let p: GETPunishments[number];
	export let appeal: boolean = false;
</script>

<li class="bg-fancy max-w-95%">
	<div
		class="flex flex-col justify-evenly items-center w-full gap-5 flex-wrap text-shadow text-shadow-color-black text-shadow-md m-auto"
	>
		<div>
			<span>Reason:</span>
			<span>{p.reason}</span>
		</div>
		<FancyBorder />
		<div class="flex flex-row justify-evenly items-center mb-5 gap-10 w-full">
			<div>
				<u>Date:</u>
				<div class="flex flex-col justify-center items-center gap-1">
					<Timestamp time={p.id} type="f" />
					<span class="flex flex-row justify-center items-center"
						>(<Timestamp time={p.id} type="R" />)</span
					>
				</div>
			</div>
			<div class="flex flex-col justify-center items-center {appeal ? 'w-100' : ''}">
				<u>Channel:</u>
				<span class="mention text-shadow-none">#{p.channelname}</span>
			</div>
			{#if appeal}
				<a class="btn-loud self-end" href="/guilds/{$page.params.guildId}/appeals/{p.id}/appeal">
					Appeal
				</a>
			{/if}
		</div>
	</div>
</li>
