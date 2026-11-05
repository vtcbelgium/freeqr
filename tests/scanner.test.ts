import { describe, it, expect } from 'vitest';
import { detectPayloadType } from '../src/scanner';

describe('Scanner Payload Type Detection', () => {
  it('detects URLs correctly', () => {
    expect(detectPayloadType('https://othrys.be')).toEqual({
      type: 'url',
      summary: 'Website Link'
    });
    expect(detectPayloadType('http://example.com/test?q=1')).toEqual({
      type: 'url',
      summary: 'Website Link'
    });
  });

  it('detects Wi-Fi credentials with SSID', () => {
    expect(detectPayloadType('WIFI:S:GuestRoom;T:WPA;P:secret123;;')).toEqual({
      type: 'wifi',
      summary: 'Wi-Fi Network (GuestRoom)'
    });
  });

  it('detects Email links', () => {
    expect(detectPayloadType('mailto:support@othrys.be?subject=Hello')).toEqual({
      type: 'email',
      summary: 'Email Address'
    });
  });

  it('detects Phone numbers', () => {
    expect(detectPayloadType('tel:+32470123456')).toEqual({
      type: 'phone',
      summary: 'Phone Number'
    });
  });

  it('detects SMS links', () => {
    expect(detectPayloadType('SMSTO:+32470123456:Hello')).toEqual({
      type: 'sms',
      summary: 'SMS Message'
    });
    expect(detectPayloadType('sms:+32470123456?body=Test')).toEqual({
      type: 'sms',
      summary: 'SMS Message'
    });
  });

  it('detects vCard contacts with Full Name', () => {
    const vcard = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Ada Lovelace\r\nORG:Foundry\r\nEND:VCARD';
    expect(detectPayloadType(vcard)).toEqual({
      type: 'vcard',
      summary: 'Contact Card (Ada Lovelace)'
    });
  });

  it('detects Geo Coordinates', () => {
    expect(detectPayloadType('geo:50.8503,4.3517')).toEqual({
      type: 'location',
      summary: 'Geographic Location'
    });
  });

  it('falls back to Plain Text', () => {
    expect(detectPayloadType('Just some random memo note')).toEqual({
      type: 'text',
      summary: 'Plain Text'
    });
  });
});
