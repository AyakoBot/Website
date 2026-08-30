/**
 * The Ayako bot family.
 *
 * Single source of truth for each bot's name and invite URL, shared by the
 * marketing pages (/bots/*) and the embeddable ad panels (/embed/*) so the two
 * can never drift apart.
 *
 * The spin-off invite URLs point straight at Discord rather than through
 * invite.ayakobot.com, because that subdomain resolves every path to the
 * flagship's client ID. Their permission integers are computed from the
 * `customBotPerms` sets declared in @ayako/service:
 *   Plugins/ticketing/Plugin.ts  13 permissions  395405552720
 *   Plugins/info/Plugin.ts        4 permissions       84992
 * If either plugin's permission set changes, recompute the integer here.
 */

export type BotSlug = 'ayako' | 'ticketing' | 'info';

export type Bot = {
	slug: BotSlug;
	/** Display name, exactly as it appears on Discord and on listing sites. */
	name: string;
	/** Where the primary CTA points. */
	invite: string;
	/** CTA label. Kept per-bot because "Add Ayako" and "Add Ayako | Info" differ. */
	cta: string;
};

export const bots: Record<BotSlug, Bot> = {
	ayako: {
		slug: 'ayako',
		name: 'Ayako',
		invite: 'https://invite.ayakobot.com',
		cta: 'Add Ayako to Discord',
	},
	ticketing: {
		slug: 'ticketing',
		name: 'Ayako | Ticketing',
		invite:
			'https://discord.com/oauth2/authorize?client_id=1459543361898676447&permissions=395405552720&scope=bot',
		cta: 'Add Ticketing to Discord',
	},
	info: {
		slug: 'info',
		name: 'Ayako | Info',
		invite:
			'https://discord.com/oauth2/authorize?client_id=1523774742945992847&permissions=84992&scope=bot',
		cta: 'Add Info to Discord',
	},
};
