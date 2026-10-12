<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import TornEdge from '$lib/components/design/TornEdge.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { bots } from '$lib/scripts/bots';
	import { trackInviteClick } from '$lib/scripts/tracking';
	import { reveal } from '$lib/scripts/util/reveal';

	/*
	 * PLATE VII - Ayako | AFK.
	 *
	 * Every figure and claim on this page traces to ads/copy/afk.md, which carries
	 * a per-claim ledger with file and line numbers, read at Service commit d2f0f97
	 * (2026-10-05).
	 *
	 * NOT claimed anywhere here, all for want of backing:
	 *   - that a prefix or the ping previews work with this bot alone: the AFK bot's
	 *     gateway connection has no Message Content intent (Gateway bots.ts:60-63),
	 *     so both need a bot in the server that can read messages
	 *   - that a mention prefix works without such a bot (plausible, untested)
	 *   - DMs or account installs: /afk is Guild context and GuildInstall only
	 *   - languages other than English (Plugin.ts:59-61)
	 */

	const bot = bots.afk;

	/** Section 1 - the four above-the-fold cards. */
	const headline: {
		icon: 'afk' | 'roles' | 'relay' | 'welcome';
		title: string;
		body: string;
	}[] = [
		{
			icon: 'afk',
			title: 'One command, and a reason',
			body:
				'Run /afk and add a reason if you like. The bot posts a short line in the channel: you went AFK, with your reason under it.',
		},
		{
			icon: 'roles',
			title: 'Your name says it too',
			body:
				'The bot adds [AFK] to your nickname when it can. If it cannot, the AFK line tells you why. The tag comes off when you are back.',
		},
		{
			icon: 'relay',
			title: 'Whoever mentions you is told',
			body:
				'When someone mentions you or replies to you, the bot answers that you are AFK and since when, with your reason. The notice deletes itself after 10 seconds.',
		},
		{
			icon: 'welcome',
			title: 'Come back to your pings',
			body:
				'Send a message and you are back. The bot says how long you were away and lists the pings you missed, each with a link to the message.',
		},
	];

	/** Section 3 - from the command to your return, from Classes/Afk.ts. */
	const steps = [
		{
			title: 'Go AFK',
			body:
				'Run /afk, with a reason if you want. The bot posts a short public line: you went AFK, with your reason under it. Messages in the next minute will not end it.',
		},
		{
			title: 'Your name shows it',
			body:
				'The bot adds [AFK] to the end of your nickname, or AFK if your name is long, within the 32 characters Discord allows. If it cannot, the AFK line says why.',
		},
		{
			title: 'Someone mentions you',
			body:
				'When someone mentions you or replies to you, the bot answers that you are AFK and since when, with your reason. The notice deletes itself after 10 seconds. The ping is kept.',
		},
		{
			title: 'Come back',
			body:
				'Send a message, at least a minute after going AFK. The bot replies "Welcome Back!" with how long you were away and a list of who pinged you. The tag comes off.',
		},
	];

	/** Section 4 - the return message and its buttons, from Afk.ts remove/restore/dmPings. */
	const returnItems = [
		{
			title: 'Pings while you were away',
			body:
				'The bot keeps the last 20 mentions and replies you got while AFK, who sent each and a link. The return message lists up to 10 and counts the rest.',
		},
		{
			title: 'Re-set AFK state',
			body:
				'If a message ended your AFK by accident, press this within 2 minutes. Your AFK comes back with the same reason, and your pings so far are kept.',
		},
		{
			title: 'DM me this',
			body:
				'Shown when you had pings. The summary goes to your DMs, where each ping can show the first 80 characters of its message, if a reading bot such as Ayako is present.',
		},
	];

	/** Section 6 - moderators, the message prefix and ignored channels, from mod.ts, prefixAdvert.ts and Plugin.ts. */
	const extras = [
		{
			title: 'Tools for moderators',
			body:
				'By default, members with Manage Server get three tools. /mod afk list shows who is AFK, longest first, with the start of each reason. /mod afk clear ends a member’s AFK and discards their pings. /mod afk reset-reason removes the reason and keeps them AFK.',
		},
		{
			title: 'Go AFK by message',
			body:
				'Set a prefix of up to 10 characters, or a mention of the bot, in /settings general afk. With a comma, members write ,afk brb. A plain prefix needs a bot that reads messages in the server, such as Ayako or Ayako | Ticketing.',
		},
		{
			title: 'Ignored channels',
			body:
				'In /settings general afk a server can mark channels as ignored. Messages you send in those channels do not end your AFK. A message anywhere else brings you back.',
		},
	];

	/** Section 8 - FAQ. Every answer traceable to the ledger in ads/copy/afk.md. */
	const faq = [
		{
			q: 'How do I stop being AFK?',
			a: 'Send a message in the server, at least one minute after going AFK. Messages in channels the server has set as ignored do not count. The bot replies "Welcome Back!" and the tag comes off. If that was an accident, press "Re-set AFK state" within 2 minutes. A moderator can also end it with /mod afk clear.',
		},
		{
			q: 'Why does it need Manage Nicknames?',
			a: 'Only for the [AFK] tag. The bot adds it to your nickname, or AFK if your name is long, and takes it off when you are back. If there is no tag, the AFK line says why: your name is too long, you own the server (bots cannot change the owner’s nickname), or the bot could not change it.',
		},
		{
			q: 'Can I choose who may use /afk?',
			a: 'Yes, with Discord’s own command permissions. Open Server Settings, then Integrations, then the bot, and set who may use /afk. The same choice applies to going AFK by message. The bot’s own settings, in /settings general afk, need Manage Server: the longest reason allowed, the prefix and the ignored channels. Who may use /mod is set the same way.',
		},
		{
			q: 'What does it keep about me?',
			a: 'One small record while you are AFK: your user ID, the server ID, your reason and when you went AFK. It is deleted when you come back. Your last 20 pings are kept for up to 30 days or until you return. A preview in your DMs shows at most 80 characters, after your server’s AutoMod rules.',
		},
		{
			q: 'Does it work in every server I am in?',
			a: 'Only in servers where the bot is added, and each server on its own. Going AFK in one server changes nothing in another. It works in servers only. It cannot be added to your own account, and you cannot run it in DMs; the "DM me this" button still sends your summary there. Its messages are in English only.',
		},
	];
