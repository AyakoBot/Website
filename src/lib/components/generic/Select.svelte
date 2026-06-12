<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { findInParents } from '$lib/scripts/util/utils.js';
	const dispatch = createEventDispatcher<{ update: string[] }>();

	const {
		options,
		single = true,
		required = false,
		label,
		id = Math.random().toString(36).substring(7),
	}: {
		options: string[];
		single: boolean;
		required: boolean;
		label: string;
		id?: string;
	} = $props();

	let element: HTMLDivElement;
	let expanded = $state(false);
	let selectedOptions: typeof options = $state([]);

	const update = () => {
		if (expanded) return;
		dispatch('update', selectedOptions);
	};

	const optionClick = (opt: string) => {
		if (single) selectedOptions = [opt];
		else {
			selectedOptions = selectedOptions.includes(opt)
				? selectedOptions.filter((s) => s !== opt)
				: [...selectedOptions, opt];
		}
		update();
	};

	const clickWindow = (
		e: (MouseEvent | KeyboardEvent) & { currentTarget: EventTarget & Window },
	) => {
		if (findInParents(e.target as HTMLElement, id)) return;
		expanded = false;
		update();
	};

	const labelClick = () => {
		expanded = !expanded;
		update();
	};
</script>

<svelte:window onclick={clickWindow} onkeydown={clickWindow} />

<div {id} class="relative w-full">
	<input
		type="text"
		{required}
		value={selectedOptions.length ? JSON.stringify(selectedOptions) : ''}
		class="w-1px h-1px absolute top-full"
		name={id}
		onfocus={() => element.focus()}
		tabindex="-1"
	/>
	<div
		bind:this={element}
		onclick={labelClick}
		onkeydown={labelClick}
		role="button"
		tabindex="0"
		class="cursor-pointer w-full bg-paper border-2 rounded-[0.4rem_0.9rem_0.4rem_0.9rem] px-3 py-2 relative text-left text-ink transition-colors duration-300 {expanded
			? 'border-leaf'
			: 'border-ink/20'}"
	>
		{#if selectedOptions.length}
			<div class="flex flex-row flex-wrap gap-1.5 items-center pr-6">
				{#each [...selectedOptions] as opt, j (j)}
					{#if single}
						<div
							class="relative w-full"
							onclick={() => optionClick(opt)}
							onkeydown={() => optionClick(opt)}
							role="button"
							tabindex="0"
						>
							{opt}
						</div>
					{:else}
						<div
							class="flex flex-row items-center gap-1 px-2.5 py-0.5 bg-paper-deep border border-ink/15 rounded-full text-sm relative transition-colors duration-300 hover:border-petal hover:text-petal"
							onclick={() => optionClick(opt)}
							onkeydown={() => optionClick(opt)}
							role="button"
							tabindex="0"
						>
							{opt}
							<span class="block i-tabler-x w-3.5 h-3.5 pointer-events-none"></span>
						</div>
					{/if}
				{/each}

				{#if !single}
					<div class="text-ink-faint">{label}</div>
				{/if}
			</div>
		{:else}
			<div class="text-ink-faint pr-6">{label}</div>
		{/if}

		<div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-soft">
			{#if expanded}
				<span class="block i-tabler-chevron-up"></span>
			{:else}
				<span class="block i-tabler-chevron-down"></span>
			{/if}
		</div>
	</div>

	{#if expanded}
		<div
			class="card-paper !bg-paper absolute top-full mt-1.5 right-1/2 translate-x-1/2 w-full z-100 max-h-50 overflow-y-auto overflow-x-hidden"
		>
			{#each options as opt (opt)}
				<div
					onclick={() => optionClick(opt)}
					onkeydown={() => optionClick(opt)}
					role="button"
					tabindex="0"
					class="text-left text-ink px-3 py-2 relative border-b border-ink/15 last:border-b-0 transition-colors duration-300 hover:bg-paper-warm"
				>
					{opt}
					<div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
						{#if selectedOptions.includes(opt)}
							<span class="block i-tabler-checkbox text-leaf"></span>
						{:else}
							<span class="block i-tabler-square-dashed text-ink-faint"></span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
