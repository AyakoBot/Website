<script lang="ts">
	import BotMessage from '../parts/BotMessage.svelte';
	import Button from '../parts/Button.svelte';
	import Container from '../parts/Container.svelte';
	import Note from '../parts/Note.svelte';

	const foxAvatar =
		'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=80';
</script>

<!--
	A forum post by Ayako | Confessions, copied from the real capture in
	static/images/ads/confession-post.webp. The bot picks a random accent per post;
	these two are sampled from that capture.
-->
<div class="flex flex-col gap-2 pb-2 border-b border-white/6">
	<span class="w-12 h-12 rounded-full bg-[#1e1f22] flex items-center justify-center">
		<span class="i-tabler-message-circle-filled text-2xl text-white/50" aria-hidden="true"></span>
	</span>
	<span class="text-6 font-600 text-white">Confession #1</span>
</div>

<div class="relative">
	<BotMessage name="Ayako | Confessions" time="15:29">
		<Container accent="#eb449e">
			<div class="flex gap-4">
				<div class="flex flex-col gap-1 flex-1 min-w-0">
					<span class="text-4.5 font-700 text-white">🕯️ Confession #1</span>
					<span class="text-3 text-white/55">Your Server · shared anonymously</span>
				</div>
				<img src={foxAvatar} alt="" class="w-16 h-16 rounded-full flex-shrink-0" />
			</div>
			<div class="h-px bg-white/10"></div>
			<span>I once ate sushi for 2, but alone.</span>
			<span class="text-3 text-white/55">Reviewed by staff before posting · members can read this</span>
		</Container>
		<div class="flex flex-wrap gap-2 mt-1">
			<Button><span class="i-tabler-menu-2 text-4.5 text-[#7984f5]" role="img" aria-label="Menu"></span></Button>
			<Button>Submit a confession</Button>
			<Button>Reply</Button>
		</div>
		<span
			class="inline-flex items-center gap-1.5 w-fit mt-1 px-2 py-0.5 rounded-lg bg-[#5865f2]/15 border border-[#5865f2] text-3.5 text-white/80"
			>🫂 2</span
		>
	</BotMessage>

	<Note left={300} top={66} angle={-10}>Posted without<br />the sender's name</Note>
	<Note left={255} bottom={12} angle={15}>One click opens<br />the confession form</Note>
</div>

<BotMessage name="Ayako | Confessions" time="15:31">
	<Container accent="#9060f0" fit>
		<div class="flex items-center gap-4">
			<span class="font-700 text-white">Reply</span>
			<Button><span class="i-tabler-menu-2 text-4.5 text-[#7984f5]" role="img" aria-label="Menu"></span></Button>
		</div>
		<span>That's vile!</span>
	</Container>
</BotMessage>
