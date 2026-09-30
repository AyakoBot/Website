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
	 * PLATE IV - Ayako | Welcome.
	 *
	 * Every figure and claim on this page traces to ads/copy/welcome.md, which
	 * carries a per-claim ledger with file and line numbers, re-verified at
	 * Service commit 29ec8b7 (2026-09-29).
	 *
	 * The angle of the page is deliberate. This is not "a bot that posts a join
	 * message"; the plugin declares dependencies on embedBuilder and
	 * componentBuilder (welcome/Plugin.ts:98) and buildCommandBody resolves them
	 * transitively, so the standalone bot ships /embed-builder and
	 * /component-builder as well. That is the differentiator against every other
	 * greeter, and it leads.
	 *
	 * NOT claimed anywhere here, all for want of backing:
	 *   - captcha or verification (a different plugin entirely)
	 *   - autoroles on join (roleAutomation)
	 *   - any figure for GIF pool size (unbounded, no cap in code)
	 *   - German (Plugin.ts:110 registers en-GB only)
	 *   - sending as a webhook: the builder plugins declare ManageWebhooks in
	 *     their own customBotPerms, but a standalone Welcome bot is invited with
	 *     150528, which does not include it.
	 */

	const bot = bots.welcome;

	/** Section 1 - the four above-the-fold cards. */
	const headline: {
		icon: 'utility' | 'roleplay' | 'security' | 'greeting';
		title: string;
		body: string;
	}[] = [
		{
			icon: 'greeting',
			title: 'Two builders come with it',
			body:
				'An embed builder and a Components-V2 builder, both inside Discord. Build a message, save it, then pick it for the welcome.',
		},
		{
			icon: 'roleplay',
			title: 'A different GIF every time',
			body:
				'Right-click a message, open Apps and save its GIF to the pool. Each greeting picks one at random.',
		},
		{
			icon: 'security',
			title: 'It waits for the rules screen',
			body:
				'A member who has not accepted your rules yet is greeted when they accept, not the moment they appear.',
		},
		{
			icon: 'utility',
			title: 'Goodbyes as well',
			body:
				'Its own channel, its own design, its own mentions. Turn it on separately, or leave it off.',
		},
	];

	/** Section 2 - the data strip. */
	const specimen = [
		{ value: '2', label: 'Builders included' },
		{ value: '13', label: 'Placeholders' },
		{ value: '4', label: 'Permissions asked' },
		{ value: '0', label: 'Paid features' },
	];

	/** Section 3 - the thirteen placeholders, from Util/messagePlaceholders.ts and Util/placeholderVars.ts. */
	const placeholders = [
		{ token: '{{user}}', gives: 'A mention of the member who just joined' },
		{ token: '{{username}}', gives: 'Their Discord username' },
		{ token: '{{displayname}}', gives: 'Their display name, or the username if they have none' },
		{ token: '{{userid}}', gives: 'Their user ID' },
		{ token: '{{useravatar}}', gives: 'A link to their avatar image' },
		{ token: '{{usercreated}}', gives: 'When their account was created, shown as a Discord date' },
		{ token: '{{server}}', gives: 'Your server’s name' },
		{ token: '{{serverid}}', gives: 'The ID of your server' },
		{ token: '{{servericon}}', gives: 'A link to your server icon' },
		{ token: '{{membercount}}', gives: 'How many members you now have' },
		{ token: '{{boostcount}}', gives: 'How many boosts your server has' },
		{ token: '{{boosttier}}', gives: 'The boost tier of your server' },
		{ token: '{{gif}}', gives: 'A random image from your GIF pool' },
	];

	/** Section 5 - what the GIF pool does, from welcome/Util/gifPool.ts, saveGif.ts and gifList.ts. */
	const gifFacts = [
		{
			title: 'Fill it with a right-click',
			body:
				'Right-click a message, open Apps and choose Save GIF to welcome. Every image in it is saved, attached or linked. You need Manage Server.',
		},
		{
			title: 'Tenor links are converted',
			body:
				'A Tenor share link is saved as the actual GIF file. The bot reads it from Discord’s link preview, so the preview needs to have loaded first.',
		},
		{
			title: 'Look through it any time',
			body:
				'Open /settings automation welcome-gifs to see the pool, five per page with previews. Any image can be removed from the menu, and it stays until you remove it.',
		},
		{
			title: 'You decide where it lands',
			body:
				'Put {{gif}} in your design and the image goes exactly there. Leave it out and the bot attaches it at the bottom.',
		},
	];

	/** Section 6 - the settings surface, from welcome/Plugin.ts:217-380. */
	const settings = [
		'The channel the message is sent in',
		'A saved design, chosen from a list of your embeds and Components-V2 messages',
		'Whether the joining member is mentioned',
		'Roles to mention with the message',
		'Members to mention with the message',
		'A test button that sends the real thing',
		'The image pool under welcome-gifs, with previews and a remove menu',
		'A separate pool for goodbyes under goodbye-gifs',
	];

	/** Section 8 - FAQ. Every answer traceable to the ledger in ads/copy/welcome.md. */
	const faq = [
		{
			q: 'Do I have to build something before it works?',
			a: 'No. With no saved design it sends a clean default line, "Welcome @member to Server". The builders are there for when you want more than that.',
		},
		{
			q: 'What happens if my server has a rules screen?',
			a: 'Members arrive twice: once as pending, once when they accept. The bot remembers the first one for a week and greets on the accept. Someone who never accepts is never greeted, and someone who leaves while still pending gets no goodbye either.',
		},
		{
			q: 'What is the difference between the two builders?',
			a: 'The embed builder makes a classic Discord embed. The component builder makes a Components-V2 message, which can hold buttons, sections and image galleries. Each greeting uses one design, picked from a list that holds both kinds.',
		},
		{
			q: 'What permissions does it need?',
			a: 'Four: View Channel, Send Messages, Embed Links and Mention Everyone. The last one is only so role mentions with the greeting actually ping. It cannot ban, kick or time anyone out.',
		},
	];
