<script lang="ts">
	import { AppealStatus } from '@ayako/server/node_modules/@prisma/client';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div>
	<span class="text-2xl">Status:</span>
	<span class="text-2xl">{data.status.slice(0, 1).toUpperCase() + data.status.slice(1)}</span>
</div>
<div>
	{#if data.status === AppealStatus.pending}
		Your punishment appeal is pending. Please wait for a staff member to review it. <br />
		<br />
		Please do not contact Ayako Support about this appeal as we do not have any information about it.
		<br />
	{:else if data.status === AppealStatus.accepted}
		Your punishment appeal has been accepted and your punishment has been deleted. <br />
		Please notify server staff about possible limiations on your account.<br />
		<br />
	{:else if data.status === AppealStatus.rejected}
		Your punishment appeal has been rejected.<br />
		You may not re-appeal this punishment unless the appeal is deleted by a staff member.<br />
		<br />
	{/if}
	The circumsatances of your punishment are between you and the staff member who issued it.
</div>
