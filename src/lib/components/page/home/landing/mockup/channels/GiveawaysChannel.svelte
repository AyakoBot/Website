<script lang="ts">
	const ayakoAvatar =
		'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=80';

	const now = new Date();
	const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

	const formatDate = (date: Date) => {
		const day = date.getDate().toString().padStart(2, '0');
		const month = date.toLocaleString('en-US', { month: 'long' });
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${day} ${month} ${year} ${hours}:${minutes}`;
	};

	const endedDate = formatDate(now);
	const expiresDate = formatDate(tomorrow);
</script>

<!-- First Message: Ended Giveaway -->
<div class="relative flex gap-4 py-0.5">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-center gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span
				class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75"
				><span class="i-tabler-check text-2.5"></span> APP</span
			>
			<span class="text-3 text-white/25 font-400">01:42</span>
		</div>
		<!-- Embed with left border -->
		<div class="msg-embed flex rounded overflow-hidden max-w-100 mt-1">
			<div
				class="w-1 flex-shrink-0"
				style="background: linear-gradient(180deg, #f47fff 0%, #a855f7 100%);"
			></div>
			<div class="bg-[#2b2d31] p-2 px-3 pb-2 flex flex-col flex-1">
				<div class="flex items-center gap-2 text-3.25 font-600 text-white">
					<img src="{ayakoAvatar}?size=32" alt="" class="w-5 h-5 rounded-full" />
					<span>Ayako Giveaways | Ended</span>
				</div>
				<span class="font-700 text-4 text-white mt-1">1 Participants</span>
				<span class="text-3.25 text-white/60">asd</span>
				<div class="mt-1">
					<span class="block text-3.25 font-700 text-white">Possible Winners: 1</span>
					<span class="text-3.25 text-white/75"
						>End: {endedDate} <span class="text-white/50">(10 seconds ago)</span></span
					>
				</div>
				<div class="mt-1">
					<span class="block text-3.25 font-700 text-white"
						>Required Role to enter this Giveaway</span
					>
					<span class="text-3.25 text-white/75"><span class="mention">@Level 5</span></span>
				</div>
				<div class="mt-1">
					<span class="block text-3.25 font-700 text-white">Winner</span>
					<span class="text-3.25"><span class="mention">@Alex</span></span>
				</div>
				<div class="flex items-center gap-1 text-2.75 text-white/40 mt-1">
					<img
						src="https://cdn.discordapp.com/embed/avatars/3.png"
						alt=""
						class="w-4 h-4 rounded-full mr-1"
					/>
					<span>Giveaway Host: server_admin</span>
				</div>
			</div>
		</div>
		<!-- Buttons OUTSIDE the embed -->
		<div class="flex gap-2 mt-1 flex-wrap">
			<button
				class="bg-[#4f545c] text-white border-none px-3 py-1.5 rounded-sm text-3.25 cursor-pointer transition-colors inline-flex items-center gap-1.5 hover:bg-[#5d6269]"
				><span class="i-tabler-gift text-3.5"></span> Participate</button
			>
			<button
				class="bg-[#248046] text-white border-none px-3 py-1.5 rounded-sm text-3.25 cursor-pointer transition-colors hover:bg-[#1a6334]"
				>Claim</button
			>
		</div>
		<span class="text-2.5 text-white/30 mt-0.5">(edited)</span>
	</div>
</div>

<!-- Second Message: Winner Notification -->
<div class="relative flex gap-4 py-0.5 mt-2">
	<img src={ayakoAvatar} alt="Ayako" class="w-10 h-10 rounded-full flex-shrink-0 cursor-pointer" />
	<div class="flex flex-col gap-1 flex-1 min-w-0">
		<div class="flex items-center gap-2">
			<span class="font-600 text-[#b0ff00] text-3.75 cursor-pointer hover:underline">Ayako</span>
			<span
				class="inline-flex items-center gap-0.5 bg-[#5865f2] text-white text-2.5 px-1 rounded-sm font-500 h-3.75"
				><span class="i-tabler-check text-2.5"></span> APP</span
			>
			<span class="text-3 text-white/25 font-400">01:42</span>
		</div>
		<span class="text-3.25 text-white/60 mb-1"><span class="mention">@Alex</span></span>
		<!-- Embed with left border -->
		<div class="msg-embed flex rounded overflow-hidden max-w-100 mt-1">
			<div
				class="w-1 flex-shrink-0"
				style="background: linear-gradient(180deg, #f47fff 0%, #a855f7 100%);"
			></div>
			<div class="bg-[#2b2d31] p-2 px-3 pb-3 flex flex-col gap-1 flex-1">
				<div class="flex items-center gap-2 text-3.25 font-600 text-white">
					<img src="{ayakoAvatar}?size=32" alt="" class="w-5 h-5 rounded-full" />
					<span>Ayako Giveaways</span>
				</div>
				<span class="font-700 text-4 text-[#fbbf24] mt-1">Congratulations! You won a Giveaway!</span>
				<span class="text-3.25 text-white/75 mt-1"
					>Go to the Giveaway and click <code class="bg-[#1e1e1e] px-1 rounded text-2.75"
						>Claim</code
					> to claim your Prize</span
				>
				<span class="text-3.25 text-white/75"
					>Your Prize expires <span class="text-white">{expiresDate}</span>
					<span class="text-white/50">(in a day)</span></span
				>
			</div>
		</div>
		<!-- Buttons OUTSIDE the embed -->
		<div class="flex gap-2 mt-1 flex-wrap">
			<button
				class="bg-[#4f545c] text-white border-none px-3 py-1.5 rounded-sm text-3.25 cursor-pointer transition-colors inline-flex items-center gap-1.5 hover:bg-[#5d6269]"
				>Go to Giveaway <span class="i-tabler-external-link text-3"></span></button
			>
			<button
				class="bg-[#da373c] text-white border-none px-3 py-1.5 rounded-sm text-3.25 cursor-pointer transition-colors inline-flex items-center gap-1.5 hover:bg-[#a12d31]"
				><span class="i-tabler-reload text-3.5"></span> Reroll</button
			>
		</div>
	</div>
	<div
		class="hint absolute flex items-center gap-1.5 pointer-events-none z-10 flex-row-reverse"
		style="left: 150px; top: -210px;"
	>
		<span class="hint-text">Set role requirements<br />for entry</span>
		<svg class="hint-arrow down-left" width="50" height="16" viewBox="0 0 191 62"
			><path
				d="M132.822 0C152.039 8.676 169.779 16.294 187.096 24.546C191.953 26.874 192.164 30.894 188.363 35.549C186.04 38.3 183.294 41.051 180.338 43.167C172.946 48.457 165.344 53.747 157.53 58.614C154.785 60.307 151.406 60.73 147.604 62C146.337 54.594 150.983 51.843 154.574 48.881C158.375 45.707 162.598 43.167 167.033 39.993C158.797 37.666 31.876 36.607 25.329 38.724C40.112 49.304 58.907 48.034 74.113 56.075C74.113 56.922 74.113 57.98 73.901 58.826C71.367 59.672 68.622 61.154 66.299 60.942C58.485 60.307 50.46 60.096 43.28 57.768C31.031 53.959 18.994 49.092 7.378 43.802C-1.069 39.993 -2.547 32.375 4.422 26.874C15.826 17.775 28.074 10.157 40.323 2.116C41.801 1.27 44.336 1.904 48.77 1.904C40.534 13.754 28.708 17.563 19.205 27.932C72.212 27.932 123.107 27.932 174.002 27.932C172.102 26.874 169.779 25.604 167.245 24.334C157.741 19.679 148.238 15.236 138.946 10.58C134.511 8.464 134.722 8.041 132.822 0Z"
				fill="#fde047"
			/></svg
		>
	</div>
	<div
		class="hint absolute flex items-start gap-3 pointer-events-none z-10 flex-col-reverse"
		style="left: 300px; bottom: 190px;"
	>
		<svg class="hint-arrow up-left" width="55" height="15" viewBox="0 0 253 67"
   style="transform: rotate(-23deg)"

			><path
				d="M44.084 40.947C52.111 45.639 58.237 49.265 64.152 52.677C66.264 53.956 68.377 55.023 70.278 56.516C73.024 58.435 76.826 60.568 74.714 64.62C72.602 68.459 68.588 66.752 65.631 65.686C62.462 64.833 59.294 63.127 56.336 61.634C42.606 55.023 28.875 48.198 15.356 41.374C11.765 39.454 7.962 37.748 4.794 35.189C-1.966 30.071 -1.543 24.952 5.85 21.113C15.778 15.995 25.918 11.303 36.057 6.611C40.282 4.479 44.718 2.346 49.154 0.853C51.689 0 54.646 0.213 57.392 0C58.237 5.971 54.857 7.251 51.9 8.744C44.507 12.796 36.902 16.635 29.509 20.687C26.974 22.18 24.228 23.673 21.693 27.085C25.495 27.511 29.086 28.151 32.889 28.364C61.406 29.857 89.712 31.35 118.229 32.843C159.632 34.976 200.824 37.108 242.227 39.454C245.607 39.668 248.986 40.947 253 42.014C249.198 47.772 244.762 46.492 241.171 46.279C220.892 45.852 200.401 44.999 180.122 44.359C136.396 42.867 92.669 41.374 48.943 39.881C47.887 40.094 47.253 40.307 44.084 40.947Z"
				fill="#fde047"
			/></svg
		>
		<span class="hint-text">Fair winner selection<br />with automatic payout<br />on expiry</span>
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
