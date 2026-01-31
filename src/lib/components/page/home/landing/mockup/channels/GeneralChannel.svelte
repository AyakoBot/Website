<script lang="ts">
	const ayakoAvatar =
		'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=80';

	let gifFailed = $state(false);
</script>

<!-- RP Command - Discord interaction style -->
<div class="relative flex items-center gap-2 py-1 px-2">
	<img
		src="https://cdn.discordapp.com/embed/avatars/1.png"
		alt="User"
		class="w-4 h-4 rounded-full flex-shrink-0"
	/>
	<span class="text-3.25 text-white/60">
		<span class="font-500 text-[#f47fff] cursor-pointer hover:underline">Alex</span>
		used
		<strong class="text-white/80">/pat</strong>
	</span>
	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10"
		style="right: -160px; top: 0;"
	>
		<span class="hint-text">20+ fun roleplay<br />commands</span>
		<svg class="hint-arrow down-left" width="28" height="65" viewBox="0 0 75 175"
			><path
				d="M20.1871 726C15.7485 723.891 13.0008 723.469 12.1553 721.992C8.98489 716.508 5.39173 711.024 3.70083 704.908C-1.37187 688.666 -0.737781 672.214 2.64402 655.762C8.35081 627.709 21.0325 602.82 36.8847 579.197C38.5756 576.665 40.0552 574.134 41.7461 571.392C41.7461 571.181 41.5347 570.76 41.1119 570.127C36.462 571.392 31.6007 572.658 26.9507 573.713C24.4144 574.134 21.4552 574.134 18.9189 573.291C17.4394 572.869 15.3258 570.549 15.3258 569.072C15.3258 567.174 16.8053 564.854 18.0735 563.166C19.1303 562.112 21.0326 561.901 22.7235 561.479C35.4052 558.315 48.087 554.729 60.9801 551.776C71.9709 549.245 75.564 552.831 74.9299 563.588C74.2959 574.767 74.0845 585.946 73.6618 596.914C73.4505 600.289 72.8164 603.875 72.3936 607.671C63.5164 603.664 63.5164 603.664 60.346 569.494C47.0301 584.259 38.1529 600.289 29.9098 616.741C21.6666 633.193 16.1712 650.489 13.2121 668.839C10.2531 687.823 13.8462 705.751 20.1871 726Z"
				fill="#fde047"
				transform="translate(0,-551)"
			/></svg
		>
	</div>
</div>