</script>

<svelte:head>
	<title>Ayako | Welcome: welcome messages with a real builder</title>
	<meta
		name="description"
		content="Welcome and goodbye messages you design in the embed and Components-V2 builders that come with the bot. Random GIFs saved by right-click. Free, no dashboard."
	/>
	<link rel="canonical" href="https://ayakobot.com/bots/welcome" />
</svelte:head>

<!-- ══ 1 · hero ══════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
	<PetalDrift count={5} />

	<div class="relative z-1 max-w-3xl mx-auto text-center">
		<span
			class="inline-flex items-center justify-center w-20 h-20 rounded-full border-[1.6px] border-current bg-paper rotate-[-3deg] [animation:fade-up_0.7s_var(--ease-organic)_both]"
			style="color: var(--petal);"
		>
			<FeatureIcon name="greeting" size={42} />
		</span>

		<span
			class="label-specimen block mt-6 mb-3 [animation:fade-up_0.7s_0.08s_var(--ease-organic)_both]"
		>
			Plate IV · The Greeting
		</span>

		<h1
			class="font-display font-semibold text-4xl sm:text-6xl text-ink leading-[1.08] [animation:fade-up_0.7s_0.16s_var(--ease-organic)_both]"
		>
			A welcome worth reading
		</h1>

		<p
			class="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto mt-6 [animation:fade-up_0.7s_0.24s_var(--ease-organic)_both]"
		>
			Most greeters give you one line of text and a colour picker. This one gives you the builder.
			Design the message, save it, and every new member sees it.
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
					<span class="shrink-0 mt-0.5" style="color: var(--petal);">
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

