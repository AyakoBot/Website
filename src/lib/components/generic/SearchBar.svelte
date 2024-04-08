<script lang="ts">
	import type { SearchBarDispatch } from '$lib/scripts/types';
	import sleep from '$lib/scripts/util/sleep.js';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { faClose } from '@fortawesome/free-solid-svg-icons';

	export let options: { key: string; value: string; default?: boolean }[];
	export let queryDelay: number = 500;

	const dispatch = createEventDispatcher<SearchBarDispatch>();

	let type: string | undefined = undefined;
	$: query = '';
	$: type = options.find((o) => o.default)?.value;

	const changeType = (value: string) => {
		type = value;
		dispatch('type', { option: type, query });
		dispatch('any', { option: type, query });
	};

	let wasTypingAt: null | number = null;

	const changeQuery = async (value: string) => {
		wasTypingAt = Date.now();
		await sleep(queryDelay);
		if (wasTypingAt > Date.now() - queryDelay) return;

		query = value;
		dispatch('any', { option: type, query });
		dispatch('query', { option: type, query });
	};
</script>

<div class="flex flex-row justify-center items-center">
	<div class="w-full sm:w-3/4 md:w-1/2 relative mb-4 flex flex-row justify-center items-center">
		<input
			type="text"
			placeholder="Search"
			class="p-2 {options.length ? 'rounded-l-full' : 'rounded-full'} px-4 w-full"
			bind:value={query}
			on:input={(e) => changeQuery(e.currentTarget.value)}
		/>
		<button on:click={() => changeQuery('')} on:keydown={() => changeQuery('')} title="Reset Query">
			<Fa
				icon={faClose}
				class="absolute right-1% top-1/2 -translate-y-1/2 rounded-full color-white transition bg-transparent aspect-square
  hover:bg-white hover:color-neutral-400 p-1"
				size="1.5x"
			/>
		</button>
	</div>

	{#if options.length}
		<select
			class="p-2 rounded-r-full mb-4 border-l-black border-l-1px"
			on:change={(e) => changeType(e.currentTarget.value)}
		>
			{#each options as option}
				<option value={option.key} selected={option.default}>{option.value}</option>
			{/each}
		</select>
	{/if}
</div>
