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
	 * PLATE VIII - Ayako | Bump Reminders.
	 *
	 * Every figure and claim on this page traces to ads/copy/bump-reminders.md,
	 * which carries a per-claim ledger with file and line numbers, read at Service
	 * commit 0927b56 (2026-10-12).
	 *
	 * NOT claimed anywhere here, all for want of backing:
	 *   - any supported bump site beyond the three templates: other bots work only
	 *     as far as the server sets them up
	 *   - anything about how bumping helps a server grow
	 *   - languages other than English (Plugin.ts:65-67)
	 */

	const bot = bots['bump-reminders'];

	/** Section 1 - the four above-the-fold cards. */
	const headline: {
		icon: 'bump' | 'utility' | 'relay' | 'reminder';
		title: string;
		body: string;
	}[] = [
		{
			icon: 'bump',
			title: 'Three bump bots, already filled in',
			body:
				'Pick DISBOARD, Carl-bot or D-ify.net and the template fills in the bot, its cooldown and what to look for: 2h 30m, 6h or 2h. You can edit everything afterwards.',
		},
		{
			icon: 'utility',
			title: 'Or any bump bot you use',
			body:
				'Pick the bot, the text that marks a successful bump, and where in the message to look. Case is ignored. Write the cooldown like 2h or 3h 50m.',
		},
		{
			icon: 'relay',
			title: 'A ping and a clickable command',
			body:
				'The reminder goes to the channel you choose and pings the roles and members you pick. Add the bump command’s ID and it appears as a clickable command.',
		},
		{
			icon: 'reminder',
			title: 'A button, and a repeat',
			body:
				'Press "Mark Server as bumped" on the reminder if the bump bot does not answer. If nobody bumps, it can repeat after a time you set.',
		},
	];

	/** Section 3 - from the bump to the reminder, from Events/MessageCreate and Classes/Bumps.ts. */
	const steps = [
		{
			title: 'Someone bumps',
			body:
				'A member runs the bump command, bump for example, and the bump bot answers with its success message.',
		},
		{
			title: 'The bot notices',
			body:
				'It looks for the success text in the bump bot’s message and reacts ✅ when it finds it. If you turned that on, it deletes that message a few seconds later.',
		},
		{
			title: 'The cooldown runs',
			body:
				'The bot waits for the cooldown you set, such as 2 hours 30 minutes for DISBOARD. If it restarts in the meantime, reminders that came due are sent once it is back.',
		},
		{
			title: 'The reminder arrives',
			body:
				'When the cooldown ends, the reminder appears in the channel you chose, with your pings above it. It says "You can now bump this server again!" and names the command to run.',
		},
	];

	/** Section 4 - the templates, from Classes/Providers.ts. */
	const templates = [
		{ name: 'DISBOARD', cooldown: '2 hours 30 minutes between bumps' },
		{ name: 'Carl-bot', cooldown: '6 hours between bumps' },
		{ name: 'D-ify.net', cooldown: '2 hours between bumps' },
	];

	/** Section 5 - what the reminder looks like, from Classes/Bumps.ts. */
	const reminderItems = [
		{
			title: 'Where it lands',
			body:
				'In the channel you choose, by default the one where the bump happened. The roles and members you picked are pinged above it.',
		},
		{
			title: 'What it says',
			body:
				'It is titled after the bump bot, "DISBOARD Bump Reminder" for example, and says "You can now bump this server again!" with the command to run. Give the command’s ID and the command is clickable.',
		},
		{
			title: 'The button',
			body:
				'"Mark Server as bumped" is for when the bump bot does not answer. It works from one minute after the reminder appears; before that it asks you to bump first.',
		},
		{
			title: 'Repeat and cleanup',
			body:
				'If nobody bumps, the reminder can be sent again after a time you set, 1 hour by default. The old reminder is removed when a new one is posted or the server is bumped.',
		},
	];

	/** Section 6 - setup, from the settings schema and guide in Plugin.ts. */
	const setupSteps = [
		'Run /settings automation bump-reminders. You need Manage Server. A guide is inside.',
		'Pick a template (DISBOARD, Carl-bot, D-ify.net) or choose any other bot.',
		'Check the success text and the cooldown, at least 1 minute.',
		'Choose the reminder channel, and the roles and members to ping.',
		'Switch the entry on. To delete it later, switch it off first.',
	];

	/** Section 7 - FAQ. Every answer traceable to the ledger in ads/copy/bump-reminders.md. */
	const faq = [
		{
			q: 'Which bump bots does it work with?',
			a: 'Any bump bot that posts a success message. DISBOARD, Carl-bot and D-ify.net come as templates with their cooldowns filled in. For any other bot, you type the text that marks a successful bump, say where in the message to look for it, and set the cooldown yourself.',
		},
		{
			q: 'What if the bump bot doesn’t answer?',
			a: 'Every reminder has a "Mark Server as bumped" button. Press it and the server counts as bumped. The button works one minute after the reminder appears; press it earlier and it asks you to bump first.',
		},
		{
			q: 'Can it ping a role?',
			a: 'Yes. In the settings you pick the roles and members to ping, and they are mentioned above every reminder. The reminder itself goes to the channel you choose, by default the one where the bump happened.',
		},
		{
			q: 'Why does it ask for Manage Messages?',
			a: 'It deletes two things: the bump bot’s confirmation a few seconds after the bump, if you turn that on, and the old reminder when a new one is posted or the server is bumped. The other three permissions are View Channel, Send Messages and Add Reactions. It cannot ban, kick or time anyone out.',
		},
		{
			q: 'Can I have reminders for more than one bump bot?',
			a: 'Yes. Each entry watches one bump bot, and a server can add several, so DISBOARD and Carl-bot can each have their own settings. An entry that is switched on cannot be deleted; switch it off first. Everything is deleted when the bot leaves the server.',
		},
	];
