<script lang="ts">
	import { faClose } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const { close }: { close: Function } = $props();
</script>

<div class="flex flex-row items-center justify-between p-2 pb-0 mx-2">
	<button
		class="bg-white color-[#fe3521] rounded-full z-9999 w-12 h-12 p-3 aspect-square transition ease-in-out flex justify-center items-center
hover:bg-[#fe3521] hover:color-white"
		onclick={() => close()}
		onkeydown={() => close()}
		name="Close Sidebar"
	>
		<Fa icon={faClose} size="1.5x" />
	</button>

	<span class="font-bold lg:text-9 text-8 color-[#b0ff00] of-unset">Ayako</span>

	<a href="/" onclick={() => close()} onkeydown={() => close()}>
		<img src="/images/Icon.webp" alt="Ayako Logo Icon" width="64" height="64" loading="eager" />
	</a>
</div>
