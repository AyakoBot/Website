<script lang="ts">
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
</script>

<footer class="bg-neutral-900/75 w-full box-shadow-main flex md:mt-0 mt-4">
	<ul class="flex flex-col justify-around items-center w-full">
		<li class="flex flex-row items-center justify-evenly w-full flex-wrap">
			<ul id="left" class="flex flex-row items-center justify-evenly">
				<li class="pr-4">
					<a href="/"
						><img
							src="https://cdn.ayakobot.com/website_assets/Icon.png"
							alt="Ayako's Icon"
       class="md:w-128px md:h-128px w-64px h-64px"
							width="128"
							height="128"
						/></a
					>
				</li>
				<li>
					<ul class="flex flex-col justify-around">
						<li class="md:text-6xl text-4xl font-bold"><ColorFadeText text="Ayako" /></li>
						<li class="md:text-4xl text-2xl">ayakobot.com</li>
					</ul>
				</li>
			</ul>

			<ul id="right" class="flex flex-row justify-around items-center my-6">
				<li>
					<ul class="flex flex-col justify-around items-start px-4">
						<li><a class="btn-quiet text-5 font-bold" href="https://support.ayakobot.com">Support</a></li>
						<li><a class="btn-quiet text-5 font-bold color-yellow" href="/donate">👑Premium👑</a></li>
						<li>
							<a class="text-5 font-bold" href="https://top.gg/bot/650691698409734151/vote"
								><ColorFadeText text="Vote" /></a
							>
						</li>
						<li><a class="text-5 font-bold" href="/donate"><ColorFadeText text="Donate" /></a></li>
					</ul>
				</li>
				<li>
					<ul class="flex flex-col justify-around items-start px-4">
						<li><a class="btn-quiet text-5 font-bold" href="https://support.ayakobot.com">Animekos</a></li>
						<li><a class="btn-quiet text-5 font-bold" href="/credits">Creators</a></li>
						<li><a class="btn-quiet text-5 font-bold" href="/terms">Terms</a></li>
						<li><a class="btn-quiet text-5 font-bold" href="/privacy">Privacy</a></li>
					</ul>
				</li>
			</ul>
		</li>
		<li class="font-size-3">
			Copyright © {new Date().getFullYear()} Ayako
		</li>
	</ul>
</footer>
