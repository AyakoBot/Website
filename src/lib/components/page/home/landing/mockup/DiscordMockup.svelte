<script lang="ts">
	import Sprig from '$lib/components/design/Sprig.svelte';
	import Tape from '$lib/components/design/Tape.svelte';
	import GeneralChannel from './channels/GeneralChannel.svelte';
	import GiveawaysChannel from './channels/GiveawaysChannel.svelte';
	import LevelingChannel from './channels/LevelingChannel.svelte';
	import LogsChannel from './channels/LogsChannel.svelte';
	import ModCmdsChannel from './channels/ModCmdsChannel.svelte';
	import WelcomeChannel from './channels/WelcomeChannel.svelte';

	type Channel = 'welcome' | 'general' | 'mod-cmds' | 'logs' | 'giveaways' | 'leveling';
	let activeChannel = $state<Channel>('welcome');
</script>

<div
	class="relative z-1 overflow-visible w-full mx-auto 2xl:w-2/3 3xl:w-auto 3xl:mx-0 lt-md:scale-65 lt-md:origin-top-left lt-md:w-[calc(100%/0.65)] lt-md:mb-[-13.5rem] lt-xs:scale-50 lt-xs:w-[calc(100%/0.5)] lt-xs:mb-[-19rem]"
>
	<figure class="relative m-0 [animation:fade-up_0.7s_var(--ease-organic)_0.3s_both]">
		<!-- Click to explore hint, scribbled in the margin above the photograph -->
		<div
			class="absolute -left-5 lg:left-10 top--15 z-25 flex flex-row items-start gap-1 pointer-events-none"
		>
			<span
				class="[font-family:'Caveat','Comic_Neue',cursive] text-[17px] font-600 text-[#fde047] leading-[1.2] whitespace-nowrap [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,0.9),0_0_32px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,1)] lg:text-6!"
				>Click channels<br />to explore!</span
			>
			<svg
				class="mt-8 block [filter:drop-shadow(0_0_4px_rgba(0,0,0,1))_drop-shadow(0_0_8px_rgba(0,0,0,0.9))_drop-shadow(0_2px_4px_rgba(0,0,0,1))]"
				width="40"
				height="48"
				viewBox="0 0 122 148"
				aria-hidden="true"
				><path
					d="M0 345.65C6.14938 341.626 12.2988 342.897 17.812 344.803C25.4458 347.557 32.8674 351.157 39.6529 355.393C70.3998 375.727 88.8479 404.744 96.4816 440.539C98.39 449.647 99.0262 459.178 100.299 469.556C108.78 464.685 113.233 455.154 121.715 449.647C122.776 453.883 120.655 456.636 118.959 458.966C111.961 468.497 104.752 478.028 97.3299 487.348C93.7251 491.796 90.9684 492.219 87.1515 488.407C79.0937 480.57 74.2167 471.039 72.7323 460.025C72.7323 459.601 73.3684 458.966 74.2166 457.907C83.3347 460.237 81.2142 471.886 89.06 476.122C92.4527 461.508 89.9082 447.529 86.0913 433.973C82.0624 419.782 76.7612 406.227 68.2793 394.154C60.0095 382.293 49.6191 372.761 38.1686 363.866C26.93 354.758 14.2072 349.039 0 345.65Z"
					fill="#fde047"
					transform="translate(0,-343)"
				/></svg
			>
		</div>

		<!-- the photograph of Discord, framed and taped into the journal -->
		<div
			class="relative bg-paper min-w-160 shadow-press-lg border-10 border-solid border-paper [outline:1px_solid_rgba(44,38,24,0.2)] rotate-[-1.2deg] [transition:transform_0.5s_var(--ease-organic)] hover:rotate-0"
		>
			<Tape angle={-7} width={88} class="-top-3 left-4 lg:left-8" />
			<Tape angle={6} width={88} class="-top-3 right-4 lg:right-8" />

			<div class="discord-mockup bg-[#313338] rounded-lg min-w-155 text-left">
				<!-- Titlebar -->
				<div class="flex justify-between items-center pl-3 bg-[#1e1f22] h-5.5">
					<div class="flex items-center gap-1.5">
						<img
							src="https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=32"
							alt=""
							class="w-3.5 h-3.5 rounded-full"
						/>
						<span class="text-2.75 text-white/50 font-400">Discord</span>
					</div>
					<div class="flex h-full">
						<div
							class="w-11.5 h-full flex items-center justify-center text-white/60 transition-colors text-2.5 hover:bg-white/10"
						>
							<span class="i-tabler-minus text-xs"></span>
						</div>
						<div
							class="w-11.5 h-full flex items-center justify-center text-white/60 transition-colors text-2.5 hover:bg-white/10"
						>
							<span class="i-tabler-square text-xs"></span>
						</div>
						<div
							class="w-11.5 h-full flex items-center justify-center text-white/60 transition-colors text-2.5 hover:bg-[#e81123] hover:text-white"
						>
							<span class="i-tabler-x text-xs"></span>
						</div>
					</div>
				</div>

				<div class="flex h-130">
					<!-- Server Sidebar -->
					<div
						class="hidden lg:flex w-18 bg-[#1e1f22] pt-3 px-3 flex-col items-center gap-2 flex-shrink-0"
					>
						<div
							class="w-12 h-12 rounded-full bg-[#313338] flex items-center justify-center text-[#dbdee1] transition-all cursor-pointer overflow-hidden hover:rounded-4 hover:bg-[#5865f2] hover:text-white"
						>
							<span class="i-tabler-brand-discord-filled text-2xl"></span>
						</div>
						<div class="w-8 h-0.5 bg-white/6 rounded-sm my-1"></div>
						<div
							class="w-12 h-12 rounded-4 bg-[#313338] flex items-center justify-center text-[#dbdee1] transition-all cursor-pointer overflow-hidden"
						>
							<img
								src="https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=128"
								alt="Ayako"
								class="w-full h-full object-cover"
							/>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-[#313338] flex items-center justify-center text-[#dbdee1] transition-all cursor-pointer overflow-hidden hover:rounded-4 hover:bg-[#5865f2] hover:text-white"
						>
							<span class="font-600 text-4.5">A</span>
						</div>
						<div class="w-8 h-0.5 bg-white/6 rounded-sm my-1"></div>
						<div
							class="w-12 h-12 rounded-full bg-[#313338] flex items-center justify-center text-[#dbdee1] transition-all cursor-pointer overflow-hidden hover:rounded-4 hover:bg-[#23a559] hover:text-white"
						>
							<span class="i-tabler-plus text-xl"></span>
						</div>
						<div
							class="w-12 h-12 rounded-full bg-[#313338] flex items-center justify-center text-[#dbdee1] transition-all cursor-pointer overflow-hidden hover:rounded-4 hover:bg-[#23a559] hover:text-white"
						>
							<span class="i-tabler-compass text-xl"></span>
						</div>
					</div>

					<!-- Channel List -->
					<div class="w-40 lg:w-60 bg-[#2b2d31] flex flex-col flex-shrink-0">
						<div
							class="px-4 font-600 text-3.75 text-white flex items-center justify-between h-12 border-b border-black/24 cursor-pointer transition-colors hover:bg-black/16"
						>
							<span class="text-3.75 font-600 whitespace-nowrap overflow-hidden text-ellipsis"
								>Your Server</span
							>
							<span class="i-tabler-chevron-down text-xs op-70"></span>
						</div>
						<div
							class="flex items-center gap-1 py-4 px-4 pb-1 text-2.75 font-700 text-white/40 uppercase tracking-wide cursor-pointer hover:text-white/60"
						>
							<span class="i-tabler-chevron-down text-xs"></span>
							<span>WELCOME</span>
						</div>
						<button
							class="flex items-center gap-1.5 py-1.5 px-2 mx-2 my-px rounded text-3.75 cursor-pointer transition-all bg-none border-none w-[calc(100%-16px)] text-left font-inherit {activeChannel ===
							'welcome'
								? 'bg-white/6 text-white'
								: 'text-white/40 hover:bg-white/4 hover:text-white/80'}"
							onclick={() => (activeChannel = 'welcome')}
						>
							<span class="i-tabler-hash text-4.5 {activeChannel === 'welcome' ? 'op-100' : 'op-70'}"
							></span>
							<span>welcome</span>
						</button>
						<div
							class="flex items-center gap-1 py-4 px-4 pb-1 text-2.75 font-700 text-white/40 uppercase tracking-wide cursor-pointer hover:text-white/60"
						>
							<span class="i-tabler-chevron-down text-xs"></span>
							<span>COMMUNITY</span>
						</div>
						<button
							class="flex items-center gap-1.5 py-1.5 px-2 mx-2 my-px rounded text-3.75 cursor-pointer transition-all bg-none border-none w-[calc(100%-16px)] text-left font-inherit {activeChannel ===
							'general'
								? 'bg-white/6 text-white'
								: 'text-white/40 hover:bg-white/4 hover:text-white/80'}"
							onclick={() => (activeChannel = 'general')}
						>
							<span class="i-tabler-hash text-4.5 {activeChannel === 'general' ? 'op-100' : 'op-70'}"
							></span>
							<span>general</span>
						</button>
						<button
							class="flex items-center gap-1.5 py-1.5 px-2 mx-2 my-px rounded text-3.75 cursor-pointer transition-all bg-none border-none w-[calc(100%-16px)] text-left font-inherit {activeChannel ===
							'leveling'
								? 'bg-white/6 text-white'
								: 'text-white/40 hover:bg-white/4 hover:text-white/80'}"
							onclick={() => (activeChannel = 'leveling')}
						>
							<span class="i-tabler-hash text-4.5 {activeChannel === 'leveling' ? 'op-100' : 'op-70'}"
							></span>
							<span>leveling</span>
						</button>
						<button
							class="flex items-center gap-1.5 py-1.5 px-2 mx-2 my-px rounded text-3.75 cursor-pointer transition-all bg-none border-none w-[calc(100%-16px)] text-left font-inherit {activeChannel ===
							'giveaways'
								? 'bg-white/6 text-white'
								: 'text-white/40 hover:bg-white/4 hover:text-white/80'}"
							onclick={() => (activeChannel = 'giveaways')}
						>
							<span class="i-tabler-hash text-4.5 {activeChannel === 'giveaways' ? 'op-100' : 'op-70'}"
							></span>
							<span>giveaways</span>
						</button>
						<div
							class="flex items-center gap-1 py-4 px-4 pb-1 text-2.75 font-700 text-white/40 uppercase tracking-wide cursor-pointer hover:text-white/60"
						>
							<span class="i-tabler-chevron-down text-xs"></span>
							<span>MODERATION</span>
						</div>
						<button
							class="flex items-center gap-1.5 py-1.5 px-2 mx-2 my-px rounded text-3.75 cursor-pointer transition-all bg-none border-none w-[calc(100%-16px)] text-left font-inherit {activeChannel ===
							'mod-cmds'
								? 'bg-white/6 text-white'
								: 'text-white/40 hover:bg-white/4 hover:text-white/80'}"
							onclick={() => (activeChannel = 'mod-cmds')}
						>
							<span class="i-tabler-hash text-4.5 {activeChannel === 'mod-cmds' ? 'op-100' : 'op-70'}"
							></span>
							<span>mod-cmds</span>
						</button>
						<button
							class="flex items-center gap-1.5 py-1.5 px-2 mx-2 my-px rounded text-3.75 cursor-pointer transition-all bg-none border-none w-[calc(100%-16px)] text-left font-inherit {activeChannel ===
							'logs'
								? 'bg-white/6 text-white'
								: 'text-white/40 hover:bg-white/4 hover:text-white/80'}"
							onclick={() => (activeChannel = 'logs')}
						>
							<span class="i-tabler-hash text-4.5 {activeChannel === 'logs' ? 'op-100' : 'op-70'}"></span>
							<span>logs</span>
						</button>
						<div class="mt-auto flex items-center gap-2 p-2 bg-[#232428]">
							<img
								src="https://cdn.discordapp.com/embed/avatars/0.png"
								alt=""
								class="w-8 h-8 rounded-full"
							/>
							<div class="flex-1 flex flex-col min-w-0">
								<span class="text-3.25 font-600 text-white">You</span>
								<span class="text-2.75 text-white/40">Online</span>
							</div>
							<div class="flex gap-1 text-white/50">
								<span
									class="i-tabler-microphone text-lg p-1 rounded cursor-pointer transition-all hover:bg-white/10 hover:text-white/80"
								></span>
								<span
									class="i-tabler-headphones text-lg p-1 rounded cursor-pointer transition-all hover:bg-white/10 hover:text-white/80"
								></span>
								<span
									class="i-tabler-settings text-lg p-1 rounded cursor-pointer transition-all hover:bg-white/10 hover:text-white/80"
								></span>
							</div>
						</div>
					</div>

					<!-- Chat Area -->
					<div class="flex-1 flex flex-col bg-[#313338] min-w-0">
						<div class="flex items-center gap-2 px-4 border-b border-black/24 h-12 flex-shrink-0">
							<span class="i-tabler-hash op-60"></span>
							<span class="font-600 text-3.75 text-white">{activeChannel}</span>
							<div class="ml-auto flex items-center gap-4">
								<span class="i-tabler-bell text-lg op-60"></span>
								<span class="i-tabler-pin text-lg op-60"></span>
								<span class="i-tabler-users text-lg op-60"></span>
								<div class="flex items-center gap-1 bg-[#1e1f22] px-2 py-1 rounded text-3 text-white/30">
									<span>Search</span>
									<span class="i-tabler-search text-sm"></span>
								</div>
							</div>
						</div>
						<div class="flex-1 p-4 pb-2 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
							{#if activeChannel === 'welcome'}
								<WelcomeChannel />
							{:else if activeChannel === 'general'}
								<GeneralChannel />
							{:else if activeChannel === 'mod-cmds'}
								<ModCmdsChannel />
							{:else if activeChannel === 'logs'}
								<LogsChannel />
							{:else if activeChannel === 'giveaways'}
								<GiveawaysChannel />
							{:else if activeChannel === 'leveling'}
								<LevelingChannel />
							{/if}
						</div>
						<div class="flex items-center gap-4 mx-4 mb-6 px-4 bg-[#383a40] rounded-lg h-11">
							<span class="i-tabler-circle-plus text-xl op-40"></span>
							<span class="flex-1 text-white/30 text-3.75">Message #{activeChannel}</span>
							<div class="flex gap-2">
								<span class="i-tabler-gift text-xl op-40"></span>
								<span class="i-tabler-sticker text-xl op-40"></span>
								<span class="i-tabler-mood-smile text-xl op-40"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<figcaption
			class="annotation flex items-center justify-center gap-2.5 text-center min-w-160 mt-5"
		>
			<Sprig size={26} color="var(--leaf-soft)" class="shrink-0" />
			<span>Fig. 2 - Ayako at work in a real server. Click the channels to explore!</span>
		</figcaption>
	</figure>
</div>
