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

	const bot = bots.info;

	/** Section 1 - the four above-the-fold features, dossier §3.3, simplified to plain English. */
	const headline = [
		{
			icon: 'security',
			title: 'The real permissions, all 6 layers',
			body:
				'The bot checks 6 layers in the same order Discord does: owner, the @everyone role, the ' +
				'member’s roles, then the channel overwrites for @everyone, for roles, and for the member. ' +
				'It also checks timeouts, so a member in timeout correctly shows Send Messages as denied.',
		},
		{
			icon: 'utility',
			title: 'Change the channel, keep the answer',
			body:
				'Pick a different channel from a menu. The bot shows all 47 permissions for that ' +
				'channel, without running the command again.',
		},
		{
			icon: 'lens',
			title: 'One command for everything with an ID',
			body:
				'User, server, channel, role, emoji, sticker, invite, webhook, AutoMod, scheduled events, ' +
				'soundboard, and more.',
		},
		{
			icon: 'roles',
			title: '4 permissions. Read-only. No setup.',
			body:
				'View Channel, Send Messages, Embed Links, Read Message History. The settings list is ' +
				'empty, because there is nothing to set up.',
		},
	] as const;

	/** Section 2 - specimen data, every figure traceable. */
	const specimen = [
		{ value: '17', label: 'Subcommands' },
		{ value: '47', label: 'Permissions in 7 categories' },
		{ value: '113', label: 'Discord features translated into plain words' },
		{ value: '4', label: 'Permissions it asks for' },
	];

	/**
	 * Section 3 - the resolution chain. Layer copy for the signature plate; the
	 * order is the resolution order the bot walks, top to bottom.
	 */
	const chain = [
		{
			step: '01',
			name: 'The server owner',
			note: 'The server owner always has every permission. For the owner, the check stops here.',
		},
		{
			step: '02',
			name: 'The @everyone role',
			note: 'Every member starts with the permissions of the @everyone role.',
		},
		{
			step: '03',
			name: 'The member’s roles',
			note:
				'Each role the member has adds its permissions. A role with Administrator gives every ' +
				'permission, and the check stops here.',
		},
		{
			step: '04',
			name: 'The @everyone channel overwrite',
			note:
				'Now the channel’s own rules start. The overwrite for @everyone removes its denied ' +
				'permissions first, then adds its allowed ones.',
		},
		{
			step: '05',
			name: 'The role channel overwrites',
			note:
				'The bot joins all role overwrites for this channel into one. This one also removes ' +
				'denied permissions first, then adds allowed ones.',
		},
		{
			step: '06',
			name: 'The member channel overwrite',
			note: 'An overwrite set for this one member comes last. It wins over every layer above.',
		},
	];

	/** Section 4 - the index of specimens. Descriptions lifted from the command builder. */
	const inspectors = [
		{ name: 'user', desc: 'Information about a user.' },
		{ name: 'avatar', desc: 'The avatar of a user.' },
		{ name: 'banner', desc: 'The banner of a user.' },
		{ name: 'server', desc: 'Information about a server the bot is already in.' },
		{ name: 'channel', desc: 'Information about a channel.' },
		{ name: 'role', desc: 'Information about a role.' },
		{ name: 'emoji', desc: 'Information about an emoji, or the whole emoji list.' },
		{ name: 'sticker', desc: 'Information about a sticker, or the whole sticker list.' },
		{ name: 'invite', desc: 'Information about an invite link or code.' },
		{ name: 'bot', desc: 'Information about this bot.' },
		{ name: 'badges', desc: 'The Discord badges that members of this server have.' },
		{ name: 'servers', desc: 'Every server this bot is in.' },
		{ name: 'events', desc: 'The scheduled events of this server.' },
		{ name: 'webhook', desc: 'Information about a webhook, from its URL.' },
		{ name: 'automod', desc: 'The auto-moderation rules of this server.' },
		{ name: 'soundboard', desc: 'The soundboard sounds of this server.' },
		{
			name: 'permissions',
			desc: 'The permissions of a user or role, for the whole server or for one channel.',
		},
	];

	/** Section 5 - what View Raw actually prints, abbreviated for the page. */
	const rawSample = `{
  "id": "1289334712058445824",
  "type": 0,
  "content": "see #rules before posting",
  "author": { "id": "…", "username": "…", "public_flags": 4194432 },
  "timestamp": "2026-08-12T19:04:11.288000+00:00",
  "edited_timestamp": "2026-08-12T19:06:02.117000+00:00",
  "mentions": [], "attachments": [], "embeds": [],
  "pinned": false, "flags": 0
}`;

	/** Section 6 - the badge census. The 14 flags the census actually counts. */
	const badges = [
		'Discord Employee',
		'Partnered Server Owner',
		'Hype Squad Events Member',
		'Bug Hunter Level 1',
		'House of Bravery Member',
		'House of Brilliance Member',
		'House of Balance Member',
		'Early Supporter',
		'Bug Hunter Level 2',
		'Verified Bot',
		'Early Verified Bot Developer',
		'Certified Moderator',
		'HTTP Interactions Bot',
		'Active Developer',
	];

	/** Section 7 - scope. The literal permission set, and the honest negative space. */
	const permissions = [
		{ name: 'View Channel', why: 'to see the channel where you run the command' },
		{ name: 'Send Messages', why: 'to answer' },
		{ name: 'Embed Links', why: 'to answer with a clean embed' },
		{ name: 'Read Message History', why: 'to find the message you right-clicked' },
	];

	const cannot = [
		'Ban, kick or time out anyone',
		'Delete, edit or moderate a message',
		'Create or change a role, channel or webhook',
		'Save any settings (the settings list is empty)',
		'Work in DMs, or install on a user account',
		'Look up a server it is not in',
	];

	/** Section 8 - FAQ. Questions verbatim from the dossier; answers traceable. */
	const faq = [
		{
			q: 'Why are this member’s permissions different from their role?',
			a:
				'Because a role is only layer 3 of 6. Three channel overwrites come after it: for ' +
				'@everyone, for roles, and for this member. An active timeout can also change the result. ' +
				'The panel shows the final answer for the channel you picked.',
		},
		{
			q: 'Does it work on users who left the server?',
			a:
				'Yes. If the user is not in the bot’s cache, the bot asks Discord directly, so a plain ' +
				'user ID is enough. But some data only exists for members: roles, join date, and channel ' +
				'permissions. For that data, the user must still be in the server.',
		},
		{
			q: 'Can I see what a message said before it was edited?',
			a:
				'Usually. Right-click a message and choose Message History. You see the versions the bot ' +
				'saw in the last 14 days, and only from the time the bot was online. Older versions, ' +
				'and edits made while the bot was offline, are missing.',
		},
		{
			q: 'What permissions does it need?',
			a:
				'It needs 4: View Channel, Send Messages, Embed Links and Read Message History. That ' +
				'is the full list. All 4 are for reading and answering.',
		},
	];
