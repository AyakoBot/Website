<script lang="ts">
	import Flourish from '$lib/components/design/Flourish.svelte';
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import TornEdge from '$lib/components/design/TornEdge.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { bots } from '$lib/scripts/bots';
	import { trackInviteClick } from '$lib/scripts/tracking';
	import { reveal } from '$lib/scripts/util/reveal';

	const bot = bots.ticketing;

	/* Above the fold — claims fixed by the strategy dossier §3.2; wording kept simple. */
	const headline = [
		{
			icon: 'relay',
			name: 'The bot carries messages both ways',
			desc:
				'The member stays in their DMs. The bot copies the whole conversation into a staff ' +
				'channel. A prefix on each staff message decides: send it to the member, or keep it as ' +
				'a private note.',
		},
		{
			icon: 'utility',
			name: 'Take it back by editing it',
			desc:
				'Edit a sent message and remove the prefix. The bot deletes the member’s copy and ' +
				'removes the check mark.',
		},
		{
			icon: 'leveling',
			name: 'The ticket really moves up',
			desc:
				'When a ticket goes up a tier, the bot moves it. The channel moves into that tier’s ' +
				'category and takes its permissions. Or the forum tag changes. Or a new thread starts, ' +
				'and the old one is locked, saved as a transcript, and archived.',
		},
		{
			icon: 'security',
			name: '13 permissions. Ban is not one of them.',
			desc:
				'No ban, no kick, no timeout. Your server can run a support desk without giving the ' +
				'bot any moderation power.',
		},
	] as const;

	/*
	 * Specimen data in place of an install count — every figure traceable to the plugin.
	 * A "4 ticket shapes" figure is deliberately absent: BaseTicket.createDbEntry throws
	 * create_SettingsChannelNotFound when TicketSetting.channel is null, and nothing
	 * writes that column today, so the two channel-backed shapes are unreachable on a
	 * fresh setup. Add it back once that guard is fixed.
	 */
	const specimen = [
		{ value: '47', label: 'Settings' },
		{ value: '10', label: 'Logged events' },
		{ value: '8', label: 'Transcript labels' },
	];

	const shapes = [
		{
			key: 'Channel',
			title: 'Channel',
			blurb:
				'One channel per ticket, under a category you choose. The channel takes its permissions ' +
				'from that category. When a ticket moves up, the new category’s permissions apply.',
			note: 'Private staff thread available',
		},
		{
			key: 'Thread',
			title: 'Thread',
			blurb:
				'A private thread inside a channel you already have. Your channel list stays the same, ' +
				'and you set the archive time.',
			note: 'Private staff thread available',
		},
		{
			key: 'dmToThread',
			title: 'DM → Thread',
			blurb:
				'The member writes to the bot in their DMs and never sees your server. The bot copies ' +
				'every message into a private thread, and staff reply from there with a prefix.',
			note: 'The member needs no channel access',
		},
		{
			key: 'dmToChannel',
			title: 'DM → Channel',
			blurb:
				'The same as DM → Thread, but the messages go to a full channel instead. The ticket ' +
				'shows in your channel list, and the member still stays in their DMs.',
			note: 'The member needs no channel access',
		},
	];

	const relayPoints = [
		{
			name: 'The prefix is the switch',
			desc:
				'Start a message with one of your prefixes, and the bot sends it to the member with the ' +
				'prefix removed. Write without a prefix, and the message stays in the ticket as a ' +
				'private note.',
		},
		{
			name: 'A check mark you can trust',
			desc:
				'When a message reaches the member, the bot puts a check mark under it. No check mark ' +
				'means the member did not get that message.',
		},
		{
			name: 'Edit a message to take it back',
			desc:
				'Remove the prefix from a message you already sent, and the bot deletes the member’s ' +
				'copy and the check mark. Edit the text instead, and the bot edits their copy to match.',
		},
		{
			name: 'Notes always go into the ticket',
			desc:
				'If staff reply without a prefix outside the ticket channel, the bot copies that reply ' +
				'into the ticket as a private note. The whole conversation stays in one place.',
		},
	];

	const tiers = [
		{
			rung: 'Rank 1',
			title: 'First line',
			desc: 'The roles that can claim, the place its tickets go, and its own reminder timer.',
		},
		{
			rung: 'Rank 2',
			title: 'Senior staff',
			desc: 'When a ticket moves up, it goes into this tier’s category, channel or forum tag.',
		},
		{
			rung: 'Rank 3',
			title: 'Leads',
			desc: 'The ticket takes its permissions from where it goes. You set them once for each tier.',
		},
		{
			rung: 'Rank n',
			title: 'Add as many as you want',
			desc: 'A tier is just a row in your settings. Add one more, and the menu grows with it.',
		},
	];

	const snippetVars = [
		'{{user}}',
		'{{staff}}',
		'{{claimer}}',
		'{{server}}',
		'{{kind}}',
		'{{ticket}}',
	];

	/* The one feature list — bolded noun phrase + qualifier clause, never a bare noun. */
	const everything = [
		{
			name: 'Thread and DM ticket shapes',
			desc:
				'a private thread in a channel you already have, or a DM conversation the bot copies into one.',
		},
		{
			name: 'Staff replies with a prefix',
			desc:
				'a prefix you choose decides for each message: send it to the member, or keep it as a ' +
				'private note.',
		},
		{
			name: 'Take a message back by editing it',
			desc:
				'remove the prefix from a sent message, and the bot deletes the member’s copy and the ' +
				'check mark.',
		},
		{
			name: 'Ranked staff tiers',
			desc:
				'each tier has its own name, rank, claim roles, target category or channel, and ' +
				'reminder timer.',
		},
		{
			name: 'Take-over by rank',
			desc:
				'another staff member can take a claimed ticket only when you turn take-over on and ' +
				'their tier rank is higher than the claimer’s.',
		},
		{
			name: 'Snippets with 2 texts',
			desc:
				'one saved reply with a text for the member and a text for staff, using {{user}}, ' +
				'{{staff}}, {{claimer}}, {{server}}, {{kind}} and {{ticket}}.',
		},
		{
			name: 'Private staff threads',
			desc:
				'a private thread next to the ticket, just for the team, on Channel and Thread tickets. ' +
				'A DM ticket has no channel in your server to hold one.',
		},
		{
			name: 'Transcripts when a ticket is deleted',
			desc:
				'when a ticket is deleted, the bot builds a transcript from everything it saw and sends ' +
				'it to the channels you choose.',
		},
		{
			name: '10 logged ticket events',
			desc:
				'a ticket being created, claimed, closed, left or deleted (normally or in an unusual ' +
				'way), plus 4 message events, sent to a log channel or a log thread.',
		},
		{
			name: 'Warn first, then close',
			desc:
				'when a ticket goes quiet, the bot sends a warning first. Only after that warning does ' +
				'the close timer start.',
		},
		{
			name: 'Unclaimed and stale reminders',
			desc:
				'2 separate reminders: one for tickets nobody claimed, one for claimed tickets that ' +
				'went quiet. Each has its own wait time and repeat time, and pings only the roles and ' +
				'users you list.',
		},
		{
			name: 'Per-member ticket limits',
			desc: 'a limit on how many open tickets one member can have, in total and per ticket shape.',
		},
		{
			name: '2 placement modes',
			desc:
				'separate places per tier, or one shared forum where moving a ticket up only changes ' +
				'its tag.',
		},
		{
			name: 'Deny lists',
			desc:
				'roles and users that cannot open a ticket. The bot checks this before it creates anything.',
		},
		{
			name: 'Panel messages',
			desc:
				'a button in a channel you pick that opens a ticket, with your own embed and your own label.',
		},
		{
			name: 'Custom bot identity, per ticket system',
			desc:
				'a ticket system can run under its own bot token, name, avatar and status. Systems ' +
				'that share a token share a profile.',
		},
	];

	const jobs = [
		{
			kind: 'remind-unclaimed',
			title: 'Unclaimed',
			desc: 'Runs when nobody has claimed a ticket, and repeats on the timer you set.',
		},
		{
			kind: 'remind-stale',
			title: 'Stale',
			desc: 'Runs when a claimed ticket goes quiet, and repeats until someone takes action.',
		},
		{
			kind: 'inactivity-warn',
			title: 'Inactivity warning',
			desc: 'Tells the member and the channel that the ticket will close, and says when.',
		},
		{
			kind: 'inactivity-close',
			title: 'Inactivity close',
			desc: 'Starts only after the warning above. No warning time set, no automatic close.',
		},
	];

	const permissions = [
		'View Channel',
		'Manage Channels',
		'Manage Roles',
		'Manage Threads',
		'Manage Messages',
		'Send Messages',
		'Send Messages in Threads',
		'Create Public Threads',
		'Create Private Threads',
		'Embed Links',
		'Attach Files',
		'Read Message History',
		'Add Reactions',
	];

	const notAsked = ['Ban Members', 'Kick Members', 'Moderate Members'];

	/* FAQ questions verbatim from the dossier §5.2, with the bot named correctly. */
	const faq = [
		{
			q: 'Is Ayako | Ticketing really free?',
			a:
				'Yes. There is no paid version, no trial, and no locked features, the same answer the ' +
				'main Ayako bot gives. The code has no payment check at all, because there is nothing ' +
				'to pay for.',
		},
		{
			q: 'Can members open a ticket without joining a channel?',
			a:
				'Yes, that is what the 2 DM shapes are for. The member has the whole conversation in ' +
				'their direct messages with the bot. Staff read and answer from a thread or a channel ' +
				'in your server. The member never sees that channel and never needs access to it.',
		},
		{
			q: 'What happens to a ticket nobody claims?',
			a:
				'The bot sends a reminder after the wait time you set, and repeats it on its own timer. ' +
				'It pings only the roles and users on your list. A second reminder covers tickets that ' +
				'are claimed but quiet. Both are off until you set a time.',
		},
		{
			q: 'Are ticket transcripts saved?',
			a:
				'Yes. The bot sends the transcript when a ticket is deleted. Until then, ' +
				'you can still reopen a closed ticket and read it where it is. The transcript is built ' +
				'from everything the bot saw, and each entry has a label that says what happened: ' +
				'created, forwarded, internal, claimed, unclaimed, escalated, left and closed.',
		},
		{
			q: 'Does it work for large servers?',
			a:
				'It has tools made for busy servers. You can limit how many open tickets one member ' +
				'can have, in total and per shape. Deny lists stop the roles and users you choose. ' +
				'Each tier sends its tickets to its own place. And in forum mode, a busy desk is 1 ' +
				'forum instead of 100 channels.',
		},
	];