<!-- Pat Response -->
<div class="relative flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-center gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span
				class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75"
				><span class="i-tabler-check text-2.5"></span> APP</span
			>
			<span class="text-3 text-white/25 font-400">01:33</span>
		</div>
		<span class="text-3.25 text-white/60 mb-1"><span class="mention">@Sam</span></span>
		<!-- Embed with left border -->
		<div class="embed-container flex rounded overflow-hidden max-w-85">
			<div class="w-1 bg-[#e779c1] flex-shrink-0"></div>
			<div class="bg-[#2b2d31] p-3 flex gap-3 flex-1">
				<span class="text-3.25 text-white/90 flex-1"
					><span class="mention">@Alex</span> pats <span class="mention">@Sam</span></span
				>
				<div
					class="w-20 h-20 bg-gradient-to-br from-[#3a3c42] to-[#2b2d31] rounded flex-shrink-0 flex items-center justify-center overflow-hidden"
				>
					{#if gifFailed}
						<span class="i-tabler-gif text-2xl op-30"></span>
					{:else}
						<img
							src="https://media.tenor.com/images/b0e5c7e3c5eb5f0c5dc6a9c6c3d3b3b3/tenor.gif"
							alt="pat"
							class="w-full h-full object-cover"
							onerror={() => (gifFailed = true)}
						/>
					{/if}
				</div>
			</div>
		</div>
		<!-- Buttons OUTSIDE the embed -->
		<div class="flex gap-2 mt-1 flex-wrap">
			<button
				class="bg-[#4f545c] text-white border-none px-3 py-1.5 rounded-sm text-3.25 cursor-pointer transition-colors hover:bg-[#5d6269]"
				>Blush~ #~#</button
			>
			<button
				class="bg-[#4f545c] text-white border-none px-3 py-1.5 rounded-sm text-3.25 cursor-pointer transition-colors hover:bg-[#5d6269]"
				>Enjoy the pats &lt;3</button
			>
			<button
				class="bg-[#4f545c] text-white border-none px-3 py-1.5 rounded-sm text-3.25 cursor-pointer transition-colors hover:bg-[#5d6269]"
				>Pout &gt;-&gt;</button
			>
		</div>
	</div>
	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 flex-row"
		style="bottom: 50px; left: 300px;"
	>
		<svg
			class="hint-arrow up-left"
			width="55"
			height="22"
			viewBox="0 0 220 87"
			style="rotate: -20deg; transform: scale(-1, -1)"
			><path
				d="M3.17247 221.842C5.28745 224.179 7.82542 226.091 9.7289 228.64C26.0142 251.37 49.279 262.629 75.0817 268.789C83.9646 270.914 94.1165 270.701 103.211 268.789C129.225 263.691 152.913 252.857 173.428 235.863C179.35 230.977 184.426 224.816 188.656 217.806C186.33 218.656 183.792 219.505 181.465 220.568C174.697 223.542 167.929 226.728 160.95 229.277C157.989 230.339 154.393 230.339 151.009 230.127C149.74 230.127 147.837 228.215 147.625 226.94C147.414 225.666 148.683 223.329 149.74 223.117C167.718 217.593 183.369 206.972 199.654 197.837C205.364 194.651 208.96 195.501 211.498 201.236C217.631 215.469 220.381 230.552 219.958 246.059C219.958 246.484 219.112 247.121 217.843 248.396C205.364 243.722 209.171 230.127 203.038 219.293C201.557 221.842 200.5 223.966 199.231 225.666C172.582 258.593 137.262 276.012 96.2315 282.385C90.0981 283.447 83.3301 283.022 76.9852 281.96C53.7205 277.924 32.9937 268.152 15.8623 251.795C10.3634 246.484 6.34493 239.474 2.32647 232.888C0.634492 230.339 0.634494 226.728 0 223.754C1.05749 223.117 2.11498 222.479 3.17247 221.842Z"
				fill="#fde047"
				transform="translate(0,-196)"
			/></svg
		>
		<span class="hint-text">Others can react<br />back with a click!</span>
	</div>

	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 flex-row"
		style="left: 200px; top: -10px;"
	>
		<svg
			class="hint-arrow mt-3"
			width="40"
			height="50"
			viewBox="0 0 122 136"
			style="transform: scale(0.8, 0.8) rotate(0deg)"
			><path
				d="M24.7219 107.666C48.2285 92.6289 71.9469 77.5917 95.4536 62.5546C95.2418 61.9192 94.8183 61.0721 94.6065 60.4367C84.865 62.131 74.9117 63.8254 65.1702 65.3079C59.4524 66.1551 53.7346 66.7904 48.0168 66.5786C36.1575 66.155 31.9221 57.8952 38.0635 47.7293C40.1812 44.3406 42.7225 40.7402 45.6873 38.1987C60.2995 25.9148 75.1235 14.0546 89.7357 1.98249C90.7946 1.13533 92.0652 0.288181 93.3359 0.0763904C94.3947 -0.1354 96.3007 0.0763774 96.936 0.92354C97.7831 2.19428 98.4184 4.52399 97.5713 5.37115C95.2418 8.33622 92.7005 10.8777 89.9475 13.4192C78.5118 23.3734 66.6526 33.3275 55.217 43.4935C51.8286 46.4585 49.0756 50.4826 44.6284 55.7773C50.3462 55.7773 53.7346 56.2009 57.1229 55.7773C72.1587 53.2359 87.1945 50.2707 102.23 47.7293C105.619 47.0939 109.007 46.2467 112.395 46.8821C115.36 47.3057 119.172 48.7882 120.866 51.1179C123.407 54.5066 121.29 58.3188 118.325 61.0721C115.572 63.6136 112.819 66.1551 109.642 68.273C90.7946 80.5568 72.1587 92.6289 53.311 104.913C50.3462 106.819 47.3814 108.937 42.5107 112.114C55.217 112.325 64.7467 105.125 77.6648 109.36C74.2764 112.537 72.3705 114.867 70.041 116.138C51.4051 125.245 31.4986 131.387 11.1685 135.622C2.69764 137.528 -1.96134 132.022 0.791693 123.55C2.06232 119.738 3.7565 115.926 6.29775 112.749C13.0744 103.854 20.0629 95.1704 27.2631 86.487C28.5338 85.0044 31.4986 83.7337 32.981 84.1573C36.1575 85.428 35.734 88.6048 34.2516 91.1463C31.075 96.6529 27.4749 102.159 24.0866 107.454C24.0866 107.031 24.5101 107.454 24.7219 107.666Z"
				fill="#fde047"
			/></svg
		>
		<span class="hint-text">Compact and <br /> large mode available</span>
	</div>
</div>

<!-- AFK Message -->
<div class="relative flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col flex-1 min-w-0">
		<div class="flex items-center gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span
				class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75"
				><span class="i-tabler-check text-2.5"></span> APP</span
			>
			<span class="text-3 text-white/25 font-400">02:03</span>
		</div>
		<span class="text-3.25 text-white/75"
			><span class="font-500 text-white cursor-pointer hover:underline">Alex</span> went AFK</span
		>
		<!-- Embed with left border -->
		<div class="flex rounded overflow-hidden max-w-50 mt-0.5">
			<div class="w-1 bg-[#f0b132] flex-shrink-0"></div>
			<div class="bg-[#2b2d31] pb-3 px-3">
				<span class="text-3 text-white/60">taking a nap</span>
			</div>
		</div>
	</div>
	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 flex-row"
		style="left: 150px; bottom:-25px;"
	>
		<svg class="hint-arrow" width="40" height="45" viewBox="0 0 122 148" style="transform: scale(-1, -1) rotate(-40deg)"
			><path
				d="M0 345.65C6.14938 341.626 12.2988 342.897 17.812 344.803C25.4458 347.557 32.8674 351.157 39.6529 355.393C70.3998 375.727 88.8479 404.744 96.4816 440.539C98.39 449.647 99.0262 459.178 100.299 469.556C108.78 464.685 113.233 455.154 121.715 449.647C122.776 453.883 120.655 456.636 118.959 458.966C111.961 468.497 104.752 478.028 97.3299 487.348C93.7251 491.796 90.9684 492.219 87.1515 488.407C79.0937 480.57 74.2167 471.039 72.7323 460.025C72.7323 459.601 73.3684 458.966 74.2166 457.907C83.3347 460.237 81.2142 471.886 89.06 476.122C92.4527 461.508 89.9082 447.529 86.0913 433.973C82.0624 419.782 76.7612 406.227 68.2793 394.154C60.0095 382.293 49.6191 372.761 38.1686 363.866C26.93 354.758 14.2072 349.039 0 345.65Z"
				fill="#fde047"
				transform="translate(0,-343)"
			/></svg
		>
		<span class="hint-text ml-2">Made to be <br /> low-profile</span>
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
		filter: drop-shadow(0 0 4px rgba(0, 0, 0, 1)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.9))
			drop-shadow(0 2px 4px rgba(0, 0, 0, 1));
	}
	.hint-arrow.down-left {
		transform: rotate(0deg);
	}
	.hint-arrow.up-left {
		transform: scaleY(-1);
	}
</style>
