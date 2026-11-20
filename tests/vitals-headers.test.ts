import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const raw = readFileSync(new URL('../public/_headers', import.meta.url), 'utf8');

function parse(text: string): Map<string, string[]> {
  const rules = new Map<string, string[]>();
  let current: string[] | undefined;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (/^\S/.test(line)) {
      current = [];
      rules.set(line.trim(), current);
    } else current?.push(line.trim());
  }
  return rules;
}

const rules = parse(raw);

describe('public/_headers', () => {
  it('sets security headers and frame-ancestors self under /*', () => {
    const all = rules.get('/*') ?? [];
    expect(all).toContain('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
    expect(all).toContain('X-Content-Type-Options: nosniff');
    expect(all).toContain("Content-Security-Policy: frame-ancestors 'self'");
  });

  it('keeps /embed/* embeddable and CORS-enabled', () => {
    const embed = rules.get('/embed/*') ?? [];
    expect(embed).toContain('Access-Control-Allow-Origin: *');
    expect(embed).toContain('Content-Security-Policy: frame-ancestors *');
    // detach the inherited /* policy so 'self' does not intersect with *
    const detach = embed.indexOf('! Content-Security-Policy');
    expect(detach).toBeGreaterThanOrEqual(0);
    expect(detach).toBeLessThan(embed.indexOf('Content-Security-Policy: frame-ancestors *'));
  });

  it('keeps long-lived caching for /assets/*', () => {
    expect(rules.get('/assets/*')).toContain('Cache-Control: public, max-age=31536000, immutable');
  });
});
