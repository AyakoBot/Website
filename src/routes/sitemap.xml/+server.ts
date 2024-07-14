export const GET = () =>
	new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

<url>
  <loc>https://ayakobot.com/</loc>
  <lastmod>2024-07-14T15:02:22+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://ayakobot.com/donate</loc>
  <lastmod>2024-07-14T15:02:22+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://ayakobot.com/artwork</loc>
  <lastmod>2024-07-14T15:02:22+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://ayakobot.com/credits</loc>
  <lastmod>2024-07-14T15:02:22+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://ayakobot.com/terms</loc>
  <lastmod>2024-07-14T15:02:22+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://ayakobot.com/privacy</loc>
  <lastmod>2024-07-14T15:02:22+00:00</lastmod>
  <priority>0.80</priority>
</url>


</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml',
			},
		},
	);
