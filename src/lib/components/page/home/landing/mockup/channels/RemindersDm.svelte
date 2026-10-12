<script lang="ts">
	import BotMessage from '../parts/BotMessage.svelte';
	import Note from '../parts/Note.svelte';

	const foxAvatar =
		'https://cdn.discordapp.com/avatars/650691698409734151/9ca4ad70d8ef529d31a3ec03923bddcb.webp?size=128';
</script>

<!--
	The DM Ayako | Reminders sends when a reminder is due: plain text, the note as a
	block quote, no buttons (reminders/Classes/Reminder.ts fire, Language/en-GB.json).
-->
<div class="flex flex-col gap-1 pb-3 border-b border-white/6">
	<img src={foxAvatar} alt="" class="w-20 h-20 rounded-full mb-2" />
	<span class="text-7 font-700 text-white leading-tight">Ayako | Reminders</span>
	<span class="text-3.5 text-white/55"
		>This is the beginning of your direct message history with <strong class="text-white/80"
			>Ayako | Reminders</strong
		>.</span
	>
</div>

<div class="relative">
	<BotMessage name="Ayako | Reminders" time="09:00">
		<span class="text-3.5 text-[#dbdee1]">Your Reminder has ended:</span>
		<span class="border-l-4 border-[#4e5058] rounded-sm pl-3 text-3.5 text-[#dbdee1]"
			>Call the dentist back</span
		>
	</BotMessage>

	<Note left={250} top={24} angle={-10}>Your note comes<br />back as a DM</Note>
</div>
