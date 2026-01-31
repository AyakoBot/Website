<script lang="ts">
	import { trackInviteClick } from '$lib/scripts/tracking';
</script>

<a
	class="btn-loud font-bold px-8 py-3 text-lg"
	href="https://invite.ayakobot.com"
	target="_blank"
	onclick={trackInviteClick}
>
	Invite Ayako
</a>
<a
	class="btn-medium font-bold px-8 py-3 text-lg"
	href="https://discord.gg/euTdctganf"
	target="_blank"
>
	Support Server
</a>
<a class="btn-quiet text-lg flex items-center gap-1" href="#features">
	Learn More
	<span class="i-tabler-arrow-down text-sm"></span>
</a>