</script>

<svelte:head>
	<title>Ayako | Info: the read-only Discord inspector</title>
	<meta
		name="description"
		content="One /info command inspects any user, server, role, channel or message. It recomputes permissions the way Discord actually resolves them, channel overwrites and timeouts included. Read-only, four permissions, nothing to configure."
	/>
	<link rel="canonical" href="https://ayakobot.com/bots/info" />
</svelte:head>

<!-- ══ 1 · hero ══════════════════════════════════════════════════════════ -->
<section class="relative overflow-hidden px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
	<PetalDrift count={5} />

	<div class="relative z-1 max-w-3xl mx-auto text-center">
		<span
			class="inline-flex items-center justify-center w-20 h-20 rounded-full border-[1.6px] border-current bg-paper rotate-[-3deg] [animation:fade-up_0.7s_var(--ease-organic)_both]"
			style="color: var(--gold);"
		>
			<FeatureIcon name="lens" size={42} />
		</span>

		<span
			class="label-specimen block mt-6 mb-3 [animation:fade-up_0.7s_0.08s_var(--ease-organic)_both]"
		>
			Plate III · The Field Lens
		</span>

		<h1
			class="font-display font-semibold text-4xl sm:text-6xl text-ink leading-[1.08] [animation:fade-up_0.7s_0.16s_var(--ease-organic)_both]"
		>
			Why can’t they post here?
		</h1>

		<p
			class="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl mx-auto mt-6 [animation:fade-up_0.7s_0.24s_var(--ease-organic)_both]"
		>
			One <span class="code">/info</span> command looks up any user, server, role, channel or message. It
			calculates permissions the same way Discord does, with channel overwrites and timeouts included.
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
				Read-only. 4 permissions. Nothing to set up.
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
					<span class="shrink-0 mt-0.5" style="color: var(--gold);">
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

