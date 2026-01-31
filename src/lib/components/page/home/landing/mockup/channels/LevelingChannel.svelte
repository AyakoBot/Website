<script lang="ts">
	const ayakoAvatar =
		'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=80';
</script>

<!-- Rank Command - Discord interaction style -->
<div class="relative flex items-center gap-2 py-1 px-2">
	<img
		src="https://cdn.discordapp.com/embed/avatars/1.png"
		alt="User"
		class="w-4 h-4 rounded-full flex-shrink-0"
	/>
	<span class="text-3.25 text-white/60">
		<span class="font-500 text-[#f47fff] cursor-pointer hover:underline">Alex</span>
		used
		<strong class="text-white/80">/rank server</strong>
	</span>
</div>

<!-- Rank Response -->
<div class="relative flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-center gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span
				class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75"
				><span class="i-tabler-check text-2.5"></span> APP</span
			>
			<span class="text-3 text-white/25 font-400">02:00</span>
		</div>
		<!-- Embed with left border -->
		<div class="msg-embed flex rounded overflow-hidden max-w-129 mt-1">
			<div class="w-1 flex-shrink-0 bg-[#23a55a]"></div>
			<div class="bg-[#2b2d31] p-2 px-3 pb-3 flex flex-col gap-2 flex-1 code-font text-3">
				<div
					class="leaderboard grid gap-2 py-0.5 text-white/80"
					style="grid-template-columns: 30px 40px 80px 1fr;"
				>
					<span class="text-white/50 font-600">#</span>
					<span class="text-white/50 font-600">Lvl</span>
					<span class="text-white/50 font-600">XP</span>
					<span class="text-white/50 font-600">User</span>
				</div>
				<div class="h-px bg-white/10 my-1"></div>
				<div
					class="leaderboard grid gap-2 py-0.5 text-white/80"
					style="grid-template-columns: 30px 40px 80px 1fr;"
				>
					<span class="text-white/50">1.</span>
					<span class="text-[#b0ff00] font-600">130</span>
					<span class="text-white/60">4,020,764</span>
					<span class="text-white">Alex</span>
				</div>
				<div
					class="leaderboard grid gap-2 py-0.5 text-white/80"
					style="grid-template-columns: 30px 40px 80px 1fr;"
				>
					<span class="text-white/50">2.</span>
					<span class="text-[#b0ff00] font-600">89</span>
					<span class="text-white/60">1,893,021</span>
					<span class="text-white">active_user</span>
				</div>
				<div
					class="leaderboard grid gap-2 py-0.5 text-white/80"
					style="grid-template-columns: 30px 40px 80px 1fr;"
				>
					<span class="text-white/50">3.</span>
					<span class="text-[#b0ff00] font-600">71</span>
					<span class="text-white/60">705,612</span>
					<span class="text-white">chatter_pro</span>
				</div>
				<div class="h-px bg-white/10 my-2"></div>
				<div class="text-white/50 font-600 mt-2">Your Position</div>
				<div
					class="leaderboard grid gap-2 py-0.5 text-white/80"
					style="grid-template-columns: 30px 40px 80px 1fr;"
				>
					<span class="text-white/50">47.</span>
					<span class="text-[#b0ff00] font-600">34</span>
					<span class="text-white/60">89,432</span>
					<span class="text-white">You</span>
				</div>
			</div>
		</div>
		<!-- Buttons OUTSIDE the embed -->
		<div class="flex gap-2 mt-1 flex-wrap">
			<button
				class="bg-[#4f545c] text-white border-none px-3 py-1.5 rounded-sm text-3.25 cursor-pointer transition-colors hover:bg-[#5d6269]"
				>Full Leaderboard <span class="i-tabler-external-link text-xs"></span></button
			>
		</div>
	</div>
	<div
		class="hint absolute flex flex-row-reverse items-center gap-1.5 pointer-events-none z-10"
		style="left: 220px; top: 50px;"
	>
		<span class="hint-text">Multiple XP formulas<br />and voice XP</span>
		<svg
			class="hint-arrow down-left"
			width="55"
			height="10"
			viewBox="0 0 219 41"
			style="transform: rotate(-20deg)"
			><path
				d="M21.489 29.43C36.933 31.35 51.32 33.056 65.71 34.975C66.76 35.189 67.61 36.468 69.94 38.387C63.17 39.241 57.88 40.307 52.59 40.52C38.626 40.947 24.874 40.947 10.911 40.947C9.218 40.947 7.526 41.16 5.833 40.733C0.332 39.667 -1.572 36.042 1.39 31.137C2.871 28.791 4.564 26.658 6.468 24.739C13.661 17.488 21.066 10.45 28.471 3.412C29.74 2.133 31.644 1.493 34.183 0C34.606 10.876 23.816 13.862 21.489 22.393C23.393 21.966 25.086 21.753 26.567 21.326C83.69 5.545 140.6 7.251 197.3 22.606C203.22 24.099 208.94 26.445 214.65 28.577C217.61 29.644 220.15 31.99 218.46 35.615C216.98 39.241 214.01 39.241 210.63 37.748C172.76 20.687 132.56 18.767 91.94 19.407C70.78 19.62 50.05 21.966 29.529 26.871C26.99 27.511 24.451 28.364 21.489 29.43Z"
				fill="#fde047"
			/></svg
		>
	</div>
	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 flex-row"
		style="left: 120px; bottom: 55px;"
	>
		<svg
			class="hint-arrow up-left"
			style="transform: scale(-1, -1) rotate(0deg);"
			width="45"
			height="34"
			viewBox="0 0 186 141"
			><path
				d="M97.434 112.265C100.403 109.095 104.434 105.715 107.191 101.7C112.918 93.249 118.221 84.586 123.523 75.923C133.492 59.443 143.461 42.751 154.279 24.791C140.28 29.44 129.886 41.272 113.342 38.525C114.827 35.99 115.251 33.877 116.312 33.454C132.856 26.693 147.279 16.551 160.854 5.353C172.096 -3.733 177.823 -1.197 179.308 12.537C180.792 26.904 183.762 41.272 185.883 55.639C186.307 57.964 185.459 60.499 185.247 63.457C176.126 59.231 176.126 59.231 168.49 27.749C166.793 30.496 165.308 32.609 164.036 34.722C151.521 56.485 139.219 78.247 126.281 99.799C122.038 106.771 116.948 113.321 111.221 119.026C101.04 129.168 89.798 128.745 80.253 117.97C75.375 112.476 71.769 105.715 68.587 98.954C64.981 91.347 62.648 83.107 59.467 75.289C57.133 69.796 54.164 64.514 51.407 58.809C44.831 61.344 42.286 66.204 39.316 70.641C26.802 89.446 17.469 109.518 10.47 131.069C9.621 133.605 9.197 136.352 7.712 138.676C6.864 139.944 4.531 141 2.834 141C1.985 141 0.289 138.676 0.077 137.408C-0.136 133.816 0.077 129.802 0.925 126.421C6.864 102.123 16.833 79.515 31.044 59.02C33.802 54.794 37.407 50.991 41.225 47.822C48.225 42.117 55.225 42.328 60.951 49.301C65.618 54.296 68.012 61.439 71.981 68.484C76.435 78.459 79.617 88.812 84.071 98.742C86.616 104.025 89.586 109.518 97.434 112.265Z"
				fill="#fde047"
			/></svg
		>
		<span class="hint-text mb-10">Auto role rewards<br />at level milestones</span>
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
