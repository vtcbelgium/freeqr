import { describe, expect, it } from 'vitest';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';
import { escapeWifi, validatePayload, wifiPayload, emailPayload, phonePayload, smsPayload, vcardPayload, geoPayload } from '../src/payload';
import { generateQR } from '../src/qr';

describe('payloads', () => {
  it('preserves text exactly and rejects empty or excessive UTF-8 content', () => {
    expect(validatePayload(' hello 🌍 ')).toBe(' hello 🌍 ');
    expect(() => validatePayload('   ')).toThrow();
    expect(() => validatePayload('🌍'.repeat(501))).toThrow('too long');
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
  it('formats email payloads with subject and body', () => {
    expect(emailPayload('test@example.com', 'Hi there', 'Message content')).toBe('mailto:test@example.com?subject=Hi%20there&body=Message%20content');
    expect(() => emailPayload('')).toThrow('recipient email');
  });
  it('formats phone payloads with tel URI', () => {
    expect(phonePayload('+1 (555) 019-2834')).toBe('tel:+15550192834');
    expect(() => phonePayload('abc')).toThrow('phone number');
  });
  it('formats sms payloads with smsto URI', () => {
    expect(smsPayload('+32470123456', 'Hello!')).toBe('smsto:+32470123456:Hello!');
    expect(() => smsPayload('')).toThrow('recipient phone');
  });
  it('formats vCard 3.0 payloads', () => {
    const vcard = vcardPayload({
      firstName: 'Ada',
      lastName: 'Lovelace',
      org: 'Computing Pioneers',
      phone: '+44 20 7946 0912',
      email: 'ada@lovelace.org',
      url: 'https://lovelace.org'
    });
    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('FN:Ada Lovelace');
    expect(vcard).toContain('TEL;TYPE=CELL:+44 20 7946 0912');
    expect(vcard).toContain('END:VCARD');
  });
  it('formats geographic location payloads', () => {
    expect(geoPayload('50.8503', '4.3517')).toBe('geo:50.8503,4.3517?q=50.8503,4.3517');
    expect(() => geoPayload('invalid', '4.3')).toThrow('valid coordinates');
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