<!-- ══ 3 · the builder — THE PAGE'S SIGNATURE ════════════════════════════ -->
<section class="relative px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 1 · The Press</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				The message is yours to design
			</h2>
			<p class="annotation text-xl mt-2">this is the whole product</p>
		</header>

		<div class="max-w-3xl mx-auto mt-11">
			<ol class="flex flex-col gap-0">
				<li class="flex items-start gap-5 border-t border-ink/15 py-6" use:reveal>
					<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">01</span>
					<div class="min-w-0">
						<h3 class="font-display font-semibold text-xl text-ink leading-snug">Open a builder</h3>
						<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
							<span class="code">/embed-builder create</span> for a classic embed, or
							<span class="code">/component-builder create</span> for a Components-V2 message with buttons, sections
							and image galleries. Both come with the bot.
						</p>
					</div>
				</li>

				<li class="flex items-start gap-5 border-t border-ink/15 py-6" use:reveal={{ delay: 0.08 }}>
					<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">02</span>
					<div class="min-w-0">
						<h3 class="font-display font-semibold text-xl text-ink leading-snug">Save it under a name</h3>
						<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
							The design is stored with your server, so you can reuse it, send it by hand, or edit it
							later.
						</p>
					</div>
				</li>

				<li class="flex items-start gap-5 border-t border-ink/15 py-6" use:reveal={{ delay: 0.16 }}>
					<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">03</span>
					<div class="min-w-0">
						<h3 class="font-display font-semibold text-xl text-ink leading-snug">
							Pick it from the list
						</h3>
						<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
							In <span class="code">/settings automation welcome</span>, choose it in the Saved Design
							field. Edit the design later and the greeting uses the new version.
						</p>
					</div>
				</li>

				<li
					class="flex items-start gap-5 border-t border-b border-ink/15 py-6"
					use:reveal={{ delay: 0.24 }}
				>
					<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">04</span>
					<div class="min-w-0">
						<h3 class="font-display font-semibold text-xl text-ink leading-snug">Press Test</h3>
						<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
							The test button sends the real message to the real channel, with you standing in for the new
							member. It works even while the greeting is still switched off.
						</p>
					</div>
				</li>
			</ol>

			<div class="flex items-start gap-4 mt-8" use:reveal>
				<span class="shrink-0 mt-1 opacity-70" style="color: var(--leaf);" aria-hidden="true">
					<Sprig size={38} color="var(--leaf)" />
				</span>
				<p class="text-[1.02rem] text-ink-soft leading-relaxed">
					Embeds and Components-V2 messages share one list, and each greeting holds one design from it.
				</p>
			</div>

			<!--
				The proof. A real Components-V2 greeting this bot sent in a 65,000-member server,
				not a mockup. Source JSON: ads/showcase/welcome-animekos.json. The photo keeps
				Discord's own dark look; only the mount around it is folio, per DESIGN.md.
			-->
			<figure class="relative max-w-xl mx-auto mt-14" use:reveal>
				<div
					class="relative rotate-[-1deg] rounded-[0.5rem_1.4rem_0.5rem_1.4rem] bg-paper-warm border border-ink/15 p-3 pt-5 shadow-press"
				>
					<Tape angle={-6} width={104} class="-top-3 left-8" />
					<Tape angle={5} width={96} class="-top-2.5 right-9" />

					<img
						src="/images/ads/welcome-cv2.webp"
						alt="The greeting as Discord renders it. A pink accent bar runs down the first block, which holds a wide banner, a headline mentioning the new member with the server icon inline beside it, and a Bring a friend button. A lavender bar runs down the second block, with artwork beside a paragraph about the server. Three link buttons close it."
						width="733"
						height="892"
						loading="lazy"
						decoding="async"
						class="block w-full h-auto rounded-[0.4rem]"
					/>
				</div>

				<figcaption class="text-[0.95rem] text-ink-soft leading-relaxed mt-5 px-1">
					One saved design, sent to a real member. The coloured bars, the image beside the text, the
					button sitting inside a paragraph and the buttons along the bottom are all components you place
					yourself. The name and member count filled themselves in.
				</figcaption>
			</figure>
		</div>
	</div>
</section>

<!-- ══ 4 · the placeholders ══════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-4xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 2 · The Labels</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Thirteen things the bot fills in
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				Write these anywhere in your design. They work in every field, including inside buttons and
				nested sections.
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
	</div>
