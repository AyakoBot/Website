<script>
	import FancyBorder from '$lib/components/generic/FancyBorder.svelte';
</script>

<div class="flex flex-col items-center">
	<img
		src="https://cdn.ayakobot.com/website_assets/ayakodevil.png"
		alt=""
		width="128"
		loading="lazy"
	/>

	<h1 class="text-xl mt-2">Premium?</h1>
	<span>No one likes Pay-Walls.<br />Neither do we.</span>
	<h1 class="text-xl mt-2">Consider donating</h1>
	<span>and help Ayako stay free forever</span>

	<a href="https://www.patreon.com/Lars_und_so" class="btn-loud mt-2 w-60">Donate on Patreon</a>
	<a href="https://www.paypal.me/AyakoDevelopment" class="btn-loud mt-2 w-60">Donate on PayPal</a>

	<div class="mt-2.5 mb-5 w-full">
		<FancyBorder />
	</div>

	<span>Empty pockets but still wanna help?</span>
	<span>Vote for Ayako on Bot Voting Pages</span>

	<a class="btn-loud my-4" target="_blank" href="https://top.gg/bot/650691698409734151">Top.GG</a>
	<div
		class="flex flex-row flex-wrap justify-evenly gap-5 items-center w-95% sm:w-75% md:w-65% lg:w-50%"
	>
		<a class="btn-medium w-40" target="_blank" href="https://discord.bots.gg/bots/650691698409734151">
			Bots.gg
		</a>
		<a class="btn-medium w-40" target="_blank" href="https://discordbotlist.com/bots/tmh">
			Discord&nbsp;Bot&nbsp;List
		</a>
		<a class="btn-medium w-40" target="_blank" href="https://wumpus.store/bot/650691698409734151">
			Wumpus&nbsp;Store
		</a>
		<a
			class="btn-medium w-40"
			target="_blank"
			href="https://discords.com/bots/bot/650691698409734151"
		>
			Discords.com
		</a>
		<a
			class="btn-medium w-40"
			target="_blank"
			href="https://discord.rovelstars.com/bots/650691698409734151">Rovelstars</a
		>
		<a class="btn-medium w-40" target="_blank" href="https://infinitybots.gg/bot/650691698409734151">
			Infinity&nbsp;Bots
		</a>
		<a class="btn-medium w-40" target="_blank" href="https://botlist.me/bots/650691698409734151">
			Botlist.me
		</a>
	</div>
</div>
