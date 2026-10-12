<script lang="ts">
	import BotMessage from '../parts/BotMessage.svelte';
	import Button from '../parts/Button.svelte';
	import Container from '../parts/Container.svelte';
	import Note from '../parts/Note.svelte';
	import Toggle from '../parts/Toggle.svelte';

	const modAvatar = 'https://cdn.discordapp.com/embed/avatars/2.png';
</script>

<!--
	The staff side of a DM-to-Thread ticket by Ayako | Ticketing, copied from the real
	capture in static/images/ads/ticket-staff.webp (strings: ticketing/Classes/BaseTicket.ts
	buildStatusSurface). The blank box top right is the bot's context-marker button.
	"r!" is this mock server's reply prefix; the prefix is a per-server setting.
-->
<div class="flex flex-col gap-2 pb-2 border-b border-white/6">
	<span class="w-12 h-12 rounded-full bg-[#1e1f22] flex items-center justify-center">
		<span class="i-tabler-message-circle-filled text-2xl text-white/50" aria-hidden="true"></span>
	</span>
	<span class="text-6 font-600 text-white leading-tight">[Opened] alex 438291057364829104</span>
</div>

<div class="relative">
	<BotMessage name="Ayako | Ticketing" time="02:00">
		<Container accent="#00ff00">
			<div class="flex items-start gap-4">
				<span class="flex-1 text-3 text-white/55"
					><span class="i-tabler-ticket inline-block text-3.5 text-[#7984f5] align-[-2px]" aria-hidden="true"></span>
					DM to Thread • #1788134427733</span
				>
				<span class="w-18 h-8 rounded-lg bg-[#4e5058]/40 flex-shrink-0"></span>
			</div>
			<span class="flex flex-col">
				<span class="flex items-center gap-1.5"><Toggle on /> Open</span>
				<span>User: <span class="mention">@Alex</span></span>
				<span>Claimed By: -</span>
				<span>▱▱▱▱ No tier</span>
			</span>
			<span class="flex flex-col items-start gap-1"
				><strong class="text-white">Reply Prefixes</strong
				><code class="font-mono text-3 bg-[#1e1f22] border border-white/6 rounded px-1">r!</code></span
			>
			<div class="h-px bg-white/10"></div>
			<div class="flex flex-wrap gap-2">
				<Button>More User Info</Button>
				<Button variant="success">Claim Ticket</Button>
				<Button variant="danger">Close Ticket</Button>
			</div>
		</Container>
	</BotMessage>

	<Note left={300} top={90} angle={-10}>Members write to<br />the bot in their DMs</Note>
</div>

<BotMessage name="Ayako | Ticketing" time="02:00">
	<Container>
		<div class="flex items-start gap-4">
			<span class="flex-1 text-3 text-white/55"
				><span class="i-tabler-user-filled inline-block text-3.5 text-[#7984f5] align-[-2px]" aria-hidden="true"></span>
				alex</span
			>
			<span class="w-18 h-8 rounded-lg bg-[#4e5058]/40 flex-shrink-0"></span>
		</div>
		<div class="h-px bg-white/10"></div>
		<span>Hello, I can't upload images into the media channel.</span>
		<div class="h-px bg-white/10"></div>
		<span class="text-3"
			><span class="bg-white/6 rounded px-0.5">12 October 2026 02:00</span>
			(<span class="bg-white/6 rounded px-0.5">2 minutes ago</span>)</span
		>
	</Container>
</BotMessage>

<div class="relative flex gap-4 py-0.5">
	<img src={modAvatar} alt="" class="w-10 h-10 rounded-full flex-shrink-0" />
	<div class="flex flex-col gap-1 flex-1 min-w-0 text-3.5 text-[#dbdee1]">
		<div class="flex items-center gap-2">
			<span class="font-600 text-[#e74c3c] text-3.75">ModeratorX</span>
			<span class="text-3 text-white/25 font-400">02:01</span>
		</div>
		<span>r! Hi, that's because you aren't level 5.</span>
		<span
			class="inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-lg bg-[#2b2d31] border border-white/6 text-3.5 text-white/80"
			>✅ 1</span
		>
		<span>Another person asked that, maybe we should set a tag so I don't need to type this every time.</span>
	</div>

	<Note left={290} bottom={-36} angle={20}>Without the prefix<br />it stays internal</Note>
</div>
