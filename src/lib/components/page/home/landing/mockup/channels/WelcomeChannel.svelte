<script lang="ts">
	const ayakoAvatar =
		'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=80';
</script>

<div class="relative flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-baseline gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span
				class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75 align-top"
				><span class="i-tabler-check text-xs"></span> APP</span
			>
			<span class="text-3 text-white/25 font-400">Today at 1:30 PM</span>
		</div>
		<span class="text-3.25 text-white/60 mb-1"><span class="mention">@newmember</span></span>
		<div class="msg-embed flex bg-[#2b2d31] rounded overflow-hidden max-w-129 mt-1">
			<div class="w-1 flex-shrink-0 bg-[#5865f2]"></div>
			<div class="p-2 px-3 pb-3 flex flex-col gap-2 flex-1">
				<span class="font-700 text-3.75 text-white">Welcome to Ayako Server !!!</span>
				<span class="text-3.25 text-white/75 leading-snug">
					<span class="mention">@newmember</span> welcome to the community!<br />
					You're our <strong>4,005</strong>th member!
				</span>
				<div
					class="w-full h-20 bg-gradient-to-br from-[#3a3c42] to-[#2b2d31] rounded my-2 flex flex-col items-center justify-center gap-1"
				>
					<span class="i-tabler-photo text-2xl op-40"></span>
					<span class="op-40 text-xs">Random Welcome GIF/Image</span>
				</div>
				<span class="text-3.25 text-white/75 leading-snug mt-2">
					Please be sure to read our <span class="mention">#rules</span><br />
					and enjoy your stay!
				</span>
			</div>
		</div>
	</div>
	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10"
		style="left: 200px; top: 0;"
	>
		<svg class="hint-arrow down-left" style="transform: rotate(-20deg);" width="55" height="10" viewBox="0 0 219 41"
			><path
				d="M21.489 29.43C36.933 31.35 51.32 33.056 65.71 34.975C66.76 35.189 67.61 36.468 69.94 38.387C63.17 39.241 57.88 40.307 52.59 40.52C38.626 40.947 24.874 40.947 10.911 40.947C9.218 40.947 7.526 41.16 5.833 40.733C0.332 39.667 -1.572 36.042 1.39 31.137C2.871 28.791 4.564 26.658 6.468 24.739C13.661 17.488 21.066 10.45 28.471 3.412C29.74 2.133 31.644 1.493 34.183 0C34.606 10.876 23.816 13.862 21.489 22.393C23.393 21.966 25.086 21.753 26.567 21.326C83.69 5.545 140.6 7.251 197.3 22.606C203.22 24.099 208.94 26.445 214.65 28.577C217.61 29.644 220.15 31.99 218.46 35.615C216.98 39.241 214.01 39.241 210.63 37.748C172.76 20.687 132.56 18.767 91.94 19.407C70.78 19.62 50.05 21.966 29.529 26.871C26.99 27.511 24.451 28.364 21.489 29.43Z"
				fill="#fde047"
			/></svg
		>
		<span class="hint-text">Fully customizable<br />welcome messages</span>
	</div>
	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 flex-row-reverse"
		style="left: 50px; bottom: 55px;"
	>
		<svg
			class="hint-arrow up-right ml--2 mt-10"
			style="transform: scale(1, -1) rotate(30deg);"
			width="50"
			height="24"
			viewBox="0 0 202 97"
			><path
				d="M636 84.5669C636.422 80.9698 636.211 77.3727 637.055
  73.9872C638.321 69.1206 640.01 64.2539 642.542 59.8104C657.947 32.3033 680.317 11.9903 710.494 3.52656C741.305
  -4.93718 770.427 1.8338 794.696 23.8395C806.936 34.8424 816.221 48.1728 823.396 62.9844C824.663 65.7351 825.929
  68.2742 828.25 72.7177C830.993 66.5815 833.104 61.9264 835.214 57.0597C835.847 57.2713 836.48 57.2713 837.324
  57.4829C837.535 58.9641 838.169 60.4452 837.958 61.9264C837.324 69.3322 836.48 76.7379 835.636 84.1437C835.003
  89.0104 834.581 94.0886 829.305 96.2045C823.818 98.5321 819.176 95.3582 815.588 91.7611C810.734 86.6829 806.303
  80.9698 802.082 75.2568C801.238 73.9872 802.082 71.6597 802.082 69.7553C803.981 69.7553 806.303 69.1206 807.569
  69.9669C811.368 72.7177 814.533 76.1032 818.121 79.4887C818.332 78.8539 818.754 78.4307 818.543 78.2191C802.082
  31.6685 768.317 3.94975 720.202 8.81641C717.88 9.028 715.559 9.45118 713.238 10.2976C680.95 20.6656 657.103 40.767
   642.542 71.6597C640.643 75.68 639.799 80.335 638.532 84.7785C637.688 84.7785 636.844 84.5669 636 84.5669Z"
				fill="#fde047"
				transform="translate(-636,0)"
			/></svg
		>
		<span class="hint-text">Random GIF from<br />your own collection!</span>
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
	.hint-arrow.up-right {
		transform: scale(-1, -1);
	}
</style>
