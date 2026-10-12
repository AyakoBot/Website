<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import PetalDrift from '$lib/components/design/PetalDrift.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import TornEdge from '$lib/components/design/TornEdge.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { bots } from '$lib/scripts/bots';
	import { trackInviteClick } from '$lib/scripts/tracking';
	import { reveal } from '$lib/scripts/util/reveal';

	/*
	 * PLATE VI - Ayako | Reminders.
	 *
	 * Every figure and claim on this page traces to ads/copy/reminders.md, which
	 * carries a per-claim ledger with file and line numbers, read at Service commit
	 * af626f2 (2026-10-05). By then the debug-guild gate was gone (cebeea6), the bot
	 * had its own Gateway token (REMINDERS_TOKEN) and the reminder DM is sent by the
	 * Reminders bot itself, falling back to the main bot (Reminder.ts:148-160).
	 *
	 * NOT claimed anywhere here, all for want of backing:
	 *   - a cap on how many reminders one member can hold (none in code; the list
	 *     shows the first 20)
	 *   - absolute dates or times of day as input (parseDuration takes durations)
	 *   - a link back to where the reminder was set, in the DM
	 *   - any retry when no DM can be delivered (the row is deleted either way)
	 *   - languages other than English (Plugin.ts:48-50)
	 */

	const bot = bots.reminders;

	/** Discord's own account-install link; the app has integration type 1 enabled. */
	const accountInstall =
		'https://discord.com/oauth2/authorize?client_id=1555231689029197904&integration_type=1&scope=applications.commands';

	/** Section 1 - the four above-the-fold cards. */
	const headline: {
		icon: 'relay' | 'reminder' | 'security' | 'power';
		title: string;
		body: string;
	}[] = [
		{
			icon: 'relay',
			title: 'It arrives in your DMs',
			body:
				'When the time is up, the bot sends you a DM with your note quoted. Your DMs need to be open to the bot for it to arrive.',
		},
		{
			icon: 'reminder',
			title: 'The time, as you say it',
			body:
				'Type 30m, 2h, 1d 12h or 2 weeks, straight into the command. Parts add up, so 1d 12h is a day and a half.',
		},
		{
			icon: 'security',
			title: 'Only you see your reminders',
			body:
				'Every reply is private, so nobody else in the channel sees it. List, edit and delete show your own reminders and nobody else’s.',
		},
		{
			icon: 'power',
			title: 'A server, or your own account',
			body:
				'Add it to a server, or to your own Discord account. Added to your account, /reminder works in DMs and group DMs too.',
		},
	];

	/** Section 3 - from the command to the DM, from Reminder.ts. */
	const steps = [
		{
			title: 'Set it',
			body:
				'Run /reminder create. It asks when to remind you, such as 1d 12h, and what to remind you of, up to 2000 characters.',
		},
		{
			title: 'A private confirmation',
			body:
				'The bot replies "Reminder created", with the reminder’s short ID and when it will DM you, written like "in 2 days". Only you see it.',
		},
		{
			title: 'The DM arrives',
			body:
				'When the time is up, the bot DMs you "Your Reminder has ended:" with your note quoted under it. Once sent, the reminder is deleted.',
		},
		{
			title: 'Change your mind',
			body:
				'Run /reminder list to see what is coming, /reminder edit to change the note, or /reminder delete to drop one. The ID field suggests your reminders as you type.',
		},
	];

	/** Section 4 - duration examples, parsed by Util/parseDuration.ts with the ms library. */
	const examples = [
		{ token: '30m', reading: 'in half an hour' },
		{ token: '2h', reading: 'in two hours' },
		{ token: '1d 12h', reading: 'in a day and a half' },
		{ token: '2 weeks', reading: 'two weeks from now' },
	];

	/** Section 5 - the four subcommands, from Plugin.ts:73-120. */
	const commands = [
		{
			name: '/reminder create',
			does: 'A time and a note. Replies privately with the ID and the due time.',
		},
		{
			name: '/reminder list',
			does: 'Your reminders, soonest first, up to 20: channel, due time, ID and text.',
		},
		{ name: '/reminder edit', does: 'Changes the text of one reminder. The time stays as it is.' },
		{ name: '/reminder delete', does: 'Removes one reminder and quotes the text you deleted.' },
	];

	/** Section 7 - FAQ. Every answer traceable to the ledger in ads/copy/reminders.md. */
	const faq = [
		{
			q: 'Where does the reminder arrive?',
			a: 'Always in your DMs, wherever you set it. When the time is up, the bot sends "Your Reminder has ended:" followed by your note. Your DMs must be open to the bot, otherwise the message cannot reach you.',
		},
		{
			q: 'Can anyone else see my reminders?',
			a: 'Every reply to /reminder is private, so nobody else in the channel sees it. List, edit and delete work on your own reminders alone, and the ID suggestions as you type are drawn from those too.',
		},
		{
			q: 'Can I change when a reminder fires?',
			a: '/reminder edit changes the note only. The time stays as you set it. If you need a different time, delete the reminder with /reminder delete and create a new one.',
		},
		{
			q: 'What does it keep about me?',
			a: 'For each reminder: your user ID, the ID of the channel where you set it, the text, when you set it and when it is due. The record is deleted as soon as the DM is sent, or when you delete the reminder yourself.',
		},
		{
			q: 'Do I need to add it to a server?',
			a: 'A server is one option. You can also add it to your own Discord account, and then /reminder works in your DMs and group DMs. On a server it asks for one permission, Send Messages, and there is nothing for an admin to set up.',
		},
	];
