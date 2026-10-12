<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		variant?: 'secondary' | 'success' | 'danger';
		/** Link buttons carry Discord's external-link mark. */
		link?: boolean;
		children: Snippet;
	};

	const { variant = 'secondary', link = false, children }: Props = $props();
</script>

<!-- Discord message button. Decorative in the mock, so it is not focusable. -->
<span
	class="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg text-3.5 font-500 text-white whitespace-nowrap {variant ===
	'success'
		? 'bg-[#248046]'
		: variant === 'danger'
			? 'bg-[#da373c]'
			: 'bg-[#4e5058]'}"
>
	{@render children()}
	{#if link}
		<span class="i-tabler-external-link text-4" aria-hidden="true"></span>
	{/if}
</span>
