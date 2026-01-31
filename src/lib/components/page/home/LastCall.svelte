<script lang="ts">
	import { trackInviteClick } from '$lib/scripts/tracking';
</script>

<section
	class="w-screen relative left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#b0ff00]/10 via-[#fe3521]/20 to-[#b0ff00]/10 py-16 px-4 mt-10"
>
	<div class="max-w-200 mx-auto flex flex-col items-center text-center gap-6">
		<h2 class="text-3xl md:text-5xl font-bold">Ready to level up your Discord server?</h2>

		<p class="text-lg md:text-xl text-neutral-300 max-w-150">
			Join thousands of communities already using Ayako for moderation, engagement, and automation.
		</p>

		<div class="flex flex-col sm:flex-row gap-4 mt-4">
			<a
				href="https://invite.ayakobot.com"
				target="_blank"
				onclick={trackInviteClick}
				class="btn-loud font-bold px-10 py-4 text-xl"
			>
				Invite Ayako
			</a>
			<a
				href="https://discord.gg/euTdctganf"
				target="_blank"
				class="btn-medium font-bold px-10 py-4 text-xl"
			>
				Join Support Server
			</a>
		</div>
	</div>
</section>
