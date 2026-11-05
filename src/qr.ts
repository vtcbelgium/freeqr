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
  logo?: string; // data URL or SVG data
  frameText?: string; // e.g. "SCAN ME"
}

export const qrOptions: QROptions = {
  errorCorrectionLevel: 'M',
  margin: 4,
  width: 1024,
  color: { dark: '#000000', light: '#ffffff' }
};

export async function generateQR(payload: string, customOptions?: Partial<QROptions>): Promise<{ svg: string; png: string }> {
  // If a center logo or frame text is requested, automatically elevate to High Error Correction (30%)
  const hasEnhancements = Boolean(customOptions?.logo || customOptions?.frameText);
  const effectiveEcc = hasEnhancements ? 'H' : (customOptions?.errorCorrectionLevel || qrOptions.errorCorrectionLevel || 'M');

  const width = customOptions?.width || qrOptions.width || 1024;
  const opts: QROptions = {
    ...qrOptions,
    ...customOptions,
    width,
    errorCorrectionLevel: effectiveEcc,
    color: {
      ...qrOptions.color,
      ...(customOptions?.color || {})
    }
  };

  // Check if running in browser DOM with canvas support for enhanced compositing
  const isBrowser = typeof document !== 'undefined' && typeof window !== 'undefined';

  if (isBrowser && (customOptions?.logo || customOptions?.frameText)) {
    return generateEnhancedCanvasQR(payload, opts, customOptions.logo, customOptions.frameText);
  }

  // Standard high-performance generation
  const [svg, png] = await Promise.all([
    QRCode.toString(payload, { ...opts, type: 'svg' }),
    QRCode.toDataURL(payload, opts)
  ]);
  return { svg, png };
}

async function generateEnhancedCanvasQR(
  payload: string,
  opts: QROptions,
  logoUrl?: string,
  frameText?: string
): Promise<{ svg: string; png: string }> {
  const baseSize = opts.width || 1024;
  const frameExtraHeight = frameText ? Math.round(baseSize * 0.16) : 0;
  const totalHeight = baseSize + frameExtraHeight;

  const canvas = document.createElement('canvas');
  canvas.width = baseSize;
  canvas.height = totalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    const png = await QRCode.toDataURL(payload, opts);
    const svg = await QRCode.toString(payload, { ...opts, type: 'svg' });
    return { svg, png };
  }

  // 1. Draw background
  ctx.fillStyle = opts.color?.light || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Render base QR code onto offscreen canvas
  const qrCanvas = document.createElement('canvas');
  await QRCode.toCanvas(qrCanvas, payload, { ...opts, width: baseSize });
  ctx.drawImage(qrCanvas, 0, 0, baseSize, baseSize);

  // 3. Draw Center Logo if provided
  if (logoUrl) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const logoSize = Math.round(baseSize * 0.22);
        const logoX = Math.round((baseSize - logoSize) / 2);
        const logoY = Math.round((baseSize - logoSize) / 2);
        const padding = Math.round(logoSize * 0.12);

        // White background badge
        ctx.save();
        ctx.fillStyle = opts.color?.light || '#ffffff';
        ctx.beginPath();
        const r = Math.round(logoSize * 0.2);
        ctx.roundRect(logoX - padding, logoY - padding, logoSize + padding * 2, logoSize + padding * 2, r);
        ctx.fill();

        // Subtle drop shadow / border around logo badge
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.lineWidth = Math.max(2, Math.round(baseSize * 0.003));
        ctx.stroke();

        // Draw the logo image
        ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
        ctx.restore();
        resolve();
      };
      img.onerror = () => resolve(); // continue if logo fails
      img.src = logoUrl;
    });
  }

  // 4. Draw Frame Label if requested
  if (frameText && frameText.trim()) {
    ctx.save();
    ctx.fillStyle = opts.color?.dark || '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = Math.round(baseSize * 0.05);
    ctx.font = `800 ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
    ctx.letterSpacing = '0.08em';
    const textY = baseSize + Math.round(frameExtraHeight * 0.5);
    ctx.fillText(frameText.trim().toUpperCase(), baseSize / 2, textY);
    ctx.restore();
  }

  const png = canvas.toDataURL('image/png');
  const svg = await QRCode.toString(payload, { ...opts, type: 'svg' });
  return { svg, png };
}
