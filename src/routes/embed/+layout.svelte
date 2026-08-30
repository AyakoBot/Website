<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="embed-frame">
	{@render children()}
</div>

<style>
	/*
	 * Frame-wide concerns for /embed/*. These panels are served inside a
	 * cross-origin iframe on bot listing sites at a fixed 640px height, so
	 * nothing may scroll - anything past the fold is unreachable, permanently.
	 */
	:global(html),
	:global(body) {
		overflow: hidden;
		height: 100%;
	}

	.embed-frame {
		height: 100lvh;
		overflow: hidden;
	}

	/*
	 * app.html removes the cookie-preferences badge on /embed via JS. This is the
	 * belt-and-braces copy: it still hides if that script never runs, which in an
	 * opaque-origin sandbox is a real possibility.
	 */
	:global(#open_preferences_center) {
		display: none !important;
	}
</style>
