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
	 * PLATE V - Ayako | Confessions.
	 *
	 * Every figure and claim on this page traces to ads/copy/confessions.md, which
	 * carries a per-claim ledger with file and line numbers, read at Service commit
	 * 29ec8b7 (2026-09-30).
	 *
	 * The angle of the page is deliberate. The default anonymity mode is Hidden
	 * (confessions/schema.prisma:18), and in Hidden mode the log channel names the
	 * author of every logged confession (ConfessionPublisher.ts:206,
	 * logContainer.ts:103-108). So the page leads with the server's choice between
	 * two modes and never sells "anonymous" as the default promise.
	 *
	 * NOT claimed anywhere here, all for want of backing:
	 *   - "unlinkable", "untraceable", "nobody can ever", "not even the owner": one
	 *     member's confessions share a per-server HMAC pseudonym (identity.ts:9-17),
	 *     which whoever holds CONFESSION_SECRET can recompute
	 *   - anonymous reports: the reporter is named on the card (reportCard.ts:62)
	 *   - image uploads: images are one typed https link, Hidden mode only, off by
	 *     default (media.ts, submit.ts:47-48)
	 *   - {{membercount}}: always empty for this plugin (ConfessionPublisher.ts:126)
	 *   - "no moderation permissions": Manage Threads is one of the four
	 *   - built-in builders: dependencies are [Settings] only (Plugin.ts:95), so
	 *     designs must be made with a bot that ships the builders
	 *   - languages other than English (Plugin.ts:106-108)
	 */

	const bot = bots.confessions;

	/** Section 1 - the four above-the-fold cards. */
	const headline: {
		icon: 'confession' | 'moderation' | 'relay' | 'security';
		title: string;
		body: string;
	}[] = [
		{
			icon: 'confession',
			title: 'You choose how private it is',
			body:
				'Hidden lets staff see who wrote it. Anonymous stores no Discord user ID, so nobody on the server can find out through the bot who sent it.',
		},
		{
			icon: 'moderation',
			title: 'Three ways to moderate',
			body:
				'Review holds every confession until a reviewer decides. Screened runs the text through your own Discord AutoMod rules and only holds what they flag. Direct posts straight away.',
		},
		{
			icon: 'relay',
			title: 'Replies, also without a name',
			body:
				'A Reply button under each confession opens a form. The reply is posted without a name and goes through the same rules and the same moderation mode as the confession.',
		},
		{
			icon: 'security',
			title: 'Cooldowns, limits and bans',
			body:
				'A cooldown between confessions, a daily limit, minimum account age and time in the server, blocked roles and members. Reviewers can ban authors for a set time or permanently.',
		},
	];

	/** Section 2 - the data strip. */
	const specimen = [
		{ value: '2', label: 'Anonymity modes' },
		{ value: '3', label: 'Moderation modes' },
		{ value: '4', label: 'Permissions asked' },
		{ value: '0', label: 'Paid features' },
	];

	/** Section 3 - the two anonymity modes, from identity.ts, review.ts and logContainer.ts. */
	const hiddenLines = [
		'Staff can see who wrote it, and other members see only the text.',
		'Reviewers can press Reveal author on a pending confession.',
		'The log channel, if you set one, names the author.',
		'A rejected author is told by DM, with your reason if you give one. Image links are allowed only in this mode.',
	];

	const anonymousLines = [
		'The bot stores no Discord user ID for the confession.',
		'Nobody on the server can find out through the bot who sent it. The review card has no Reveal author button.',
		'Bans, cooldowns, daily limits and deleting your own still work, through a per-server pseudonym.',
		'The log channel says Anonymous, and image links are not available.',
	];

	/** Section 4 - what a member can do, from submit.ts and menu.ts. */
	const memberSteps = [
		{
			title: 'Send one',
			body:
				'Run /confess, or press Submit a confession under any post. A form opens. The text field takes 10 to 3800 characters by default, and the server can change that within 1 to 3800.',
		},
		{
			title: 'Reply to one',
			body:
				'Press Reply under a confession and write it in the form. It lands in the confession’s thread if there is one, otherwise as a Discord reply to the confession. Replies are not numbered.',
		},
		{
			title: 'Delete your own',
			body:
				'Open the ⋯ menu on a confession you wrote and delete it. This works in Anonymous mode too, because the bot keeps a per-server pseudonym for that.',
		},
		{
			title: 'Report one',
			body:
				'Anyone else who opens the ⋯ menu gets a report form. Write a reason and it goes to the review channel with your name on it.',
		},
	];

	/** Section 5 - the three moderation modes, from Plugin.ts:220-242 and Confessions.ts:65-71. */
	const modes = [
		{
			title: 'Review',
			body:
				'Every confession and every reply waits in the review channel until a reviewer approves or rejects it. This is the default.',
		},
		{
			title: 'Screened',
			body:
				'The text is checked against your server’s own Discord AutoMod rules. Only flagged ones wait for review, and the review card shows how AutoMod saw it. The rest post straight away.',
		},
		{
			title: 'Direct',
			body:
				'Confessions post right away. Reports still go to the review channel, and reviewers can still ban an author from the ⋯ menu on any post.',
		},
	];

	const reviewerActions = [
		'Approve, and it posts. Each confession is handled once.',
		'Reject, with an optional reason. In Hidden mode the author gets it by DM.',
		'Ban author, with an optional reason and a duration such as 7d or 2 weeks. Empty means permanent, and a ban also rejects the confession.',
		'Reveal author, in Hidden mode only. In Anonymous mode the card has no such button.',
		'From the ⋯ menu on any posted confession: Ban author and Report confession.',
	];

	/** Section 6 - how each confession is posted, from threads.ts, ConfessionPublisher.ts and ConfessionSchedule.ts. */
	const postFacts = [
		{
			title: 'Text, announcement or forum',
			body:
				'Post to any of the three kinds of channel. In a forum, each confession becomes its own post.',
		},
		{
			title: 'A thread under each one',
			body:
				'Switch it on and the bot opens a discussion thread under every confession. Replies land in that thread.',
		},
		{
			title: 'Numbered when posted',
			body:
				'Confession #12, and so on, by default. A number is given only when a confession is actually posted, so a rejected one never uses a number up.',
		},
		{
			title: 'An optional posting delay',
			body:
				'Set a maximum wait and the bot picks a random time up to it, so the moment a confession appears does not match the moment it was sent.',
		},
		{
			title: 'Auto-delete after a set time',
			body: 'If you set a time, the bot removes each post once that time has passed.',
		},
		{
			title: 'Mentions never ping',
			body:
				'A member can type @everyone, a role or another member into a confession, and nobody is notified.',
		},
	];

	/** Section 7 - the placeholders a saved design can use, from Plugin.ts:71-74. */
	const placeholders = [
		{ token: '{{confession}}', gives: 'The text the member wrote' },
		{ token: '{{number}}', gives: 'The confession’s number' },
		{ token: '{{server}}', gives: 'Your server’s name' },
		{ token: '{{serverid}}', gives: 'The ID of your server' },
		{ token: '{{servericon}}', gives: 'A link to your server icon' },
		{ token: '{{boostcount}}', gives: 'How many boosts your server has' },
		{ token: '{{boosttier}}', gives: 'The boost tier of your server' },
	];

	/** Section 8 - setup and submission rules, from Plugin.ts:185-468. */
	const setupSteps = [
		'Pick the confessions channel: text, announcement or forum.',
		'Pick the review channel. Reports land there in every mode.',
		'Choose the anonymity mode, Hidden or Anonymous.',
		'Choose the moderation mode: Review, Screened or Direct.',
		'Switch confessions on.',
	];

	const rules = [
		'A cooldown between confessions, 5 minutes by default, shared with replies',
		'A minimum account age',
		'A minimum time in the server',
		'A minimum and a maximum length, within 1 to 3800 characters',
		'A maximum number of confessions per day, unlimited by default',
		'Blocked roles',
		'Blocked members',
	];

	/** Section 9 - FAQ. Every answer traceable to the ledger in ads/copy/confessions.md. */
	const faq = [
		{
			q: 'Can staff see who wrote a confession?',
			a: 'Other members cannot see the author in either mode. In Hidden mode, reviewers can press Reveal author on a pending confession, and if you set a log channel, the log names the author of every logged confession. In Anonymous mode the bot stores no Discord user ID for it, the review card has no Reveal author button, and the log says Anonymous.',
		},
		{
			q: 'Can members post images?',
			a: 'Only if you allow it, and only in Hidden mode. It is off by default. When it is on, a member can paste one https link to a png, jpg, jpeg, gif or webp image into the form. It is a link field, so there is no upload.',
		},
		{
			q: 'What stops people from spamming it?',
			a: 'A cooldown between confessions, 5 minutes by default and shared with replies, plus an optional daily limit, minimum account age, minimum time in the server, and blocked roles or members. Reviewers can ban an author, for a set time or permanently, and bans work in Anonymous mode too.',
		},
		{
			q: 'What permissions does it need?',
			a: 'Four: View Channel, Send Messages, Create Public Threads and Manage Threads. It cannot ban, kick or time anyone out. A confession ban is kept by the bot itself and blocks only confessions and replies.',
		},
		{
			q: 'What does the bot keep about a confession?',
			a: 'The text and a per-server pseudonym, and in Hidden mode also the author. In Anonymous mode no Discord user ID is kept. Everything the bot stores for your server is deleted when the bot leaves it.',
		},
	];
