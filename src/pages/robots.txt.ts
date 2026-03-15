import type { APIRoute } from 'astro';
import { EMPRESA } from '../data/index';

export const GET: APIRoute = () => {
  const content = `User-agent: *
Allow: /

Sitemap: ${EMPRESA.web}/sitemap-index.xml
`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
