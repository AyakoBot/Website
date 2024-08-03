<script lang="ts">
	import ColorFadeText from '$lib/components/generic/ColorFadeText.svelte';
</script>

<footer class="bg-neutral-900/75 w-full box-shadow-main flex md:mt-0 mt-20 z-2 relative">
	<img
		src="/emotes/AyakoPeek.webp"
		alt="Ayako Peeking over the Footer"
		width="32"
		height="32"
		class="absolute right-15 -top-8"
		loading="eager"
	/>
	<ul class="flex flex-col justify-around items-center w-full">
		<li class="flex flex-row items-center justify-evenly w-full flex-wrap">
			<ul id="left" class="flex flex-row items-center justify-evenly">
				<li class="pr-4">
					<a href="/">
						<img
							src="/images/Icon.webp"
							alt="Ayako's Icon"
							class="md:w-128px md:h-128px w-64px h-64px"
							width="128"
							height="128"
							loading="eager"
						/>
					</a>
				</li>
				<li>
					<ul class="flex flex-col justify-around">
						<li class="md:text-6xl text-4xl font-bold"><ColorFadeText text="Ayako" /></li>
						<li class="md:text-4xl text-2xl">ayakobot.com</li>
					</ul>
				</li>
			</ul>

			<ul id="right" class="flex flex-row justify-around items-start my-6">
				<li>
					<div class="flex flex-col justify-evenly items-start px-4">
						<a class="btn-quiet text-5 font-bold" href="https://support.ayakobot.com" target="_blank">Support</a>
						<a class="btn-quiet text-5 font-bold color-yellow" href="/donate">Premium</a>
						<a class="text-5 font-bold" href="https://top.gg/bot/650691698409734151/vote" target="_blank">
							<ColorFadeText text="Vote" />
						</a>
						<a class="text-5 font-bold" href="/donate"><ColorFadeText text="Donate" /></a>
					</div>
				</li>
				<li>
					<div class="flex flex-col justify-evenly items-start px-4">
						<a class="btn-quiet text-5 font-bold" href="https://support.ayakobot.com" target="_blank">Animekos</a>
						<a class="btn-quiet text-5 font-bold" href="/credits">Creators</a>
						<a class="btn-quiet text-5 font-bold" href="/terms">Terms</a>
						<a class="btn-quiet text-5 font-bold" href="/privacy">Privacy</a>
					</div>
				</li>
			</ul>
		</li>
		<li class="font-size-3">
			Copyright © {new Date().getFullYear()} Ayako
		</li>
	</ul>
</footer>