</script>

<svelte:head>
	<title>Ayako | Reminders: a DM when the time comes</title>
	<meta
		name="description"
		content="Reminders for Discord. Run /reminder create with a time like 1d 12h and a note, and the bot DMs you when it is due. Only you see your reminders. Free."
	/>
	<link rel="canonical" href="https://ayakobot.com/bots/reminders" />
</svelte:head>

<!-- ══ 1 · hero ══════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
	<PetalDrift count={5} />

	<div class="relative z-1 max-w-3xl mx-auto text-center">
		<span
			class="inline-flex items-center justify-center w-20 h-20 rounded-full border-[1.6px] border-current bg-paper rotate-[-3deg] [animation:fade-up_0.7s_var(--ease-organic)_both]"
			style="color: var(--moss);"
		>
			<FeatureIcon name="reminder" size={42} />
		</span>

		<span
			class="label-specimen block mt-6 mb-3 [animation:fade-up_0.7s_0.08s_var(--ease-organic)_both]"
		>
			Plate VI · The Seed Packet
		</span>

		<h1
			class="font-display font-semibold text-4xl sm:text-6xl text-ink leading-[1.08] [animation:fade-up_0.7s_0.16s_var(--ease-organic)_both]"
		>
			A DM when the time comes
		</h1>

		<p
			class="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto mt-6 [animation:fade-up_0.7s_0.24s_var(--ease-organic)_both]"
		>
			Type <span class="code">/reminder create</span>, a time and a note. When the time is up, the bot
			sends the note to your DMs.
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
			<a
				href={accountInstall}
				target="_blank"
				rel="noopener"
				onclick={trackInviteClick}
				class="link-vine font-display font-semibold text-ink"
			>
				Or add it to your account
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
					<span class="shrink-0 mt-0.5" style="color: var(--moss);">
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

<!-- ponytail: slot 2 waits for a real capture of a delivered reminder DM. -->

<!-- ══ 3 · from the command to the DM ════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-3xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 1 · The Garden Diary</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				From the command to the DM
			</h2>
			<p class="annotation text-xl mt-2">written now, delivered later</p>
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

<!-- ══ 4 · write the time the way you say it ═════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-4xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 2 · The Sundial</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Write the time the way you say it
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				The field asks when to remind you. Write a number and a unit, and put several parts together.
				The bot adds them up.
			</p>
		</header>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 mt-11">
			{#each examples as example, ei (example.token)}
				<div
					class="flex items-baseline gap-4 border-t border-ink/15 py-4"
					use:reveal={{ delay: ei * 0.05 }}
				>
					<span class="code shrink-0">{example.token}</span>
					<span class="text-[0.95rem] text-ink-soft leading-relaxed">{example.reading}</span>
				</div>
			{/each}
		</div>

		<div class="flex items-start gap-4 max-w-3xl mx-auto mt-10" use:reveal>
			<span class="shrink-0 mt-1 opacity-70" aria-hidden="true">
				<Sprig size={38} color="var(--leaf)" />
			</span>
			<p class="text-[1.02rem] text-ink-soft leading-relaxed">
				The shortest time is 10 seconds. There is no longest. The note itself can be up to 2000
				characters.
			</p>
		</div>
	</div>
</section>

<!-- ══ 5 · the four subcommands ══════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-3xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 3 · The Tool Roll</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				One command, four subcommands
			</h2>
		</header>

		<ul class="flex flex-col gap-0 mt-11">
			{#each commands as command, ci (command.name)}
				<li
					class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-t border-ink/15 py-4 {ci ===
					commands.length - 1
						? 'border-b'
						: ''}"
					use:reveal={{ delay: ci * 0.06 }}
				>
					<span class="code shrink-0 sm:w-44">{command.name}</span>
					<span class="text-[0.97rem] text-ink-soft leading-relaxed">{command.does}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ══ 6 · marginalia: restarts and what it keeps ════════════════════════ -->
<section class="relative px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="relative z-1 max-w-3xl mx-auto">
		<header class="max-w-2xl">
			<span class="label-specimen block mb-3">Marginalia</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				What it keeps, and what a restart does
			</h2>
		</header>

		<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-6">
			If the bot restarts, reminders that came due while it was away are sent when it is back, and the
			rest are scheduled again. Nothing needs to be set up again.
		</p>

		<div class="flex justify-center my-9" aria-hidden="true">
			<Flourish width={200} color="var(--ink-faint)" />
		</div>

		<p class="text-[1.05rem] text-ink-soft leading-relaxed">
			A reminder is a small record: who set it, where, the text, and two times. It is deleted once sent
			or when you delete it.
		</p>
	</div>
</section>

<!-- ══ 7 · FAQ ═══════════════════════════════════════════════════════════ -->
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

<!-- ══ 8 · closing CTA ═══════════════════════════════════════════════════ -->
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
			Let the bot do the remembering
		</h2>

		<p class="text-lg text-leaf-soft leading-relaxed max-w-xl mx-auto mt-5">
			{bot.name} takes a note and a time, and DMs you when that time comes. Free, with no paid plan.
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
				1 permission. Nothing to set up. Free.
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
