import QRCode from 'qrcode';
export const qrOptions = { errorCorrectionLevel: 'M' as const, margin: 4, width: 1024, color: { dark: '#000000', light: '#ffffff' } };
export async function generateQR(payload: string): Promise<{svg: string; png: string}> {
  const [svg, png] = await Promise.all([QRCode.toString(payload, { ...qrOptions, type: 'svg' }), QRCode.toDataURL(payload, qrOptions)]);
  return {svg, png};
}