<!-- ══ 3 · the resolution chain — THE PAGE'S SIGNATURE ═══════════════════ -->
<section class="relative px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 1 · The Resolution Chain</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				6 layers, checked in order
			</h2>
			<p class="annotation text-xl mt-2">this is the whole product</p>
		</header>

		<div class="max-w-4xl mx-auto mt-10">
			<!-- prettier-ignore -->
			<svg class="w-full h-auto" viewBox="0 0 900 680" fill="none" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">
	<!-- the seed packet pouring everything in at the top -->
	<path d="M 338 27 C 356 22.6, 374 19.2, 392 16.4 C 395 29, 398.2 41.6, 401 54.4 C 383 57.8, 365 61.2, 347.4 64.4 C 344.2 52, 341 39.4, 338 27 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 343.6 32.4 C 360.4 28.4, 377.2 25.2, 394 22.2" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 404 52 C 418 57.6, 430.4 64.8, 440 75.6" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" stroke-dasharray="4 4" />
	<circle cx="413" cy="55" r="2.2" fill="var(--ink-soft)" />
	<circle cx="427" cy="63.4" r="2.2" fill="var(--ink-soft)" />
	<circle cx="438" cy="73.8" r="2.2" fill="var(--ink-soft)" />
	<text x="470" y="42" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">every permission pours in</text>

	<!-- tray 01 - owner -->
	<path d="M 334 92 C 371 102.4, 409 103.6, 446 103.1 C 483 102.5, 521 101.6, 558 92 C 520.8 86.1, 483.4 84.7, 446 84.9 C 408.6 85.1, 371.2 86.3, 334 92 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 335 94 C 337.4 102.8, 339.9 111.4, 343 120 C 412 124.4, 481 124.7, 549.4 120.3 C 552.4 111.7, 555.4 103, 557 94.2" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 352 97.6 C 415 102, 478 102.4, 540 98" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" stroke-dasharray="2.5 4.5" />
	<text x="112" y="97" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">01</text>
	<text x="142" y="97" transform="rotate(-1.5 142 97)" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">owner</text>

	<!-- owner escape chute: the check stops here -->
	<path d="M 561 97 C 588 107.8, 614 119.4, 640 131.6" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 567 87.4 C 594 98, 620 109.6, 646 121.4" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 643 137.4 C 652 134, 662.4 133.8, 672 136.8" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 643 137.4 C 645.8 145.6, 651.2 151.6, 658.2 152.8 C 665.2 153.8, 670.6 146.4, 672 136.8" stroke="var(--ink-soft)" stroke-width="1.2" />
	<circle cx="601" cy="111" r="3.4" fill="var(--petal)" />
	<circle cx="629" cy="125" r="2.2" fill="var(--ink-soft)" />
	<circle cx="657" cy="143" r="2.2" fill="var(--ink-soft)" />
	<text x="688" y="126" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">has everything,</text>
	<text x="688" y="148" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">the check stops here</text>

	<!-- falling seeds, gap 1 -->
	<circle cx="447" cy="134" r="2.2" fill="var(--ink-soft)" />
	<path d="M 451.5 137.8 C 451.7 140.4, 451.8 143, 452 145.4" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<circle cx="452" cy="148" r="2.2" fill="var(--ink-soft)" />
	<circle cx="455" cy="161" r="2.2" fill="var(--ink-soft)" />

	<!-- tray 02 - @everyone -->
	<path d="M 344 176 C 381 186.6, 419 187.7, 456 187.2 C 493 186.6, 531 185.5, 568 176 C 530.8 170, 493.4 168.8, 456 169 C 418.6 169.2, 381.2 170.4, 344 176 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 345 178 C 347.4 186.8, 349.9 195.4, 353 204 C 422 208.5, 491 208.8, 559.4 204.4 C 562.4 195.8, 565.4 187.1, 567 178.2" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 362 181.4 C 425 185.8, 488 186.2, 550 182.2" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" stroke-dasharray="2.5 4.5" />
	<text x="112" y="181" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">02</text>
	<text x="142" y="181" transform="rotate(1.2 142 181)" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">@everyone</text>
	<text x="604" y="184" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">the base every member starts with</text>

	<!-- falling seeds, gap 2 -->
	<circle cx="453" cy="218" r="2.2" fill="var(--ink-soft)" />
	<path d="M 448.4 222 C 448.3 224.6, 448.1 227.2, 448 229.6" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<circle cx="448" cy="232" r="2.2" fill="var(--ink-soft)" />
	<circle cx="444" cy="245" r="2.2" fill="var(--ink-soft)" />

	<!-- tray 03 - roles -->
	<path d="M 334 260 C 371 270.5, 409 271.7, 446 271.2 C 483 270.6, 521 269.4, 558 260 C 520.8 254.1, 483.4 252.8, 446 253 C 408.6 253.2, 371.2 254.3, 334 260 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 335 262 C 337.4 270.8, 339.9 279.4, 343 288 C 412 292.4, 481 292.8, 549.4 288.3 C 552.4 279.7, 555.4 271, 557 262.2" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 352 265.5 C 415 269.8, 478 270.3, 540 266.1" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" stroke-dasharray="2.5 4.5" />
	<text x="112" y="265" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">03</text>
	<text x="142" y="265" transform="rotate(-1.2 142 265)" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">roles</text>
	<text x="142" y="291" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">each role adds its seeds</text>

	<!-- Administrator escape chute -->
	<path d="M 561 265 C 594 278.6, 627 292.8, 660 307.4" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 567 255.6 C 600 269.2, 633 283.6, 666 298.2" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 663 313.6 C 672 310.2, 682.4 310, 692 313" stroke="var(--ink-soft)" stroke-width="1.2" />
	<path d="M 663 313.6 C 665.8 321.8, 671.2 327.8, 678.2 329 C 685.2 330, 690.6 322.6, 692 313" stroke="var(--ink-soft)" stroke-width="1.2" />
	<circle cx="611" cy="286" r="3.4" fill="var(--petal)" />
	<circle cx="641" cy="299.6" r="2.2" fill="var(--ink-soft)" />
	<circle cx="677" cy="319" r="2.2" fill="var(--ink-soft)" />
	<text x="706" y="296" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">Administrator role</text>
	<text x="706" y="318" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">leaves here with it all</text>

	<!-- falling seeds, gap 3 - roles pour their own seeds into the stream -->
	<circle cx="449" cy="302" r="2.2" fill="var(--ink-soft)" />
	<path d="M 454.6 306 C 454.7 308.6, 454.9 311.2, 455 313.6" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<circle cx="455" cy="316" r="2.2" fill="var(--ink-soft)" />
	<circle cx="459" cy="329" r="2.2" fill="var(--ink-soft)" />
	<path d="M 372 306 C 384 310.2, 396 314, 407 317.2" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<circle cx="411" cy="318.4" r="2.4" fill="var(--leaf)" />
	<path d="M 526 300 C 513 305.6, 500 310.6, 490 314.4" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<circle cx="486" cy="315.6" r="2.4" fill="var(--leaf)" />

	<!-- tray 04 - @everyone overwrite -->
	<path d="M 346 344 C 383 354.5, 421 355.8, 458 355.2 C 495 354.6, 533 353.4, 570 344 C 532.8 338.1, 495.4 336.8, 458 337 C 420.6 337.2, 383.2 338.4, 346 344 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 347 346 C 349.4 354.8, 351.9 363.4, 355 372 C 424 376.5, 493 376.8, 561.4 372.4 C 564.4 363.8, 567.4 355.1, 569 346.2" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 364 349.6 C 427 353.8, 490 354.4, 552 350.2" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" stroke-dasharray="2.5 4.5" />
	<circle cx="428" cy="349.5" r="2.3" fill="var(--ink-soft)" />
	<circle cx="476" cy="350.5" r="2.3" fill="var(--ink-soft)" />
	<text x="112" y="349" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">04</text>
	<text x="142" y="349" transform="rotate(1 142 349)" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">@everyone overwrite</text>
	<text x="604" y="352" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">denies are caught first,</text>
	<text x="604" y="374" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">then allows drop back in</text>

	<!-- falling seeds, gap 4 - one allowed seed added back -->
	<circle cx="455" cy="386" r="2.2" fill="var(--ink-soft)" />
	<path d="M 450.5 389 C 450.3 391.6, 450.2 394.2, 450 396.6" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<circle cx="450" cy="399" r="2.2" fill="var(--ink-soft)" />
	<circle cx="446" cy="412" r="2.2" fill="var(--ink-soft)" />
	<path d="M 502 380 C 494 385.6, 486 390.4, 478 394.4" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<circle cx="474" cy="396.4" r="2.4" fill="var(--leaf)" />

	<!-- tray 05 - role overwrites, merged into one; ghost rims above -->
	<path d="M 340 424 C 377 417.4, 414 415.8, 451 416.4" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 350 419.4 C 384 413.6, 418 412, 452 412.8" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<path d="M 334 428 C 371 438.4, 409 439.7, 446 439.1 C 483 438.6, 521 437.4, 558 428 C 520.8 422.1, 483.4 420.8, 446 421 C 408.6 421.2, 371.2 422.4, 334 428 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 335 430 C 337.4 438.8, 339.9 447.4, 343 456 C 412 460.4, 481 460.8, 549.4 456.3 C 552.4 447.7, 555.4 439, 557 430.2" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 352 433.4 C 415 437.9, 478 438.2, 540 434" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" stroke-dasharray="2.5 4.5" />
	<circle cx="418" cy="433.5" r="2.3" fill="var(--ink-soft)" />
	<circle cx="466" cy="434.5" r="2.3" fill="var(--ink-soft)" />
	<text x="112" y="433" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">05</text>
	<text x="142" y="433" transform="rotate(-1 142 433)" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">role overwrites</text>
	<text x="604" y="436" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">all role overwrites,</text>
	<text x="604" y="458" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">merged into one tray</text>

	<!-- falling seeds, gap 5 - one allowed seed added back -->
	<circle cx="449" cy="468" r="2.2" fill="var(--ink-soft)" />
	<path d="M 452.6 471 C 452.7 473.6, 452.9 476.2, 453 478.6" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<circle cx="453" cy="481" r="2.2" fill="var(--ink-soft)" />
	<path d="M 500 464 C 492 469.4, 484 474, 476 478.4" stroke="var(--leaf-soft)" stroke-width="1.2" />
	<circle cx="472" cy="480.4" r="2.4" fill="var(--leaf)" />

	<!-- tray 06 - member overwrite -->
	<path d="M 342 512 C 379 522.5, 417 523.7, 454 523.1 C 491 522.6, 529 521.4, 566 512 C 528.8 506.1, 491.4 504.8, 454 505 C 416.6 505.2, 379.2 506.4, 342 512 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 343 514 C 345.4 522.8, 347.9 531.4, 351 540 C 420 544.4, 489 544.8, 557.4 540.3 C 560.4 531.7, 563.4 523, 565 514.2" stroke="var(--ink)" stroke-width="1.6" />
	<text x="112" y="517" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">06</text>
	<text x="142" y="517" transform="rotate(1.3 142 517)" font-family="var(--font-hand)" font-size="21" fill="var(--ink-soft)">member overwrite</text>
	<text x="126" y="558" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">wins over everything above</text>

	<!-- 07 - timeout mesh, laid across the last tray -->
	<path d="M 326 502 C 411 496.2, 497 493.4, 582 494.6 C 584 502.2, 586.2 509.8, 588 517.2 C 503 521, 417 523.8, 332 526 C 330 518, 328 510, 326 502 Z" stroke="var(--ink)" stroke-width="1.6" />
	<path d="M 344 501.5 C 347 509.5, 350 517.4, 353 524.8" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 368 500.8 C 371 508.8, 374 516.7, 377 524.1" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 392 500.1 C 395 508.1, 398 516, 401 523.4" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 416 499.4 C 419 507.4, 422 515.3, 425 522.7" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 440 498.7 C 443 506.7, 446 514.6, 449 522" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 464 498 C 467 506, 470 513.9, 473 521.3" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 488 497.3 C 491 505.3, 494 513.2, 497 520.6" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 512 496.6 C 515 504.6, 518 512.5, 521 519.9" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 536 495.9 C 539 503.9, 542 511.8, 545 519.2" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 560 495.2 C 563 503.2, 566 511.1, 569 518.5" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 358 501.1 C 355 509.1, 352 517, 349 524.4" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 406 499.7 C 403 507.7, 400 515.6, 397 523" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 454 498.3 C 451 506.3, 448 514.2, 445 521.6" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 502 496.9 C 499 504.9, 496 512.8, 493 520.2" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<path d="M 550 495.5 C 547 503.5, 544 511.4, 541 518.8" stroke="var(--ink-soft)" stroke-width="0.8" opacity="0.5" />
	<circle cx="506" cy="495.5" r="2.3" fill="var(--ink-soft)" />
	<path d="M 596 505 C 591 506.4, 586.6 507.6, 582 509" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<text x="600" y="509" font-family="var(--font-mono)" font-size="13" fill="var(--ink-faint)">07</text>
	<text x="630" y="509" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">timeout mesh</text>
	<text x="600" y="533" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">only a trickle passes</text>

	<!-- the trickle that survives -->
	<circle cx="451" cy="558" r="2.2" fill="var(--ink-soft)" />
	<path d="M 453.6 568 C 453.7 570.8, 453.9 573.4, 454 575.8" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<circle cx="454" cy="578" r="2.2" fill="var(--ink-soft)" />

	<!-- the collecting dish - the answer -->
	<path d="M 386 600 C 428 608.6, 472 608.9, 514 600.5 C 471.8 593.3, 428.2 593.1, 386 600 Z" stroke="var(--gold)" stroke-width="1.6" />
	<path d="M 387 602 C 391 617.4, 399 631.6, 414.6 636.6 C 437.6 642, 463 641.8, 485.8 636.4 C 501.4 631.2, 509.6 616.8, 513 602.2" stroke="var(--gold)" stroke-width="1.6" />
	<path d="M 397 600.8 C 430 606.2, 466 606.4, 503 601" stroke="var(--gold)" stroke-width="0.8" opacity="0.5" />
	<path d="M 431 640.2 C 429.8 645, 428.4 649.8, 427 654.4" stroke="var(--gold)" stroke-width="1.2" />
	<path d="M 469 640.6 C 470.4 645.2, 471.8 649.8, 473 654.4" stroke="var(--gold)" stroke-width="1.2" />
	<path d="M 421 655.4 C 440 658.4, 460 658.2, 479 655" stroke="var(--gold)" stroke-width="1.2" />
	<circle cx="436" cy="602.6" r="2.3" fill="var(--ink-soft)" />
	<circle cx="453" cy="605.4" r="2.3" fill="var(--ink-soft)" />
	<circle cx="469" cy="602" r="2.3" fill="var(--ink-soft)" />
	<path d="M 548 630 C 537 626.6, 526.4 623.2, 516 620" stroke="var(--ink-faint)" stroke-width="0.8" opacity="0.5" />
	<text x="552" y="634" transform="rotate(-1.5 552 634)" font-family="var(--font-hand)" font-size="23" fill="var(--ink-soft)">the answer</text>
	<text x="552" y="660" font-family="var(--font-hand)" font-size="20" fill="var(--ink-soft)">what the member can really do</text>
