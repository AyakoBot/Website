<script lang="ts">
	export let credit: {
		userid: string;
		username?: string;
		avatar?: string;
		roles?: string[];
		socials?: { url: string; type: string }[];
	};
</script>

<div class="flex justify-start items-center flex-col w-100%">
	<h1 class="text-xl">{credit.username}</h1>
	<img src={credit.avatar} alt="" width="128" class="rounded-full my-5 box-shadow-main" />

	<div class="my-2">
		{#if credit.socials?.length}
			{#each credit.socials as social, i (i)}
				<a href={social.url} target="_blank" rel="noopener noreferrer" class="btn-quiet mt-2 mx-2">
					{social.type}
				</a>
			{/each}
		{:else}
			<span class="mt-2 op-0">No Socials</span>
		{/if}
	</div>

	{#if credit.roles}
		{#each credit.roles as role, i (i)}
			<span class="bg-neutral-500 rounded-2xl w-full my-1 box-shadow-main">{role}</span>
		{/each}
	{/if}
</div>
