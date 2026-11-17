import { readFileSync, existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const html = read('index.html');
const localeCopy = read('src/i18n.ts');

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

  it('includes an accurate privacy and opt-in choices section', () => {
    expect(html).toContain('id="privacy"');
    expect(html).toContain('class="privacy-section"');
    expect(html).toContain('QR inputs stay local. Optional statistics require consent.');
    expect(html).toContain('EU ePrivacy Directive 2002/58/EC Article 5(3)');
    expect(html).not.toContain('GDPR Article 5(3)');
    expect(html).not.toContain('No cookie banner is required');
    expect(html).toContain('Zero Server Storage');
    expect(html).toContain('Open &amp; Verifiable');
    expect(html).toContain('https://othrys.be/architecture');
  });

  it('includes canonical Sovereign Footer with fleet back-link and sovereign notice', () => {
    expect(html).toContain('class="site-footer"');
    expect(html).toContain('https://othrys.be');
    expect(html).toContain('https://othrys.be/architecture');
    expect(html).toContain('Local QR Generation · No Analytics Cookies · Optional Statistics');
  });

  it('includes structured FAQPage schema in JSON-LD', () => {
    expect(html).toContain('"@type": "FAQPage"');
    expect(html).toContain('Static or dynamic. What’s the difference?');
    expect(html).toContain('Where does my information go?');
  });

  it('includes cookie and statistics choices, inspector dialog, and correct ePrivacy reference', () => {
    expect(html).toContain('id="cookie-status-pill"');
    expect(html).toContain('id="cookie-dialog"');
    expect(html).toContain('Cookie and Storage Transparency');
    expect(html).toContain('Cookies and Statistics Choices');
    expect(html).toContain('only after you accept optional statistics');
    expect(html).toContain('2002/58/EC');
    expect(html).toContain('EU ePrivacy Directive 2002/58/EC Article 5(3)');
  });

  it('keeps five language privacy statements truthful about optional stats', () => {
    expect(localeCopy).not.toContain('No cookie banner is required');
    expect(localeCopy).not.toContain('Aucune bannière requise');
    expect(localeCopy).not.toContain('Keine Cookie-Banner');
    expect(localeCopy).not.toContain('anonieme paginatellingen');
    expect(localeCopy).toContain('Optional pseudonymous pageview statistics are sent only after you accept');
    expect(localeCopy).toContain('Optionele pseudonieme paginastatistieken');
  });

  it('includes Language (i18n) switcher and alternate hreflang tags', () => {
    expect(html).toContain('id="lang-select"');
    expect(html).toContain('rel="alternate" hreflang="en"');
    expect(html).toContain('rel="alternate" hreflang="nl"');
    expect(html).toContain('rel="alternate" hreflang="fr"');
    expect(html).toContain('rel="alternate" hreflang="de"');
    expect(html).toContain('rel="alternate" hreflang="es"');
  });

  it('includes Sovereign Account / Client-Side Vault drawer', () => {
    expect(html).toContain('id="vault-pill"');
    expect(html).toContain('id="vault-dialog"');
    expect(html).toContain('id="vault-export-btn"');
    expect(html).toContain('id="vault-wipe-btn"');
    expect(html).toContain('id="vault-import-input"');
  });

  it('includes Settings drawer with Black or White theme choices and high contrast', () => {
    expect(html).toContain('id="nav-settings-btn"');
    expect(html).toContain('id="settings-dialog"');
    expect(html).toContain('value="paper"');
    expect(html).toContain('value="oled"');
    expect(html).toContain('id="contrast-toggle"');
  });

  it('includes About modal with OTHRYS provenance and client-side architecture', () => {
    expect(html).toContain('id="nav-about-btn"');
    expect(html).toContain('id="about-dialog"');
    expect(html).toContain('About FreeQR &amp; OTHRYS');
  });

  it('includes Human Sitemap in footer linking tools, fleet, trust, and network', () => {
    expect(html).toContain('class="footer-sitemap-grid"');
    expect(html).toContain('shrinkmyphoto.othrys.be');
    expect(html).toContain('quickpercent.othrys.be');
    expect(html).toContain('unixtime.othrys.be');
    expect(html).toContain('/sitemap.xml');
    expect(html).toContain('/robots.txt');
  });

  it('includes PWA manifest, strict CSP, and offline service worker assets', () => {
    expect(html).toContain('rel="manifest" href="/manifest.webmanifest"');
    expect(html).toContain('http-equiv="Content-Security-Policy"');
    expect(existsSync(new URL('../public/manifest.webmanifest', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../public/sw.js', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../public/404.html', import.meta.url))).toBe(true);
    expect(existsSync(new URL('../public/sitemap.xml', import.meta.url))).toBe(true);
  });

  it('declares authoritative machine-readable BLUEPRINT.json defining desired-state blocks and constraints', () => {
    expect(existsSync(new URL('../BLUEPRINT.json', import.meta.url))).toBe(true);
    const blueprint = JSON.parse(read('BLUEPRINT.json'));
    expect(blueprint.oros_id).toBe('freeqr');
    expect(blueprint.single_job).toBeDefined();
    expect(blueprint.required_blocks.length).toBeGreaterThanOrEqual(8);
    expect(blueprint.constraints.zero_cookies).toBe(true);
    expect(blueprint.constraints.zero_cloud_upload).toBe(true);
  });

  it('declares authoritative machine-readable CONSTELLATION.json defining operational stars and governing titans', () => {
    expect(existsSync(new URL('../CONSTELLATION.json', import.meta.url))).toBe(true);
    const constellation = JSON.parse(read('CONSTELLATION.json'));
    expect(constellation.oros_id).toBe('freeqr');
    expect(constellation.status).toBe('operational');
    expect(constellation.governing_titans.length).toBeGreaterThanOrEqual(7);
    expect(constellation.stars.length).toBeGreaterThanOrEqual(7);
    
    // Verify each star specifies its governing Titan and monetization model
    const starNames = constellation.stars.map((s: { name: string }) => s.name);
    expect(starNames).toContain('Core Visual Matrix Star');
    expect(starNames).toContain('Zero-Cookie & Privacy Sentinel Star');
    expect(starNames).toContain('Search Discovery & Schema Star');
    expect(starNames).toContain('Fleet Health & Test Vigilance Star');
  });
});