</script>

<svelte:head>
	<title>Ayako | Bump Reminders: a reminder when the cooldown ends</title>
	<meta
		name="description"
		content="Free bump reminders for Discord. It sees a bump bot's success message and posts a reminder when the cooldown ends. DISBOARD, Carl-bot and D-ify.net templates."
	/>
	<link rel="canonical" href="https://ayakobot.com/bots/bump-reminders" />
</svelte:head>

<!-- ══ 1 · hero ══════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
	<PetalDrift count={5} />

	<div class="relative z-1 max-w-3xl mx-auto text-center">
		<span
			class="inline-flex items-center justify-center w-20 h-20 rounded-full border-[1.6px] border-current bg-paper rotate-[-3deg] [animation:fade-up_0.7s_var(--ease-organic)_both]"
			style="color: var(--leaf);"
		>
			<FeatureIcon name="bump" size={42} />
		</span>

		<span
			class="label-specimen block mt-6 mb-3 [animation:fade-up_0.7s_0.08s_var(--ease-organic)_both]"
		>
			Plate VIII · The Watering Can
		</span>

		<h1
			class="font-display font-semibold text-4xl sm:text-6xl text-ink leading-[1.08] [animation:fade-up_0.7s_0.16s_var(--ease-organic)_both]"
		>
			A reminder when the cooldown ends
		</h1>

		<p
			class="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto mt-6 [animation:fade-up_0.7s_0.24s_var(--ease-organic)_both]"
		>
			The bot watches for your bump bot’s success message. When the cooldown is over, it posts a
			reminder and pings the people you chose.
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
					<span class="shrink-0 mt-0.5" style="color: var(--leaf);">
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

<!-- ponytail: slot 2 waits for a real capture of a posted bump reminder. -->

<!-- ══ 3 · from the bump to the reminder ═════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-3xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 1 · The Hourglass</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				From the bump to the reminder
			</h2>
			<p class="annotation text-xl mt-2">the bot does the waiting</p>
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

<!-- ══ 4 · templates, or any bump bot ════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-4xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 2 · The Plant Labels</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Three templates, or any bump bot
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				Each entry watches one bump bot. Templates cover three well-known bots and their cooldowns. Any
				other bot takes a few fields you fill in yourself.
			</p>
		</header>

		<ul class="flex flex-col gap-0 mt-11 max-w-2xl mx-auto">
			{#each templates as template, ti (template.name)}
				<li
					class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 border-t border-ink/15 py-4 {ti ===
					templates.length - 1
						? 'border-b'
						: ''}"
					use:reveal={{ delay: ti * 0.06 }}
				>
					<span class="code shrink-0 sm:w-32">{template.name}</span>
					<span class="text-[0.97rem] text-ink-soft leading-relaxed">{template.cooldown}</span>
				</li>
			{/each}
		</ul>

		<div class="flex items-start gap-4 max-w-2xl mx-auto mt-10" use:reveal>
			<span class="shrink-0 mt-1 opacity-70" aria-hidden="true">
				<Sprig size={38} color="var(--leaf)" />
			</span>
			<p class="text-[1.02rem] text-ink-soft leading-relaxed">
				Pick the bot, the text that marks a successful bump, and where to look for it: the message text,
				or the embed title, description, author name, footer, a field name or a field value. Case is
				ignored. Cooldowns are written like 2h or 3h 50m.
			</p>
		</div>
	</div>
</section>

<!-- ══ 5 · what the reminder looks like ══════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 3 · The Garden Bell</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				What the reminder looks like
			</h2>
		</header>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-11">
			{#each reminderItems as item, ri (item.title)}
				<div
					class="card-paper !bg-paper px-6 py-5 {ri % 2 === 0 ? 'rotate-[-0.4deg]' : 'rotate-[0.4deg]'}"
					use:reveal={{ delay: ri * 0.06 }}
				>
					<h3 class="font-display font-semibold text-lg text-ink leading-snug">{item.title}</h3>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1.5">{item.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══ 6 · setup ═════════════════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-3xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 4 · The Potting Bench</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Set it up in one place
			</h2>
		</header>

		<ol class="flex flex-col gap-0 mt-11" use:reveal>
			{#each setupSteps as step, si (step)}
				<li
					class="flex items-start gap-4 border-t border-ink/15 py-4 {si === setupSteps.length - 1
						? 'border-b'
						: ''}"
				>
					<span class="font-mono text-sm text-ink-soft pt-0.5 shrink-0">0{si + 1}</span>
					<span class="text-[0.97rem] text-ink-soft leading-relaxed">{step}</span>
				</li>
			{/each}
		</ol>
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
			Let the bot watch the cooldown
		</h2>

		<p class="text-lg text-leaf-soft leading-relaxed max-w-xl mx-auto mt-5">
			{bot.name} sees the bump and waits out the cooldown. Then it tells your server it can bump again. Free,
			with no paid plan.
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
				4 permissions. Set up once. Free.
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
