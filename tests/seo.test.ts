import { readFileSync } from 'node:fs';
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
});