</script>

<svelte:head>
	<title>Ayako | AFK: a note for whoever mentions you</title>
	<meta
		name="description"
		content="AFK for Discord. Run /afk with an optional reason. Whoever mentions you is told you are away. Come back and the bot lists who pinged you. Free, no paid plan."
	/>
	<link rel="canonical" href="https://ayakobot.com/bots/afk" />
</svelte:head>

<!-- ══ 1 · hero ══════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
	<PetalDrift count={5} />

	<div class="relative z-1 max-w-3xl mx-auto text-center">
		<span
			class="inline-flex items-center justify-center w-20 h-20 rounded-full border-[1.6px] border-current bg-paper rotate-[-3deg] [animation:fade-up_0.7s_var(--ease-organic)_both]"
			style="color: var(--ink-soft);"
		>
			<FeatureIcon name="afk" size={42} />
		</span>

		<span
			class="label-specimen block mt-6 mb-3 [animation:fade-up_0.7s_0.08s_var(--ease-organic)_both]"
		>
			Plate VII · The Bookmark
		</span>

		<h1
			class="font-display font-semibold text-4xl sm:text-6xl text-ink leading-[1.08] [animation:fade-up_0.7s_0.16s_var(--ease-organic)_both]"
		>
			A note for whoever mentions you
		</h1>

		<p
			class="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto mt-6 [animation:fade-up_0.7s_0.24s_var(--ease-organic)_both]"
		>
			Type <span class="code">/afk</span>, with a reason if you want. Whoever mentions you is told you
			are away, and when you come back the bot lists who pinged you.
		</p>

		<div
			class="flex flex-col items-center gap-4 mt-9 [animation:fade-up_0.7s_0.32s_var(--ease-organic)_both]"
		>
			<a
				href={bot.invite}
				target="_blank"
				rel="noopener"
				onclick={trackInviteClick}
				class="btn-petal text-lg"
			>
				<span class="i-tabler-seeding w-5 h-5" aria-hidden="true"></span>
				{bot.cta}
			</a>
		</div>
	</div>

	<!-- the four above-the-fold features -->
	<div class="relative z-1 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14">
		{#each headline as feature, fi (feature.title)}
			<div
				class="card-paper !bg-paper px-6 py-5 [transition:transform_0.4s_var(--ease-organic),box-shadow_0.4s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-3px] hover:shadow-press-lg {fi %
					2 ===
				0
					? 'rotate-[-0.4deg]'
					: 'rotate-[0.4deg]'}"
				use:reveal={{ delay: fi * 0.08 }}
			>
				<div class="flex items-start gap-4">
					<span class="shrink-0 mt-0.5" style="color: var(--ink-soft);">
						<FeatureIcon name={feature.icon} size={30} />
					</span>
					<div class="min-w-0">
						<h2 class="font-display font-semibold text-lg text-ink leading-snug">
							{feature.title}
						</h2>
						<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1.5">{feature.body}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- ponytail: slot 2 waits for a real capture of the AFK notice a pinger sees. -->

