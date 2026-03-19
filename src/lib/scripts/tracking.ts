/**
 * Google Ads Conversion Tracking Utility
 *
 * Conversion event: Invite button click (user clicks to add bot to Discord)
 *
 * Fires immediately on click because users leave ayakobot.com
 * for Discord and never return — the click IS the conversion.
 */

const GOOGLE_ADS_CONVERSION_ID = 'AW-10969236341';
const GOOGLE_ADS_CONVERSION_LABEL = 'nzIwCL343u4bEPWGxe4o';

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		dataLayer?: unknown[];
	}
}

function isGtagAvailable(): boolean {
	return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Track invite button click and fire Google Ads conversion immediately.
 * Uses transport_type: 'beacon' to ensure the request completes
 * even as the browser navigates away to Discord.
 */
export function trackInviteClick(): void {
	if (typeof window === 'undefined') return;

	if (isGtagAvailable()) {
		// Fire Google Ads conversion
		window.gtag?.('event', 'conversion', {
			send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
			transport_type: 'beacon',
		});

		// Also track as GA4 event for reporting
		window.gtag?.('event', 'invite_click', {
			event_category: 'conversion',
			event_label: 'discord_bot_invite',
			transport_type: 'beacon',
		});
	}
}

/**
 * Track a custom event in GA4
 */
export function trackEvent(
	eventName: string,
	params?: Record<string, string | number | boolean>,
): void {
	if (!isGtagAvailable()) return;
	window.gtag?.('event', eventName, params);
}
