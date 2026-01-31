import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { dev } from '$app/environment';

export const cdnUrl = (path: string) =>
	dev ? `/cdn-proxy/${path}` : `https://cdn.ayakobot.com/${path}`;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const findInParents = (element: HTMLElement, id: string) => {
	while (element.parentElement) {
		if (element.id === id) return element;
		element = element.parentElement;
	}
	return null;
};

export const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
