import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, url }) => {
  const base = (site?.href || url.origin || 'https://sponsorjuice.com').replace(/\/$/, '');

  const robotsTxt = `
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Disallow: /

Sitemap: ${base}/sitemap-index.xml
Sitemap: ${base}/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
