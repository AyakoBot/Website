<script lang="ts">
	import type { Returned as GETServers } from '../../../../../routes/api/servers/+server.js';

	export let server: GETServers[number];

 // TODO: finish
</script>

<li
	class="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] bg-gradient-linear bg-gradient-[142deg,rgba(0,0,0,1)_0%,rgba(98,14,14,1)_73%] bg-[100%100%]"
>
	<blockquote>
		<div
			aria-hidden="true"
			class="select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
		></div>
		<span class=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
			{server.name}
		</span>
		<div class="relative z-20 mt-6 flex flex-row items-center">
			<span class="flex flex-col gap-1">
				<span class=" text-sm leading-[1.6] text-gray-400 font-normal">{server.membercount}</span>
			</span>
		</div>
	</blockquote>
</li>
