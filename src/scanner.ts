// Sovereign Reverse QR Code Scanner / Decoder — 100% Client-Side
import jsQR from 'jsqr';

export interface DecodedResult {
  payload: string;
  type: 'url' | 'wifi' | 'email' | 'phone' | 'sms' | 'vcard' | 'location' | 'text';
  summary: string;
}

export function detectPayloadType(raw: string): { type: DecodedResult['type']; summary: string } {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return { type: 'url', summary: 'Website Link' };
  }
  if (/^wifi:/i.test(trimmed)) {
    const ssidMatch = trimmed.match(/S:([^;]+)/i);
    const ssid = ssidMatch ? ssidMatch[1].replace(/\\([;:,\\])/g, '$1') : 'Network';
    return { type: 'wifi', summary: `Wi-Fi Network (${ssid})` };
  }
  if (/^mailto:/i.test(trimmed)) {
    return { type: 'email', summary: 'Email Address' };
  }
  if (/^tel:/i.test(trimmed)) {
    return { type: 'phone', summary: 'Phone Number' };
  }
  if (/^smsto:/i.test(trimmed) || /^sms:/i.test(trimmed)) {
    return { type: 'sms', summary: 'SMS Message' };
  }
  if (/BEGIN:VCARD/i.test(trimmed)) {
    const fnMatch = trimmed.match(/FN:([^\r\n]+)/i);
    const name = fnMatch ? fnMatch[1].trim() : 'Contact';
    return { type: 'vcard', summary: `Contact Card (${name})` };
  }
  if (/^geo:/i.test(trimmed)) {
    return { type: 'location', summary: 'Geographic Location' };
  }
  return { type: 'text', summary: 'Plain Text' };
}

export async function decodeQRFromFile(file: File | Blob): Promise<DecodedResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file format.'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) {
            reject(new Error('Failed to initialize 2D canvas context.'));
            return;
          }
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (!code || !code.data) {
            reject(new Error('No readable QR code found in this image. Ensure the image is clear and well-lit.'));
            return;
          }
          const { type, summary } = detectPayloadType(code.data);
          resolve({ payload: code.data, type, summary });
        } catch (err) {
          reject(err instanceof Error ? err : new Error('Error processing QR image.'));
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