<!-- ══ 3 · from the command to your return ═══════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-3xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 1 · The Garden Gate</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				From the command to your return
			</h2>
			<p class="annotation text-xl mt-2">away for a while, back with a message</p>
		</header>

		<ol class="flex flex-col gap-0 mt-11">
			{#each steps as step, si (step.title)}
				<li
					class="flex items-start gap-5 border-t border-ink/15 py-6 {si === steps.length - 1
						? 'border-b'
						: ''}"
					use:reveal={{ delay: si * 0.08 }}
				>
					<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">0{si + 1}</span>
					<div class="min-w-0">
						<h3 class="font-display font-semibold text-xl text-ink leading-snug">{step.title}</h3>
						<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">{step.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ══ 4 · what waits for you when you come back ═════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 2 · The Page You Left</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				What waits for you when you come back
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				When you come back, the bot replies "Welcome Back!" with how long you were away and your pings.
				It stays for 30 seconds. Only you can press its two buttons.
			</p>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
			{#each returnItems as item, ri (item.title)}
				<article
					class="relative card-paper !bg-paper px-6 pt-8 pb-6 {ri === 1
						? 'rotate-[0.6deg]'
						: 'rotate-[-0.5deg]'}"
					use:reveal={{ delay: ri * 0.08 }}
				>
					<Tape angle={ri === 1 ? 4 : -5} width={80} class="-top-3 left-1/2 -ml-10" />
					<h3 class="font-display font-semibold text-lg text-ink leading-snug">{item.title}</h3>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1.5">{item.body}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ══ 5 · the reason ════════════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-3xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 3 · The Label</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				The reason, if you give one
			</h2>
		</header>

		<div class="flex items-start gap-4 mt-10" use:reveal>
			<span class="shrink-0 mt-1 opacity-70" aria-hidden="true">
				<Sprig size={38} color="var(--leaf)" />
			</span>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed">
				The reason is optional. It is shown under the AFK line and in the notice to anyone who mentions
				you. In both places it first goes through your server’s Discord AutoMod rules. Reasons are cut
				to 250 characters by default. An admin with Manage Server can change that limit with <span
					class="code">/settings general afk</span
				>.
			</p>
		</div>
	</div>
</section>

