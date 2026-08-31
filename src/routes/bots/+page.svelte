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
	there; the collection is presented here, as one journal with three plates.

	IMPORTANT: "Ayako | Ticketing" and "Ayako | Info" are NOT publicly installable
	yet - their handlers are gated to debug guilds and no Discord application exists
	for either. Their cards therefore link to their pages and carry no invite CTA.
	The flagship is the only install target on this page. Add the two spin-off CTAs
	(bots.ticketing.invite / bots.info.invite, both with trackInviteClick) once the
	cutover gate is removed.
-->

<svelte:head>
	<title>The Collection - Ayako, Ayako | Ticketing and Ayako | Info</title>
	<meta
		name="description"
		content="Ayako, Ayako | Ticketing and Ayako | Info - what each bot does, which one you need, and how many permissions each one asks for."
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
			Three bots. <span class="italic text-petal">One family.</span>
		</h1>

		<div class="flex justify-center mt-6" aria-hidden="true">
			<Flourish width={250} color="var(--ink-faint)" />
		</div>

		<p class="text-lg text-ink-soft leading-relaxed mt-6">
			Ayako is the full bot. Two parts of it also work as bots of their own. So your server can take
			just the part it needs. Each bot asks only for the permissions it really uses.
		</p>
	</header>

	<!-- 2. THREE SPECIMEN CARDS -->
	<section class="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7">
			<!-- PLATE I - the flagship -->
			<div use:reveal>
				<article
					class="group relative flex flex-col h-full card-paper !bg-paper px-6 pt-10 pb-6 rotate-[-2deg] [transition:transform_0.45s_var(--ease-organic),box-shadow_0.45s_var(--ease-organic)] hover:rotate-0 hover:translate-y-[-5px] hover:shadow-press-lg focus-within:rotate-0 focus-within:translate-y-[-5px] focus-within:shadow-press-lg"
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
						<div class="border-t border-ink/15 pt-4">
							<span class="label-specimen block mb-2">Permissions asked</span>
							<span class="font-mono text-[1.35rem] leading-tight text-ink block">
								Ban · Kick · Timeout
							</span>
							<span class="font-mono text-xs text-ink-soft leading-relaxed block mt-1.5">
								plus Manage Roles, Manage Channels, Manage Messages and more - the full moderation set
							</span>
						</div>

						<div class="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
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
						<div class="border-t border-ink/15 pt-4">
							<span class="label-specimen block mb-2">Permissions asked</span>
							<span class="font-mono text-[2.75rem] leading-none text-ink block">13</span>
							<span class="font-mono text-xs text-ink-soft leading-relaxed block mt-2">
								and none of them is for moderation
							</span>
						</div>

						<div class="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
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
						<div class="border-t border-ink/15 pt-4">
							<span class="label-specimen block mb-2">Permissions asked</span>
							<span class="font-mono text-[2.75rem] leading-none text-ink block">4</span>
							<span class="font-mono text-xs text-ink-soft leading-relaxed block mt-2">
								read-only, and nothing to set up
							</span>
						</div>

						<div class="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
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
		</div>

		<p class="annotation text-xl text-center mt-10 rotate-[-1deg]">
			two of these are parts of the first
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

			<li class="flex items-start gap-5 border-t border-b border-ink/15 py-6">
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
					Ayako is the bot you can add today. The other 2 bots are coming soon. Free forever - no paid
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
