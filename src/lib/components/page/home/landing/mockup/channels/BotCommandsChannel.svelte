<script lang="ts">
	import BotMessage from '../parts/BotMessage.svelte';
	import Container from '../parts/Container.svelte';
	import Note from '../parts/Note.svelte';
	import Toggle from '../parts/Toggle.svelte';

	// /info permissions, exactly as the real capture static/images/ads/info-permissions.webp
	// shows it: 47 permissions in 7 groups, each switch read from that capture's pixels.
	const groups: [string, [string, boolean][]][] = [
		[
			'General Server Permissions',
			[
				['View Channel', true],
				['Manage Channels', false],
				['Manage Roles', false],
				['Create Expressions', false],
				['Manage Expressions', false],
				['View Audit Log', false],
				['View Guild/Server Insights', false],
				['Manage Webhooks', false],
				['Manage Guild/Server', false],
			],
		],
		[
			'Membership Permissions',
			[
				['Create Instant Invite', true],
				['Change Nickname', false],
				['Manage Nicknames', false],
				['Kick Members', false],
				['Ban Members', false],
				['Moderate Members', false],
			],
		],
		[
			'Text Channel Permissions',
			[
				['Send Messages', false],
				['Send Messages in Threads', false],
				['Create Public Threads', false],
				['Create Private Threads', false],
				['Embed Links', true],
				['Attach Files', true],
				['Add Reactions', false],
				['Use external Emojis', true],
				['Use external Stickers', true],
				['Mention Everyone', true],
				['Manage Messages', false],
				['Manage Threads', false],
				['Read Message History', true],
				['Send TTS Messages', false],
				['Use Application Commands', false],
				['Send Voice Messages', true],
				['Send Polls', true],
			],
		],
		[
			'Voice Channel Permissions',
			[
				['Connect', false],
				['Speak', true],
				['Stream', true],
				['Use Soundboard', true],
				['Use external Sounds', true],
				['Use Voice-Activity-Detection', true],
				['Priority Speaker', false],
				['Mute Members', false],
				['Deafen Members', false],
				['Move Members', false],
				['Start Embedded Activities', true],
			],
		],
		['Stage Channel Permissions', [['Request to Speak', true]]],
		[
			'Events Permissions',
			[
				['Create Events', false],
				['Manage Events', false],
			],
		],
		['Advanced Permissions', [['Administrator', false]]],
	];
</script>

{#snippet onlyYou()}
	<span class="flex items-center gap-1 text-3 text-white/45"
		><span class="i-tabler-eye text-3.5" aria-hidden="true"></span> Only you can see this •
		<span class="text-[#00a8fc]">Dismiss message</span></span
	>
{/snippet}

<!-- The ephemeral /reminder create reply (reminders/Classes/Reminder.ts, Language/en-GB.json). -->
<div class="relative">
	<BotMessage name="Ayako | Reminders" time="14:10" used={{ user: 'You', command: '/reminder create' }}>
		<span class="text-3.5 text-[#dbdee1]"
			>Reminder created - ID <code
				class="font-mono text-3 bg-[#1e1f22] border border-white/6 rounded px-1">mv5bwt6o</code
			><br />I will DM you <span class="bg-white/6 rounded px-0.5">in 2 days</span>.</span
		>
		{@render onlyYou()}
	</BotMessage>

	<Note left={300} top={30} angle={-10}>Private reply,<br />then a DM when due</Note>
</div>

<div class="relative">
	<BotMessage name="Ayako | Info" time="14:11" used={{ user: 'You', command: '/info permissions' }}>
		<Container accent="#5865f2">
			<span class="text-5 font-700 text-white leading-snug"
				><span class="i-tabler-key inline-block text-4.5 text-[#7984f5] align-[-2px]" aria-hidden="true"
				></span>
				Permissions of <span class="mention">@Ayako | Info</span> in
				<span class="mention">#general</span></span
			>
			{#each groups as [label, perms] (label)}
				<div class="h-px bg-white/10"></div>
				<div class="flex flex-col gap-0.5">
					<span class="font-700 text-white mb-1">{label}</span>
					{#each perms as [perm, on] (perm)}
						<span class="flex items-center gap-2"><Toggle {on} /> {perm}</span>
					{/each}
				</div>
			{/each}
		</Container>
		{@render onlyYou()}
	</BotMessage>

	<Note left={340} top={110} angle={-10}>Overwrites and<br />timeouts included</Note>
</div>
