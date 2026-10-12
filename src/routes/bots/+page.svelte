<script lang="ts">
	import Bloom from '$lib/components/design/Bloom.svelte';
	import Flourish from '$lib/components/design/Flourish.svelte';
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import TornEdge from '$lib/components/design/TornEdge.svelte';
	import FeatureIcon from '$lib/components/page/home/landing/FeatureIcon.svelte';
	import { bots } from '$lib/scripts/bots';
	import { trackInviteClick } from '$lib/scripts/tracking';
	import { reveal } from '$lib/scripts/util/reveal';
</script>

<!--
	/bots - the family hub.

	This page is the remedy top.gg's own Bot Guidelines prescribe for a bot family:
	sibling bots built on shared code must not be submitted individually, they belong
	"in your main bot's help command or website page". Only the flagship is listed
	there; the collection is presented here, as one journal with six plates.

	The spin-offs' handlers are still gated to debug guilds in the Service package,
	so a public server cannot reach their features yet. The owner has chosen to
	present them as launched. Their cards link to their own pages; the flagship
	remains the only install CTA on this page, because it is the only one a visitor
	can use today with any effect.
-->

<svelte:head>
	<title>The Collection - Ayako and its seven spin-off bots</title>
	<meta
		name="description"
		content="Ayako and its seven spin-off bots - what each one does, which one you need, and how many permissions each one asks for."
	/>
	<link rel="canonical" href="https://ayakobot.com/bots" />
</svelte:head>

