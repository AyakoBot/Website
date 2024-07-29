<script lang="ts">
	export let close: Function;
</script>

<div class="justify-self-start h-full w-full flex flex-col justify-between items-center">
	<div class="flex flex-col justify-start items-center gap-2">
		<a href="/appeals" class="btn-quiet" on:click={() => close()} on:keydown={() => close()}>
			Appeals
		</a>
		<a href="/artwork" class="btn-quiet" on:click={() => close()} on:keydown={() => close()}> Art </a>
		<a href="/guilds/leaderboards" class="btn-quiet" on:click={() => close()} on:keydown={() => close()}> Leaderboards </a>
	</div>

	<div class="flex flex-col justify-start items-center mb-25 gap-2">
		<a href="/credits" class="btn-quiet" on:click={() => close()} on:keydown={() => close()}>
			Creators
		</a>
		<a href="https://support.ayakobot.com" target="_blank" class="btn-quiet"> Animekos </a>
	</div>
</div>
