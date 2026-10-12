<script lang="ts">
	// The bot's enabled / disabled emoji: a small switch, green when on.
	const { on }: { on: boolean } = $props();
</script>

<span
	class="inline-flex items-center w-4.5 h-2.5 px-0.5 rounded-full flex-shrink-0 {on
		? 'bg-[#23a55a] justify-end'
		: 'bg-[#b5bac1] justify-start'}"
	aria-label={on ? 'on' : 'off'}
	role="img"
>
	<span class="w-1.5 h-1.5 rounded-full {on ? 'bg-white' : 'bg-[#4e5058]'}"></span>
</span>
