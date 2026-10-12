<script lang="ts">
	import BotMessage from '../parts/BotMessage.svelte';
	import Button from '../parts/Button.svelte';
	import Container from '../parts/Container.svelte';
	import Note from '../parts/Note.svelte';
</script>

<!--
	The reminder Ayako | Bump Reminders posts when the cooldown ends, built from its code
	(bumpReminders/Classes/Bumps.ts fire, Language/en-GB.json), with the DISBOARD template.
	No capture exists for this one. The ping sits above the container, which has no accent.
-->
<div class="relative">
	<BotMessage name="Ayako | Bump Reminders" time="16:30">
		<span class="text-3.5"><span class="mention">@Bump Squad</span></span>
		<Container>
			<span class="text-4 font-700 text-white">DISBOARD Bump Reminder</span>
			<span>You can now bump this server again!</span>
			<span>Please type <span class="mention">/bump</span></span>
			<span class="text-3 text-white/55"
				>If the bump bot doesn't respond with a bump confirmation, click the button below.</span
			>
			<div><Button>Mark Server as bumped</Button></div>
		</Container>
	</BotMessage>

	<Note left={270} top={34} angle={-10}>Pings the bump role<br />when the cooldown ends</Note>
	<Note left={250} bottom={-40} angle={25}>DISBOARD, Carl-bot and<br />D-ify.net templates</Note>
</div>
