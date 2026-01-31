<script lang="ts">
	const ayakoAvatar = 'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=80';
	const modAvatar = 'https://cdn.discordapp.com/embed/avatars/2.png';
</script>

<!-- Ban Command -->
<div class="relative flex gap-4 py-0.5">
	<img src={modAvatar} alt="Mod" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-baseline gap-2">
			<span class="font-600 text-[#e74c3c] text-3.75 cursor-pointer hover:underline">ModeratorX</span>
			<span class="role-badge inline-flex items-center gap-0.75 bg-gradient-to-br from-[rgba(231,76,60,0.25)] to-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.4)] text-white/85 text-2.5 px-1.5 py-px rounded-full font-500">Server Moderator</span>
			<span class="text-3 text-white/25 font-400">Today at 2:34 PM</span>
		</div>
		<span class="text-3.25 text-white/75 op-70">h!ban 987654321098765 Toxicity</span>
	</div>
	<div class="hint absolute flex flex-col items-center gap-1.5 pointer-events-none z-10" style="left: 300px; top: -20px;">
		<span class="hint-text">Prefixes for mod<br/>and RP commands are<br/>still supported</span>
		<svg class="hint-arrow down-left" style="transform: rotate(120deg)" width="35" height="52" viewBox="0 0 110 166"><path d="M282.423 785C281.79 781.196 280.525 777.391 280.314 773.587C278.837 737.657 282.423 702.361 294.234 668.333C298.03 657.554 303.092 646.986 308.997 637.264C315.113 626.696 323.76 618.031 337.258 619.088C350.756 620.144 357.084 630.712 362.356 641.702C368.683 655.018 371.425 669.39 373.323 683.762C373.745 686.932 374.167 690.314 376.276 693.907C379.651 686.932 383.025 680.169 386.61 672.771C391.25 676.153 389.985 679.957 389.352 682.705C385.556 698.134 381.549 713.563 377.12 728.78C375.222 735.543 369.949 736.389 365.942 731.105C356.873 718.635 351.6 704.474 349.28 689.046C349.28 688.623 349.913 687.989 350.546 686.932C359.193 687.566 356.873 697.711 363.2 701.938C361.724 679.957 359.193 659.456 348.858 640.646C347.593 638.321 345.906 636.207 344.007 634.305C338.735 629.021 333.251 628.176 327.979 633.46C322.073 639.377 316.59 646.141 312.582 653.327C303.092 670.446 297.608 689.046 294.444 708.067C291.07 729.414 289.172 750.972 286.641 772.53C286.219 776.335 286.008 780.35 285.586 784.366C284.743 784.577 283.688 784.789 282.423 785Z" fill="#fde047" transform="translate(-280,-619)"/></svg>
	</div>
</div>

<!-- Ban Response -->
<div class="flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-baseline gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75 align-top"><span class="i-tabler-check text-xs"></span> APP</span>
			<span class="text-3 text-white/25 font-400">Today at 2:34 PM</span>
		</div>
		<div class="msg-embed flex bg-[#2b2d31] rounded overflow-hidden max-w-129 mt-1">
			<div class="w-1 flex-shrink-0 bg-[#23a55a]"></div>
			<div class="p-2 px-3 pb-3 flex flex-col gap-2 flex-1">
				<span class="text-3.25 text-white/75">User <span class="mention">@toxic_user</span> / rulebreaker42 / 987654321098765<br/>was Banned</span>
			</div>
		</div>
	</div>
</div>

