<script lang="ts">
	import { faClose } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<div class="flex flex-row items-center justify-between p-2 mx-2">
	<button
		class="bg-white color-[#fe3521] rounded-full z-9999 w-12 h-12 p-3 aspect-square transition ease-in-out flex justify-center items-center
hover:bg-[#fe3521] hover:color-white"
		on:click={() => close()}
		on:keydown={() => close()}
	>
		<Fa icon={faClose} size="1.5x" />
	</button>

	<p class="font-bold lg:text-9 text-8 color-[#b0ff00] of-unset">Ayako</p>

	<a href="/">
		<img
			src="https://cdn.ayakobot.com/website_assets/NavBarIcon.png"
			alt="Ayako Logo Icon"
			width="64"
			height="64"
		/>
	</a>
</div>
