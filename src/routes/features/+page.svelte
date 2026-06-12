<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { reveal } from '$lib/scripts/util/reveal';
	import { trackInviteClick } from '$lib/scripts/tracking';

	type IconName =
		| 'moderation'
		| 'security'
		| 'leveling'
		| 'roles'
		| 'logging'
		| 'welcome'
		| 'giveaways'
		| 'suggestions'
		| 'economy'
		| 'roleplay'
		| 'utility'
		| 'power';

	type Chapter = {
		id: string;
		numeral: string;
		icon: IconName;
		accent: string;
		title: string;
		blurb: string;
		highlights: { name: string; desc: string }[];
		more: string[];
	};

	const chapters: Chapter[] = [
		{
			id: 'moderation',
			numeral: 'I',
			icon: 'moderation',
			accent: 'var(--moss)',
			title: 'Moderation',
			blurb: 'A complete toolkit to keep your community safe and healthy.',
			highlights: [
				{
					name: 'Strike system',
					desc: 'Warnings that automatically lead to stronger punishments. You set the steps.',
				},
				{
					name: 'Temporary punishments',
					desc: 'Temp-bans, timed mutes and channel bans that end on their own, right on time.',
				},
				{
					name: 'Appeals',
					desc:
						'Punished members can explain themselves in forms you create - right here on this website.',
				},
				{
					name: 'Punishment history',
					desc: 'See any member’s history, forgive entries, and let old records expire.',
				},
			],
			more: [
				'Ban & soft-ban',
				'Kick',
				'Mute & unmute',
				'Warn & soft-warn',
				'Channel bans',
				'Voice mute & deafen',
				'Purge',
				'Unban',
				'Per-user bypasses',
			],
		},
		{
			id: 'auto-moderation',
			numeral: 'II',
			icon: 'security',
			accent: 'var(--petal)',
			title: 'Auto-Moderation',
			blurb: 'Stops trouble before it spreads - automatically.',
			highlights: [
				{
					name: 'Anti-spam',
					desc: 'Catches message floods the moment they start.',
				},
				{
					name: 'Anti-virus',
					desc: 'Checks posted links against always-updated lists of dangerous websites.',
				},
				{
					name: 'Censor',
					desc: 'Filters words and patterns you choose - extremely fast.',
				},
				{
					name: 'Anti-raid',
					desc: 'Notices when many accounts join at once and protects your server.',
				},
			],
			more: [
				'Invite filter',
				'Newline filter',
				'Discord AutoMod integration',
				'Auto-punish ladder',
				'Vote-to-punish',
				'Command cooldowns',
			],
		},
		{
			id: 'leveling',
			numeral: 'III',
			icon: 'leveling',
			accent: 'var(--leaf)',
			title: 'Leveling',
			blurb: 'Watch members grow - and reward them as they do.',
			highlights: [
				{
					name: 'Text & voice XP',
					desc: 'Earn XP by chatting and by spending time in voice channels.',
				},
				{
					name: 'Rank cards',
					desc: 'Beautiful /rank cards, drawn by the bot itself.',
				},
				{
					name: 'Level roles',
					desc: 'Automatic role rewards at the levels you choose.',
				},
				{
					name: 'Multipliers',
					desc: 'Give some channels or roles more XP, with separate settings for text and voice.',
				},
			],
			more: [
				'Leaderboards',
				'Level-up announcements',
				'React-to-level rule channels',
				'Block- & allowlists',
				'Resets & overrides',
			],
		},
		{
			id: 'roles-economy',
			numeral: 'IV',
			icon: 'roles',
			accent: 'var(--gold)',
			title: 'Roles & Economy',
			blurb: 'Roles for everyone - given, chosen, earned, or bought.',
			highlights: [
				{
					name: 'Self, button & reaction roles',
					desc: 'Three ways for members to pick their own roles.',
				},
				{
					name: 'Sticky roles & permissions',
					desc: 'Roles and permissions come back when members rejoin.',
				},
				{
					name: 'Custom roles',
					desc: 'Personal roles members can name and color themselves.',
				},
				{
					name: 'Role shop',
					desc: 'Earn currency by chatting, spend it on roles and items in /shop.',
				},
			],
			more: [
				'Auto-roles on join',
				'Role rewards',
				'Role separators',
				'Linked roles',
				'Ping reporter',
				'Balance & currency',
			],
		},
		{
			id: 'community',
			numeral: 'V',
			icon: 'welcome',
			accent: 'var(--blossom)',
			title: 'Community & Engagement',
			blurb: 'Everything that makes a server feel alive: welcomes, events, and gifts.',
			highlights: [
				{
					name: 'Welcome & verification',
					desc: 'Custom welcome messages with images, plus captcha checks for new members.',
				},
				{
					name: 'Giveaways',
					desc: 'Timed giveaways with role requirements, fair winners, and rerolls.',
				},
				{
					name: 'Voice hubs',
					desc: 'Members get their own voice channel by joining the hub, and manage it with /vc.',
				},
				{
					name: 'Tickets',
					desc: 'Support tickets in channels or in DMs - easy to keep organized.',
				},
			],
			more: [
				'Suggestions with voting',
				'Scheduled events',
				'Sticky messages',
				'AFK statuses',
				'Reminders',
				'Vote rewards',
				'Booster perks & tiers',
				'Disboard bump reminders',
				'Embed builder',
				'Invite tracking',
				'Member count',
			],
		},
		{
			id: 'roleplay',
			numeral: 'VI',
			icon: 'roleplay',
			accent: 'var(--petal)',
			title: 'Fun & Roleplay',
			blurb: 'More than 80 ways to hug, pat, boop and bonk your friends.',
			highlights: [
				{
					name: '80+ roleplay actions',
					desc: 'Use /rp or classic commands - every action comes with hand-picked GIFs.',
				},
				{
					name: 'React back',
					desc: 'Friends can react back with one click.',
				},
				{
					name: 'Image lookups',
					desc: '/images finds the right picture for the moment.',
				},
				{
					name: 'Playful extras',
					desc: 'Fun little commands for when chat gets quiet.',
				},
			],
			more: ['hug', 'pat', 'kiss', 'cuddle', 'bonk', 'boop', '…and dozens more'],
		},
		{
			id: 'logging',
			numeral: 'VII',
			icon: 'logging',
			accent: 'var(--ink-soft)',
			title: 'Logging',
			blurb: 'A complete record of everything that happens in your server.',
			highlights: [
				{
					name: '18 log categories',
					desc:
						'Messages, members, roles, channels, voice, invites, webhooks and more - each in its own channel.',
				},
				{
					name: 'Who did it',
					desc: 'Logs show who did it, not just what happened.',
				},
				{
					name: 'Moderation log',
					desc: 'Every mod action saved with full detail.',
				},
				{
					name: 'Settings log',
					desc: 'A record of every settings change.',
				},
			],
			more: [
				'Emoji & sticker events',
				'Stage events',
				'Scheduled events',
				'Typing events',
				'Application events',
				'DM logs',
			],
		},
		{
			id: 'utility',
			numeral: 'VIII',
			icon: 'utility',
			accent: 'var(--moss)',
			title: 'Utility & Info',
			blurb: 'Small tools you will use every day.',
			highlights: [
				{
					name: 'Server & user info',
					desc: '/server, /user and /info - every detail in one view.',
				},
				{
					name: 'Emoji & sticker management',
					desc: 'Add, edit and organize emojis with /emoji and /stickers.',
				},
				{
					name: 'View raw',
					desc: 'Look at any message’s raw data.',
				},
				{
					name: 'Custom embeds',
					desc: 'Build, save and send rich embeds with /embed-builder.',
				},
			],
			more: ['/ping', '/membercount', '/help'],
		},
		{
			id: 'power',
			numeral: 'IX',
			icon: 'power',
			accent: 'var(--gold)',
			title: 'Power Features',
			blurb: 'For big servers - deep settings and full control.',
			highlights: [
				{
					name: 'Your own bot identity',
					desc: 'Run Ayako as your own bot - with your name and your avatar.',
				},
				{
					name: '44 settings categories',
					desc: 'Change every setting right inside Discord with /settings.',
				},
				{
					name: 'Two languages',
					desc: 'Fully translated into English and German.',
				},
				{
					name: 'Slash & classic commands',
					desc: 'All moderation and roleplay commands also work as classic text commands.',
				},
			],
			more: [],
		},
	];

	const stats = [
		{ value: '30+', label: 'Slash Commands' },
		{ value: '80+', label: 'Roleplay Actions' },
		{ value: '18', label: 'Log Categories' },
		{ value: '44', label: 'Setting Groups' },
	];
