<script lang="ts">
	import { onMount } from 'svelte';

	export let text: string;
	export let isTitle: boolean = false;
	let element: HTMLElement;

	let title = String(text);
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_.,!=+~/\\*&^%$#@1234567890:;`';

	onMount(() => {
		const randomStartPosition = Math.floor(Math.random() * 101);
		element.animate(
			[
				{ backgroundPosition: `${randomStartPosition}% center` },
				{ backgroundPosition: `${randomStartPosition - 200}% center` },
			],
			{ duration: 3000, easing: 'linear', iterations: Infinity },
		);

		setTimeout(() => {
			element.animate([{ opacity: 0 }, { opacity: 1 }], {
				duration: 500,
				easing: 'ease-in-out',
				fill: 'forwards',
			});

			let iterations = 0;
			const interval = setInterval(() => {
				title = title
					.split('')
					.map((l, i) => {
						if (l === ' ') return l;

						if (i < iterations) return text[i];

						const letter = letters[Math.floor(Math.random() * letters.length)];
						return text[i] === text[i].toUpperCase() ? letter : letter.toLowerCase();
					})
					.join('');

				if (iterations >= title.length) clearInterval(interval);

				iterations += 1 / (isTitle ? 10 : 1);
			}, 30);
		}, 500);
	});
</script>

<p
	class="bg-gradient-to-r via-[#fe3521] from-[#b0ff00] to-[#b0ff00] bg-[length:200%] bg-repeat-x w-full m-auto bg-clip-text text-fill-color code opacity-0"
	bind:this={element}
>
	{text}
</p>
