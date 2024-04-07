import type { Returned as GETReviews } from '../../routes/api/reviews/+server.js';

export type ReviewDispatch = {
	hovered: GETReviews[number];
	unhovered: GETReviews[number];
};

export type SearchBarDispatch = {
	query: { query: string; option: string | undefined };
	type: { query: string; option: string | undefined };
	any: { query: string; option: string | undefined };
};

export enum ArtType {
	emoji = 'emoji',
	full = 'full',
	icon = 'icon',
	all = 'all',
}
