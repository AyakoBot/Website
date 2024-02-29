<script lang="ts">
	import { onMount } from 'svelte';

	let fade: HTMLElement | null = null;

	onMount(() => {
		if (!fade) return;

		const randomStartPosition = Math.floor(Math.random() * 101);
		fade.animate(
			[
				{ backgroundPosition: `${randomStartPosition}% center` },
				{ backgroundPosition: `${randomStartPosition - 200}% center` },
			],
			{
				duration: 3000,
				easing: 'linear',
				iterations: Infinity,
			},
		);
	});
</script>

<p
	class="bg-gradient-to-r via-[#fe3521] from-[#b0ff00] to-[#b0ff00] bg-200 bg-repeat-x w-full m-auto bg-clip-text text-fill-color"
	bind:this={fade}
>
	<slot />
</p>