</script>

<svelte:head>
	<title>Ayako | Confessions: a confession channel on your terms</title>
	<meta
		name="description"
		content="Confessions for Discord. You choose whether staff can see who wrote what, or the bot stores no Discord user ID. Review queue, AutoMod screening, replies. Free."
	/>
	<link rel="canonical" href="https://ayakobot.com/bots/confessions" />
</svelte:head>

<!-- ══ 1 · hero ══════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
	<PetalDrift count={5} />

	<div class="relative z-1 max-w-3xl mx-auto text-center">
		<span
			class="inline-flex items-center justify-center w-20 h-20 rounded-full border-[1.6px] border-current bg-paper rotate-[-3deg] [animation:fade-up_0.7s_var(--ease-organic)_both]"
			style="color: var(--blossom);"
		>
			<FeatureIcon name="confession" size={42} />
		</span>

		<span
			class="label-specimen block mt-6 mb-3 [animation:fade-up_0.7s_0.08s_var(--ease-organic)_both]"
		>
			Plate V · The Locket
		</span>

		<h1
			class="font-display font-semibold text-4xl sm:text-6xl text-ink leading-[1.08] [animation:fade-up_0.7s_0.16s_var(--ease-organic)_both]"
		>
			Confessions, on your server's terms
		</h1>

		<p
			class="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto mt-6 [animation:fade-up_0.7s_0.24s_var(--ease-organic)_both]"
		>
			Members write a confession, and the bot posts it without their name. You decide whether staff can
			still see who wrote it, and whether it waits for review first.
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
			<p class="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
				4 permissions. No dashboard. Free.
			</p>
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
					<span class="shrink-0 mt-0.5" style="color: var(--blossom);">
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

