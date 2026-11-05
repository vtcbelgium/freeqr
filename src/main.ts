import './style.css';
import { validatePayload, wifiPayload, type Security } from './payload';
import { generateQR } from './qr';
import { showToast } from './toast';
import { initI18n, getTranslations } from './i18n';
import { initThemeController } from './theme';
import { initVaultDrawer } from './vault';
import { initCookieModal } from './cookies';
import { initModals } from './modals';

const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const text = el<HTMLTextAreaElement>('payload');
const ssid = el<HTMLInputElement>('ssid');
const password = el<HTMLInputElement>('password');
const security = el<HTMLSelectElement>('security');
const hidden = el<HTMLInputElement>('hidden-network');
const image = el<HTMLImageElement>('qr-image');
const status = el('status');
const error = el('error');
const actions = ['png', 'svg', 'copy'].map(id => el<HTMLButtonElement>(id));

let current: {svg: string; png: string; payload: string} | undefined;
let revision = 0;
let timer: ReturnType<typeof setTimeout>;

const isWifi = () => document.querySelector<HTMLInputElement>('input[name="mode"]:checked')?.value === 'wifi';

function invalidate() {
  current = undefined;
  actions.forEach(button => button.disabled = true);
  image.hidden = true;
  image.removeAttribute('src');
  el('empty').hidden = false;
  el('qr-stage')?.classList.remove('has-qr');
}

async function update() {
  const t = getTranslations();
  const version = ++revision;
  invalidate();
  error.textContent = '';
  [text, ssid, password].forEach(input => input.removeAttribute('aria-invalid'));
  el('text-fields').hidden = isWifi();
  el('wifi-fields').hidden = !isWifi();
  el('password-field').hidden = security.value === 'nopass';
  status.textContent = t.statusEmpty;
  const empty = isWifi() ? !ssid.value && !password.value : !text.value;
  if (empty) return;
  try {
    const payload = validatePayload(isWifi() ? wifiPayload(ssid.value, password.value, security.value as Security, hidden.checked) : text.value);
    status.textContent = t.statusCreating;
    const result = await generateQR(payload);
    if (version !== revision) return;
    current = {...result, payload};
    image.src = result.png;
    image.hidden = false;
    el('empty').hidden = true;
    el('qr-stage')?.classList.add('has-qr');
    actions.forEach(button => button.disabled = false);
    status.textContent = t.statusReady;
  } catch (cause) {
    if (version !== revision) return;
    error.textContent = cause instanceof Error ? cause.message : 'Could not create this QR code. Try shorter content.';
    status.textContent = 'Your code needs a little attention.';
    (isWifi() ? !ssid.value.trim() ? ssid : password : text).setAttribute('aria-invalid', 'true');
  }
}

el('qr-form').addEventListener('submit', event => event.preventDefault());
el('qr-form').addEventListener('input', () => { ++revision; invalidate(); clearTimeout(timer); timer = setTimeout(update, 180); });
el('qr-form').addEventListener('change', () => { clearTimeout(timer); void update(); });
// Power shortcut: Ctrl+Enter or Cmd+Enter inside payload triggers PNG download
text.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    if (current) download('png');
  }
});
el('clear').addEventListener('click', () => {
  clearTimeout(timer); text.value = ssid.value = password.value = ''; hidden.checked = false;
  void update(); (isWifi() ? ssid : text).focus();
  showToast('Input cleared.');
});

function download(format: 'png' | 'svg') {
  if (!current) return;
  const blob = format === 'svg' ? new Blob([current.svg], {type: 'image/svg+xml;charset=utf-8'}) : undefined;
  const url = blob ? URL.createObjectURL(blob) : current.png;
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `freeqr.${format}`;
  document.body.append(anchor); anchor.click(); anchor.remove();
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
    showToast(t.statusCopied);
  } catch {
    error.textContent = 'Clipboard access is unavailable. You can select and copy your text from the form.';
  }
});

// Initialize all sovereign core modules
initThemeController();
initI18n();
initVaultDrawer();
initCookieModal();
initModals();

// Register Offline Service Worker if supported
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

void update();
