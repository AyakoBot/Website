<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';

	export let close: Function;
</script>

<div class="absolute bottom-0 h-20 left-0 w-full">
	<FancyBorder />

	<div class="absolute top-0 h-20 w-full flex flex-row justify-center items-center">
		{#if $page.data.name}
			<div class="flex flex-row justify-between items-center">
				<div class="flex flex-row justify-evenly items-center mr-10">
					<img
						src={$page.data.pfp}
						alt=""
						width="48"
						height="48"
						class="rounded-full mx-2 box-shadow-main"
					/>
					<ColorFadeText text={$page.data.name} />
				</div>

				<form method="POST" action="/api?/logout" use:enhance>
					<button class="btn-medium">Log-Out</button>
				</form>
			</div>
		{:else}
			<a href="/login" class="btn-medium" on:click={() => close()}>Log-In</a>
		{/if}
	</div>
</div>