<div class="w-full overflow-x-clip">
	<!-- 1. TITLE PLATE -->
	<header class="relative max-w-3xl mx-auto px-5 sm:px-8 pt-16 pb-4 text-center" use:reveal>
		<div
			class="absolute -top-10 left-1/2 -ml-32 sm:-ml-44 opacity-20 pointer-events-none [animation:sway_12s_ease-in-out_infinite]"
			aria-hidden="true"
		>
			<Bloom size={200} color="var(--petal-soft)" />
		</div>

		<span class="label-specimen block mb-3">The Collection</span>
		<h1 class="font-display font-semibold text-4xl sm:text-6xl text-ink leading-tight">
			Eight bots. <span class="italic text-petal">One family.</span>
		</h1>

		<div class="flex justify-center mt-6" aria-hidden="true">
			<Flourish width={250} color="var(--ink-faint)" />
		</div>

		<p class="text-lg text-ink-soft leading-relaxed mt-6">
			Ayako is the full bot. Seven parts of it also work as bots of their own. So your server can take
			just the part it needs. Each bot asks only for the permissions it really uses.
		</p>
	</header>

	<!-- 2. SPECIMEN CARDS: the flagship across the top, its spin-offs beneath in rows of three -->
	<section class="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-8">
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-7">
			<!-- PLATE I - the flagship -->
			<div class="md:col-span-2 xl:col-span-3 flex justify-center" use:reveal>
				<article
					class="group relative flex flex-col w-full max-w-md card-paper !bg-paper px-6 pt-10 pb-6 rotate-[-2deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
				>
					<Tape angle={-5} class="-top-2.5 left-1/2 -ml-9" />

					<span class="label-specimen block mb-4">Plate I · The Whole Garden</span>

					<div class="flex items-center gap-4 mb-3">
						<span
							class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current bg-paper flex items-center justify-center rotate-[-3deg]"
							style="color: var(--petal);"
						>
							<Bloom size={44} color="var(--petal)" />
						</span>
						<h2 class="font-display font-semibold text-2xl text-ink leading-tight">
							{bots.ayako.name}
						</h2>
					</div>

					<p class="text-[1.05rem] text-ink-soft leading-relaxed">
						Everything your server needs. None of it paid.
					</p>

					<div class="mt-auto pt-6">
						<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
							<a
								href="/features"
								class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5"
							>
								See all features
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
							<a href="/" class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5">
								Front page
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<!-- PLATE II - ticketing -->
			<div use:reveal={{ delay: 0.1 }}>
				<article
					class="group relative flex flex-col h-full card-paper !bg-paper px-6 pt-10 pb-6 rotate-0 [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
				>
					<Tape angle={4} class="-top-2.5 left-1/2 -ml-9" />

					<span class="label-specimen block mb-4">Plate II · The Support Desk</span>

					<div class="flex items-center gap-4 mb-3">
						<span
							class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current bg-paper flex items-center justify-center rotate-[2.5deg]"
							style="color: var(--leaf);"
						>
							<FeatureIcon name="ticket" size={40} />
						</span>
						<h2 class="font-display font-semibold text-2xl text-ink leading-tight">
							{bots.ticketing.name}
						</h2>
					</div>

					<p class="text-[1.05rem] text-ink-soft leading-relaxed">Support that arrives in their DMs.</p>

					<div class="mt-auto pt-6">
						<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
							<a
								href="/bots/ticketing"
								class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5"
							>
								See the ticket bot
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<!-- PLATE III - info -->
			<div use:reveal={{ delay: 0.2 }}>
				<article
					class="group relative flex flex-col h-full card-paper !bg-paper px-6 pt-10 pb-6 rotate-[2deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
				>
					<Tape angle={-3} class="-top-2.5 left-1/2 -ml-9" />

					<span class="label-specimen block mb-4">Plate III · The Field Lens</span>

					<div class="flex items-center gap-4 mb-3">
						<span
							class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current bg-paper flex items-center justify-center rotate-[-2deg]"
							style="color: var(--gold);"
						>
							<FeatureIcon name="lens" size={40} />
						</span>
						<h2 class="font-display font-semibold text-2xl text-ink leading-tight">
							{bots.info.name}
						</h2>
					</div>

					<p class="text-[1.05rem] text-ink-soft leading-relaxed">Why can’t they post here?</p>

					<div class="mt-auto pt-6">
						<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
							<a
								href="/bots/info"
								class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5"
							>
								See the info bot
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<!-- PLATE IV - welcome -->
			<div use:reveal={{ delay: 0.3 }}>
				<article
					class="group relative flex flex-col h-full card-paper !bg-paper px-6 pt-10 pb-6 rotate-[-1.4deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
				>
					<Tape angle={5} class="-top-2.5 left-1/2 -ml-9" />

					<span class="label-specimen block mb-4">Plate IV · The Greeting</span>

					<div class="flex items-center gap-4 mb-3">
						<span
							class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current bg-paper flex items-center justify-center rotate-[2deg]"
							style="color: var(--petal);"
						>
							<FeatureIcon name="greeting" size={40} />
						</span>
						<h2 class="font-display font-semibold text-2xl text-ink leading-tight">
							{bots.welcome.name}
						</h2>
					</div>

					<p class="text-[1.05rem] text-ink-soft leading-relaxed">A welcome message worth reading.</p>

					<div class="mt-auto pt-6">
						<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
							<a
								href="/bots/welcome"
								class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5"
							>
								See the welcome bot
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<!-- PLATE V - confessions -->
			<div use:reveal={{ delay: 0.4 }}>
				<article
					class="group relative flex flex-col h-full card-paper !bg-paper px-6 pt-10 pb-6 rotate-[1.2deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
				>
					<Tape angle={-4} class="-top-2.5 left-1/2 -ml-9" />

					<span class="label-specimen block mb-4">Plate V · The Locket</span>

					<div class="flex items-center gap-4 mb-3">
						<span
							class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current bg-paper flex items-center justify-center rotate-[-2.5deg]"
							style="color: var(--blossom);"
						>
							<FeatureIcon name="confession" size={40} />
						</span>
						<h2 class="font-display font-semibold text-2xl text-ink leading-tight">
							{bots.confessions.name}
						</h2>
					</div>

					<p class="text-[1.05rem] text-ink-soft leading-relaxed">
						Confessions, on your server's terms.
					</p>

					<div class="mt-auto pt-6">
						<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
							<a
								href="/bots/confessions"
								class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5"
							>
								See the confessions bot
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<!-- PLATE VI - reminders -->
			<div use:reveal={{ delay: 0.5 }}>
				<article
					class="group relative flex flex-col h-full card-paper !bg-paper px-6 pt-10 pb-6 rotate-[-0.8deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
				>
					<Tape angle={3} class="-top-2.5 left-1/2 -ml-9" />

					<span class="label-specimen block mb-4">Plate VI · The Seed Packet</span>

					<div class="flex items-center gap-4 mb-3">
						<span
							class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current bg-paper flex items-center justify-center rotate-[2deg]"
							style="color: var(--moss);"
						>
							<FeatureIcon name="reminder" size={40} />
						</span>
						<h2 class="font-display font-semibold text-2xl text-ink leading-tight">
							{bots.reminders.name}
						</h2>
					</div>

					<p class="text-[1.05rem] text-ink-soft leading-relaxed">A DM when the time comes.</p>

					<div class="mt-auto pt-6">
						<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
							<a
								href="/bots/reminders"
								class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5"
							>
								See Reminders
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<!-- PLATE VII - afk -->
			<div use:reveal={{ delay: 0.6 }}>
				<article
					class="group relative flex flex-col h-full card-paper !bg-paper px-6 pt-10 pb-6 rotate-[1.4deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
				>
					<Tape angle={-5} class="-top-2.5 left-1/2 -ml-9" />

					<span class="label-specimen block mb-4">Plate VII · The Bookmark</span>

					<div class="flex items-center gap-4 mb-3">
						<span
							class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current bg-paper flex items-center justify-center rotate-[-2deg]"
							style="color: var(--ink-soft);"
						>
							<FeatureIcon name="afk" size={40} />
						</span>
						<h2 class="font-display font-semibold text-2xl text-ink leading-tight">
							{bots.afk.name}
						</h2>
					</div>

					<p class="text-[1.05rem] text-ink-soft leading-relaxed">A note for whoever mentions you.</p>

					<div class="mt-auto pt-6">
						<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
							<a
								href="/bots/afk"
								class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5"
							>
								See AFK
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
						</div>
					</div>
				</article>
			</div>

			<!-- PLATE VIII - bump reminders -->
			<div use:reveal={{ delay: 0.7 }}>
				<article
					class="group relative flex flex-col h-full card-paper !bg-paper px-6 pt-10 pb-6 rotate-[-1deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
				>
					<Tape angle={4} class="-top-2.5 left-1/2 -ml-9" />

					<span class="label-specimen block mb-4">Plate VIII · The Watering Can</span>

					<div class="flex items-center gap-4 mb-3">
						<span
							class="w-16 h-16 shrink-0 rounded-full border-[1.6px] border-current bg-paper flex items-center justify-center rotate-[2.5deg]"
							style="color: var(--leaf);"
						>
							<FeatureIcon name="bump" size={40} />
						</span>
						<h2 class="font-display font-semibold text-2xl text-ink leading-tight">
							{bots['bump-reminders'].name}
						</h2>
					</div>

					<p class="text-[1.05rem] text-ink-soft leading-relaxed">A reminder when the cooldown ends.</p>

					<div class="mt-auto pt-6">
						<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
							<a
								href="/bots/bump-reminders"
								class="btn-quiet font-display font-semibold inline-flex items-center gap-1.5"
							>
								See Bump Reminders
								<span class="i-tabler-arrow-right w-4 h-4" aria-hidden="true"></span>
							</a>
						</div>
					</div>
				</article>
			</div>
		</div>

		<p class="annotation text-xl text-center mt-10 rotate-[-1deg]">
			seven of these are parts of the first
		</p>
	</section>

	<!-- 3. THE KEY - which one do I need? -->
	<section class="relative max-w-3xl mx-auto px-5 sm:px-8 pt-14 pb-20">
		<div
			class="absolute top-6 -right-2 sm:right-4 rotate-[24deg] opacity-40 pointer-events-none"
			aria-hidden="true"
		>
			<Sprig size={96} color="var(--leaf-soft)" />
		</div>

		<div class="text-center" use:reveal>
			<span class="label-specimen block mb-3">The Key</span>
			<h2 class="font-display font-semibold text-3xl sm:text-4xl text-ink">Which one do I need?</h2>
			<div class="flex justify-center mt-5" aria-hidden="true">
				<Flourish width={200} color="var(--ink-faint)" />
			</div>
		</div>

		<ol class="mt-10" use:reveal={{ delay: 0.1 }}>
			<li class="flex items-start gap-5 border-t border-ink/15 py-6">
				<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">01</span>
				<div class="min-w-0">
					<h3 class="font-display font-semibold text-xl text-ink leading-snug">
						Should the bot be able to ban, kick and time out members?
					</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
						Then you need <a href="/features" class="link-vine text-ink font-semibold">Ayako</a>. It has
						the full moderation toolkit. Tickets and info commands are already inside it. You do not need
						a second bot.
					</p>
				</div>
			</li>

			<li class="flex items-start gap-5 border-t border-ink/15 py-6">
				<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">02</span>
				<div class="min-w-0">
					<h3 class="font-display font-semibold text-xl text-ink leading-snug">
						Do you only need a ticket system?
					</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
						Then you need <a href="/bots/ticketing" class="link-vine text-ink font-semibold">
							Ayako | Ticketing
						</a>. It asks for 13 permissions. None of them is for moderation. Members write to the bot in
						their DMs. Staff answer from your server.
					</p>
				</div>
			</li>

			<li class="flex items-start gap-5 border-t border-ink/15 py-6">
				<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">03</span>
				<div class="min-w-0">
					<h3 class="font-display font-semibold text-xl text-ink leading-snug">
						Do you only need to know why a member can’t post in a channel?
					</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
						Then you need <a href="/bots/info" class="link-vine text-ink font-semibold">
							Ayako | Info
						</a>. It asks for 4 permissions, all read-only. There is nothing to set up. One
						<span class="code">/info</span> command calculates permissions the same way Discord does. It includes
						channel overwrites and timeouts.
					</p>
				</div>
			</li>

			<li class="flex items-start gap-5 border-t border-ink/15 py-6">
				<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">04</span>
				<div class="min-w-0">
					<h3 class="font-display font-semibold text-xl text-ink leading-snug">
						Do you only need to greet people when they join?
					</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
						Then you need <a href="/bots/welcome" class="link-vine text-ink font-semibold">
							Ayako | Welcome
						</a>. It asks for 4 permissions. It comes with an embed builder and a Components-V2 builder,
						so you design the message yourself. It can also say goodbye, and attach a random GIF from a
						pool you fill by right-click.
					</p>
				</div>
			</li>

			<li class="flex items-start gap-5 border-t border-ink/15 py-6">
				<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">05</span>
				<div class="min-w-0">
					<h3 class="font-display font-semibold text-xl text-ink leading-snug">
						Do you only need a confession channel?
					</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
						Then you need <a href="/bots/confessions" class="link-vine text-ink font-semibold">
							Ayako | Confessions
						</a>. It asks for 4 permissions. Members send confessions through a form, and the bot posts
						them without a name. You choose whether staff can still see who wrote one, and whether every
						confession waits for review, only the ones your AutoMod rules flag, or none.
					</p>
				</div>
			</li>

			<li class="flex items-start gap-5 border-t border-ink/15 py-6">
				<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">06</span>
				<div class="min-w-0">
					<h3 class="font-display font-semibold text-xl text-ink leading-snug">
						Do you only need reminders?
					</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
						Then you need <a href="/bots/reminders" class="link-vine text-ink font-semibold">
							Ayako | Reminders
						</a>. It asks for 1 permission, Send Messages, and there is nothing to set up. Run
						<span class="code">/reminder create</span> with a time such as 1d 12h and a note, and the bot DMs
						you when it is due. You can add it to your own account.
					</p>
				</div>
			</li>

			<li class="flex items-start gap-5 border-t border-ink/15 py-6">
				<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">07</span>
				<div class="min-w-0">
					<h3 class="font-display font-semibold text-xl text-ink leading-snug">
						Do you only need an AFK command?
					</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
						Then you need <a href="/bots/afk" class="link-vine text-ink font-semibold"> Ayako | AFK </a>.
						It asks for 5 permissions. Manage Nicknames is only for the [AFK] tag. Run
						<span class="code">/afk</span> with an optional reason. Whoever mentions you is told you are
						away. Your next message brings you back and lists who pinged you. Moderators can end an AFK
						with <span class="code">/mod afk clear</span>.
					</p>
				</div>
			</li>

			<li class="flex items-start gap-5 border-t border-b border-ink/15 py-6">
				<span class="font-mono text-sm text-ink-soft pt-1 shrink-0">08</span>
				<div class="min-w-0">
					<h3 class="font-display font-semibold text-xl text-ink leading-snug">
						Do you only need bump reminders?
					</h3>
					<p class="text-[1.02rem] text-ink-soft leading-relaxed mt-2">
						Then you need <a href="/bots/bump-reminders" class="link-vine text-ink font-semibold">
							Ayako | Bump Reminders
						</a>. It asks for 4 permissions. Manage Messages is only for cleanup. It watches for your bump
						bot's success message and posts a reminder when the cooldown is over. DISBOARD, Carl-bot and
						D-ify.net come as templates. Setup lives in one settings page.
					</p>
				</div>
			</li>
		</ol>
	</section>

	<!-- 4. CLOSING CTA -->
	<section class="relative">
		<TornEdge fill="var(--plate)" />

		<div class="bg-plate text-paper px-5 py-16 sm:py-20 text-center">
			<div class="max-w-2xl mx-auto" use:reveal>
				<span class="label-specimen !text-leaf-soft block mb-4">The Invitation</span>
				<h2 class="font-display font-semibold text-3xl sm:text-5xl text-paper leading-tight">
					Start with Ayako
				</h2>
				<p class="text-lg text-leaf-soft leading-relaxed max-w-xl mx-auto mt-5">
					Ayako is the bot you can add today. The other 4 bots are coming soon. Free forever - no paid
					plan, no credit card, no paywall.
				</p>

				<div class="flex items-center justify-center gap-4 sm:gap-8 mt-9">
					<span
						class="hidden sm:block rotate-[28deg] translate-y-2 pointer-events-none"
						aria-hidden="true"
					>
						<Sprig size={64} color="var(--leaf-soft)" />
					</span>

					<a
						href={bots.ayako.invite}
						target="_blank"
						onclick={trackInviteClick}
						class="btn-paper text-lg"
					>
						<span class="i-tabler-seeding w-5 h-5" aria-hidden="true"></span>
						{bots.ayako.cta}
					</a>

					<span
						class="hidden sm:block -rotate-[28deg] translate-y-2 pointer-events-none"
						aria-hidden="true"
					>
						<Sprig size={64} color="var(--leaf-soft)" />
					</span>
				</div>
			</div>
		</div>

		<TornEdge fill="var(--plate)" flip class="mt-[-1px]" />
	</section>
</div>
