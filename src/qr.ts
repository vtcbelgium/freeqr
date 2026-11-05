// [HARVESTED TO OTHRYS-BLOCKS] target: blocks/qr/client-qr-engine/qr.ts | date: 2026-11-05 | status: HARVEST_RETAIN
import QRCode from 'qrcode';

export interface QROptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  width?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export const qrOptions: QROptions = {
  errorCorrectionLevel: 'M',
  margin: 4,
  width: 1024,
  color: { dark: '#000000', light: '#ffffff' }
};

export async function generateQR(payload: string, customOptions?: Partial<QROptions>): Promise<{svg: string; png: string}> {
  const opts: QROptions = {
    ...qrOptions,
    ...customOptions,
    color: {
      ...qrOptions.color,
      ...(customOptions?.color || {})
    }
  };
  const [svg, png] = await Promise.all([
    QRCode.toString(payload, { ...opts, type: 'svg' }),
    QRCode.toDataURL(payload, opts)
  ]);
  return { svg, png };
}
