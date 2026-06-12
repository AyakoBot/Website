<script lang="ts">
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

	// only the initial default is wanted here
	// svelte-ignore state_referenced_locally
	let type = $state(options.find((o) => o.default)?.key);
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

<!-- card-catalogue search slip -->
<div class="flex flex-row justify-center items-stretch mb-4">
	<div class="relative w-full sm:w-3/4 md:w-1/2 max-w-xl">
		<span
			class="i-tabler-search absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-ink-faint pointer-events-none"
			aria-hidden="true"
		></span>
		<input
			type="text"
			placeholder="Search"
			class="input-paper w-full !pl-10 !pr-10 placeholder:text-ink-faint {options.length
				? '!rounded-[0.4rem_0_0_0.9rem] !border-r-0'
				: ''}"
			bind:value={query}
			oninput={(e) => changeQuery(e.currentTarget.value)}
		/>
		<button
			class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full text-ink-soft bg-transparent transition-colors duration-300 hover:bg-paper-deep hover:text-petal"
			onclick={() => changeQuery('')}
			title="Reset Query"
			aria-label="Reset Query"
		>
			<span class="i-tabler-x block w-4 h-4"></span>
		</button>
	</div>

	{#if options.length}
		<label for="type" class="sr-only">Type</label>
		<select
			id="type"
			name="type"
			class="bg-paper-deep border-2 border-l-0 border-ink/20 rounded-[0_0.9rem_0.4rem_0] px-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft cursor-pointer transition-colors duration-300 focus:border-leaf focus:outline-none"
			onchange={(e) => changeType(e.currentTarget.value)}
		>
			{#each options as option (option.key)}
				<option value={option.key} selected={option.default}>{option.value}</option>
			{/each}
		</select>
	{/if}
</div>
