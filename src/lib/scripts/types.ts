import type { Returned as GETReviews } from '../../routes/api/reviews/+server.js';

export type ReviewDispatch = {
	hovered: GETReviews[number];
	unhovered: GETReviews[number];
};

export enum ArtType {
	emoji = 'emoji',
	full = 'full',
	icon = 'icon',
	all = 'all',
}
