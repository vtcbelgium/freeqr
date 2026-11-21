import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const expected = [
  'Name: FreeQR',
  'URL: https://freeqr.othrys.be/',
  'Description: Generate permanent, static QR codes for links, Wi-Fi, text, and vCards with zero redirects, entirely in the browser.',
  'LLMs-Txt: https://freeqr.othrys.be/llms.txt',
  'Sitemap: https://freeqr.othrys.be/sitemap.xml',
  'Protocol: public-read-only',
  'Privacy: zero-tracking-cookies, local-browser-execution, zero-cloud-uploads',
].join('\n');

describe('agents.txt discovery manifests', () => {
  for (const rel of ['public/agents.txt', 'public/.well-known/agents.txt']) {
    it(`ships ${rel} as plain text with required fields`, () => {
      expect(existsSync(new URL(`../${rel}`, import.meta.url))).toBe(true);
      expect(read(rel).trim()).toBe(expected);
    });
  }

  const distExists = existsSync(new URL('../dist/agents.txt', import.meta.url));
  describe.skipIf(!distExists)('build output', () => {
    for (const rel of ['dist/agents.txt', 'dist/.well-known/agents.txt']) {
      it(`copies ${rel} into the build output`, () => {
        expect(existsSync(new URL(`../${rel}`, import.meta.url))).toBe(true);
        expect(read(rel).trim()).toBe(expected);
      });
    }
  });
});
