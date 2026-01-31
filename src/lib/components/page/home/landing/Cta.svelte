<script lang="ts">
	import { trackInviteClick } from '$lib/scripts/tracking';
</script>

<section class="relative py-32 px-16 text-center overflow-hidden">
	<div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse at center, rgba(176, 255, 0, 0.1) 0%, transparent 60%);"></div>
	<div class="relative z-1 max-w-175 mx-auto">
		<h2 class="text-8 lg:text-14 font-800 text-white mb-6">Ready to transform your server?</h2>
		<p class="text-5 text-white/60 mb-10">
			Join thousands of communities using Ayako. Free forever, no credit card required.
		</p>
		<div class="flex justify-center">
			<a href="https://invite.ayakobot.com" target="_blank" onclick={trackInviteClick} class="inline-flex items-center gap-2 bg-gradient-to-r from-[#b0ff00] to-[#7acc00] text-black font-700 px-12 py-5 rounded-xl text-4.5 transition-all shadow-[0_4px_20px_rgba(176,255,0,0.3)] hover:translate-y--0.5 hover:shadow-[0_6px_30px_rgba(176,255,0,0.4)]">
				<span class="i-tabler-plus text-2xl"></span>
				Add Ayako to Discord
			</a>
		</div>
	</div>
</section>
