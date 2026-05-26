import type { APIRoute } from 'astro';

const SITE = 'https://nomos-landivisiau.fr';

const pages = ['/', '/mentions-legales/'];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = pages
    .map((p) => `  <url>
    <loc>${SITE}${p}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' },
  });
};
