<script lang="ts">
	const ayakoAvatar =
		'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=80';
</script>

<!-- Ban Log -->
<div class="relative flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-baseline gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span
				class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75 align-top"
				><span class="i-tabler-check text-xs"></span> APP</span
			>
			<span class="text-3 text-white/25 font-400">Today at 2:34 PM</span>
		</div>
		<div class="msg-embed flex bg-[#2b2d31] rounded overflow-hidden max-w-129 mt-1">
			<div class="w-1 flex-shrink-0 bg-[#ed4245]"></div>
			<div class="p-2 px-3 pb-3 flex flex-col gap-2 flex-1">
				<span class="font-700 text-3.75 text-white">User Banned</span>
				<span class="text-3.25 text-white/75 leading-snug"
					>User <span class="mention">@spammer</span> / bad_actor_99 / 123456789012345<br />was Banned by<br
					/>Bot <span class="mention">@Ayako</span> / Ayako#6768 / 650691698409734151</span
				>
				<div class="mt-2">
					<span class="block text-3.25 font-700 text-white mb-0.5">Reason</span>
					<span class="text-3.25 text-white/75">Suspected Spammer</span>
				</div>
				<div class="flex items-center gap-1 text-2.75 text-white/40 mt-1">
					<span>Today at 2:34 PM</span>
				</div>
			</div>
		</div>
	</div>
	<div
		class="hint absolute flex flex-col items-center gap-1.5 pointer-events-none z-10"
		style="left: 240px; top: -10px;"
	>
		<span class="hint-text">Every Discord and mod action<br />logged with full details</span>
		<svg
			class="hint-arrow down-left"
			style="transform: rotate(160deg)"
			width="60"
			height="14"
			viewBox="0 0 296 71"
			><path
				d="M280 71C293.102 44.3623 363.05 8.91537 412.922 2.62301C466.809 -4.29859 497.873 1.57428 561.27 31.1484C560.425 26.9535 559.368 23.5976 558.945 20.4514C558.311 16.8857 557.677 13.1103 557.889 9.54461C557.889 8.49589 559.791 6.60818 561.059 6.39843C562.327 6.18869 564.44 7.6569 564.862 8.70563C568.666 18.7734 572.047 28.8412 575.64 39.1187C576.696 42.4746 575.428 44.9916 571.836 46.0403C558.1 49.3962 544.364 52.9619 530.417 56.1081C527.247 56.7373 523.443 55.8983 519.217 55.8983C522.598 46.8793 530.206 47.928 535.7 45.6208C541.406 43.1039 547.534 41.6357 554.93 39.1187C537.39 27.373 519.639 20.0319 500.832 15.4175C431.941 -1.78164 368.544 12.481 310.008 50.6547C302.4 55.6886 295.427 61.5615 288.03 66.8051C285.706 67.8538 283.592 68.9026 280 71Z"
				fill="#fde047"
				transform="translate(-280,0)"
			/></svg
		>
	</div>
</div>

<!-- Edit Log -->
<div class="relative flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-baseline gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span
				class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75 align-top"
				><span class="i-tabler-check text-xs"></span> APP</span
			>
			<span class="text-3 text-white/25 font-400">Today at 2:36 PM</span>
		</div>
		<div class="msg-embed flex bg-[#2b2d31] rounded overflow-hidden max-w-129 mt-1">
			<div class="w-1 flex-shrink-0 bg-[#f0b232]"></div>
			<div class="p-2 px-3 pb-3 flex flex-col gap-2 flex-1">
				<span class="font-700 text-3.75 text-white"
					><span class="i-tabler-pencil text-sm"></span> Message Updated</span
				>
				<span class="text-3.25 text-white/75 leading-snug"
					><span class="text-[#00aff4] cursor-pointer hover:underline">This Message</span><br />was
					updated by<br />User <span class="mention">@Alex</span></span
				>
				<div class="mt-2">
					<span class="block text-3.25 font-700 text-white mb-0.5">Before</span>
					<span class="text-3.25 text-white/75">Hello everyone</span>
				</div>
				<div class="mt-2">
					<span class="block text-3.25 font-700 text-white mb-0.5">After</span>
					<span class="text-3.25 text-white/75">Hello everyone!!!</span>
				</div>
				<div class="flex items-center gap-1 text-2.75 text-white/40 mt-1">
					<span>Today at 2:36 PM</span>
				</div>
			</div>
		</div>
	</div>
	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 flex-row"
		style="left: 260px; bottom: 20px;"
	>
		<svg
			class="hint-arrow up-left"
			style="transform: scale(1, 1) rotate(20deg)"
			width="50"
			height="16"
			viewBox="0 0 251 81"
			><path
				d="M294.444 157.026C296.348 165.22 298.041 173.205 300.156 182.24C294.655 181.61 291.481 178.248 290.212 174.466C286.403 163.119 282.806 151.562 280.267 139.796C278.786 133.072 283.653 129.5 290.212 131.601C301.214 134.963 312.005 138.955 323.008 142.737C323.643 142.947 324.489 143.158 324.701 143.578C325.759 145.049 326.393 146.73 327.24 148.411C325.759 149.041 324.278 150.512 323.008 150.302C318.565 149.671 314.333 148.621 310.101 147.78C307.774 147.36 305.658 146.73 302.272 147.78C304.6 150.302 306.927 153.033 309.255 155.555C359.613 205.564 435.15 216.07 497.781 182.24C505.821 177.828 513.227 172.575 521.055 167.742C523.806 166.061 526.557 164.59 529.307 162.909C529.942 163.329 530.365 163.96 531 164.38C530.365 166.271 530.154 168.793 528.673 170.053C524.018 174.466 519.363 178.879 514.073 182.661C461.599 220.483 388.601 221.954 332.106 185.813C321.315 178.879 311.794 170.053 301.849 162.069C299.733 160.388 298.041 158.497 296.136 156.605C295.713 156.395 295.078 156.605 294.444 157.026Z"
				fill="#fde047"
				transform="translate(-280,-131)"
			/></svg
		>
		<span class="hint-text">Tracks every action <br /> done on your server</span>
	</div>
</div>

<style>
	.hint-text {
		font-family: 'Caveat', 'Comic Neue', cursive;
		font-size: 17px;
		font-weight: 600;
		color: #fde047;
		line-height: 1.2;
		text-shadow:
			0 0 8px rgba(0, 0, 0, 1),
			0 0 16px rgba(0, 0, 0, 0.9),
			0 0 32px rgba(0, 0, 0, 0.8),
			0 2px 4px rgba(0, 0, 0, 1);
		white-space: nowrap;
	}
	.hint-arrow {
		display: block;
		filter:
			drop-shadow(0 0 4px rgba(0, 0, 0, 1))
			drop-shadow(0 0 8px rgba(0, 0, 0, 0.9))
			drop-shadow(0 2px 4px rgba(0, 0, 0, 1));
	}
	.hint-arrow.down-left {
		transform: rotate(0deg);
	}
	.hint-arrow.up-left {
		transform: scaleY(-1);
	}
</style>