<!-- ══ 2 · specimen data strip ═══════════════════════════════════════════ -->
<section class="px-5 sm:px-8 pb-16" use:reveal>
	<div
		class="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 border-t border-b border-ink/15 divide-x divide-ink/15"
	>
		{#each specimen as datum (datum.label)}
			<div class="px-4 py-6 text-center">
				<span class="block font-mono text-3xl sm:text-4xl text-ink">{datum.value}</span>
				<span class="label-specimen block mt-2 leading-snug">{datum.label}</span>
			</div>
		{/each}
	</div>
</section>

<!-- ══ 3 · the two modes — THE PAGE'S SIGNATURE ═════════════════════════ -->
<section class="relative px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 1 · The Clasp</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				First, decide who can see the author
			</h2>
			<p class="annotation text-xl mt-2">hidden is the default</p>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				Every confession is posted without the author's name. The difference between the two modes is
				what the bot keeps, and who on the server can still find out.
			</p>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
			<article
				class="relative card-paper !bg-paper px-7 pt-9 pb-7 rotate-[-1deg] [transition:transform_0.4s_var(--ease-organic),box-shadow_0.4s_var(--ease-organic)] hover:rotate-0 hover:shadow-press-lg"
				use:reveal
			>
				<Tape angle={-6} width={88} class="-top-3 left-8" />
				<div class="flex items-center gap-3">
					<span class="i-tabler-eye w-6 h-6 shrink-0" style="color: var(--petal);" aria-hidden="true"
					></span>
					<h3 class="font-display font-semibold text-2xl text-ink leading-snug">Hidden, the default</h3>
				</div>
				<ul class="flex flex-col gap-0 mt-5">
					{#each hiddenLines as line (line)}
						<li class="flex items-start gap-3 border-t border-ink/15 py-3">
							<span
								class="i-tabler-leaf w-4 h-4 shrink-0 mt-1"
								style="color: var(--leaf);"
								aria-hidden="true"
							></span>
							<span class="text-[0.97rem] text-ink-soft leading-relaxed">{line}</span>
						</li>
					{/each}
				</ul>
			</article>

			<article
				class="relative card-paper !bg-paper px-7 pt-9 pb-7 rotate-[0.8deg] [transition:transform_0.4s_var(--ease-organic),box-shadow_0.4s_var(--ease-organic)] hover:rotate-0 hover:shadow-press-lg"
				use:reveal={{ delay: 0.1 }}
			>
				<Tape angle={5} width={88} class="-top-3 right-8" />
				<div class="flex items-center gap-3">
					<span class="i-tabler-eye-off w-6 h-6 shrink-0" style="color: var(--moss);" aria-hidden="true"
					></span>
					<h3 class="font-display font-semibold text-2xl text-ink leading-snug">Anonymous</h3>
				</div>
				<ul class="flex flex-col gap-0 mt-5">
					{#each anonymousLines as line (line)}
						<li class="flex items-start gap-3 border-t border-ink/15 py-3">
							<span
								class="i-tabler-leaf w-4 h-4 shrink-0 mt-1"
								style="color: var(--leaf);"
								aria-hidden="true"
							></span>
							<span class="text-[0.97rem] text-ink-soft leading-relaxed">{line}</span>
						</li>
					{/each}
				</ul>
			</article>
		</div>

		<div class="flex items-start gap-4 max-w-3xl mx-auto mt-10" use:reveal>
			<span class="shrink-0 mt-1 opacity-70" aria-hidden="true">
				<Sprig size={38} color="var(--leaf)" />
			</span>
			<p class="text-[1.02rem] text-ink-soft leading-relaxed">
				Choose the mode before you switch confessions on. Confessions sent in Hidden mode keep their
				author stored even if you move to Anonymous later.
			</p>
		</div>
	</div>
</section>

<!-- ══ 4 · what a member can do ══════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-3xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 2 · The Letter Box</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				What a member can do
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				Everything happens inside Discord, through one command and the buttons under each post. The form
				itself tells the member which mode your server uses.
			</p>
		</header>

		<ol class="flex flex-col gap-0 mt-11">
			{#each memberSteps as step, si (step.title)}
				<li
					class="flex items-start gap-5 border-t border-ink/15 py-6 {si === memberSteps.length - 1
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

<!-- ══ 5 · moderation ════════════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 3 · The Sorting Table</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Decide how much gets checked first
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				Every mode needs a review channel, because reports land there too. What changes between the
				modes is how many confessions wait in it.
			</p>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-11">
			{#each modes as mode, mi (mode.title)}
				<div
					class="card-paper !bg-paper px-6 py-5 {mi === 1 ? 'rotate-[0.5deg]' : 'rotate-[-0.4deg]'}"
					use:reveal={{ delay: mi * 0.06 }}
				>
					<h3 class="font-display font-semibold text-lg text-ink leading-snug">{mode.title}</h3>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1.5">{mode.body}</p>
				</div>
			{/each}
		</div>

		<!--
			The proof for this section: a real review card, captured in a debug server in
			Hidden mode. Cropped to the pending card, so no member names are in frame.
		-->
		<figure class="relative max-w-xl mx-auto mt-12" use:reveal>
			<div
				class="relative rotate-[0.8deg] rounded-[0.5rem_1.4rem_0.5rem_1.4rem] bg-paper-warm border border-ink/15 p-3 pt-5 shadow-press"
			>
				<Tape angle={-5} width={96} class="-top-3 left-10" />
				<img
					src="/images/ads/confession-review.webp"
					alt="A review card in Discord titled Confession awaiting review. It shows the confession text and four buttons: Approve, Reject, Ban author and Reveal author."
					width="700"
					height="260"
					loading="lazy"
					decoding="async"
					class="block w-full h-auto rounded-[0.4rem]"
				/>
			</div>
			<figcaption class="text-[0.95rem] text-ink-soft leading-relaxed mt-5 px-1">
				A confession waiting in the review channel of a server in Hidden mode. It posts only after a
				reviewer presses Approve.
			</figcaption>
		</figure>

		<div class="max-w-3xl mx-auto mt-12">
			<span class="label-specimen block mb-3">What a reviewer can do</span>
			<ul class="flex flex-col gap-0">
				{#each reviewerActions as action, ai (action)}
					<li
						class="flex items-start gap-3 border-t border-ink/15 py-3.5 {ai === reviewerActions.length - 1
							? 'border-b'
							: ''}"
					>
						<span
							class="i-tabler-leaf w-4 h-4 shrink-0 mt-1"
							style="color: var(--leaf);"
							aria-hidden="true"
						></span>
						<span class="text-[0.97rem] text-ink-soft leading-relaxed">{action}</span>
					</li>
				{/each}
			</ul>

			<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-6" use:reveal>
				Reviewers are the members with the reviewer roles you choose. If you choose none, anyone with
				Manage Messages counts. <span class="code">/confession-bans</span> lists current bans, five per page,
				each with a Lift ban button.
			</p>
		</div>
	</div>
</section>

<!-- ══ 6 · how each confession is posted ═════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 4 · The Mounting Sheet</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				How each confession is posted
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				Every post gets a random accent colour. The rest is yours to set.
			</p>
		</header>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-11">
			{#each postFacts as fact, pi (fact.title)}
				<div
					class="card-paper !bg-paper px-6 py-5 {pi % 2 === 0 ? 'rotate-[-0.4deg]' : 'rotate-[0.4deg]'}"
					use:reveal={{ delay: pi * 0.05 }}
				>
					<h3 class="font-display font-semibold text-lg text-ink leading-snug">{fact.title}</h3>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1.5">{fact.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══ 7 · saved designs and placeholders ════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-4xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 5 · The Frame</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				The post can look like your server
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				The default post is a Components-V2 message. You can also pick a design saved with Ayako’s embed
				builder or Components-V2 builder. This bot does not include the builders itself, so make the
				design with one of our bots that does, such as
				<a href="/bots/welcome" class="link-vine text-ink font-semibold">Ayako | Welcome</a>. The bot’s
				buttons go underneath.
			</p>
		</header>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 mt-11">
			{#each placeholders as ph, pi (ph.token)}
				<div
					class="flex items-baseline gap-4 border-t border-ink/15 py-4"
					use:reveal={{ delay: pi * 0.05 }}
				>
					<span class="code shrink-0">{ph.token}</span>
					<span class="text-[0.95rem] text-ink-soft leading-relaxed">{ph.gives}</span>
				</div>
			{/each}
		</div>

		<!--
			The proof: a real confession with a saved design, posted by this bot as its own
			post in a forum channel, with an anonymous reply under it. Captured in a debug
			server. The photo keeps Discord's own look; only the mount is folio, per DESIGN.md.
		-->
		<figure class="relative max-w-xl mx-auto mt-14" use:reveal>
			<div
				class="relative rotate-[-1deg] rounded-[0.5rem_1.4rem_0.5rem_1.4rem] bg-paper-warm border border-ink/15 p-3 pt-5 shadow-press"
			>
				<Tape angle={-6} width={104} class="-top-3 left-8" />
				<Tape angle={5} width={96} class="-top-2.5 right-9" />
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img
					src="/images/ads/confession-post.webp"
					alt="A confession as Discord shows it, in a forum post titled Confession #1. A pink bar runs down a card with the heading Confession #1, the line My Server, shared anonymously, a round picture and the confession text. Below the card are a menu button, Submit a confession and Reply. Further down is a reply with no name on it."
					width="790"
					height="982"
					loading="lazy"
					decoding="async"
					class="block w-full h-auto rounded-[0.4rem]"
				/>
			</div>
			<figcaption class="text-[0.95rem] text-ink-soft leading-relaxed mt-5 px-1">
				One saved design, posted as its own post in a forum channel, with a reply under it. The design
				is the server’s own, and the bot adds the buttons underneath.
			</figcaption>
		</figure>
	</div>
</section>

<!-- ══ 8 · setup ═════════════════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-4xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 6 · The Potting Bench</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Five steps, all inside Discord
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				Open <span class="code">/settings automation confessions</span>. You need Manage Server, and the
				bot is English only.
			</p>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-11">
			<ol class="flex flex-col gap-0" use:reveal>
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

			<div use:reveal={{ delay: 0.1 }}>
				<span class="label-specimen block mb-3">Rules you can set</span>
				<ul class="flex flex-col gap-0">
					{#each rules as rule, ri (rule)}
						<li
							class="flex items-start gap-3 border-t border-ink/15 py-3 {ri === rules.length - 1
								? 'border-b'
								: ''}"
						>
							<span
								class="i-tabler-leaf w-4 h-4 shrink-0 mt-1"
								style="color: var(--leaf);"
								aria-hidden="true"
							></span>
							<span class="text-[0.95rem] text-ink-soft leading-relaxed">{rule}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- ══ 9 · FAQ ═══════════════════════════════════════════════════════════ -->
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

<!-- ══ 10 · closing CTA ══════════════════════════════════════════════════ -->
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
			Give people a place to say it
		</h2>

		<p class="text-lg text-leaf-soft leading-relaxed max-w-xl mx-auto mt-5">
			{bot.name} posts what members want to say without their name on it, and leaves the rules to you. Free,
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
				4 permissions. No dashboard. Free.
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
