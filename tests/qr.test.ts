import { describe, expect, it } from 'vitest';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';
import {
  escapeWifi,
  validatePayload,
  wifiPayload,
  emailPayload,
  phonePayload,
  smsPayload,
  vcardPayload,
  geoPayload
} from '../src/payload';
import { generateQR } from '../src/qr';
import { detectPayloadType } from '../src/scanner';

describe('Payload Builders & Validators', () => {
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
    expect(emailPayload('test@example.com', 'Hi there', 'Message content')).toBe(
      'mailto:test@example.com?subject=Hi%20there&body=Message%20content'
    );
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

describe('Optical QR Decoding & Scanner Verification (All 8 Types)', () => {
  const decodePng = (pngDataUrl: string): string => {
    const base64 = pngDataUrl.split(',')[1];
    const decoded = PNG.sync.read(Buffer.from(base64, 'base64'));
    const result = jsQR(new Uint8ClampedArray(decoded.data), decoded.width, decoded.height);
    if (!result) throw new Error('Optical scanner failed to decode QR image');
    return result.data;
  };

  it('optically decodes Type 1: URL Payload', async () => {
    const payload = 'https://freeqr.othrys.be/?ref=matrix';
    const { png, svg } = await generateQR(payload);
    expect(svg).toContain('<svg');
    expect(decodePng(png)).toBe(payload);
  });

  it('optically decodes Type 2: Plain Text Payload with Unicode & Emoji', async () => {
    const payload = 'Sovereign Network 2026: 🚀 🌍 日本語 & Cyrillic русский';
    const { png } = await generateQR(payload);
    expect(decodePng(png)).toBe(payload);
  });

  it('optically decodes Type 3: Wi-Fi Credentials Payload', async () => {
    const payload = wifiPayload('Guest-Network_5G', 'Secret;Pass:Word#123', 'WPA', false);
    const { png } = await generateQR(payload);
    expect(decodePng(png)).toBe(payload);
  });

  it('optically decodes Type 4: Email Payload', async () => {
    const payload = emailPayload('contact@othrys.be', 'QR Support', 'Hello Sovereign Team');
    const { png } = await generateQR(payload);
    expect(decodePng(png)).toBe(payload);
  });

  it('optically decodes Type 5: Phone Number Payload', async () => {
    const payload = phonePayload('+32 2 555 0199');
    const { png } = await generateQR(payload);
    expect(decodePng(png)).toBe(payload);
  });

  it('optically decodes Type 6: SMS Payload', async () => {
    const payload = smsPayload('+15550192834', 'Order confirmed');
    const { png } = await generateQR(payload);
    expect(decodePng(png)).toBe(payload);
  });

  it('optically decodes Type 7: vCard Contact Card', async () => {
    const payload = vcardPayload({
      firstName: 'Alan',
      lastName: 'Turing',
      org: 'Bletchley',
      phone: '+44 1908 640134',
      email: 'alan@bletchley.org',
      url: 'https://othrys.be'
    });
    const { png } = await generateQR(payload);
    expect(decodePng(png)).toBe(payload);
  });

  it('optically decodes Type 8: Geo Location Coordinates', async () => {
    const payload = geoPayload('50.8503', '4.3517');
    const { png } = await generateQR(payload);
    expect(decodePng(png)).toBe(payload);
  });

  it('verifies optical scan across all 4 Error Correction Levels (L, M, Q, H)', async () => {
    const payload = 'https://othrys.be/architecture';
    for (const ecc of ['L', 'M', 'Q', 'H'] as const) {
      const { png } = await generateQR(payload, { errorCorrectionLevel: ecc });
      expect(decodePng(png)).toBe(payload);
    }
  });

  it('verifies optical scan with custom dark color styling', async () => {
    const payload = 'https://othrys.be/sovereign';
    // Emerald Green (#15803d) and Slate Navy (#0f172a)
    for (const color of ['#15803d', '#0f172a']) {
      const { png } = await generateQR(payload, { color: { dark: color } });
      expect(decodePng(png)).toBe(payload);
    }
  });

  it('validates vector SVG output structure', async () => {
    const { svg } = await generateQR('https://freeqr.othrys.be');
    expect(svg).toMatch(/<svg[^>]+viewBox="0 0 \d+ \d+"/);
    expect(svg).toContain('<path');
    expect(svg).toContain('stroke="#000000"');
  });

  it('detects payload types accurately in reverse scanner engine', () => {
    expect(detectPayloadType('https://othrys.be').type).toBe('url');
    expect(detectPayloadType('WIFI:T:WPA;S:HomeNet;P:pass;;').type).toBe('wifi');
    expect(detectPayloadType('mailto:hello@othrys.be').type).toBe('email');
    expect(detectPayloadType('tel:+1234567890').type).toBe('phone');
    expect(detectPayloadType('smsto:+1234567890:Hi').type).toBe('sms');
    expect(detectPayloadType('BEGIN:VCARD\nFN:Ada\nEND:VCARD').type).toBe('vcard');
    expect(detectPayloadType('geo:50.85,4.35').type).toBe('location');
    expect(detectPayloadType('Just some text').type).toBe('text');
  });
});
