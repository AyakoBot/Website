<script lang="ts">
	import ColorFadeText from '$lib/components/generic/colorFadeText.svelte';
</script>

<footer class="bg-neutral-900/75 w-full box-shadow-main">
	<ul class="flex flex-col justify-around items-center w-full">
		<li class="flex flex-row items-center justify-evenly w-full">
			<ul id="left">
				<li class="font-size-6xl"><ColorFadeText text="Ayako" /></li>
				<li>ayakobot.com</li>
			</ul>

			<ul id="right" class="flex flex-row justify-around items-center my-6">
				<li>
					<ul class="flex flex-col justify-around items-start px-4">
						<li><a class="btn-quiet text-5" href="https://support.ayakobot.com">Support</a></li>
						<li><a class="btn-quiet text-5 color-yellow" href="/donate">👑Premium👑</a></li>
						<li>
							<a class="text-5" href="https://top.gg/bot/650691698409734151/vote"
								><ColorFadeText text="Vote" /></a
							>
						</li>
						<li><a class="text-5" href="/donate"><ColorFadeText text="Donate" /></a></li>
					</ul>
				</li>
				<li>
					<ul class="flex flex-col justify-around items-start px-4">
						<li><a class="btn-quiet text-5" href="https://support.ayakobot.com">Animekos</a></li>
						<li><a class="btn-quiet text-5" href="/credits">Creators</a></li>
						<li><a class="btn-quiet text-5" href="/terms">Terms</a></li>
						<li><a class="btn-quiet text-5" href="/privacy">Privacy</a></li>
					</ul>
				</li>
			</ul>
		</li>
		<li class="font-size-3">
			Copyright © {new Date().getFullYear()} Ayako
		</li>
	</ul>
</footer>
