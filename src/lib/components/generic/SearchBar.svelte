<script lang="ts">
	import type { SearchBarDispatch } from '$lib/scripts/types';
	import sleep from '$lib/scripts/util/sleep.js';

	const {
		options,
		queryDelay = 500,
		onany,
		ontype,
	}: {
		options: { key: string; value: string; default?: boolean }[];
		queryDelay?: number;
		onany?: ({ option, query }: { option: string | undefined; query: string }) => void;
		ontype?: ({ option, query }: { option: string | undefined; query: string }) => void;
	} = $props();

	let type = $state(options.find((o) => o.default)?.value);
	let query = $state('');

	const changeType = (value: string) => {
		type = value;
		ontype?.({ option: type, query });
		onany?.({ option: type, query });
	};

	let wasTypingAt: null | number = null;

	const changeQuery = async (value: string) => {
		wasTypingAt = Date.now();
		await sleep(queryDelay);
		if (wasTypingAt > Date.now() - queryDelay) return;

		query = value.toLowerCase();
		ontype?.({ option: type, query });
		onany?.({ option: type, query });
	};
</script>

<div class="flex flex-row justify-center items-center">
	<div class="w-full sm:w-3/4 md:w-1/2 relative mb-4 flex flex-row justify-center items-center">
		<input
			type="text"
			placeholder="Search"
			class="p-2 {options.length ? 'rounded-l-full' : 'rounded-full'} px-4 w-full"
			bind:value={query}
			oninput={(e) => changeQuery(e.currentTarget.value)}
		/>
		<button
			onclick={() => changeQuery('')}
			onkeydown={() => changeQuery('')}
			title="Reset Query"
			aria-label="Reset Query"
		>
			<span
				class="i-tabler-x absolute right-1% top-1/2 -translate-y-1/2 rounded-full color-white transition bg-transparent aspect-square w-6
  hover:bg-white hover:color-neutral-400 p-1"
			></span>
		</button>
	</div>

	{#if options.length}
		<label for="type" class="sr-only">Type</label>
		<select
			name="type"
			class="p-2 rounded-r-full mb-4 border-l-black border-l-1px"
			onchange={(e) => changeType(e.currentTarget.value)}
		>
			{#each options as option}
				<option value={option.key} selected={option.default}>{option.value}</option>
			{/each}
		</select>
	{/if}
</div>