</svg>
		</div>
		<p class="annotation text-lg text-center mt-4">
			Fig. 1: the 6 layers, in the same order the bot checks them.
		</p>

		<!-- the figure's key: the six layers, in resolution order -->
		<ol class="max-w-3xl mx-auto mt-12 border-t border-ink/15">
			{#each chain as layer, li (layer.step)}
				<li
					class="flex items-baseline gap-4 sm:gap-6 py-4 border-b border-ink/15"
					use:reveal={{ delay: li * 0.06 }}
				>
					<span class="font-mono text-sm shrink-0 w-8" style="color: var(--gold);">
						{layer.step}
					</span>
					<div class="min-w-0">
						<span class="font-display font-semibold text-lg text-ink">{layer.name}</span>
						<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-0.5">{layer.note}</p>
					</div>
				</li>
			{/each}
		</ol>

		<div class="max-w-3xl mx-auto mt-8 flex items-start gap-4" use:reveal>
			<span class="shrink-0 mt-1" style="color: var(--gold);">
				<FeatureIcon name="security" size={30} />
			</span>
			<p class="text-[1.02rem] text-ink-soft leading-relaxed">
				<span class="font-display font-semibold text-ink">Then the timeout mask.</span> If the member
				has an active timeout, the bot applies it on top of the final result. So a member in timeout
				shows
				<span class="code">Send Messages</span> as denied. A menu under the answer lets you pick another channel,
				and the bot shows all 47 permissions there without running the command again.
			</p>
		</div>
	</div>
</section>

<!-- ══ 4 · the 17 inspectors, as an index of specimens ═══════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-4xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Index of Specimens</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				One command, 17 subcommands
			</h2>
			<p class="text-lg text-ink-soft mt-3">
				Every subcommand of <span class="code">/info</span>. You can post each answer in the channel, or
				see it only for yourself.
			</p>
		</header>

		<ol class="mt-10 border-t border-ink/15">
			{#each inspectors as inspector, ii (inspector.name)}
				<li
					class="flex items-baseline gap-4 sm:gap-6 py-3 border-b border-ink/15 [transition:background-color_0.3s] hover:bg-paper-warm/70"
					use:reveal={{ delay: Math.min(ii, 8) * 0.03 }}
				>
					<span class="font-mono text-xs text-ink-soft shrink-0 w-7 tabular-nums">
						{String(ii + 1).padStart(2, '0')}
					</span>
					<span class="font-mono text-sm text-ink shrink-0 w-32 sm:w-40">
						/info {inspector.name}
					</span>
					<span class="text-[0.95rem] text-ink-soft leading-relaxed min-w-0">
						{inspector.desc}
					</span>
				</li>
			{/each}
		</ol>

		<div class="flex justify-center mt-10 opacity-60" aria-hidden="true">
			<Sprig size={54} color="var(--leaf-soft)" class="rotate-[100deg]" />
		</div>
	</div>
</section>

<!-- ══ 5 · message forensics ═════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Figure 2 · Message Forensics</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				What the message actually said
			</h2>
			<p class="annotation text-xl mt-2">the message, and the message before that</p>
		</header>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-12">
			<!-- View Raw, taped in -->
			<figure class="relative rotate-[-0.9deg]" use:reveal>
				<Tape angle={-7} width={92} class="-top-3 left-8" />
				<div class="card-paper !bg-paper px-5 pt-6 pb-5 shadow-press-lg">
					<div class="flex items-center gap-2 mb-3">
						<span class="i-tabler-search w-4 h-4 text-ink-soft" aria-hidden="true"></span>
						<span class="label-specimen">Specimen A · View Raw</span>
					</div>
					<pre
						class="code-font text-[0.72rem] leading-relaxed text-ink bg-paper-deep/70 rounded-[0.35rem] px-3 py-3 overflow-x-auto">{rawSample}</pre>
				</div>
				<figcaption class="text-[0.95rem] text-ink-soft leading-relaxed mt-4 px-1">
					The message exactly as Discord's API sends it: flags, embeds, attachments, timestamps, and
					everything else. If the data is long, the bot sends it as a file, so nothing is cut off.
				</figcaption>
			</figure>

			<!-- Message History, drawn as a stack of overlapping slips -->
			<figure class="relative rotate-[0.9deg]" use:reveal={{ delay: 0.1 }}>
				<Tape angle={6} width={92} class="-top-3 right-8" />
				<div class="card-paper !bg-paper px-5 pt-6 pb-5 shadow-press-lg">
					<div class="flex items-center gap-2 mb-3">
						<span class="i-tabler-reload w-4 h-4 text-ink-soft" aria-hidden="true"></span>
						<span class="label-specimen">Specimen B · Message History</span>
					</div>

					<div class="relative pl-3">
						<div
							class="border border-ink/20 bg-paper-warm rounded-[0.3rem_0.7rem_0.3rem_0.7rem] px-3.5 py-2.5 rotate-[-1.1deg]"
						>
							<span class="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
								Version 1
							</span>
							<p class="text-[0.9rem] text-ink-soft leading-snug mt-1">see #rules befor posting</p>
						</div>
						<div
							class="border border-ink/20 bg-paper-warm rounded-[0.3rem_0.7rem_0.3rem_0.7rem] px-3.5 py-2.5 rotate-[0.8deg] -mt-1 ml-3"
						>
							<span class="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft">
								Version 2
							</span>
							<p class="text-[0.9rem] text-ink-soft leading-snug mt-1">see #rules before posting</p>
						</div>
						<div
							class="border border-ink/20 bg-paper rounded-[0.3rem_0.7rem_0.3rem_0.7rem] px-3.5 py-2.5 rotate-[-0.5deg] -mt-1 ml-6 shadow-press"
						>
							<span
								class="font-mono text-[0.65rem] uppercase tracking-[0.14em]"
								style="color: var(--gold);"
							>
								Current
							</span>
							<p class="text-[0.9rem] text-ink leading-snug mt-1">see #rules before posting, thanks!</p>
						</div>
					</div>
				</div>
				<figcaption class="text-[0.95rem] text-ink-soft leading-relaxed mt-4 px-1">
					Every version the bot saw, oldest first, with the changes between them. The bot keeps versions
					for <strong class="text-ink">14 days</strong>, and only from the time it was online. Older
					versions, and edits made while the bot was offline, are missing.
				</figcaption>
			</figure>
		</div>
	</div>
</section>

<!-- ══ 6 · the badge census ══════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Plate III(b) · The Badge Tray</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				Which badges your members have
			</h2>
			<p class="text-lg text-ink-soft mt-3">
				<span class="code">/info badges</span> counts 14 Discord badges across up to 3,000 cached members.
				It also shows you how many members it checked.
			</p>
		</header>

		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-11">
			{#each badges as badge, bi (badge)}
				<div
					class="relative border border-ink/15 bg-paper-warm rounded-[0.35rem_1rem_0.4rem_1.1rem] px-4 pt-5 pb-4 [transition:transform_0.4s_var(--ease-organic),box-shadow_0.4s_var(--ease-organic)] hover:rotate-0 hover:shadow-press {bi %
						2 ===
					0
						? 'rotate-[-0.6deg]'
						: 'rotate-[0.6deg]'}"
					use:reveal={{ delay: Math.min(bi, 7) * 0.04 }}
				>
					<!-- the pin -->
					<span
						class="absolute top-2 left-1/2 -ml-[3px] w-1.5 h-1.5 rounded-full"
						style="background: var(--gold);"
						aria-hidden="true"
					></span>
					<span class="font-mono text-[0.65rem] text-ink-soft block">
						{String(bi + 1).padStart(2, '0')}
					</span>
					<span class="font-display font-semibold text-[0.95rem] text-ink leading-snug block mt-1">
						{badge}
					</span>
				</div>
			{/each}
		</div>

		<p class="annotation text-lg text-center mt-6">
			14 badges, up to 3,000 cached members, and it always shows how many it checked
		</p>
	</div>
</section>

<!-- ══ 7 · scope & privacy ═══════════════════════════════════════════════ -->
<section class="px-5 sm:px-8 py-20 sm:py-24 bg-paper-warm/60" use:reveal>
	<div class="max-w-5xl mx-auto">
		<header class="text-center max-w-2xl mx-auto">
			<span class="label-specimen block mb-3">Specimen Label · Scope</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink leading-tight">
				4 permissions, and a long list of things it can never do
			</h2>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mt-11">
			<!-- what it asks for -->
			<div class="card-paper !bg-paper px-6 py-6 rotate-[-0.5deg]">
				<span class="label-specimen block mb-4">It asks for</span>
				<ul class="border-t border-ink/15">
					{#each permissions as permission (permission.name)}
						<li class="py-3 border-b border-ink/15">
							<span class="font-mono text-[0.95rem] text-ink block">{permission.name}</span>
							<span class="text-[0.9rem] text-ink-soft leading-snug">{permission.why}</span>
						</li>
					{/each}
				</ul>
				<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-4">
					That is the full list. The settings list is empty, so there is no setup step, no dashboard
					page, and the bot saves nothing for you.
				</p>
			</div>

			<!-- what it cannot do -->
			<div class="card-paper !bg-paper px-6 py-6 rotate-[0.5deg]">
				<span class="label-specimen block mb-4">It cannot</span>
				<ul class="space-y-2.5">
					{#each cannot as item (item)}
						<li class="flex items-start gap-2.5">
							<span class="i-tabler-x w-4 h-4 shrink-0 mt-1 text-ink-soft" aria-hidden="true"></span>
							<span class="text-[0.98rem] line-through decoration-ink/40 text-ink-soft">
								{item}
							</span>
						</li>
					{/each}
				</ul>

				<div class="border-t border-ink/15 mt-5 pt-4">
					<span class="label-specimen block mb-2">And one thing to be clear about</span>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed">
						The bot does not check who is asking. Any member who can use
						<span class="code">/info permissions</span> can use it on anyone. There is one exception: the bot
						hides a channel's topic from people who cannot view that channel.
					</p>
					<p class="text-[0.95rem] text-ink-soft leading-relaxed mt-3">
						Discord already has the right tool for this, and it is the way we recommend you manage it.
						Open <span class="code">Server Settings → Integrations → {bot.name}</span>, and you can allow
						or block each command for any role, member or channel. Discord checks those rules before the
						command ever reaches the bot, so nothing depends on the bot behaving.
					</p>
				</div>
			</div>
		</div>
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
			Stop guessing why a permission works that way
		</h2>

		<p class="text-lg text-leaf-soft leading-relaxed max-w-xl mx-auto mt-5">
			{bot.name} reads your server and gives you the answer. It changes nothing, saves nothing, and asks
			for 4 permissions.
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
				Read-only. 4 permissions. Nothing to set up.
			</p>
		</div>
	</div>
</section>
