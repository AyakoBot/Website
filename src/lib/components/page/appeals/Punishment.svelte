<script lang="ts">
	import { page } from '$app/stores';
	import Timestamp from '$lib/components/generic/Timestamp.svelte';
	import type { Returned as GETPunishments } from '../../../../routes/api/guilds/[guildId]/appeals/+server.js';
	export let p: GETPunishments[number];
</script>

<li
	class="border-solid border-4 relative border-orange-700 rounded-2xl duration-1000 transition-all max-w-95% min-w-95% p-2
before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:[background-image:linear-gradient(130deg,_transparent_0%_33%,_rgb(236,64,122)_66%,_rgb(253,196,53)_100%)]
before:bg-[length:300%_300%] before:bg-[0%_0%] before:transition-all before:duration-1000 before:ease-in-out before:z-1 before:ease-in-out before:duration-1000 before:rounded-2xl
hover:before:bg-[position:100%_100%] hover:before:border-transparent hover:before:scale-x-106 hover:before:scale-y-103 hover:before:-z-20
hover:border-op-0"
>
	<div
		class="flex flex-row justify-between items-center w-full gap-5 flex-wrap text-shadow text-shadow-color-black text-shadow-md"
	>
		<div>
			<u>Reason:</u>
			<p>{p.reason}</p>
		</div>
		<div class="z-21">
			<u>Executed:</u>
			<p class="flex flex-col justify-center items-center gap-1"><Timestamp time={p.id} type="f" />  <span class="flex flex-row justify-center items-center">(<Timestamp time={p.id} type="R" />)</span></p>
		</div>
		<div class="flex flex-col justify-center items-center">
			<u>Executed in:</u>
			<p class="mention text-shadow-none">#{p.channelname}</p>
		</div>
		<a class="btn-loud" href="/guilds/{$page.params.guildId}/appeals/{p.id}">Appeal</a>
	</div>
</li>

