import './style.css';
import { validatePayload, wifiPayload, type Security } from './payload';
import { generateQR } from './qr';

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
}

async function update() {
  const version = ++revision;
  invalidate();
  error.textContent = '';
  [text, ssid, password].forEach(input => input.removeAttribute('aria-invalid'));
  el('text-fields').hidden = isWifi();
  el('wifi-fields').hidden = !isWifi();
  el('password-field').hidden = security.value === 'nopass';
  status.textContent = 'Add some content to see your QR code.';
  const empty = isWifi() ? !ssid.value && !password.value : !text.value;
  if (empty) return;
  try {
    const payload = validatePayload(isWifi() ? wifiPayload(ssid.value, password.value, security.value as Security, hidden.checked) : text.value);
    status.textContent = 'Creating your QR code…';
    const result = await generateQR(payload);
    if (version !== revision) return;
    current = {...result, payload};
    image.src = result.png;
    image.hidden = false;
    el('empty').hidden = true;
    actions.forEach(button => button.disabled = false);
    status.textContent = 'Ready. Test with your phone before sharing.';
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
el('clear').addEventListener('click', () => {
  clearTimeout(timer); text.value = ssid.value = password.value = ''; hidden.checked = false;
  void update(); (isWifi() ? ssid : text).focus();
});

function download(format: 'png' | 'svg') {
  if (!current) return;
  const blob = format === 'svg' ? new Blob([current.svg], {type: 'image/svg+xml;charset=utf-8'}) : undefined;
  const url = blob ? URL.createObjectURL(blob) : current.png;
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `freeqr.${format}`;
  document.body.append(anchor); anchor.click(); anchor.remove();
  if (blob) setTimeout(() => URL.revokeObjectURL(url), 1000);
}

el('png').addEventListener('click', () => download('png'));
el('svg').addEventListener('click', () => download('svg'));
el('copy').addEventListener('click', async () => {
  if (!current) return;
  try { await navigator.clipboard.writeText(current.payload); status.textContent = 'Payload copied to clipboard.'; }
  catch { error.textContent = 'Clipboard access is unavailable. You can select and copy your text from the form.'; }
});

// Sovereign Theme Controller (localStorage persistence + system dark/light match)
function initThemeController() {
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('othrys-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  toggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('othrys-theme', nextTheme);
  });
}

initThemeController();
void update();