</section>

<!-- ══ 5 · the GIF pool ══════════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 3 · The Cuttings Box</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				A different image every time
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				Save images into the pool with a right-click on any message. Every greeting draws one at random,
				and goodbyes have a pool of their own.
			</p>
		</header>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-11">
			{#each gifFacts as fact, gi (fact.title)}
				<div
					class="card-paper !bg-paper px-6 py-5 {gi % 2 === 0 ? 'rotate-[-0.4deg]' : 'rotate-[0.4deg]'}"
					use:reveal={{ delay: gi * 0.06 }}
				>
					<h3 class="font-display font-semibold text-lg text-ink leading-snug">{fact.title}</h3>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-1.5">{fact.body}</p>
				</div>
			{/each}
		</div>

		<p class="annotation text-xl text-center mt-10 rotate-[-1deg]">
			the reply is just for you and says how many it saved
		</p>
	</div>
</section>

<!-- ══ 6 · the settings surface ══════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-4xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 4 · The Bench</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Everything sits under one command
			</h2>
			<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-4">
				<span class="code">/settings automation</span>, inside Discord, with four subcommands: welcome,
				goodbye, welcome-gifs and goodbye-gifs. There is no dashboard to log into.
			</p>
		</header>

		<ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 mt-11">
			{#each settings as item, si (item)}
				<li
					class="flex items-start gap-3 border-t border-ink/15 py-4"
					use:reveal={{ delay: si * 0.04 }}
				>
					<span
						class="i-tabler-leaf w-4 h-4 shrink-0 mt-1"
						style="color: var(--leaf);"
						aria-hidden="true"
					></span>
					<span class="text-[0.95rem] text-ink-soft leading-relaxed">{item}</span>
				</li>
			{/each}
		</ul>

		<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-8" use:reveal>
			Goodbyes have their own channel, design, mentions, test button and image pool. A goodbye cannot
			mention the member who left, because they are no longer there to be pinged, and none is sent for
			a member who was kicked, banned or removed by a prune.
		</p>
	</div>
</section>

<!-- ══ 7 · the pending-member point ══════════════════════════════════════ -->
<section class="relative px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div
		class="absolute top-8 right-4 sm:right-16 rotate-[18deg] opacity-30 pointer-events-none"
		aria-hidden="true"
	>
		<Bloom size={150} color="var(--petal-soft)" />
	</div>

	<div class="relative z-1 max-w-3xl mx-auto">
		<header class="max-w-2xl">
			<span class="label-specimen block mb-3">Marginalia</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				The thing most welcome bots get wrong
			</h2>
		</header>

		<p class="text-[1.05rem] text-ink-soft leading-relaxed mt-6">
			If your server has a rules screen, a new member shows up twice. Once the moment they arrive,
			still pending, and again when they accept your rules. Greeting them on the first one means
			greeting an empty profile that may never come back, and your welcome channel fills with messages
			for people who never joined.
		</p>

		<div class="flex justify-center my-9" aria-hidden="true">
			<Flourish width={200} color="var(--ink-faint)" />
		</div>

		<p class="text-[1.05rem] text-ink-soft leading-relaxed">
			This bot notes the arrival and says nothing. When the member accepts, it greets them properly. If
			they leave while still pending, they get no goodbye either, because as far as your server is
			concerned they were never really there.
		</p>
	</div>
</section>

<!-- ══ 8 · FAQ ═══════════════════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-3xl mx-auto">
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
			Give people a reason to say hello back
		</h2>

		<p class="text-lg text-leaf-soft leading-relaxed max-w-xl mx-auto mt-5">
			{bot.name} brings its own builders, so the message can look like your server rather than like a default.
			Free forever, with no paid plan.
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
	and paper below. Filling with paper instead eats ~30px of the dark band. The -1px
	margin overlaps the container so the two plate areas cannot leave a seam.
-->
<TornEdge fill="var(--plate)" flip class="mt-[-1px]" />
