<script lang="ts">
	import { onMount } from 'svelte';

 export let text: string;
	let fade: HTMLElement;

	onMount(() => {
		const randomStartPosition = Math.floor(Math.random() * 101);
		fade?.animate(
			[
				{ backgroundPosition: `${randomStartPosition}% center` },
				{ backgroundPosition: `${randomStartPosition - 200}% center` },
			],
			{ duration: 3000, easing: 'linear', iterations: Infinity },
		);
	});
</script>

<div
	class="bg-gradient-to-r via-[#fe3521] from-[#b0ff00] to-[#b0ff00] bg-[length:200%] bg-repeat-x w-full m-auto bg-clip-text text-fill-color font-bold"
	bind:this={fade}
>
	{text}
</div>
