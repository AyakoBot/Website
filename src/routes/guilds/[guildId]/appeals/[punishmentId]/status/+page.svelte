<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';

	const { data }: { data: PageServerData } = $props();
</script>

<div class="flex flex-col justify-center items-center">
	<div>
		<span class="text-2xl">Status:</span>
		<span class="text-2xl">{data.status.slice(0, 1).toUpperCase() + data.status.slice(1)}</span>
	</div>
	<div class="text-sm">
		{#if data.status === 'pending'}
			Your punishment appeal is pending. Please wait for a staff member to review it. <br />
			<br />
			Please do not contact Ayako Support about this appeal as we do not have any information about it.
			<br />
		{:else if data.status === 'accepted'}
			Your punishment appeal has been accepted and your punishment has been deleted. <br />
			Please notify server staff about possible limiations on your account.<br />
			<br />
		{:else if data.status === 'rejected'}
			Your punishment appeal has been rejected.<br />
			You may not re-appeal this punishment unless the appeal is deleted by a staff member.<br />
			<br />
		{/if}
		The circumsatances of your punishment are between you and the staff member who issued it.
	</div>

	<a class="btn-loud mt-10" href="/guilds/{$page.params.guildId}/appeals">Back</a>
</div>
