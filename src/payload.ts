export type Security = 'WPA' | 'WEP' | 'nopass';
export function escapeWifi(value: string): string {
  return value.replace(/[\\;:,"]/g, '\\$&');
}
export function wifiPayload(ssid: string, password: string, security: Security, hidden: boolean): string {
  if (!ssid.trim()) throw new Error('Enter your network name to create a Wi-Fi code.');
  if (security !== 'nopass' && !password) throw new Error('Enter the network password, or choose Open network.');
  return `WIFI:T:${security};S:${escapeWifi(ssid)};${security === 'nopass' ? '' : `P:${escapeWifi(password)};`}H:${hidden};;`;
}
export function validatePayload(payload: string): string {
  if (!payload.trim()) throw new Error('Enter text or a link to create your code.');
  if (new TextEncoder().encode(payload).length > 1000) throw new Error('This content is too long. Use 1,000 UTF-8 bytes or fewer.');
  return payload;
}

