<script setup lang="ts">
	import { onMount } from 'svelte';
	import ColorFade from './ColorFadeText.svelte';

	export let text: string;
	export let isTitle: boolean = false;
	let randomLetters: HTMLElement | ColorFade;

	let title = String(text);
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_.,!=+~/\\*&^%$#@1234567890:;`';

	onMount(() => {
		setTimeout(() => {
			randomLetters.animate([{ opacity: 0 }, { opacity: 1 }], {
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

<h1 bind:this={randomLetters} class="code-font opacity-0">
	{title}
</h1>
