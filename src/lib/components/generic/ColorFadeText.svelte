<script lang="ts">
	const { text }: { text: string } = $props();
	const randomStartPosition = Math.floor(Math.random() * 101);
</script>

<div
	class="bg-gradient-to-r via-[#fe3521] from-[#b0ff00] to-[#b0ff00] bg-[length:200%] bg-repeat-x w-full m-auto bg-clip-text text-fill-color font-bold animate-[fade_3s_linear_infinite]"
	style="--start-pos: {randomStartPosition}%"
>
	{text}
</div>

<style scoped>
	@keyframes fade {
		from {
			background-position: var(--start-pos) center;
		}
		to {
			background-position: calc(var(--start-pos) - 200%) center;
		}
	}
</style>
