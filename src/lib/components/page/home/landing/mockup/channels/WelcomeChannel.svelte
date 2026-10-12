<script lang="ts">
	import BotMessage from '../parts/BotMessage.svelte';
	import Button from '../parts/Button.svelte';
	import Container from '../parts/Container.svelte';
	import Note from '../parts/Note.svelte';
</script>

<!--
	Ayako | Welcome's Components V2 greeting, laid out like the real capture in
	static/images/ads/welcome-cv2.webp. Banner and thumbnail are crops of that capture;
	the spine colour is sampled from it. The words are this mock server's own design.
-->
<div class="relative">
	<BotMessage name="Ayako | Welcome" time="13:30">
		<!-- ponytail: narrowed so the whole greeting fits the window without scrolling -->
		<div class="max-w-100">
			<Container accent="#f7a7d2">
				<img
					src="/images/ads/welcome-cv2-banner.webp"
					alt=""
					width="544"
					height="304"
					class="w-full h-auto rounded-lg"
				/>
				<div class="flex gap-4">
					<div class="flex flex-col gap-1 flex-1 min-w-0">
						<span class="text-5 font-700 text-white leading-tight"
							>Hi friend, <span class="mention">@newmember</span> 🌸</span
						>
						<span class="text-3 text-white/55">Your Server | Chat ❀ Games ❀ Ayako</span>
						<span>Grab a seat and tell us what brought you here.</span>
					</div>
					<img
						src="/images/ads/welcome-cv2-thumb.webp"
						alt=""
						width="86"
						height="86"
						class="w-16 h-16 rounded-lg flex-shrink-0"
					/>
				</div>
				<div class="h-px bg-white/10"></div>
				<div class="flex items-center gap-4">
					<span class="flex-1 min-w-0"
						><strong class="text-white">The rules screen is behind you.</strong> That makes 4,005 of us,
						and you are the newest one through the door.</span
					>
					<Button link>Bring a friend</Button>
				</div>
			</Container>
		</div>
	</BotMessage>

	<Note left={250} top={200} angle={-25}>You design the whole<br />message yourself</Note>
	<Note left={320} top={322} angle={-15}>Greets them after<br />the rules screen</Note>
</div>
