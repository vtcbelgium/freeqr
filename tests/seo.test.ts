import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const SITE_URL = 'https://freeqr.othrys.be/';
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const html = read('index.html');
const robots = read('public/robots.txt');
const sitemap = read('public/sitemap.xml');

const attr = (tag: string | undefined, name: string) => tag?.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const findTag = (pattern: RegExp) => html.match(pattern)?.[0];

describe('index.html SEO tags', () => {
  it('declares the custom domain as canonical URL', () => {
    expect(attr(findTag(/<link\b[^>]*\brel="canonical"[^>]*>/), 'href')).toBe(SITE_URL);
  });
  it('declares the custom domain as og:url', () => {
    expect(attr(findTag(/<meta\b[^>]*\bproperty="og:url"[^>]*>/), 'content')).toBe(SITE_URL);
  });
  it('has a meta robots tag that allows indexing', () => {
    const content = attr(findTag(/<meta\b[^>]*\bname="robots"[^>]*>/), 'content');
    expect(content).toBeDefined();
    expect(content).not.toMatch(/noindex/i);
  });
});

describe('robots.txt', () => {
  it('allows all crawlers to crawl the whole site', () => {
    expect(robots).toMatch(/^User-agent:\s*\*\s*$/im);
    expect(robots).toMatch(/^Allow:\s*\/\s*$/im);
    expect(robots).not.toMatch(/^Disallow:\s*\/\s*$/im);
  });
  it('points to the sitemap on the custom domain', () => {
    expect(robots).toMatch(/^Sitemap:\s*https:\/\/freeqr\.othrys\.be\/sitemap\.xml\s*$/im);
  });
});

describe('sitemap.xml', () => {
  it('lists the custom domain home page', () => {
    const locs = [...sitemap.matchAll(/<loc>\s*([^<]*?)\s*<\/loc>/g)].map(m => m[1]);
    expect(locs).toContain(SITE_URL);
  });
  it('lists the /types/ hub page', () => {
    const locs = [...sitemap.matchAll(/<loc>\s*([^<]*?)\s*<\/loc>/g)].map(m => m[1]);
    expect(locs).toContain(`${SITE_URL}types/`);
  });
});

const typeSlugs = readdirSync(new URL('../public/types/', import.meta.url), { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

type JsonLdNode = { '@type': string; url?: string; itemListElement: { position: number; name: string; item: string }[] };

const graphOf = (page: string): JsonLdNode[] => {
  const blocks = [...page.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  expect(blocks).toHaveLength(1);
  return JSON.parse(blocks[0][1])['@graph'];
};
const breadcrumbOf = (page: string) => graphOf(page).find(node => node['@type'] === 'BreadcrumbList');

describe('/types/ hub page', () => {
  const hub = read('public/types/index.html');

  it('exists for all ten type pages', () => {
    expect(typeSlugs).toHaveLength(10);
  });
  it('declares its own canonical URL', () => {
    expect(hub).toContain(`<link rel="canonical" href="${SITE_URL}types/"/>`);
    expect(graphOf(hub).find(node => node['@type'] === 'CollectionPage')?.url).toBe(`${SITE_URL}types/`);
  });
  it('links every type page with descriptive anchor text', () => {
    for (const slug of typeSlugs) {
      const anchor = hub.match(new RegExp(`<a href="/types/${slug}/">([^<]+)</a>`));
      expect(anchor?.[1], slug).toMatch(/QR Code/);
    }
  });
  it('stays static with zero unapproved scripts, cookies or third-party resources', () => {
    expect(hub.replace(/<script type="application\/ld\+json">.*?<\/script>|<script src="\/stats\.js" defer><\/script>/gs, '')).not.toMatch(/<script|<iframe|cookie/i);
    expect(hub).not.toMatch(/(?:src|href)="https?:\/\/(?!freeqr\.othrys\.be\/)/);
  });
  it('is linked from the home page footer', () => {
    const footer = html.slice(html.indexOf('<footer'), html.indexOf('</footer>'));
    expect(footer).toContain('<a href="/types/">All QR Code Types</a>');
  });
  it('is mirrored byte-for-byte in types/', () => {
    expect(read('types/index.html')).toBe(hub);
  });
});

describe.each(typeSlugs)('/types/%s/ breadcrumbs', slug => {
  const page = read(`public/types/${slug}/index.html`);
  const url = `${SITE_URL}types/${slug}/`;

  it('declares Home > QR Code Types > page in BreadcrumbList JSON-LD', () => {
    const items = breadcrumbOf(page)?.itemListElement;
    expect(items?.map(item => item.position)).toEqual([1, 2, 3]);
    expect(items?.map(item => item.item)).toEqual([SITE_URL, `${SITE_URL}types/`, url]);
    expect(items?.slice(0, 2).map(item => item.name)).toEqual(['Home', 'QR Code Types']);
  });
  it('shows the same trail in the visible breadcrumb', () => {
    const name = breadcrumbOf(page)?.itemListElement[2].name.replace(/&/g, '&amp;');
    expect(page).toContain('<a href="/types/">QR Code Types</a>');
    expect(page).toContain(`<li aria-current="page">${name}</li>`);
  });
  it('is mirrored byte-for-byte in types/', () => {
    expect(read(`types/${slug}/index.html`)).toBe(page);
  });
});
