import type { Returned as GETReviews } from '$api/reviews/+server.js';

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

export enum PunishmentType {
	bans = 'bans',
	channelbans = 'channelbans',
	kicks = 'kicks',
	mutes = 'mutes',
	warns = 'warns',
	tempchannelbans = 'tempchannelbans',
	tempbans = 'tempbans',
	tempmutes = 'tempmutes',
}

export type AppealPunishment = {
	type: PunishmentType;
	reason: string;
	id: number;
	channelname: string;
	duration?: number;
};

export type TopGGReview = {
	id: string;
	internalEntityId: string;
	entityId: string;
	posterId: string;
	score: number; // up to 100 in 20 steps
	content: string;
	reply?: {
		id: string;
		posterId: string;
		content: string;
		poster: TopGGPoster;
	};
	hasVoted: boolean;
	isFlagged: boolean;
	timestamp: string; // Date String
	editedAt?: string; // Date String
	flaggedAt?: string; // Date String
	votes: number;
	poster: TopGGPoster;
};

export type TopGGPoster = {
	id: string;
	username: string;
	avatar: string; // might be a discord avatar url, might be a avatar hash
};
