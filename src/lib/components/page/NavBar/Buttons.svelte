<script lang="ts">
	import { trackInviteClick } from '$lib/scripts/tracking';
</script>

<ul class="flex flex-row flex-wrap items-center gap-x-7 gap-y-1">
	<li>
		<a class="link-vine font-display font-medium text-lg text-ink" href="/features">Features</a>
	</li>
	<li>
		<a
			class="link-vine font-display font-medium text-lg text-ink"
			href="https://invite.ayakobot.com"
			target="_blank"
			onclick={trackInviteClick}
		>
			Invite
		</a>
	</li>
	<li>
		<a
			class="link-vine font-display font-medium text-lg text-ink"
			href="https://support.ayakobot.com"
		>
			Support
		</a>
	</li>
	<li>
		<a class="link-vine-gold font-display font-medium text-lg text-gold" href="/donate">
			<span class="i-tabler-crown w-4 h-4 inline-block align-[-2px]" aria-hidden="true"></span>
			Premium
		</a>
	</li>
</ul>
