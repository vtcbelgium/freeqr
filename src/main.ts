import './style.css';
import {
  validatePayload,
  wifiPayload,
  emailPayload,
  phonePayload,
  smsPayload,
  vcardPayload,
  geoPayload,
  type Security,
  type QRType
} from './payload';
import { generateQR, type QROptions } from './qr';
import { showToast } from './toast';
import { initI18n, getTranslations } from './i18n';
import { initThemeController } from './theme';
import { initVaultDrawer } from './vault';
import { initCookieModal } from './cookies';
import { initModals } from './modals';

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

// Elements
const inputUrl = el<HTMLInputElement>('input-url');
const text = el<HTMLTextAreaElement>('payload');
const ssid = el<HTMLInputElement>('ssid');
const password = el<HTMLInputElement>('password');
const security = el<HTMLSelectElement>('security');
const hidden = el<HTMLInputElement>('hidden-network');
const image = el<HTMLImageElement>('qr-image');
const status = el('status');
const error = el('error');
const colorInput = el<HTMLInputElement>('qr-color-input');
const eccSelect = el<HTMLSelectElement>('qr-ecc-select');
const printBtn = el<HTMLButtonElement>('print-btn');
const actions = ['png', 'svg', 'copy', 'print-btn'].map(id => el<HTMLButtonElement>(id));

let current: { svg: string; png: string; payload: string } | undefined;
let revision = 0;
let timer: ReturnType<typeof setTimeout>;
let selectedColor = '#000000';

function getActiveMode(): QRType {
  return (document.querySelector<HTMLInputElement>('input[name="mode"]:checked')?.value as QRType) || 'url';
}

function switchMode(newMode: QRType) {
  const modes: QRType[] = ['url', 'text', 'wifi', 'email', 'phone', 'sms', 'vcard', 'location'];
  modes.forEach(m => {
    const section = el(`${m}-fields`);
    if (section) section.hidden = (m !== newMode);
  });
  void update();
}

function invalidate() {
  current = undefined;
  actions.forEach(button => button && (button.disabled = true));
  image.hidden = true;
  image.removeAttribute('src');
  el('empty').hidden = false;
  el('qr-stage')?.classList.remove('has-qr');
}

function getPayloadForActiveMode(): string {
  const mode = getActiveMode();
  switch (mode) {
    case 'url': {
      let val = inputUrl.value.trim();
      if (!val) return '';
      if (!/^https?:\/\//i.test(val) && !/^mailto:/i.test(val)) {
        val = 'https://' + val;
      }
      return validatePayload(val);
    }
    case 'text': {
      const val = text.value;
      if (!val.trim()) return '';
      return validatePayload(val);
    }
    case 'wifi': {
      const s = ssid.value;
      const p = password.value;
      const sec = security.value as Security;
      const h = hidden.checked;
      if (!s.trim() && !p.trim()) return '';
      return validatePayload(wifiPayload(s, p, sec, h));
    }
    case 'email': {
      const to = el<HTMLInputElement>('input-email-to').value.trim();
      const subj = el<HTMLInputElement>('input-email-subject').value;
      const body = el<HTMLTextAreaElement>('input-email-body').value;
      if (!to) return '';
      return validatePayload(emailPayload(to, subj, body));
    }
    case 'phone': {
      const ph = el<HTMLInputElement>('input-phone-num').value.trim();
      if (!ph) return '';
      return validatePayload(phonePayload(ph));
    }
    case 'sms': {
      const ph = el<HTMLInputElement>('input-sms-num').value.trim();
      const msg = el<HTMLTextAreaElement>('input-sms-msg').value;
      if (!ph) return '';
      return validatePayload(smsPayload(ph, msg));
    }
    case 'vcard': {
      const first = el<HTMLInputElement>('vcard-first').value.trim();
      const last = el<HTMLInputElement>('vcard-last').value.trim();
      const org = el<HTMLInputElement>('vcard-org').value.trim();
      const ph = el<HTMLInputElement>('vcard-phone').value.trim();
      const em = el<HTMLInputElement>('vcard-email').value.trim();
      const web = el<HTMLInputElement>('vcard-url').value.trim();
      if (!first && !last && !org) return '';
      return validatePayload(vcardPayload({ firstName: first, lastName: last, org, phone: ph, email: em, url: web }));
    }
    case 'location': {
      const lat = el<HTMLInputElement>('geo-lat').value.trim();
      const lng = el<HTMLInputElement>('geo-lng').value.trim();
      if (!lat && !lng) return '';
      return validatePayload(geoPayload(lat, lng));
    }
    default:
      return '';
  }
}

