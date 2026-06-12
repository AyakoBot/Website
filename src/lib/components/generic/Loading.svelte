<!-- a seed sprouting on the page: stem draws up, leaves unfold, a bloom opens -->
<div class="m-15 flex justify-center items-center" role="status" aria-label="Loading...">
	<svg
		class="[animation:seed-cycle_2.8s_var(--ease-organic)_infinite]"
		width="80"
		height="80"
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<!-- soil line + seed -->
		<path
			d="M26 73.5 Q40 70.5 54 73.5"
			stroke="var(--ink-faint)"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<ellipse cx="40" cy="71" rx="3.5" ry="2.4" fill="var(--ink-soft)" />

		<!-- stem -->
		<path
			class="[stroke-dasharray:60] [stroke-dashoffset:0] [animation:stem-draw_2.8s_var(--ease-organic)_infinite]"
			d="M40 71 C40 62 38.5 54 40 46 C41.5 38 40 31 40 24"
			stroke="var(--leaf)"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			pathLength="60"
		/>

		<!-- leaves -->
		<path
			class="[transform-origin:40px_52px] [animation:leaf-unfold_2.8s_var(--ease-bloom)_infinite]"
			d="M40 52 C33 51 28.5 46 27 39.5 C33.5 41 38.5 45.5 40 52 Z"
			fill="var(--leaf-soft)"
			stroke="var(--leaf)"
			stroke-width="1"
			stroke-linejoin="round"
		/>
		<path
			class="[transform-origin:40px_44px] [animation:leaf-unfold-late_2.8s_var(--ease-bloom)_infinite]"
			d="M40 44 C47 43 51.5 38 53 31.5 C46.5 33 41.5 37.5 40 44 Z"
			fill="var(--leaf-soft)"
			stroke="var(--leaf)"
			stroke-width="1"
			stroke-linejoin="round"
		/>

		<!-- bloom -->
		<g class="[transform-origin:40px_22px] [animation:bloom-open_2.8s_var(--ease-bloom)_infinite]">
			<circle cx="40" cy="17.5" r="3.2" fill="var(--petal-soft)" stroke="var(--petal)" />
			<circle cx="44.3" cy="20.6" r="3.2" fill="var(--petal-soft)" stroke="var(--petal)" />
			<circle cx="42.6" cy="25.6" r="3.2" fill="var(--petal-soft)" stroke="var(--petal)" />
			<circle cx="37.4" cy="25.6" r="3.2" fill="var(--petal-soft)" stroke="var(--petal)" />
			<circle cx="35.7" cy="20.6" r="3.2" fill="var(--petal-soft)" stroke="var(--petal)" />
			<circle cx="40" cy="22" r="2.2" fill="var(--gold)" />
		</g>
	</svg>
</div>
