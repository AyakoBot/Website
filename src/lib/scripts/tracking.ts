/**
 * Google Ads Conversion Tracking Utility
 *
 * Conversion flow:
 * 1. User views website
 * 2. User clicks invite button → trackInviteClick() marks intent
 * 3. User returns to ayakobot.com → checkAndFireConversion() fires conversion
 *
 * SETUP: Replace these values with your Google Ads conversion details:
 * - GOOGLE_ADS_CONVERSION_ID: Your Google Ads Conversion ID (e.g., 'AW-123456789')
 * - GOOGLE_ADS_CONVERSION_LABEL: Your conversion label (e.g., 'AbCdEfGhIjKlMnOp')
 */

// ============================================
// CONFIGURATION
// ============================================
const GOOGLE_ADS_CONVERSION_ID = 'AW-10969236341';
const GOOGLE_ADS_CONVERSION_LABEL = 'nzIwCL343u4bEPWGxe4o';

// Storage keys
const INVITE_CLICK_KEY = 'ayako_invite_clicked';
const INVITE_CLICK_TIMESTAMP_KEY = 'ayako_invite_timestamp';
const CONVERSION_FIRED_KEY = 'ayako_conversion_fired';

// Conversion window: 30 days in milliseconds
const CONVERSION_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		dataLayer?: unknown[];
	}
}

/**
 * Check if gtag is available
 */
function isGtagAvailable(): boolean {
	return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Track when a user clicks an invite button
 * Call this when any invite button is clicked
 */
export function trackInviteClick(): void {
	if (typeof window === 'undefined') return;

	// Store invite click intent
	localStorage.setItem(INVITE_CLICK_KEY, 'true');
	localStorage.setItem(INVITE_CLICK_TIMESTAMP_KEY, Date.now().toString());

	// Clear any previous conversion flag for this flow
	localStorage.removeItem(CONVERSION_FIRED_KEY);

	// Track click event in GA4
	if (isGtagAvailable()) {
		window.gtag?.('event', 'invite_button_click', {
			event_category: 'engagement',
			event_label: 'discord_invite',
			transport_type: 'beacon'
		});
	}

	console.debug('[Tracking] Invite click tracked');
}

/**
 * Check if user is returning from invite flow and fire conversion
 * Call this on page load (in layout or root component)
 */
export function checkAndFireConversion(): void {
	if (typeof window === 'undefined') return;

	const hasClickedInvite = localStorage.getItem(INVITE_CLICK_KEY) === 'true';
	const clickTimestamp = localStorage.getItem(INVITE_CLICK_TIMESTAMP_KEY);
	const conversionAlreadyFired = localStorage.getItem(CONVERSION_FIRED_KEY) === 'true';

	// Check if user previously clicked invite
	if (!hasClickedInvite || !clickTimestamp) {
		return;
	}

	// Check if conversion was already fired for this flow
	if (conversionAlreadyFired) {
		console.debug('[Tracking] Conversion already fired for this flow');
		return;
	}

	// Check if within conversion window
	const timeSinceClick = Date.now() - parseInt(clickTimestamp, 10);
	if (timeSinceClick > CONVERSION_WINDOW_MS) {
		// Expired - clean up
		clearInviteTracking();
		console.debug('[Tracking] Invite click expired, cleared tracking data');
		return;
	}

	// Check referrer - user should be coming from Discord (invite flow)
	const referrer = document.referrer;
	const isFromDiscord =
		referrer.includes('discord.com') ||
		referrer.includes('discordapp.com') ||
		referrer.includes('invite.ayakobot.com');

	// Also check URL parameters that might indicate return from invite
	const urlParams = new URLSearchParams(window.location.search);
	const hasGuildId = urlParams.has('guild_id');
	const hasCode = urlParams.has('code');

	if (isFromDiscord || hasGuildId || hasCode) {
		fireConversion();
	} else {
		console.debug('[Tracking] User returned but not from Discord/invite flow', { referrer });
	}
}

/**
 * Fire the Google Ads conversion event
 */
function fireConversion(): void {
	if (!isGtagAvailable()) {
		console.debug('[Tracking] gtag not available, conversion not fired');
		return;
	}

	// Fire Google Ads conversion
	window.gtag?.('event', 'conversion', {
		send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
		event_callback: () => {
			console.debug('[Tracking] Google Ads conversion fired successfully');
		}
	});

	// Also track in GA4 for reporting
	window.gtag?.('event', 'invite_conversion', {
		event_category: 'conversion',
		event_label: 'discord_bot_added'
	});

	// Mark conversion as fired to prevent duplicates
	localStorage.setItem(CONVERSION_FIRED_KEY, 'true');

	// Clear the invite click data
	localStorage.removeItem(INVITE_CLICK_KEY);
	localStorage.removeItem(INVITE_CLICK_TIMESTAMP_KEY);

	console.debug('[Tracking] Conversion event fired');
}

/**
 * Manually fire a conversion (useful for testing or specific flows)
 */
export function manualFireConversion(): void {
	if (!isGtagAvailable()) {
		console.warn('[Tracking] gtag not available');
		return;
	}

	window.gtag?.('event', 'conversion', {
		send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`
	});

	console.debug('[Tracking] Manual conversion fired');
}

/**
 * Clear all invite tracking data
 */
export function clearInviteTracking(): void {
	if (typeof window === 'undefined') return;

	localStorage.removeItem(INVITE_CLICK_KEY);
	localStorage.removeItem(INVITE_CLICK_TIMESTAMP_KEY);
	localStorage.removeItem(CONVERSION_FIRED_KEY);
}

/**
 * Track a custom event
 */
export function trackEvent(
	eventName: string,
	params?: Record<string, string | number | boolean>
): void {
	if (!isGtagAvailable()) return;

	window.gtag?.('event', eventName, params);
}

/**
 * Get tracking debug info
 */
export function getTrackingDebugInfo(): Record<string, unknown> {
	if (typeof window === 'undefined') return {};

	return {
		hasClickedInvite: localStorage.getItem(INVITE_CLICK_KEY),
		clickTimestamp: localStorage.getItem(INVITE_CLICK_TIMESTAMP_KEY),
		conversionFired: localStorage.getItem(CONVERSION_FIRED_KEY),
		gtagAvailable: isGtagAvailable(),
		referrer: document.referrer,
		conversionId: GOOGLE_ADS_CONVERSION_ID,
		conversionLabel: GOOGLE_ADS_CONVERSION_LABEL
	};
}