async function update() {
  const t = getTranslations();
  const version = ++revision;
  invalidate();
  error.textContent = '';
  
  // Update password field visibility in wifi mode
  const pwField = el('password-field');
  if (pwField) pwField.hidden = security.value === 'nopass';

  status.textContent = t.statusEmpty;

  try {
    const payload = getPayloadForActiveMode();
    if (!payload) return;

    status.textContent = t.statusCreating;
    const ecc = (eccSelect?.value as 'L' | 'M' | 'Q' | 'H') || 'M';
    const qrOpts: Partial<QROptions> = {
      errorCorrectionLevel: ecc,
      color: { dark: selectedColor, light: '#ffffff' }
    };

    const result = await generateQR(payload, qrOpts);
    if (version !== revision) return;

    current = { ...result, payload };
    image.src = result.png;
    image.hidden = false;
    el('empty').hidden = true;
    el('qr-stage')?.classList.add('has-qr');
    actions.forEach(button => button && (button.disabled = false));
    status.textContent = t.statusReady;
  } catch (cause) {
    if (version !== revision) return;
    error.textContent = cause instanceof Error ? cause.message : 'Could not create this QR code. Try shorter content.';
    status.textContent = 'Your code needs a little attention.';
  }
}

// Mode change listener
document.querySelectorAll<HTMLInputElement>('input[name="mode"]').forEach(radio => {
  radio.addEventListener('change', () => {
    switchMode(radio.value as QRType);
  });
});

// Color swatch listeners
document.querySelectorAll<HTMLButtonElement>('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
    selectedColor = swatch.getAttribute('data-color') || '#000000';
    if (colorInput) colorInput.value = selectedColor;
    void update();
  });
});

colorInput?.addEventListener('input', (e) => {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  selectedColor = (e.target as HTMLInputElement).value;
  void update();
});

eccSelect?.addEventListener('change', () => void update());

// Geo preset buttons
document.querySelectorAll<HTMLButtonElement>('.geo-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const lat = btn.getAttribute('data-lat');
    const lng = btn.getAttribute('data-lng');
    if (lat && lng) {
      el<HTMLInputElement>('geo-lat').value = lat;
      el<HTMLInputElement>('geo-lng').value = lng;
      void update();
    }
  });
});

// Form input listeners
el('qr-form').addEventListener('submit', event => event.preventDefault());
el('qr-form').addEventListener('input', () => {
  ++revision;
  invalidate();
  clearTimeout(timer);
  timer = setTimeout(update, 160);
});
el('qr-form').addEventListener('change', () => {
  clearTimeout(timer);
  void update();
});

// Keyboard shortcut: Ctrl/Cmd + Enter triggers download
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    if (current) download('png');
  }
});

// Clear button
el('clear').addEventListener('click', () => {
  clearTimeout(timer);
  inputUrl.value = '';
  text.value = '';
  ssid.value = '';
  password.value = '';
  hidden.checked = false;
  el<HTMLInputElement>('input-email-to').value = '';
  el<HTMLInputElement>('input-email-subject').value = '';
  el<HTMLTextAreaElement>('input-email-body').value = '';
  el<HTMLInputElement>('input-phone-num').value = '';
  el<HTMLInputElement>('input-sms-num').value = '';
  el<HTMLTextAreaElement>('input-sms-msg').value = '';
  el<HTMLInputElement>('vcard-first').value = '';
  el<HTMLInputElement>('vcard-last').value = '';
  el<HTMLInputElement>('vcard-org').value = '';
  el<HTMLInputElement>('vcard-phone').value = '';
  el<HTMLInputElement>('vcard-email').value = '';
  el<HTMLInputElement>('vcard-url').value = '';
  el<HTMLInputElement>('geo-lat').value = '';
  el<HTMLInputElement>('geo-lng').value = '';
  void update();
  showToast('Input cleared.');
});

// Download handler
function download(format: 'png' | 'svg') {
  if (!current) return;
  const blob = format === 'svg' ? new Blob([current.svg], { type: 'image/svg+xml;charset=utf-8' }) : undefined;
  const url = blob ? URL.createObjectURL(blob) : current.png;
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `freeqr-${getActiveMode()}.${format}`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  if (blob) setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(`Downloaded QR code as ${format.toUpperCase()}`);
}

el('png').addEventListener('click', () => download('png'));
el('svg').addEventListener('click', () => download('svg'));
el('copy').addEventListener('click', async () => {
  if (!current) return;
  try {
    await navigator.clipboard.writeText(current.payload);
    const t = getTranslations();
    status.textContent = t.statusCopied;
    showToast('Payload copied to clipboard.');
  } catch {
    showToast('Unable to copy payload automatically.');
  }
});

// Direct Print QR handler
printBtn?.addEventListener('click', () => {
  if (!current) return;
  const printWindow = window.open('', '_blank', 'width=600,height=600');
  if (!printWindow) {
    window.print();
    return;
  }
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print QR Code | FreeQR</title>
        <style>
          body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 90vh; font-family: Inter, system-ui, sans-serif; margin: 0; }
          .qr-box { padding: 32px; border: 2px solid #000; border-radius: 16px; text-align: center; }
          img { width: 320px; height: 320px; image-rendering: pixelated; }
          h2 { margin: 16px 0 4px; font-size: 20px; }
          p { margin: 0; font-size: 12px; color: #666; word-break: break-all; max-width: 320px; }
        </style>
      </head>
      <body>
        <div class="qr-box">
          <img src="${current.png}" alt="QR Code">
          <h2>FreeQR Code</h2>
          <p>${current.payload}</p>
        </div>
        <script>
          window.onload = function() { window.print(); window.close(); }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
});

// Initialize sovereign subsystems
initThemeController();
initI18n();
initVaultDrawer();
initCookieModal();
initModals();

// Initial render
void update();
