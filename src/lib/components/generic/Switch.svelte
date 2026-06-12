<script lang="ts">
	let {
		title,
		name,
		checked = $bindable(false),
		required = false,
		type = 'on/off',
	}: {
		title: string;
		name: string;
		checked?: boolean;
		required?: boolean;
		type?: 'y/n' | 'on/off';
	} = $props();
</script>

<div class="p-2">
	<label class="flex items-center relative w-max cursor-pointer select-none">
		{#if title}
			<span class="font-display font-semibold text-ink mr-3">
				{title}
			</span>
		{/if}

		<span class="relative inline-flex items-center">
			<input
				{required}
				{name}
				type="checkbox"
				class="appearance-none cursor-pointer w-14 h-7 rounded-full border-2 transition-colors duration-300 focus:outline-none {checked
					? 'bg-leaf border-leaf'
					: 'bg-paper-deep border-ink-faint'}"
				bind:checked
			/>
			<span
				class="absolute left-2.5 font-mono font-medium uppercase text-[0.5rem] tracking-[0.08em] text-paper pointer-events-none"
				aria-hidden="true"
			>
				{type === 'y/n' ? 'yes' : 'on'}
			</span>
			<span
				class="absolute right-2.5 font-mono font-medium uppercase text-[0.5rem] tracking-[0.08em] text-ink-soft pointer-events-none"
				aria-hidden="true"
			>
				{type === 'y/n' ? 'no' : 'off'}
			</span>
			<span
				class="absolute left-1 w-5 h-5 rounded-full bg-paper shadow-press border border-ink/15 transition-transform duration-300 [transition-timing-function:var(--ease-organic)] pointer-events-none {checked
					? 'translate-x-7'
					: ''}"
			></span>
		</span>
	</label>
</div>