<!-- ══ 6 · for moderators, and by message ═══════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 4 · The Side Door</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				For moderators, and by message
			</h2>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-11">
			{#each extras as extra, xi (extra.title)}
				<div
					class="card-paper !bg-paper px-6 py-5 {xi === 1 ? 'rotate-[0.4deg]' : 'rotate-[-0.4deg]'}"
					use:reveal={{ delay: xi * 0.08 }}
				>
					<h3 class="font-display font-semibold text-lg text-ink leading-snug">{extra.title}</h3>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1.5">{extra.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══ 7 · marginalia: one server at a time, and what it keeps ════════════ -->
<section class="relative px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="relative z-1 max-w-3xl mx-auto">
		<header class="max-w-2xl">
			<span class="label-specimen block mb-3">Marginalia</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				One server at a time, and what it keeps
			</h2>
		</header>

		<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-6">
			AFK is per server. Going AFK in one server changes nothing in another. Who may run
			<span class="code">/afk</span> is set with Discord’s own command permissions: Server Settings, Integrations,
			then the bot. The same choice applies to going AFK by message.
		</p>

		<div class="flex justify-center my-9" aria-hidden="true">
			<Flourish width={200} color="var(--ink-faint)" />
		</div>

		<p class="text-[1.05rem] text-ink-soft leading-relaxed">
			While you are AFK the bot keeps your user ID, the server ID, your reason and when you went AFK.
			That record is deleted when you come back. Your last 20 pings (who, where, an 80-character
			preview) are kept for up to 30 days or until you return, then 2 more minutes for the buttons.
		</p>
	</div>
</section>

<!-- ══ 8 · FAQ ═══════════════════════════════════════════════════════════ -->
<section class="relative px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div
		class="absolute top-8 right-4 sm:right-16 rotate-[18deg] opacity-30 pointer-events-none"
		aria-hidden="true"
	>
		<Bloom size={150} color="var(--petal-soft)" />
	</div>

	<div class="relative z-1 max-w-3xl mx-auto">
		<header class="text-center">
			<span class="label-specimen block mb-3">Marginalia</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Questions people ask
			</h2>
		</header>

		<div class="mt-11">
			{#each faq as entry, qi (entry.q)}
				<div use:reveal={{ delay: qi * 0.06 }}>
					<h3 class="annotation text-2xl text-ink leading-snug">{entry.q}</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">{entry.a}</p>
					{#if qi < faq.length - 1}
						<div class="flex justify-center my-8 opacity-60" aria-hidden="true">
							<Flourish width={180} color="var(--ink-faint)" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══ 9 · closing CTA ═══════════════════════════════════════════════════ -->
<TornEdge fill="var(--plate)" height={48} />

<section class="relative bg-plate px-5 sm:px-8 py-20 sm:py-24 text-center">
	<div
		class="absolute -top-4 left-6 sm:left-20 opacity-25 pointer-events-none rotate-[14deg]"
		aria-hidden="true"
	>
		<Sprig size={110} color="var(--leaf-soft)" />
	</div>

	<div class="relative z-1 max-w-2xl mx-auto" use:reveal>
		<span class="label-specimen !text-leaf-soft block mb-4">The Last Plate</span>

		<h2 class="font-display font-semibold text-3xl sm:text-5xl text-paper leading-tight">
			Step away and let the bot answer
		</h2>

		<p class="text-lg text-leaf-soft leading-relaxed max-w-xl mx-auto mt-5">
			{bot.name} tells anyone who mentions you that you are away, and lists who pinged you when you come
			back. Free, with no paid plan.
		</p>

		<div class="flex flex-col items-center gap-4 mt-9">
			<a
				href={bot.invite}
				target="_blank"
				rel="noopener"
				onclick={trackInviteClick}
				class="btn-paper text-lg"
			>
				<span class="i-tabler-seeding w-5 h-5" aria-hidden="true"></span>
				{bot.cta}
			</a>
			<p class="font-mono text-xs uppercase tracking-[0.14em] text-leaf-soft">
				Two commands and 5 permissions. No paid plan.
			</p>
		</div>
	</div>
</section>

<!--
	Plate to paper: fill with the PLATE colour and flip, so the dark sits above the wave
	and paper below. The -1px margin overlaps the container so the two plate areas cannot
	leave a seam.
-->
<TornEdge fill="var(--plate)" flip class="mt-[-1px]" />