</script>

<svelte:head>
	<title>Ayako - The Complete Field Guide</title>
	<meta
		name="description"
		content="Everything Ayako can do: moderation, auto-moderation, leveling, roles, giveaways, tickets, voice hubs, logging, roleplay, and more."
	/>
	<link rel="canonical" href="https://ayakobot.com/features" />
</svelte:head>

<div class="max-w-5xl mx-auto px-5 sm:px-8 py-14">
	<!-- header -->
	<header class="text-center relative" use:reveal>
		<div
			class="absolute -top-6 left-1/2 -ml-32 sm:-ml-48 opacity-25 pointer-events-none [animation:sway_11s_ease-in-out_infinite]"
			aria-hidden="true"
		>
			<Bloom size={180} color="var(--petal-soft)" />
		</div>

		<span class="label-specimen block mb-3">The Complete Field Guide</span>
		<h1 class="font-display font-semibold text-4xl sm:text-6xl text-ink">Everything Ayako can do</h1>
		<p class="annotation text-2xl mt-2">the full list</p>
		<p class="text-lg text-ink-soft max-w-xl mx-auto mt-5">
			Nine chapters covering everything Ayako can do for your server. All of it free.
		</p>

		<div class="flex flex-wrap items-start justify-center gap-x-10 gap-y-4 mt-9">
			{#each stats as stat (stat.label)}
				<div class="flex flex-col items-center">
					<span class="font-mono text-3xl text-ink">{stat.value}</span>
					<span class="label-specimen mt-1">{stat.label}</span>
				</div>
			{/each}
		</div>

		<div class="flex justify-center mt-9" aria-hidden="true">
			<Flourish width={240} color="var(--ink-faint)" />
		</div>
	</header>

	<!-- table of contents -->
	<nav class="flex flex-wrap justify-center gap-2.5 mt-10" aria-label="Chapters" use:reveal>
		{#each chapters as chapter (chapter.id)}
			<a
				href="#{chapter.id}"
				class="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft border border-ink/20 bg-paper-warm px-3.5 py-1.5 rounded-[1rem_0.3rem_1rem_0.3rem] [transition:color_0.3s,border-color_0.3s,transform_0.3s_var(--ease-organic)] hover:text-petal hover:border-petal hover:translate-y-[-2px] hover:rotate-[-1deg]"
			>
				{chapter.numeral} · {chapter.title}
			</a>
		{/each}
	</nav>

	<!-- chapters -->
	{#each chapters as chapter, ci (chapter.id)}
		<section id={chapter.id} class="scroll-mt-24 mt-20" use:reveal>
			<div class="flex items-start gap-5">
				<span
					class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current flex items-center justify-center bg-paper {ci %
						2 ===
					0
						? 'rotate-[-3deg]'
						: 'rotate-[2.5deg]'}"
					style="color: {chapter.accent};"
				>
					<FeatureIcon name={chapter.icon} size={36} />
				</span>
				<div class="min-w-0">
					<span class="label-specimen block">Chapter {chapter.numeral}</span>
					<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
						{chapter.title}
					</h2>
					<p class="annotation text-xl mt-1">{chapter.blurb}</p>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
				{#each chapter.highlights as highlight, hi (highlight.name)}
					<div
						class="card-paper !bg-paper px-5 py-4 [transition:transform_0.4s_var(--ease-organic),box-shadow_0.4s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-3px] hover:shadow-[0_2px_4px_rgba(44,38,24,0.1),0_12px_28px_rgba(44,38,24,0.14)] {hi %
							2 ===
						0
							? 'rotate-[-0.35deg]'
							: 'rotate-[0.35deg]'}"
						use:reveal={{ delay: (hi % 2) * 0.08 }}
					>
						<h3 class="font-display font-semibold text-lg text-ink leading-snug">
							{highlight.name}
						</h3>
						<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1">{highlight.desc}</p>
					</div>
				{/each}
			</div>

			{#if chapter.more.length}
				<div class="flex flex-wrap items-center gap-2 mt-5">
					<span class="label-specimen mr-1">Also in this chapter:</span>
					{#each chapter.more as item (item)}
						<span
							class="font-mono text-xs text-ink-soft border border-ink/15 bg-paper-warm px-2.5 py-1 rounded-[0.8rem_0.25rem_0.8rem_0.25rem]"
						>
							{item}
						</span>
					{/each}
				</div>
			{/if}

			{#if ci < chapters.length - 1}
				<div class="flex justify-center mt-16 opacity-50" aria-hidden="true">
					<Sprig
						size={46}
						color="var(--leaf-soft)"
						class={ci % 2 === 0 ? 'rotate-[100deg]' : 'rotate-[-100deg]'}
					/>
				</div>
			{/if}
		</section>
	{/each}

	<!-- closing CTA -->
	<section class="text-center mt-24 relative" use:reveal>
		<div
			class="absolute -top-10 right-2 sm:right-16 opacity-30 pointer-events-none rotate-[15deg]"
			aria-hidden="true"
		>
			<Sprig size={110} color="var(--leaf-soft)" />
		</div>

		<span class="label-specimen block mb-3">The End</span>
		<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">
			Want all of this in your server?
		</h2>
		<p class="text-lg text-ink-soft max-w-lg mx-auto mt-3">
			Every chapter above, free forever - no credit card, no paywall.
		</p>

		<div class="flex flex-wrap justify-center gap-4 mt-8">
			<a
				href="https://invite.ayakobot.com"
				target="_blank"
				onclick={trackInviteClick}
				class="btn-petal text-lg"
			>
				<span class="i-tabler-seeding w-5 h-5" aria-hidden="true"></span>
				Add Ayako to Discord
			</a>
			<a href="https://discord.gg/euTdctganf" target="_blank" class="btn-ink text-lg">
				<span class="i-tabler-message-circle w-5 h-5" aria-hidden="true"></span>
				Ask us anything
			</a>
		</div>
	</section>
</div>
