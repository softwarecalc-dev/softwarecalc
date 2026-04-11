/**
 * Sitemap generator — runs as a Vite build plugin.
 * Reads static pages + the TOOLS registry and writes public/sitemap.xml.
 *
 * To add a page to the sitemap: add it to STATIC_PAGES below.
 * To add a tool:               add it to src/lib/tools.ts (no changes here needed).
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://softwarecalc.com';
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

/** Non-tool pages that are always included */
const STATIC_PAGES = [
  { path: '/',               changefreq: 'weekly',  priority: '1.0' },
  { path: '/tools',          changefreq: 'weekly',  priority: '0.8' },
  { path: '/about',          changefreq: 'yearly',  priority: '0.5' },
  { path: '/contact',        changefreq: 'yearly',  priority: '0.5' },
  { path: '/privacy-policy', changefreq: 'yearly',  priority: '0.3' },
];

/** Minimal subset of ToolConfig that we need here (avoids importing Lucide at build time) */
interface SlimTool {
  href: string;
  available: boolean;
}

function buildSitemap(tools: SlimTool[]): string {
  const toolUrls = tools
    .filter((t) => t.available)
    .map(
      (t) => `
  <url>
    <loc>${BASE_URL}${t.href}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('');

  const staticUrls = STATIC_PAGES.map(
    (p) => `
  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${toolUrls}${staticUrls}
</urlset>
`;
}

/**
 * Vite plugin — call this from vite.config.ts.
 * Generates sitemap during `vite build` and on every `vite dev` server start.
 */
export function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    async buildStart() {
      // Dynamically import the tools list at build time.
      // We strip Lucide icons to avoid ESM issues by using a regex extraction
      // on the raw file instead of a full TS import.
      const fs = await import('fs');
      const toolsPath = resolve(process.cwd(), 'src/lib/tools.ts');
      const src = fs.readFileSync(toolsPath, 'utf-8');

      // Extract href and available fields from the TOOLS array source
      const tools: SlimTool[] = [];
      const entryRegex = /href:\s*'([^']+)'[\s\S]*?available:\s*(true|false)/g;
      let match;
      while ((match = entryRegex.exec(src)) !== null) {
        tools.push({ href: match[1], available: match[2] === 'true' });
      }

      const xml = buildSitemap(tools);
      const outPath = resolve(process.cwd(), 'public/sitemap.xml');
      writeFileSync(outPath, xml, 'utf-8');
      console.log(`[sitemap] Generated ${tools.length} tool(s) → public/sitemap.xml`);
    },
  };
}
