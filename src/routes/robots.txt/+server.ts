export const GET = () =>
	new Response(
		`User-agent: *
Allow: /
Allow: /api/artworks
Allow: /api/contributers
Allow: /api/features
Allow: /api/stats
Disallow: /appeals
Disallow: /login
Disallow: /guilds/
Disallow: /api/stats
Disallow: /api/coffee
Disallow: /api/@me/
Disallow: /api/interactions
Disallow: /api/login
Disallow: /api/topggvotes
Disallow: /api/votes/
Disallow: /api/guilds/`.trim(),
		{
			headers: {
				'Content-Type': 'text/plain',
			},
		},
	);