</script>

<svelte:head>
	<title>Ayako | Ticketing: Discord support tickets that arrive in DMs</title>
	<meta
		name="description"
		content="A free Discord ticket bot: members open tickets in their DMs, staff answer from your server. Ranked staff tiers, saved replies, transcripts, and a close timer that warns first. 13 permissions, and ban is not one of them."
	/>
	<link rel="canonical" href="https://ayakobot.com/bots/ticketing" />
</svelte:head>

<!-- ① eyebrow · H1 · one paragraph · one CTA ---------------------------------------------- -->
<section class="relative overflow-hidden px-5 sm:px-8 pt-16 pb-14">
	<PetalDrift count={5} />

	<div class="relative z-1 max-w-4xl mx-auto text-center">
		<span class="label-specimen block mb-4 [animation:fade-up_0.7s_var(--ease-organic)_both]">
			Plate II · The Support Desk
		</span>

		<div
			class="flex justify-center mb-5 text-leaf [animation:fade-up_0.7s_var(--ease-organic)_0.08s_both]"
		>
			<span
				class="w-20 h-20 rounded-full border-[1.6px] border-current bg-paper rotate-[-3deg] flex items-center justify-center"
			>
				<FeatureIcon name="ticket" size={42} />
			</span>
		</div>

		<h1
			class="font-display font-semibold text-4xl sm:text-6xl lg:text-[4.25rem] leading-[1.02] text-ink [animation:fade-up_0.7s_var(--ease-organic)_0.16s_both]"
		>
			Support that arrives in their DMs.
		</h1>

		<p
			class="text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto mt-6 [animation:fade-up_0.7s_var(--ease-organic)_0.24s_both]"
		>
			Members message the bot. Staff answer from your server. Ranked staff tiers, saved replies,
			transcripts and auto-close are already built in.
		</p>

		<div
			class="flex flex-wrap items-center justify-center gap-4 mt-9 [animation:fade-up_0.7s_var(--ease-organic)_0.32s_both]"
		>
			<a href={bot.invite} target="_blank" onclick={trackInviteClick} class="btn-petal text-lg">
				<span class="i-tabler-seeding w-5 h-5" aria-hidden="true"></span>
				{bot.cta}
			</a>
			<a href="#lifecycle" class="btn-ink text-lg">
				<span class="i-tabler-arrow-down w-5 h-5" aria-hidden="true"></span>
				See how a ticket moves
			</a>
		</div>

		<p
			class="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft mt-6 [animation:fade-up_0.7s_var(--ease-organic)_0.4s_both]"
		>
			Free. 13 permissions, and ban is not one of them.
		</p>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-12">
			{#each headline as item, i (item.name)}
				<div
					class="card-paper !bg-paper px-5 py-4 flex items-start gap-4 [transition:transform_0.4s_var(--ease-organic)] hover:rotate-0 {i %
						2 ===
					0
						? 'rotate-[-0.4deg]'
						: 'rotate-[0.4deg]'}"
				>
					<span class="shrink-0 text-leaf mt-0.5">
						<FeatureIcon name={item.icon} size={30} />
					</span>
					<div class="min-w-0">
						<h2 class="font-display font-semibold text-lg text-ink leading-snug">{item.name}</h2>
						<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1">{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ② specimen data strip ----------------------------------------------------------------- -->
