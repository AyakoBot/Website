<script lang="ts">
	const features = [
		{
			icon: 'i-tabler-shield-check',
			color: 'bg-[rgba(139,92,246,0.2)] text-[#a78bfa]',
			title: 'Powerful Moderation',
			description: 'Ban, kick, mute, warn with a complete strike system. Auto-escalation, appeals workflow, temp-bans, channel bans, and punishment expiry. Everything you need to keep your server safe.',
			// image: 'https://cdn.ayakobot.com/website_assets/moderation.png',
			large: true
		},
		{
			icon: 'i-tabler-shield-lock',
			color: 'bg-[rgba(239,68,68,0.2)] text-[#f87171]',
			title: 'Anti-Spam & Security',
			description: 'Anti-spam detection, anti-virus link scanning, invite filtering, and word censoring'
		},
		{
			icon: 'i-tabler-trending-up',
			color: 'bg-[rgba(249,115,22,0.2)] text-[#fb923c]',
			title: 'Leveling System',
			description: 'XP with multiple formulas, per-channel/role multipliers, voice XP, and rank cards'
		},
		{
			icon: 'i-tabler-tags',
			color: 'bg-[rgba(59,130,246,0.2)] text-[#60a5fa]',
			title: 'Advanced Role Management',
			description: 'Auto-roles, self-roles, reaction roles, button roles, custom user-created roles, sticky roles that persist across leave/rejoin, and nitro booster rewards.',
			wide: true
		},
		{
			icon: 'i-tabler-list-details',
			color: 'bg-[rgba(6,182,212,0.2)] text-[#22d3ee]',
			title: 'Comprehensive Logging',
			description: 'Moderation, message, member, role, channel, voice, and server event logs'
		},
		{
			icon: 'i-tabler-door-enter',
			color: 'bg-[rgba(34,197,94,0.2)] text-[#4ade80]',
			title: 'Welcome & Verification',
			description: 'Custom welcome messages with images, and configurable member verification'
		},
		{
			icon: 'i-tabler-gift',
			color: 'bg-[rgba(236,72,153,0.2)] text-[#f472b6]',
			title: 'Giveaways',
			description: 'Timed giveaways with fair winner selection and reroll support'
		},
		{
			icon: 'i-tabler-bulb',
			color: 'bg-[rgba(234,179,8,0.2)] text-[#facc15]',
			title: 'Suggestions',
			description: 'Community feedback with voting system and mod approval workflow'
		},
		{
			icon: 'i-tabler-coin',
			color: 'bg-[rgba(99,102,241,0.2)] text-[#818cf8]',
			title: 'Economy & Currency',
			description: 'Server currency, balance tracking, and shop system for roles/items'
		}
	];
</script>

<section class="py-24 px-16 max-w-350 mx-auto md:px-6" id="features">
	<div class="text-center mb-16">
		<span class="inline-block bg-[rgba(176,255,0,0.1)] text-[#b0ff00] px-4 py-2 rounded-full text-sm font-600 mb-4">Features</span>
		<h2 class="text-8 lg:text-12 font-800 text-white mb-4">Everything you need</h2>
		<p class="text-4.5 text-white/60 max-w-125 mx-auto">
			Enterprise-grade tools to manage, moderate, and grow your Discord community
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
		{#each features as feature, i (i)}
			<div class="bg-white/3 border border-white/8 rounded-4 p-5 transition-all relative overflow-hidden hover:bg-white/5 hover:border-white/15 group"
				class:lg:row-span-2={feature.large}
				class:lg:col-span-2={feature.wide}>
				<div class="flex items-center gap-3 mb-3">
					<div class="w-10 h-10 rounded-2.5 flex items-center justify-center flex-shrink-0 {feature.color}">
						<span class="{feature.icon} text-xl"></span>
					</div>
					<h3 class="text-4.5 font-700 text-white">{feature.title}</h3>
				</div>
				<p class="text-white/55 leading-relaxed text-3.5">{feature.description}</p>
				{#if feature.image}
					<img src={feature.image} alt={feature.title} class="w-full rounded-3 mt-4 op-80 group-hover:op-100 transition-opacity" />
				{/if}
			</div>
		{/each}
	</div>
</section>
