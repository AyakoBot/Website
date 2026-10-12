<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Position in px inside the nearest relative message. Give top or bottom. */
		left: number;
		top?: number;
		bottom?: number;
		/** Which side the arrow sits on, pointing away from the text. */
		point?: 'left' | 'right';
		/** Extra rotation of the arrow in degrees. */
		angle?: number;
		children: Snippet;
	};

	const { left, top, bottom, point = 'left', angle = 0, children }: Props = $props();

	// The chat column is only ~470px wide in the two-column hero (3xl), so a note
	// slides left there rather than being clipped. 230px is the widest note.
	const style = $derived(
		`left: min(${left}px, calc(100% - 230px)); ` +
			(bottom === undefined ? `top: ${top ?? 0}px;` : `bottom: ${bottom}px;`),
	);
</script>

<!-- A yellow margin note, in the same hand as the mock's existing hints. -->
<div
	class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 {point === 'right'
		? 'flex-row-reverse'
		: ''}"
	{style}
>
	<svg
		class="block flex-shrink-0 [filter:drop-shadow(0_0_4px_rgba(0,0,0,1))_drop-shadow(0_0_8px_rgba(0,0,0,0.9))_drop-shadow(0_2px_4px_rgba(0,0,0,1))]"
		style="transform: {point === 'right' ? 'scaleX(-1) ' : ''}rotate({angle}deg);"
		width="55"
		height="10"
		viewBox="0 0 219 41"
		aria-hidden="true"
		><path
			d="M21.489 29.43C36.933 31.35 51.32 33.056 65.71 34.975C66.76 35.189 67.61 36.468 69.94 38.387C63.17 39.241 57.88 40.307 52.59 40.52C38.626 40.947 24.874 40.947 10.911 40.947C9.218 40.947 7.526 41.16 5.833 40.733C0.332 39.667 -1.572 36.042 1.39 31.137C2.871 28.791 4.564 26.658 6.468 24.739C13.661 17.488 21.066 10.45 28.471 3.412C29.74 2.133 31.644 1.493 34.183 0C34.606 10.876 23.816 13.862 21.489 22.393C23.393 21.966 25.086 21.753 26.567 21.326C83.69 5.545 140.6 7.251 197.3 22.606C203.22 24.099 208.94 26.445 214.65 28.577C217.61 29.644 220.15 31.99 218.46 35.615C216.98 39.241 214.01 39.241 210.63 37.748C172.76 20.687 132.56 18.767 91.94 19.407C70.78 19.62 50.05 21.966 29.529 26.871C26.99 27.511 24.451 28.364 21.489 29.43Z"
			fill="#fde047"
		/></svg
	>
	<span
		class="[font-family:'Caveat','Comic_Neue',cursive] text-[17px] font-600 text-[#fde047] leading-[1.2] whitespace-nowrap [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,0.9),0_0_32px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,1)]"
		>{@render children()}</span
	>
</div>
