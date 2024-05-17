<script lang="ts">
	export let title: string;
	export let checked: boolean = false;
	export let required: boolean = false;
	export let type: 'y/n' | 'on/off' = 'on/off';
</script>

<div class="p-2">
	<label class="flex items-center relative w-max cursor-pointer select-none relative">
		{#if title}
			<span class="font-bold mr-3">
				{title}
			</span>
		{/if}

		<input
			{required}
			type="checkbox"
			class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none {checked
				? 'bg-[#3dff56]'
				: 'bg-[#FE6152]'}"
			on:click={() => {
				checked = !checked;
			}}
			on:keydown={() => {
				checked = !checked;
			}}
		/>
		<span class="absolute font-medium uppercase text-.5rem right-1 text-black"
			>{type === 'y/n' ? 'no' : 'off'}</span
		>
		<span class="absolute font-medium uppercase text-.5rem right-9 text-black"
			>{type === 'y/n' ? 'yes' : 'on'}</span
		>
		<span
			class="w-6 h-6 right-7.2 absolute rounded-full transition ease-in-out duration-.15s bg-neutral-100 {checked
				? 'translate-x-6.4'
				: ''}"
		></span>
	</label>
</div>
