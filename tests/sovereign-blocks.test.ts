import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const html = read('index.html');

describe('Sovereign Building Blocks in FreeQR', () => {
  it('includes accessible skip link targeting main generator', () => {
    expect(html).toContain('<a class="skip" href="#generator">Skip to generator</a>');
  });

  it('includes canonical Sovereign Header with brand, nav, and theme toggle', () => {
    expect(html).toContain('class="site-header"');
    expect(html).toContain('class="brand othrys-brand"');
    expect(html).toContain('href="#generator"');
    expect(html).toContain('href="#how-it-works"');
    expect(html).toContain('href="#privacy"');
    expect(html).toContain('href="#questions"');
    expect(html).toContain('id="theme-toggle"');
    expect(html).toContain('class="sovereign-status-badge"');
  });

  it('includes 3-step How It Works section', () => {
    expect(html).toContain('id="how-it-works"');
    expect(html).toContain('class="how-it-works-section"');
    expect(html).toContain('01');
    expect(html).toContain('02');
    expect(html).toContain('03');
  });

  it('includes Sovereign Legal & Privacy Guarantee section', () => {
    expect(html).toContain('id="privacy"');
    expect(html).toContain('class="privacy-section"');
    expect(html).toContain('Zero Cloud Uploads. Zero Tracking. 100% Private.');
    expect(html).toContain('Zero Server Storage');
    expect(html).toContain('Open &amp; Verifiable');
    expect(html).toContain('https://othrys.be/architecture');
  });

  it('includes canonical Sovereign Footer with fleet back-link and MIT notice', () => {
    expect(html).toContain('class="site-footer"');
    expect(html).toContain('https://othrys.be');
    expect(html).toContain('https://othrys.be/architecture');
    expect(html).toContain('100% Client-Side · Zero Cloud Tracking');
  });

  it('includes structured FAQPage schema in JSON-LD', () => {
    expect(html).toContain('"@type": "FAQPage"');
    expect(html).toContain('Static or dynamic. What’s the difference?');
    expect(html).toContain('Where does my information go?');
  });
});
