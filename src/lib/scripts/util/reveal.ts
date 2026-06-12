import type { Action } from 'svelte/action';

type RevealOptions = {
	delay?: number;
	threshold?: number;
	once?: boolean;
};

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const { delay = 0, threshold = 0.15, once = true } = options ?? {};

	node.classList.add('reveal');
	if (delay) node.style.setProperty('--reveal-delay', `${delay}s`);

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('revealed');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const needed = Math.min(entry.boundingClientRect.height, window.innerHeight * 0.6) * threshold;
				if (entry.isIntersecting && entry.intersectionRect.height >= Math.max(needed, 1)) {
					node.classList.add('revealed');
					if (once) observer.unobserve(node);
				} else if (!once && !entry.isIntersecting) {
					node.classList.remove('revealed');
				}
			}
		},
		{
			threshold: [0, 0.01, 0.02, 0.03, 0.05, 0.075, 0.1, 0.15, 0.25, 0.5],
			rootMargin: '0px 0px -8% 0px',
		},
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
};
