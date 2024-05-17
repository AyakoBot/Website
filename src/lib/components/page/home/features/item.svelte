<script lang="ts">
	export let subtitle: string;
	export let title: string;
	export let img: string;
	export let placeholder: string;

	const subtitleArgs = subtitle.split(/\s/g);
	let isHovering = false;
	let isShowing = false;

	let subtitleElements: HTMLElement[] = [];
	let imgElement: HTMLElement;
	let placeholderElement: HTMLElement;
	let hoverMeText: HTMLElement;
	let timeout: NodeJS.Timeout;

	const hoverE = () => {
		clearTimeout(timeout);
		isHovering = true;
		if (isShowing) return;
		isShowing = true;

		[...subtitleElements, imgElement].forEach((subtitle, i) => {
			subtitle.animate(
				[
					{ opacity: 0, transform: 'translateY(40%)' },
					{ opacity: 1, transform: 'translateY(0)' },
				],
				{
					duration: 300,
					easing: 'cubic-bezier(0.9, 0.06, 0.15, 0.9)',
					delay: i * 70,
					fill: 'forwards',
				},
			);
		});

		[placeholderElement, hoverMeText].forEach((e) =>
			e.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: 300,
				easing: 'cubic-bezier(0.9, 0.06, 0.15, 0.9)',
				fill: 'forwards',
			}),
		);
	};

	const unhoverE = () => {
		isHovering = false;

		timeout = setTimeout(() => {
			if (isHovering) return;
			isShowing = false;

			[...subtitleElements, imgElement].forEach((s, i) => {
				s.animate(
					[
						{ opacity: 1, transform: 'translateY(0)' },
						{ opacity: 0, transform: 'translateY(40%)' },
					],
					{
						duration: 300,
						easing: 'cubic-bezier(0.9, 0.06, 0.15, 0.9)',
						delay: i * 50,
						fill: 'forwards',
					},
				);
			});

			[placeholderElement, hoverMeText].forEach((e) =>
				e.animate([{ opacity: 0 }, { opacity: 1 }], {
					duration: 300,
					easing: 'cubic-bezier(0.9, 0.06, 0.15, 0.9)',
					fill: 'forwards',
					delay: (subtitleArgs.length + 1) * 70,
				}),
			);
		}, 1500);
	};
</script>

<div
	class="bg-fancy max-w-100 h-150
 hover:border-op-0"
	on:mouseover={hoverE}
	on:mouseleave={unhoverE}
	on:focus={hoverE}
	on:blur={unhoverE}
	role="tooltip"
 aria-label="{title}"
>
	<div class="flex justify-between items-center flex-col m-auto h-full">
		<h1 class="text-xl">
			{title}
		</h1>
		<h2>
			{#each subtitleArgs as arg, i (i)}
				<span
					class="inline-block relative translate-y-[40%] transition-none op-0 text-lg"
					bind:this={subtitleElements[i]}>{arg}&nbsp;</span
				>
			{/each}
  </h2>

		<img
			bind:this={imgElement}
			src="https://cdn.ayakobot.com/website_assets/{img}"
			class="rounded-2xl op-0 box-shadow-main"
			width="95%"
			alt="Feature Preview"
			loading="lazy"
		/>

		<img
			bind:this={placeholderElement}
			src="https://cdn.ayakobot.com/website_assets/{placeholder}"
			class="rounded-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-20"
			width="264"
			alt="Feature Placeholder"
			loading="lazy"
		/>

		<div
			bind:this={hoverMeText}
			class="text-sm text-neutral-300/75 justify-self-end absolute bottom-0"
		>
			Hover/Tap
		</div>
	</div>
</div>
