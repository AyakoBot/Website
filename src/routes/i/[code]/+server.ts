import { redirect } from '@sveltejs/kit';
import { bots, type BotSlug } from '$lib/scripts/bots';
import type { RequestHandler } from './$types';

/**
 * Tracked invite redirects: /i/<code> -> 302 -> the bot's Discord install URL.
 *
 * These exist because the client-side `trackInviteClick` cannot run everywhere an
 * invite link appears. A bot-listing description is plain markdown with no JS, and
 * an embedded panel runs in a `sandbox="allow-scripts"` iframe with an opaque
 * origin where analytics cookies do not work at all. A server-side hop is the only
 * place a click from those surfaces can be counted.
 *
 * Redirect straight to Discord - never render an interstitial, which loses clicks.
 */

/** code -> which bot the click is for, and which surface it came from. */
const routes: Record<string, { bot: BotSlug; source: string }> = {
	topgg: { bot: 'ayako', source: 'top.gg' },
	'topgg-tickets': { bot: 'ticketing', source: 'top.gg' },
	'topgg-info': { bot: 'info', source: 'top.gg' },
	'topgg-welcome': { bot: 'welcome', source: 'top.gg' },
	appdir: { bot: 'ayako', source: 'app-directory' },
	'appdir-tickets': { bot: 'ticketing', source: 'app-directory' },
	'appdir-info': { bot: 'info', source: 'app-directory' },
	'appdir-welcome': { bot: 'welcome', source: 'app-directory' },
	embed: { bot: 'ayako', source: 'embed' },
	'embed-tickets': { bot: 'ticketing', source: 'embed' },
	'embed-info': { bot: 'info', source: 'embed' },
	'embed-welcome': { bot: 'welcome', source: 'embed' },
};

export const GET: RequestHandler = ({ params }) => {
	// An unknown code must still land somewhere useful - a dead invite link on a
	// third-party listing is unrecoverable once published.
	const route = routes[params.code] ?? { bot: 'ayako' as BotSlug, source: 'unknown' };

	// Cloudflare Workers captures console output. Upgrading this to a GA4
	// Measurement Protocol call needs an API secret in the environment; until one
	// exists, the log line is the record.
	console.log(`[invite] code=${params.code} bot=${route.bot} source=${route.source}`);

	redirect(302, bots[route.bot].invite);
};
