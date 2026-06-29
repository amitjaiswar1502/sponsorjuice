import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, url }) => {
  const base = (site?.href || url.origin || 'https://sponsorjuice.com').replace(/\/$/, '');

  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${base}/sitemap-index.xml
Sitemap: ${base}/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
