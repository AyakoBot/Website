<script lang="ts">
	type Sprout = { y: number; side: 1 | -1; kind: 'leaf' | 'bloom'; angle: number };

	const { class: className = '' }: { class?: string } = $props();

	let container: HTMLDivElement | undefined = $state();
	let pathEl: SVGPathElement | undefined = $state();
	let height = $state(0);
	let pathLength = $state(1);
	let progress = $state(0);

	const STEP = 260;
	const rand = (i: number, salt: number) => (((i + 1) * 2654435761 + salt * 40503) % 1000) / 1000;

	const path = $derived.by(() => {
		if (height < 200) return '';
		let d = 'M 30 0';
		let y = 0;
		let dir = 1;
		let i = 0;
		while (y < height) {
			const next = Math.min(y + STEP, height);
			const amp = 13 + rand(i, 1) * 9;
			const x = 30 + dir * amp;
			d += ` C ${x.toFixed(1)} ${(y + STEP * 0.35).toFixed(1)}, ${x.toFixed(1)} ${(
				next -
				STEP * 0.35
			).toFixed(1)}, 30 ${next.toFixed(1)}`;
			y = next;
			dir *= -1;
			i += 1;
		}
		return d;
	});

	const sprouts = $derived.by(() => {
		if (height < 200) return [] as Sprout[];
		const out: Sprout[] = [];
		let i = 0;
		for (let y = 200; y < height - 140; y += STEP * 1.3) {
			out.push({
				y: y + rand(i, 9) * 70,
				side: (i % 2 === 0 ? 1 : -1) as 1 | -1,
				kind: i % 3 === 2 ? 'bloom' : 'leaf',
				angle: 38 + rand(i, 3) * 26,
			});
			i += 1;
		}
		return out;
	});

	$effect(() => {
		if (!container) return;
		const measure = () => {
			height = container?.offsetHeight ?? 0;
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(container);
		return () => ro.disconnect();
	});

	$effect(() => {
		void path;
		if (pathEl) pathLength = Math.max(pathEl.getTotalLength(), 1);
	});

	let raf = 0;
	const update = () => {
		if (raf) return;
		raf = requestAnimationFrame(() => {
			raf = 0;
			if (!container) return;
			const rect = container.getBoundingClientRect();
			if (rect.height === 0) return;
			const tip = window.innerHeight * 0.78 - rect.top;
			progress = Math.min(Math.max(tip / rect.height, 0), 1);
		});
	};

	$effect(() => {
		update();
		return () => {
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<svelte:window onscroll={update} onresize={update} />

<div
	bind:this={container}
	aria-hidden="true"
	class="absolute inset-y-0 left-1 w-60px pointer-events-none hidden lg:block {className}"
>
	{#if path}
		<svg width="60" {height} viewBox="0 0 60 {height}" fill="none" class="overflow-visible">
			<path
				bind:this={pathEl}
				d={path}
				stroke="var(--leaf)"
				stroke-width="2"
				stroke-linecap="round"
				style="stroke-dasharray:{pathLength}; stroke-dashoffset:{pathLength * (1 - progress)};"
			/>
			{#each sprouts as sprout, i (i)}
				<g
					class="[transform-box:view-box] transition-transform duration-700 ease-[var(--ease-bloom)] motion-reduce:transition-none {sprout.y <=
					progress * height
						? 'scale-100'
						: 'scale-0 motion-reduce:scale-100'}"
					style="transform-origin: 30px {sprout.y}px;"
				>
					<g transform="rotate({sprout.side * sprout.angle} 30 {sprout.y})">
						{#if sprout.kind === 'leaf'}
							<path
								d="M30 {sprout.y} C 36 {sprout.y - 6} 38 {sprout.y - 15} 36 {sprout.y - 23} C 29 {sprout.y -
									18} 28 {sprout.y - 8} 30 {sprout.y} Z"
								stroke="var(--leaf)"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
							<path
								d="M31 {sprout.y - 3} C 32.5 {sprout.y - 9} 33.5 {sprout.y - 14} 34.5 {sprout.y - 19}"
								stroke="var(--leaf)"
								stroke-width="0.8"
								opacity="0.55"
							/>
						{:else}
							<path
								d="M30 {sprout.y} C 30.5 {sprout.y - 4} 30.5 {sprout.y - 7} 30 {sprout.y - 10}"
								stroke="var(--leaf)"
								stroke-width="1.3"
								stroke-linecap="round"
							/>
							<circle cx="30" cy={sprout.y - 14} r="4" stroke="var(--blossom)" stroke-width="1.4" />
							<circle cx="30" cy={sprout.y - 14} r="1" fill="var(--blossom)" />
							<circle cx="30" cy={sprout.y - 20.5} r="1.1" fill="var(--blossom)" opacity="0.75" />
							<circle cx="36" cy={sprout.y - 16} r="1.1" fill="var(--blossom)" opacity="0.75" />
							<circle cx="33.5" cy={sprout.y - 8.5} r="1.1" fill="var(--blossom)" opacity="0.75" />
							<circle cx="26.5" cy={sprout.y - 8.5} r="1.1" fill="var(--blossom)" opacity="0.75" />
							<circle cx="24" cy={sprout.y - 16} r="1.1" fill="var(--blossom)" opacity="0.75" />
						{/if}
					</g>
				</g>
			{/each}
		</svg>
	{/if}
</div>