<section class="px-5 sm:px-8" use:reveal>
	<div class="max-w-4xl mx-auto border-y border-ink/15 py-6 grid grid-cols-2 sm:grid-cols-4 gap-y-6">
		{#each specimen as datum (datum.label)}
			<div class="text-center">
				<span class="font-mono text-3xl text-ink block leading-none">{datum.value}</span>
				<span class="label-specimen mt-2 block">{datum.label}</span>
			</div>
		{/each}
	</div>
	<p class="annotation text-center max-w-2xl mx-auto mt-4">
		no install count yet: this bot is new, so we show its real numbers instead
	</p>
</section>

<!-- ③ THE LIFECYCLE CROSS-SECTION — the page's signature ---------------------------------- -->
<section id="lifecycle" class="scroll-mt-24 px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-6xl mx-auto text-center">
		<span class="label-specimen block mb-3">Figure 1 · The Life of a Ticket</span>
		<h2 class="font-display font-semibold text-3xl sm:text-5xl text-ink">
			One ticket, from start to end
		</h2>

		<div class="mt-10">
			<!-- prettier-ignore -->
			<svg class="w-full h-auto" viewBox="0 0 1000 420" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">

	<!-- hand-ruled frames, corners overshoot like quick pen work -->
	<path d="M 22 115 C 60 113 112 114 161 113 M 157 109 C 158 152 157 218 158 268 M 162 264 C 118 266 66 264 23 265 M 27 269 C 26 222 27 158 26 110" stroke="var(--ink-soft)" stroke-width="1.6" />
	<path d="M 178 123 C 216 121 268 123 317 122 M 313 118 C 314 158 313 226 314 276 M 318 271 C 274 273 222 272 179 273 M 183 276 C 182 228 183 166 182 118" stroke="var(--ink-soft)" stroke-width="1.6" />
	<path d="M 334 117 C 372 115 424 117 473 116 M 469 112 C 470 152 469 218 470 270 M 474 265 C 430 267 378 266 335 267 M 339 270 C 338 222 339 160 338 112" stroke="var(--ink-soft)" stroke-width="1.6" />
	<path d="M 490 125 C 528 123 580 125 629 124 M 625 120 C 626 160 625 228 626 278 M 630 273 C 586 275 534 274 491 275 M 495 278 C 494 230 495 168 494 120" stroke="var(--ink-soft)" stroke-width="1.6" />
	<path d="M 646 119 C 684 117 736 119 785 118 M 781 114 C 782 154 781 222 782 272 M 786 267 C 742 269 690 268 647 269 M 651 272 C 650 224 651 162 650 114" stroke="var(--ink-soft)" stroke-width="1.6" />
	<path d="M 838 111 C 878 109 930 111 977 110 M 973 106 C 974 150 973 222 974 276 M 978 271 C 934 273 880 272 839 273 M 843 276 C 842 226 843 160 842 106" stroke="var(--ink-soft)" stroke-width="1.6" />

	<!-- 1 opened : a bud just breaking, one petal tip showing -->
	<path d="M 60 246 C 74 244 88 246 102 245 C 112 244 118 246 124 245" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 92 245 C 91 233 93 222 92 210" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 92 210 C 81 204 76 192 80 181 C 84 172 92 168 99 171 C 104 182 103 200 92 210 Z" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 90 206 C 86 196 86 184 90 175" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 95 206 C 98 196 99 185 97 175" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 92 232 C 84 231 78 235 75 241" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 92 226 C 99 226 105 230 108 236" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 99 172 C 105 164 114 161 120 165 C 116 173 107 176 99 172 Z" stroke="var(--petal)" stroke-width="1.6" />

	<!-- 2 claimed : the same bud, wearing a tied string tag -->
	<path d="M 248 252 C 247 240 249 229 248 217" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 248 217 C 237 211 232 199 236 188 C 240 179 248 175 255 178 C 260 189 259 207 248 217 Z" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 246 213 C 242 203 242 191 246 182" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 251 214 C 254 204 255 192 253 182" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 256 200 C 262 209 266 219 270 229" stroke="var(--ink-soft)" stroke-width="1.2" />
	<circle cx="270" cy="230" r="2.2" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 271 229 C 282 232 293 235 304 238 C 302 244 301 249 299 254 C 288 251 277 248 267 245 C 268 240 269 234 271 229 Z" stroke="var(--ink-soft)" stroke-width="1.6" />
	<path d="M 281 241 C 287 242 292 243 297 245" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 279 247 C 285 248 290 249 295 250" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />

	<!-- 3 moved up a level : the stem climbs from a lower rung to a higher one -->
	<path d="M 354 240 C 370 238 386 240 402 239" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 408 178 C 424 176 440 178 456 177" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 358 244 C 368 243 378 243 388 242" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 412 182 C 422 181 432 181 442 180" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 378 240 C 382 222 390 205 402 192 C 408 185 416 180 425 176" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 392 208 C 384 205 378 198 377 189 C 386 191 392 200 392 208 Z" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 418 170 C 420 172 422 174 425 176" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 417 181 C 420 179 422 178 425 176" stroke="var(--leaf)" stroke-width="1.6" />

	<!-- 4 warned when quiet : the seedpod splits, seeds start to fall -->
	<path d="M 560 172 C 559 178 560 183 561 188" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 561 188 C 573 195 579 210 577 226 C 575 237 565 240 562 231 C 558 217 558 200 561 188 Z" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 560 188 C 549 191 537 202 532 215 C 528 226 535 235 543 228 C 553 219 559 203 560 188 Z" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 564 196 C 569 208 571 220 569 230" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 557 195 C 552 205 545 215 540 223" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 544 229 C 550 234 556 235 563 232" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<circle cx="555" cy="242" r="2.8" fill="var(--ink-soft)" />
	<circle cx="567" cy="250" r="2.5" fill="var(--ink-soft)" opacity="0.8" />
	<circle cx="551" cy="258" r="2.3" fill="var(--ink-soft)" opacity="0.65" />
	<path d="M 556 234 C 555 237 555 239 555 240" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 565 240 C 566 244 567 246 567 248" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 552 250 C 551 253 551 255 551 256" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />

	<!-- 5 closed : the bloom folded shut, petals wrapped inward -->
	<path d="M 716 252 C 715 242 717 231 718 222" stroke="var(--leaf)" stroke-width="1.6" />
	<path d="M 718 222 C 706 213 701 197 706 184 C 710 174 720 171 727 179 C 735 187 733 208 718 222 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 718 222 C 715 208 715 192 720 180" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 711 214 C 711 201 713 188 718 179" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 725 213 C 727 200 727 188 723 178" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 714 221 C 708 224 703 230 701 237" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 722 222 C 727 226 730 232 731 239" stroke="var(--leaf-soft)" stroke-width="1.2" />

	<!-- 6 transcript saved : the bloom pressed flat, mounted and sealed on a card -->
	<path d="M 856 140 C 884 138 912 135 940 132 C 942 164 944 196 946 228 C 916 231 886 234 860 237 C 858 205 857 172 856 140 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 858 141 C 864 140 870 140 876 139 C 871 145 866 151 862 157 C 860 152 859 146 858 141 Z" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 944 227 C 943 222 943 217 942 212 C 937 218 931 223 926 229 C 932 229 938 228 944 227 Z" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 900 180 C 890 177 882 170 880 162 C 889 162 897 170 900 180 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 900 180 C 896 170 895 159 899 151 C 905 157 906 170 900 180 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 900 180 C 906 171 914 164 922 163 C 921 171 911 178 900 180 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 900 180 C 909 182 917 187 920 194 C 912 197 903 190 900 180 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 900 180 C 894 184 887 191 886 199 C 893 199 899 190 900 180 Z" stroke="var(--ink)" stroke-width="1.6" />
	<circle cx="900" cy="180" r="3" fill="var(--petal)" />
	<path d="M 901 197 C 902 205 902 211 901 216" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 901 214 C 907 212 911 208 912 202 C 906 204 902 208 901 214 Z" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<path d="M 862 216 C 872 215 882 214 892 213 C 892 219 893 224 893 229 C 883 230 873 231 863 232 C 863 227 862 221 862 216 Z" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 867 221 C 874 220 880 220 886 219" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 867 226 C 873 225 879 225 885 224" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<circle cx="934" cy="146" r="3.6" stroke="var(--gold)" stroke-width="1.2" />
	<circle cx="934" cy="146" r="1.2" fill="var(--gold)" />

	<!-- ink arrows carry the thread from frame to frame -->
	<path d="M 162 192 C 167 190 172 191 177 190 M 171 186 C 173 187 175 189 177 190 M 170 195 C 172 193 175 191 177 190" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 318 190 C 323 188 328 189 333 188 M 327 184 C 329 185 331 187 333 188 M 326 193 C 328 191 331 189 333 188" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 474 192 C 479 190 484 191 489 190 M 483 186 C 485 187 487 189 489 190 M 482 195 C 484 193 487 191 489 190" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 630 191 C 635 189 640 190 645 189 M 639 185 C 641 186 643 188 645 189 M 638 194 C 640 192 643 190 645 189" stroke="var(--ink-soft)" stroke-width="1.2" />

	<!-- between 5 and 6 the thread is broken: the transcript is a later act -->
	<path d="M 786 190 C 792 189 797 190 802 189" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 802 189 C 805 187 807 184 808 181" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 802 190 C 805 191 807 193 809 196" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 825 188 C 830 187 835 188 839 187" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 825 188 C 822 186 820 183 819 180" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 825 189 C 822 190 820 192 818 195" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />

	<!-- leader lines to the margin notes -->
	<path d="M 636 312 C 608 334 540 348 458 353" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 812 258 C 813 284 815 310 817 334" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />

	<!-- specimen numerals -->
	<text x="36" y="138" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">1</text>
	<text x="192" y="146" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">2</text>
	<text x="348" y="140" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">3</text>
	<text x="504" y="148" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">4</text>
	<text x="660" y="142" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">5</text>
	<text x="852" y="134" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">6</text>

	<!-- hand-lettered captions -->
	<text x="92" y="292" text-anchor="middle" font-family="var(--font-hand)" font-size="22" fill="var(--ink-soft)">opened</text>
	<text x="248" y="300" text-anchor="middle" font-family="var(--font-hand)" font-size="22" fill="var(--ink-soft)">claimed</text>
	<text x="398" y="292" text-anchor="middle" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">moved up a level</text>
	<text x="566" y="302" text-anchor="middle" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">warned when quiet</text>
	<text x="716" y="296" text-anchor="middle" font-family="var(--font-hand)" font-size="22" fill="var(--ink-soft)">closed</text>
	<text x="908" y="300" text-anchor="middle" font-family="var(--font-hand)" font-size="22" fill="var(--ink-soft)">transcript saved</text>

	<!-- margin notes -->
	<text x="340" y="378" text-anchor="middle" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">the warning always comes before the close</text>
	<text x="815" y="362" text-anchor="middle" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">the transcript is written later,</text>
	<text x="815" y="386" text-anchor="middle" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">when the ticket is deleted</text>
</svg>
		</div>

		<p class="annotation text-center max-w-3xl mx-auto mt-6">
			opened, claimed, moved up, warned when it went quiet, closed. the transcript is sent only when
			the ticket is deleted
		</p>

		<div class="flex justify-center mt-8 opacity-60" aria-hidden="true">
			<Sprig size={54} color="var(--leaf-soft)" />
		</div>
	</div>
</section>

<!-- ④ four shapes ------------------------------------------------------------------------- -->
<section class="px-5 sm:px-8 pb-20" use:reveal>
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-10">
			<span class="label-specimen block mb-3">Plate II·a · Four Shapes</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">
				A ticket does not have to be a channel
			</h2>
			<p class="text-lg text-ink-soft max-w-2xl mx-auto mt-3">
				4 shapes, and every ticket system picks its own. 2 of them keep the member in their DMs the
				whole time.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			{#each shapes as shape, i (shape.key)}
				<div
					class="card-paper px-6 py-5 [transition:transform_0.4s_var(--ease-organic),box-shadow_0.4s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-3px] hover:shadow-press-lg {i %
						2 ===
					0
						? 'rotate-[-0.6deg]'
						: 'rotate-[0.6deg]'}"
					use:reveal={{ delay: (i % 2) * 0.08 }}
				>
					<span class="label-specimen block">{shape.key}</span>
					<h3 class="font-display font-semibold text-2xl text-ink mt-1">{shape.title}</h3>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-2">{shape.blurb}</p>
					<p class="flex items-center gap-2 font-mono text-xs text-ink-soft mt-4">
						<span class="i-tabler-hash w-4 h-4 shrink-0" aria-hidden="true"></span>
						{shape.note}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ⑤ the DM relay, on an inverted plate --------------------------------------------------- -->
<section class="relative">
	<TornEdge fill="var(--plate)" />

	<div class="bg-plate text-paper pt-14 pb-16 px-5 sm:px-8">
		<div class="max-w-5xl mx-auto">
			<div class="text-center" use:reveal>
				<span class="label-specimen !text-leaf-soft block mb-3">Figure 2 · The Relay</span>
				<div class="flex justify-center mb-4 text-leaf-soft">
					<FeatureIcon name="relay" size={44} />
				</div>
				<h2 class="font-display font-semibold text-3xl sm:text-5xl text-paper">
					Two places, one conversation
				</h2>
				<p class="text-lg text-leaf-soft max-w-2xl mx-auto mt-4">
					The member sees a direct message. Your team sees a staff channel. The bot sits between them,
					and you control what the member sees.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
				{#each relayPoints as point, i (point.name)}
					<div
						class="bg-plate-soft border border-plate-line rounded-[0.4rem_1.2rem_0.5rem_1.4rem] px-6 py-5"
						use:reveal={{ delay: (i % 2) * 0.08 }}
					>
						<h3 class="font-display font-semibold text-xl text-paper leading-snug">{point.name}</h3>
						<p class="text-[0.95rem] text-leaf-soft leading-relaxed mt-2">{point.desc}</p>
					</div>
				{/each}
			</div>

			<p class="font-mono text-xs text-leaf-soft text-center mt-8">
				You choose the prefixes. If the list is empty, every staff message goes to the member.
			</p>
		</div>
	</div>

	<TornEdge fill="var(--paper)" flip />
</section>

<!-- ⑥ escalation as a growing ladder ------------------------------------------------------- -->
<section class="px-5 sm:px-8 py-20" use:reveal>
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-10">
			<span class="label-specimen block mb-3">Plate II·b · The Ladder</span>
			<div class="flex justify-center mb-4 text-leaf">
				<FeatureIcon name="leveling" size={54} />
			</div>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">
				Tickets move up through tiers you create
			</h2>
			<p class="text-lg text-ink-soft max-w-2xl mx-auto mt-3">
				A tier is a row you create: a name, a rank, the roles that can claim it, where its tickets go,
				and how long a ticket may wait there. When a ticket moves up, the bot moves it into the new
				tier’s category, channel or forum tag.
			</p>
		</div>

		<ol class="relative max-w-2xl mx-auto border-l-2 border-leaf/40 pl-8 space-y-7">
			{#each tiers as tier, i (tier.rung)}
				<li class="relative" use:reveal={{ delay: i * 0.08 }}>
					<span
						class="absolute -left-[2.6rem] top-1 w-5 h-5 rounded-full border-[1.6px] border-leaf bg-paper"
						aria-hidden="true"
					></span>
					<span class="label-specimen block">{tier.rung}</span>
					<h3 class="font-display font-semibold text-xl text-ink mt-0.5">{tier.title}</h3>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1">{tier.desc}</p>
				</li>
			{/each}
		</ol>

		<p class="annotation text-center max-w-2xl mx-auto mt-8">
			another staff member can take a claimed ticket only if you allow take-over, and only if their
			tier rank is higher
		</p>
	</div>
</section>

<!-- ⑦ snippets & staff threads ------------------------------------------------------------- -->
<section class="px-5 sm:px-8 pb-20" use:reveal>
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-10">
			<span class="label-specimen block mb-3">Plate II·c · For the Team</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">
				The parts only staff ever see
			</h2>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			<div class="card-paper px-6 py-6 rotate-[-0.5deg]" use:reveal>
				<span class="flex items-center gap-2 label-specimen">
					<span class="i-tabler-pencil w-4 h-4" aria-hidden="true"></span>
					Snippets
				</span>
				<h3 class="font-display font-semibold text-2xl text-ink mt-2">One saved reply, two texts</h3>
				<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-2">
					A snippet is a saved reply with two texts: one for the member and one for staff. One shortcut
					sends the answer to the member and a note to the team at the same time. The bot fills in these
					placeholders before it sends anything:
				</p>
				<div class="flex flex-wrap gap-2 mt-4">
					{#each snippetVars as variable (variable)}
						<code class="code">{variable}</code>
					{/each}
				</div>
			</div>

			<div class="card-paper px-6 py-6 rotate-[0.5deg]" use:reveal={{ delay: 0.08 }}>
				<span class="flex items-center gap-2 label-specimen">
					<span class="i-tabler-message-circle w-4 h-4" aria-hidden="true"></span>
					Staff threads
				</span>
				<h3 class="font-display font-semibold text-2xl text-ink mt-2">A private space for the team</h3>
				<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-2">
					Turn staff threads on, and every new ticket also opens a private thread for the team. Staff can
					agree on an answer there before anyone sends it. The thread can sit on the ticket itself or on
					one channel you choose.
				</p>
				<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-3">
					<strong class="text-ink">Channel and Thread tickets only.</strong> A DM ticket has no channel in
					your server, so there is nothing to attach a thread to.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ⑧ the one feature list ----------------------------------------------------------------- -->
<section class="px-5 sm:px-8 pb-20" use:reveal>
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-10">
			<span class="label-specimen block mb-3">Plate II·d · The Index</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">Everything it does</h2>
			<div class="flex justify-center mt-4" aria-hidden="true">
				<Flourish width={240} color="var(--ink-faint)" />
			</div>
		</div>

		<ul class="column-count-1 sm:column-count-2 gap-x-12">
			{#each everything as item (item.name)}
				<li class="break-inside-avoid flex items-start gap-3 mb-5">
					<span class="i-tabler-leaf w-4 h-4 shrink-0 mt-1.5 text-leaf" aria-hidden="true"></span>
					<span class="text-[0.98rem] text-ink-soft leading-relaxed">
						<strong class="font-display font-semibold text-ink">{item.name}</strong>: {item.desc}
					</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ⑨ reminders & auto-close --------------------------------------------------------------- -->
<section class="px-5 sm:px-8 pb-20" use:reveal>
	<div class="max-w-5xl mx-auto">
		<div class="text-center mb-10">
			<span class="label-specimen block mb-3">Plate II·e · Nothing Sits Forgotten</span>
			<div class="flex justify-center mb-4 text-gold">
				<span class="i-tabler-bell w-9 h-9" aria-hidden="true"></span>
			</div>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">
				It warns first, then it closes
			</h2>
			<p class="text-lg text-ink-soft max-w-2xl mx-auto mt-3">
				4 timers watch each ticket, and all of them are off until you set a time. The close timer starts
				only after the warning.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each jobs as job, i (job.kind)}
				<div
					class="card-paper !bg-paper px-5 py-5 {i % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'}"
					use:reveal={{ delay: (i % 4) * 0.08 }}
				>
					<code class="code text-[0.7rem]">{job.kind}</code>
					<h3 class="font-display font-semibold text-lg text-ink mt-3">{job.title}</h3>
					<p class="text-[0.9rem] text-ink-soft leading-relaxed mt-1">{job.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ⑩ permissions & scope ------------------------------------------------------------------ -->
<section class="px-5 sm:px-8 pb-20" use:reveal>
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-10">
			<span class="label-specimen block mb-3">Specimen Label · Scope</span>
			<div class="flex justify-center mb-4 text-moss">
				<FeatureIcon name="security" size={44} />
			</div>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">
				13 permissions. Ban is not one of them.
			</h2>
			<p class="text-lg text-ink-soft max-w-2xl mx-auto mt-3">
				This bot is Ayako’s ticket system, on its own. Your server can run a support desk without giving
				it any moderation power.
			</p>
		</div>

		<div class="relative card-paper px-6 py-7 sm:px-10 sm:py-9">
			<Tape angle={3} width={88} class="-top-3 right-8" />

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
				<div>
					<span class="label-specimen block pb-2 border-b border-ink/15">It asks for</span>
					<ul class="mt-3 space-y-1.5">
						{#each permissions as permission, i (permission)}
							<li class="flex items-baseline gap-3 font-mono text-[0.8rem] text-ink">
								<span class="text-ink-faint w-5 shrink-0 text-right">
									{String(i + 1).padStart(2, '0')}
								</span>
								{permission}
							</li>
						{/each}
					</ul>
				</div>

				<div>
					<span class="label-specimen block pb-2 border-b border-ink/15">It never asks for</span>
					<ul class="mt-3 space-y-1.5">
						{#each notAsked as permission (permission)}
							<li
								class="flex items-baseline gap-3 font-mono text-[0.8rem] text-ink-soft line-through decoration-petal decoration-2"
							>
								<span class="text-ink-faint w-5 shrink-0 text-right">–</span>
								{permission}
							</li>
						{/each}
					</ul>
					<p class="annotation mt-6">the main Ayako bot needs those. a support desk does not.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ⑪ FAQ ---------------------------------------------------------------------------------- -->
<section class="px-5 sm:px-8 pb-20" use:reveal>
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-10">
			<span class="label-specimen block mb-3">Plate II·f · Questions Asked</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">
				What people want to know
			</h2>
		</div>

		{#each faq as entry, i (entry.q)}
			<div use:reveal={{ delay: (i % 2) * 0.08 }}>
				<h3 class="annotation text-2xl text-ink">{entry.q}</h3>
				<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">{entry.a}</p>
				{#if i < faq.length - 1}
					<div class="flex justify-center my-8 opacity-60" aria-hidden="true">
						<Flourish width={180} color="var(--ink-faint)" />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<!-- ⑫ closing CTA -------------------------------------------------------------------------- -->
<section class="relative">
	<TornEdge fill="var(--plate)" />

	<div class="bg-plate text-paper py-20 px-5 text-center overflow-hidden">
		<div class="max-w-2xl mx-auto" use:reveal>
			<span class="label-specimen !text-leaf-soft block mb-4">One Last Thing</span>
			<h2 class="font-display font-semibold text-3xl sm:text-5xl text-paper">
				Let your members open tickets from their DMs
			</h2>
			<p class="text-lg text-leaf-soft leading-relaxed mt-5">
				{bot.name} is free. It asks for 13 permissions, and ban is not one of them.
			</p>

			<div class="flex items-center justify-center gap-4 sm:gap-8 mt-10">
				<span class="hidden sm:block rotate-[28deg] translate-y-2" aria-hidden="true">
					<Sprig size={64} color="var(--leaf-soft)" />
				</span>

				<a href={bot.invite} target="_blank" onclick={trackInviteClick} class="btn-paper text-lg">
					<span class="i-tabler-seeding w-5 h-5" aria-hidden="true"></span>
					{bot.cta}
				</a>

				<span class="hidden sm:block -rotate-[28deg] translate-y-2" aria-hidden="true">
					<Sprig size={64} color="var(--leaf-soft)" />
				</span>
			</div>
		</div>
	</div>
</section>
