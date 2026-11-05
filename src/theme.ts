// Sovereign Theme Engine — Black or White Page Controller
export type ThemeMode = 'paper' | 'oled' | 'auto';

export function getPreferredTheme(): ThemeMode {
  const stored = localStorage.getItem('othrys-theme') as ThemeMode | null;
  return stored || 'auto';
}

export function applyTheme(mode: ThemeMode, emitToast = false) {
  const root = document.documentElement;
  localStorage.setItem('othrys-theme', mode);

  if (mode === 'paper') {
    root.setAttribute('data-theme', 'light');
  } else if (mode === 'oled') {
    root.setAttribute('data-theme', 'dark');
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  // Update theme toggle icon / title
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const currentApplied = root.getAttribute('data-theme');
    themeToggle.textContent = currentApplied === 'dark' ? '☀' : '☾';
    themeToggle.title = currentApplied === 'dark' ? 'Switch to Paper White' : 'Switch to OLED Black';
  }

  // Sync settings radio buttons if present
  const radio = document.querySelector<HTMLInputElement>(`input[name="theme-choice"][value="${mode}"]`);
  if (radio) radio.checked = true;

  if (emitToast && (window as unknown as { showToast?: (msg: string) => void }).showToast) {
    const name = mode === 'paper' ? 'Paper White (#ffffff)' : mode === 'oled' ? 'OLED Pure Black (#000000)' : 'System Sync';
    (window as unknown as { showToast: (msg: string) => void }).showToast(`Theme: ${name}`);
  }
}

export function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const nextMode: ThemeMode = current === 'dark' ? 'paper' : 'oled';
  applyTheme(nextMode, true);
}

export function setHighContrast(enabled: boolean) {
  const root = document.documentElement;
  if (enabled) {
    root.setAttribute('data-contrast', 'high');
    localStorage.setItem('othrys-contrast', 'high');
  } else {
    root.removeAttribute('data-contrast');
    localStorage.removeItem('othrys-contrast');
  }
}

export function initThemeController() {
  const preferred = getPreferredTheme();
  applyTheme(preferred, false);

  if (localStorage.getItem('othrys-contrast') === 'high') {
    setHighContrast(true);
    const cb = document.getElementById('contrast-toggle') as HTMLInputElement | null;
    if (cb) cb.checked = true;
  }

  // Listen to system changes if in auto mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getPreferredTheme() === 'auto') {
      applyTheme('auto', false);
    }
  });

  const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn?.addEventListener('click', toggleTheme);

  // Settings drawer radio listeners
  document.querySelectorAll<HTMLInputElement>('input[name="theme-choice"]').forEach((input) => {
    input.addEventListener('change', () => {
      applyTheme(input.value as ThemeMode, true);
    });
  });

  const contrastToggle = document.getElementById('contrast-toggle') as HTMLInputElement | null;
  contrastToggle?.addEventListener('change', (e) => {
    const checked = (e.target as HTMLInputElement).checked;
    setHighContrast(checked);
    if ((window as unknown as { showToast?: (msg: string) => void }).showToast) {
      (window as unknown as { showToast: (msg: string) => void }).showToast(checked ? 'High Contrast Mode Enabled' : 'High Contrast Mode Disabled');
    }
  });
}
