<script lang="ts">
	const {
		name,
		size = 34,
	}: {
		name:
			| 'moderation'
			| 'security'
			| 'leveling'
			| 'roles'
			| 'logging'
			| 'welcome'
			| 'giveaways'
			| 'suggestions'
			| 'economy'
			| 'roleplay'
			| 'utility'
			| 'power'
			| 'ticket'
			| 'relay'
			| 'lens';
		size?: number;
	} = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 32 32"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#if name === 'moderation'}
		<!-- shield with a leaf vein -->
		<path d="M16 3.5 L26.5 7.5 V16 C26.5 22 22 26.5 16 28.5 C10 26.5 5.5 22 5.5 16 V7.5 Z" />
		<path d="M16 10 V23" stroke-width="1.3" />
		<path d="M16 14 C13.5 13.5 12 12 11.5 10" stroke-width="1.3" />
		<path d="M16 18 C18.5 17.5 20 16 20.5 14" stroke-width="1.3" />
	{:else if name === 'security'}
		<!-- padlock budding a sprout -->
		<rect x="8.5" y="14" width="15" height="12.5" rx="2.5" />
		<path d="M11.5 14 V10.5 a4.5 4.5 0 0 1 9 0 V14" />
		<path d="M16 19 V23" stroke-width="1.4" />
		<path d="M16 20.5 C14.5 20 13.7 19 13.5 17.8 C15 18.1 15.8 19.2 16 20.5 Z" stroke-width="1.2" />
	{:else if name === 'leveling'}
		<!-- vine climbing ascending trellis -->
		<path d="M6 27 V21" />
		<path d="M12.5 27 V16" />
		<path d="M19 27 V11.5" />
		<path d="M25.5 27 V7" />
		<path d="M5 27 C12 25 20 18 25.5 8.5" stroke-width="1.3" />
		<path d="M25.5 8.5 C26.8 7.2 27.2 5.8 27 4.5 C25.5 5 24.6 6.3 24.5 8" stroke-width="1.3" />
	{:else if name === 'roles'}
		<!-- plant label tag with stem -->
		<path d="M5.5 13 L13.5 5.5 H26 V18 L18 25.5 L5.5 13 Z" />
		<circle cx="21.5" cy="10.5" r="1.8" stroke-width="1.4" />
		<path d="M10 18.5 C12 20.5 14 22.5 15.5 24" stroke-width="1.2" />
	{:else if name === 'logging'}
		<!-- open field ledger -->
		<path
			d="M5.5 7.5 C9.5 5.5 13.5 6.5 16 8.5 C18.5 6.5 22.5 5.5 26.5 7.5 V24.5 C22.5 22.5 18.5 23.5 16 25.5 C13.5 23.5 9.5 22.5 5.5 24.5 Z"
		/>
		<path d="M16 8.5 V25.5" stroke-width="1.3" />
		<path d="M9 12 H13" stroke-width="1.2" />
		<path d="M9 15.5 H13" stroke-width="1.2" />
		<path d="M19 12 H23" stroke-width="1.2" />
	{:else if name === 'welcome'}
		<!-- garden gate arch with bloom -->
		<path d="M7 27 V14 a9 9 0 0 1 18 0 V27" />
		<path d="M7 20 H25" stroke-width="1.3" />
		<path d="M16 27 V20" stroke-width="1.3" />
		<circle cx="16" cy="11" r="2.4" stroke-width="1.4" />
		<circle cx="16" cy="7.2" r="0.7" fill="currentColor" stroke="none" />
		<circle cx="19.6" cy="9.8" r="0.7" fill="currentColor" stroke="none" />
		<circle cx="12.4" cy="9.8" r="0.7" fill="currentColor" stroke="none" />
	{:else if name === 'giveaways'}
		<!-- wrapped seed parcel -->
		<rect x="7" y="13" width="18" height="13.5" rx="1.5" />
		<path d="M5.5 9.5 H26.5 V13 H5.5 Z" />
		<path d="M16 9.5 V26.5" stroke-width="1.3" />
		<path d="M16 9 C12.5 8.5 11 6.5 11.5 4.5 C14 4.8 15.6 6.6 16 9 Z" stroke-width="1.3" />
		<path d="M16 9 C19.5 8.5 21 6.5 20.5 4.5 C18 4.8 16.4 6.6 16 9 Z" stroke-width="1.3" />
	{:else if name === 'suggestions'}
		<!-- tulip-bulb lamp -->
		<path
			d="M16 4.5 a7.5 7.5 0 0 1 7.5 7.5 c0 3.2 -2.1 4.9 -3.2 7 H11.7 c-1.1 -2.1 -3.2 -3.8 -3.2 -7 A7.5 7.5 0 0 1 16 4.5 Z"
		/>
		<path d="M13 23 H19" stroke-width="1.4" />
		<path d="M14 26.5 H18" stroke-width="1.4" />
		<path d="M16 19 V13" stroke-width="1.2" />
		<path d="M16 14.5 C14.5 14 13.8 12.8 13.8 11.5 C15.2 12 16 13 16 14.5 Z" stroke-width="1.2" />
		<path d="M16 14.5 C17.5 14 18.2 12.8 18.2 11.5 C16.8 12 16 13 16 14.5 Z" stroke-width="1.2" />
	{:else if name === 'economy'}
		<!-- coin minted with a bloom -->
		<circle cx="16" cy="16" r="11.5" />
		<circle cx="16" cy="16" r="8.5" stroke-width="1" opacity="0.5" />
		<circle cx="16" cy="16" r="2.2" stroke-width="1.4" />
		<path d="M16 13.8 V10.5" stroke-width="1.3" />
		<path d="M18.1 14.9 L20.4 12.6" stroke-width="1.3" />
		<path d="M18.1 17.1 L20.4 19.4" stroke-width="1.3" />
		<path d="M16 18.2 V21.5" stroke-width="1.3" />
		<path d="M13.9 17.1 L11.6 19.4" stroke-width="1.3" />
		<path d="M13.9 14.9 L11.6 12.6" stroke-width="1.3" />
	{:else if name === 'roleplay'}
		<!-- heart with a sparkle -->
		<path
			d="M16 26.5 C 9.5 21.5 5.5 17.5 5.5 12.4 A 5.6 5.6 0 0 1 16 9.4 A 5.6 5.6 0 0 1 26.5 12.4 C 26.5 15.2 25.3 17.6 23.2 19.9"
		/>
		<path d="M16 26.5 C 17.6 25.3 19.1 24.1 20.4 22.9" stroke-width="1.4" />
		<path d="M25 4 V9" stroke-width="1.4" />
		<path d="M22.5 6.5 H27.5" stroke-width="1.4" />
		<circle cx="13" cy="14" r="0.8" fill="currentColor" stroke="none" />
	{:else if name === 'utility'}
		<!-- compass rose flower -->
		<circle cx="16" cy="16" r="11" />
		<path d="M16 6.5 V9" stroke-width="1.2" />
		<path d="M16 23 V25.5" stroke-width="1.2" />
		<path d="M6.5 16 H9" stroke-width="1.2" />
		<path d="M23 16 H25.5" stroke-width="1.2" />
		<path d="M19.5 11 L17.4 16.6 L12.5 21 L14.6 15.4 Z" stroke-width="1.5" />
		<circle cx="16" cy="16" r="1.1" fill="currentColor" stroke="none" />
	{:else if name === 'power'}
		<!-- key sprouting a leaf: your own bot, your own garden -->
		<circle cx="10" cy="11" r="4.8" />
		<circle cx="10" cy="11" r="1.4" stroke-width="1.3" />
		<path d="M13.5 14.5 L24.5 25.5" />
		<path d="M21 22 L18.8 24.2" stroke-width="1.5" />
		<path d="M24.5 25.5 L22.8 27.2" stroke-width="1.5" />
		<path
			d="M18 16 C 20 13.2 23.2 12 26.3 12.6 C 25.3 15.6 22.4 17.4 18.8 16.8 Z"
			stroke-width="1.4"
		/>
		<path d="M19 16.2 C 21 15 23 14 25 13.5" stroke-width="0.8" opacity="0.55" />
	{:else if name === 'ticket'}
		<!-- herbarium specimen tag: torn perforation, punched hole, tendril string with leaf -->
		<path d="M10.7 8.6 L25.6 9.3 L26.2 25.8 L11.2 26.6" />
		<path
			d="M10.6 9.6 L10.2 11.6 M10.9 13.4 L10.4 15.5 M10.3 17.3 L10.8 19.3 M10.6 21.1 L10.3 23.2 M10.9 24.8 L11.1 26.3"
			stroke-width="1.5"
		/>
		<circle cx="14.8" cy="12.3" r="1.6" stroke-width="1.5" />
		<path
			d="M13.7 11.2 C12.2 8.6 10 6.9 7.3 6.6 C5.1 6.4 4.3 8.1 5.5 9.3 C6.7 10.4 8.3 9.6 7.9 8"
			stroke-width="1.5"
		/>
		<path d="M14.6 10.9 C13.4 8.9 11.6 7.4 9.4 6.8" stroke-width="0.8" opacity="0.55" />
		<path d="M10.8 7.4 C11 5.7 12.4 4.7 14.2 4.9 C13.9 6.7 12.6 7.7 10.8 7.4 Z" stroke-width="1.3" />
		<path d="M13.8 17.6 L23 17.3 M13.8 21.3 L20.6 21.1" stroke-width="1.2" />
	{:else if name === 'relay'}
		<!-- two-way relay: opposed envelopes grafted onto one vine, a leaf on each half -->
		<rect x="3.5" y="4.5" width="10" height="7" rx="1" />
		<path d="M3.9 5.1 L8.7 8.4 L13.1 5.1" stroke-width="1.3" />
		<rect x="18.5" y="20.5" width="10" height="7" rx="1" />
		<path d="M18.9 26.9 L23.3 23.7 L28.1 26.9" stroke-width="1.3" />
		<path d="M11.8 11.9 C13.5 15.5 18.6 16.5 20.3 20.1" stroke-width="1.5" />
		<path
			d="M14.1 14.6 C15.2 12.8 17.2 12 19.3 12.4 C18.6 14.3 16.6 15.3 14.5 14.9 Z"
			stroke-width="1.3"
		/>
		<path
			d="M18 17.5 C16.8 19.2 14.8 20 12.8 19.6 C13.5 17.7 15.4 16.7 17.6 17.1 Z"
			stroke-width="1.3"
		/>
		<path d="M14.6 14.3 C16 13.5 17.4 13 18.8 12.8" stroke-width="0.8" opacity="0.55" />
	{:else if name === 'lens'}
		<!-- botanist's hand loupe: turned wooden handle, crosshair, leaf specimen under glass -->
		<circle cx="13" cy="12.5" r="8" />
		<path
			d="M17.9 19.6 C 20.2 22.4 23 24.7 25.5 26.9 C 26.9 27.5 27.8 26.3 27.1 25.1 C 24.8 22.6 22.4 20.2 20.1 17.4"
		/>
		<path d="M17.9 19.6 L20.1 17.4" stroke-width="1.5" />
		<path
			d="M8.8 15.2 C 8.5 12.5 10.1 10.3 12.9 9.6 C 13.3 12.3 11.7 14.5 8.8 15.2 Z"
			stroke-width="1.4"
		/>
		<path d="M9.5 14.4 C 10.5 12.9 11.5 11.4 12.5 10.2" stroke-width="0.8" opacity="0.55" />
		<path d="M7.4 12.9 C 11 12.4 15 12.4 18.6 12.9" stroke-width="0.8" opacity="0.55" />
		<path d="M13.3 6.6 C 12.8 10.5 12.8 14.5 13.3 18.4" stroke-width="0.8" opacity="0.55" />
	{/if}
</svg>