<!-- Strike Command -->
<div class="relative flex gap-4 py-0.5">
	<img src={modAvatar} alt="Mod" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-baseline gap-2">
			<span class="font-600 text-[#e74c3c] text-3.75 cursor-pointer hover:underline">ModeratorX</span>
			<span class="role-badge inline-flex items-center gap-0.75 bg-gradient-to-br from-[rgba(231,76,60,0.25)] to-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.4)] text-white/85 text-2.5 px-1.5 py-px rounded-full font-500">Server Moderator</span>
			<span class="text-3 text-white/25 font-400">Today at 2:35 PM</span>
		</div>
		<span class="text-3.25 text-white/75 op-70">,strike 111222333444555 Advertisements</span>
	</div>
	<div class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 flex-row" style="left: 250px; top: -45px;">
		<svg class="hint-arrow down-right" style="transform: rotate(-30deg) scale(-1, 1)" width="50" height="24" viewBox="0 0 202 97"><path d="M636 84.5669C636.422 80.9698 636.211 77.3727 637.055 73.9872C638.321 69.1206 640.01 64.2539 642.542 59.8104C657.947 32.3033 680.317 11.9903 710.494 3.52656C741.305 -4.93718 770.427 1.8338 794.696 23.8395C806.936 34.8424 816.221 48.1728 823.396 62.9844C824.663 65.7351 825.929 68.2742 828.25 72.7177C830.993 66.5815 833.104 61.9264 835.214 57.0597C835.847 57.2713 836.48 57.2713 837.324 57.4829C837.535 58.9641 838.169 60.4452 837.958 61.9264C837.324 69.3322 836.48 76.7379 835.636 84.1437C835.003 89.0104 834.581 94.0886 829.305 96.2045C823.818 98.5321 819.176 95.3582 815.588 91.7611C810.734 86.6829 806.303 80.9698 802.082 75.2568C801.238 73.9872 802.082 71.6597 802.082 69.7553C803.981 69.7553 806.303 69.1206 807.569 69.9669C811.368 72.7177 814.533 76.1032 818.121 79.4887C818.332 78.8539 818.754 78.4307 818.543 78.2191C802.082 31.6685 768.317 3.94975 720.202 8.81641C717.88 9.028 715.559 9.45118 713.238 10.2976C680.95 20.6656 657.103 40.767 642.542 71.6597C640.643 75.68 639.799 80.335 638.532 84.7785C637.688 84.7785 636.844 84.5669 636 84.5669Z" fill="#fde047" transform="translate(-636,0)"/></svg>
		<span class="hint-text">Linked Roles decoration,<br/>also a feature!</span>
	</div>
</div>

<!-- Strike Response -->
<div class="relative flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-baseline gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75 align-top"><span class="i-tabler-check text-xs"></span> APP</span>
			<span class="text-3 text-white/25 font-400">Today at 2:35 PM</span>
		</div>
		<div class="msg-embed flex bg-[#2b2d31] rounded overflow-hidden max-w-129 mt-1">
			<div class="w-1 flex-shrink-0 bg-[#23a55a]"></div>
			<div class="p-2 px-3 pb-3 flex flex-col gap-2 flex-1">
				<span class="text-3.25 text-white/75">User <span class="mention">@advertiser</span> / spammy_user / 111222333444555<br/>was Warned</span>
			</div>
		</div>
	</div>
	<div class="hint absolute flex flex-row-reverse items-center gap-1.5 pointer-events-none z-10" style="left: 140px; top: 80px;">
		<span class="hint-text">Strikes auto-escalate<br/>punishments</span>
		<svg class="hint-arrow down-left" style="transform: rotate(200deg) scale(1, -1)" width="50" height="10" viewBox="0 0 193 40"><path d="M809.928 786.129C751.811 809.939 694.751 810.774 636 791.142C640.227 786.756 643.819 788.427 646.567 789.262C667.7 794.901 689.468 795.528 711.024 796.363C742.09 797.616 771.465 790.515 800.207 779.028C801.475 778.61 802.532 777.775 805.068 776.104C790.486 773.18 775.903 778.193 763.223 772.345C763.435 771.509 763.435 770.465 763.646 769.63C773.156 769.003 782.877 768.377 792.388 767.541C801.898 766.706 811.196 765.662 820.706 765.035C827.68 764.617 830.639 767.959 828.103 774.225C824.933 782.37 820.495 789.889 816.48 797.616C816.057 798.452 815.423 799.496 814.578 799.914C812.253 800.749 809.928 800.958 807.392 801.584C806.97 799.496 805.913 797.199 806.124 795.319C806.547 792.813 808.026 790.724 809.928 786.129Z" fill="#fde047" transform="translate(-636,-765)"/></svg>
	</div>
</div>

<style>
	.role-badge::before {
		content: '';
		width: 10px;
		height: 10px;
		background: #e74c3c;
		border-radius: 50%;
		display: inline-block;
		box-shadow: 0 0 4px rgba(231, 76, 60, 0.5);
	}
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
	.hint-arrow.down-left { transform: rotate(0deg); }
	.hint-arrow.down-right { transform: scaleX(-1); }
</style>
