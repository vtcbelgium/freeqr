import { describe, expect, it } from 'vitest';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';
import { escapeWifi, validatePayload, wifiPayload } from '../src/payload';
import { generateQR } from '../src/qr';

describe('payloads', () => {
  it('preserves text exactly and rejects empty or excessive UTF-8 content', () => {
    expect(validatePayload(' hello 🌍 ')).toBe(' hello 🌍 ');
    expect(() => validatePayload('   ')).toThrow();
    expect(() => validatePayload('🌍'.repeat(251))).toThrow('too long');
  });
  it('escapes Wi-Fi delimiters including literal backslashes', () => {
    expect(escapeWifi('a;b:c\\d,"')).toBe('a\\;b\\:c\\\\d\\,\\"');
    expect(wifiPayload('Cafe;guest', 'p:a\\ss', 'WPA', true)).toBe('WIFI:T:WPA;S:Cafe\\;guest;P:p\\:a\\\\ss;H:true;;');
  });
  it('omits passwords for open networks and validates protected networks', () => {
    expect(wifiPayload('Open', 'ignored', 'nopass', false)).toBe('WIFI:T:nopass;S:Open;H:false;;');
    expect(() => wifiPayload('', '', 'nopass', false)).toThrow('network name');
    expect(() => wifiPayload('Home', '', 'WPA', false)).toThrow('password');
  });
});
describe('QR exports', () => {
  it.each(['https://example.org/path?q=hello', 'Hello, café 🌍', wifiPayload('Cafe;guest', 'p:a\\ss', 'WPA', true), 'a'.repeat(1000)])('decodes generated PNG back to its exact payload (%#)', async payload => {
    const {png, svg} = await generateQR(payload);
    expect(svg).toMatch(/<svg[^>]+viewBox=/);
    expect(svg).toContain('<path');
    expect(png).toMatch(/^data:image\/png;base64,/);
    const decoded = PNG.sync.read(Buffer.from(png.split(',')[1], 'base64'));
    expect(decoded.width).toBe(1024);
    expect(decoded.height).toBe(1024);
    const result = jsQR(new Uint8ClampedArray(decoded.data), decoded.width, decoded.height);
    expect(result?.data).toBe(payload);
  });
});

