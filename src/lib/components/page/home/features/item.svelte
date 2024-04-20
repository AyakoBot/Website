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

	const hovering = (hovers: boolean) => {
		if (hovers) {
			isHovering = hovers;
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
		} else {
			isHovering = hovers;

			setTimeout(() => {
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
		}
	};
</script>

<div
	class="border-solid border-4 relative border-orange-700 rounded-2xl cursor-pointer duration-1000 transition-all max-w-100 h-150 text-shadow text-shadow-color-black text-shadow-md
 before:content-[''] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:[background-image:linear-gradient(130deg,_transparent_0%_33%,_rgb(236,64,122)_66%,_rgb(253,196,53)_100%)]
 before:bg-[length:300%_300%] before:bg-[0%_0%] before:transition-all before:duration-1000 before:ease-in-out before:z-1 before:ease-in-out before:duration-1000 before:rounded-2xl
 hover:before:bg-[position:100%_100%] hover:before:border-transparent hover:before:scale-x-108 hover:before:scale-y-103 hover:before:-z-20 
 hover:border-op-0"
	on:mouseover={() => hovering(true)}
	on:mouseleave={() => hovering(false)}
	on:focus={() => hovering(true)}
	on:blur={() => hovering(false)}
	role="tooltip"
>
	<div class="flex justify-between items-center flex-col m-auto h-full">
		<h3 class="text-xl">
			{title}
		</h3>
		<h4 class="">
			{#each subtitleArgs as arg, i (i)}
				<span
					class="inline-block relative translate-y-[40%] transition-none op-0"
					bind:this={subtitleElements[i]}>{arg}&nbsp;</span
				>
			{/each}
		</h4>

		<img
			bind:this={imgElement}
			src="https://cdn.ayakobot.com/website_assets/{img}"
			class="rounded-2xl op-0 box-shadow-main"
			width="95%"
			alt=""
			loading="lazy"
		/>

		<img
			bind:this={placeholderElement}
			src="https://cdn.ayakobot.com/website_assets/{placeholder}"
			class="rounded-2xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-20"
			width="264"
			alt=""
			loading="lazy"
		/>

		<div bind:this={hoverMeText} class="text-sm text-neutral-300/75">Hover</div>
	</div>
</div>
