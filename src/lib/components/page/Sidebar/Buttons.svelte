<script lang="ts">
	const { close }: { close: Function } = $props();
</script>

<div class="justify-self-start h-full w-full flex flex-col justify-between items-center">
	<div class="flex flex-col justify-start items-center gap-2">
		<a href="/appeals" class="btn-quiet" onclick={() => close()} onkeydown={() => close()}>
			Appeals
		</a>
		<a href="/artwork" class="btn-quiet" onclick={() => close()} onkeydown={() => close()}> Art </a>
		<a
			href="/guilds/leaderboards"
			class="btn-quiet"
			onclick={() => close()}
			onkeydown={() => close()}
		>
			Leaderboards
		</a>
	</div>

	<div class="flex flex-col justify-start items-center mb-25 gap-2">
		<a href="/credits" class="btn-quiet" onclick={() => close()} onkeydown={() => close()}>
			Creators
		</a>
		<a href="https://animekos.com" target="_blank" class="btn-quiet"> Animekos </a>
		<a href="https://docs.ayakobot.com" target="_blank" class="btn-quiet"> API Docs </a>
	</div>
</div>
