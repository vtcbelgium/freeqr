// [HARVESTED TO OTHRYS-BLOCKS] target: blocks/qr/client-qr-engine/payload.ts | date: 2026-11-05 | status: HARVEST_RETAIN
export type Security = 'WPA' | 'WEP' | 'nopass';
export type QRType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'sms' | 'vcard' | 'location';

export function escapeWifi(value: string): string {
  return value.replace(/[\\;:,"]/g, '\\$&');
}

export function wifiPayload(ssid: string, password: string, security: Security, hidden: boolean): string {
  if (!ssid.trim()) throw new Error('Enter your network name to create a Wi-Fi code.');
  if (security !== 'nopass' && !password) throw new Error('Enter the network password, or choose Open network.');
  return `WIFI:T:${security};S:${escapeWifi(ssid)};${security === 'nopass' ? '' : `P:${escapeWifi(password)};`}H:${hidden};;`;
}

export function emailPayload(to: string, subject = '', body = ''): string {
  const cleanTo = to.trim();
  if (!cleanTo) throw new Error('Enter a recipient email address.');
  const params: string[] = [];
  if (subject.trim()) params.push(`subject=${encodeURIComponent(subject.trim())}`);
  if (body.trim()) params.push(`body=${encodeURIComponent(body.trim())}`);
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${cleanTo}${query}`;
}

export function phonePayload(phone: string): string {
  const cleanPhone = phone.replace(/[^\d+*#]/g, '');
  if (!cleanPhone) throw new Error('Enter a phone number.');
  return `tel:${cleanPhone}`;
}

export function smsPayload(phone: string, message = ''): string {
  const cleanPhone = phone.replace(/[^\d+*#]/g, '');
  if (!cleanPhone) throw new Error('Enter a recipient phone number.');
  return `smsto:${cleanPhone}:${message}`;
}

export function vcardPayload(data: {
  firstName: string;
  lastName?: string;
  org?: string;
  phone?: string;
  email?: string;
  url?: string;
}): string {
  const fn = [data.firstName.trim(), (data.lastName || '').trim()].filter(Boolean).join(' ');
  if (!fn) throw new Error('Enter at least a first name or contact name.');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${(data.lastName || '').trim()};${data.firstName.trim()};;;`,
    `FN:${fn}`
  ];
  if (data.org?.trim()) lines.push(`ORG:${data.org.trim()}`);
  if (data.phone?.trim()) lines.push(`TEL;TYPE=CELL:${data.phone.trim()}`);
  if (data.email?.trim()) lines.push(`EMAIL:${data.email.trim()}`);
  if (data.url?.trim()) lines.push(`URL:${data.url.trim()}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

export function geoPayload(lat: string | number, lng: string | number): string {
  const nLat = typeof lat === 'number' ? lat : parseFloat(lat.trim());
  const nLng = typeof lng === 'number' ? lng : parseFloat(lng.trim());
  if (isNaN(nLat) || isNaN(nLng) || nLat < -90 || nLat > 90 || nLng < -180 || nLng > 180) {
    throw new Error('Enter valid coordinates (Latitude -90 to 90, Longitude -180 to 180).');
  }
  return `geo:${nLat},${nLng}?q=${nLat},${nLng}`;
}

export function validatePayload(payload: string): string {
  if (!payload.trim()) throw new Error('Enter text or a link to create your code.');
  if (new TextEncoder().encode(payload).length > 2000) throw new Error('This content is too long. Use 2,000 UTF-8 bytes or fewer.');
  return payload;
}
