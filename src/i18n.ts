// Sovereign Internationalization (i18n) Engine — 100% Client-Side
export type Locale = 'en' | 'nl' | 'fr' | 'de' | 'es';

export interface Translations {
  navGenerator: string;
  navHowItWorks: string;
  navPrivacy: string;
  navFaq: string;
  navAbout: string;
  navAccount: string;
  navSettings: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  modeText: string;
  modeWifi: string;
  labelPayload: string;
  placeholderPayload: string;
  helpPayload: string;
  labelSsid: string;
  labelSecurity: string;
  labelPassword: string;
  labelHidden: string;
  helpWifi: string;
  btnClear: string;
  btnPng: string;
  btnSvg: string;
  btnCopy: string;
  statusEmpty: string;
  statusCreating: string;
  statusReady: string;
  statusCopied: string;
  cookieBadge: string;
  cookieGuaranteeTitle: string;
  cookieGuaranteeText: string;
  aboutTitle: string;
  aboutText: string;
  vaultTitle: string;
  vaultStorage: string;
  vaultExport: string;
  vaultImport: string;
  vaultWipe: string;
  settingsTitle: string;
  settingsTheme: string;
  settingsThemePaper: string;
  settingsThemeOled: string;
  settingsThemeAuto: string;
  settingsContrast: string;
  footerTagline: string;
  footerRights: string;
}

export const DICTIONARY: Record<Locale, Translations> = {
  en: {
    navGenerator: 'Generator',
    navHowItWorks: 'How it works',
    navPrivacy: 'Privacy & Legal',
    navFaq: 'FAQ',
    navAbout: 'About',
    navAccount: 'Vault',
    navSettings: 'Settings',
    heroEyebrow: 'FREE · STATIC · PRIVATE',
    heroTitle: 'Free QR code generator',
    heroDescription: 'Create a QR code for a website link, text, or Wi-Fi network. Download a PNG or SVG, with no account required.',
    modeText: '↗   Text or URL',
    modeWifi: '⌁   Wi-Fi network',
    labelPayload: 'Your text or link',
    placeholderPayload: 'https://your-next-great-idea.com',
    helpPayload: 'For a website, include https:// so phones can open it as a link. Up to 1,000 UTF-8 bytes.',
    labelSsid: 'Network name (SSID)',
    labelSecurity: 'Security',
    labelPassword: 'Network password',
    labelHidden: 'Hidden network',
    helpWifi: 'SSIDs and passwords stay in your browser. Anyone with this code can read the credentials.',
    btnClear: 'Clear',
    btnPng: 'Download PNG',
    btnSvg: 'SVG',
    btnCopy: 'Copy payload',
    statusEmpty: 'Add some content to see your QR code.',
    statusCreating: 'Creating your QR code…',
    statusReady: 'Ready. Test with your phone before sharing.',
    statusCopied: 'Payload copied to clipboard.',
    cookieBadge: 'Zero Cookies',
    cookieGuaranteeTitle: 'Zero-Cookie & Zero-Storage Guarantee',
    cookieGuaranteeText: 'FreeQR does not use cookies or third-party trackers; only anonymous, cookieless page-view counts (stats.othrys.be, no IP stored, respecting Do Not Track / GPC, 90-day expiry) run. No cookie banner is required because zero non-essential data is stored.',
    aboutTitle: 'About FreeQR & OTHRYS',
    aboutText: 'FreeQR is an independent sovereign utility engineered by OTHRYS. It runs 100% in your browser sandbox with zero cloud reliance.',
    vaultTitle: 'Sovereign Client-Side Vault',
    vaultStorage: 'Browser Local Storage Used',
    vaultExport: 'Export Settings (JSON)',
    vaultImport: 'Import Settings',
    vaultWipe: 'Wipe Local Vault',
    settingsTitle: 'Display & Accessibility Settings',
    settingsTheme: 'Page Theme (Black or White)',
    settingsThemePaper: 'Paper White (#ffffff)',
    settingsThemeOled: 'OLED Pure Black (#000000)',
    settingsThemeAuto: 'System Sync',
    settingsContrast: 'High Contrast Mode (WCAG AAA)',
    footerTagline: 'Permanent static QR codes with zero cookies or third-party tracking.',
    footerRights: '© 2026 OTHRYS. Built to be useful, private, and durable.'
  },
  nl: {
    navGenerator: 'Generator',
    navHowItWorks: 'Hoe het werkt',
    navPrivacy: 'Privacy & Juridisch',
    navFaq: 'Veelgestelde vragen',
    navAbout: 'Over ons',
    navAccount: 'Kluis',
    navSettings: 'Instellingen',
    heroEyebrow: 'GRATIS · STATISCH · PRIVÉ',
    heroTitle: 'Gratis QR-code generator',
    heroDescription: 'Maak een QR-code voor links, tekst of wifi. Download PNG of SVG direct in uw browser, zonder account.',
    modeText: '↗   Tekst of URL',
    modeWifi: '⌁   Wifi-netwerk',
    labelPayload: 'Uw tekst of link',
    placeholderPayload: 'https://uw-geweldige-idee.be',
    helpPayload: 'Voeg https:// toe voor websites zodat telefoons de link direct openen. Tot 1.000 bytes.',
    labelSsid: 'Netwerknaam (SSID)',
    labelSecurity: 'Beveiliging',
    labelPassword: 'Wifi-wachtwoord',
    labelHidden: 'Verborgen netwerk',
    helpWifi: 'SSID en wachtwoord blijven uitsluitend in uw browser. Iedereen die de code scant kan dit lezen.',
    btnClear: 'Wissen',
    btnPng: 'Download PNG',
    btnSvg: 'SVG',
    btnCopy: 'Kopieer inhoud',
    statusEmpty: 'Voer inhoud in om uw QR-code te zien.',
    statusCreating: 'QR-code wordt berekend…',
    statusReady: 'Klaar. Test met uw telefoon voor gebruik.',
    statusCopied: 'Inhoud gekopieerd naar klembord.',
    cookieBadge: 'Nul Cookies',
    cookieGuaranteeTitle: 'Nul-Cookie & Privacy Garantie',
    cookieGuaranteeText: 'FreeQR gebruikt geen cookies of tracking van derden. Alleen anonieme paginatellingen zonder cookies of IP (Do Not Track / GPC gerespecteerd, 90 dagen bewaard). Geen cookiebanner nodig conform ePrivacy en AVG.',
    aboutTitle: 'Over FreeQR & OTHRYS',
    aboutText: 'FreeQR is een soeverein hulpprogramma van OTHRYS. Draait 100% in uw browser zonder servers.',
    vaultTitle: 'Lokale Soevereine Kluis',
    vaultStorage: 'Browseropslag in gebruik',
    vaultExport: 'Exporteer back-up (JSON)',
    vaultImport: 'Importeer instellingen',
    vaultWipe: 'Lokale kluis wissen',
    settingsTitle: 'Weergave & Toegankelijkheid',
    settingsTheme: 'Paginathema (Zwart of Wit)',
    settingsThemePaper: 'Papierwit (#ffffff)',
    settingsThemeOled: 'OLED Puur Zwart (#000000)',
    settingsThemeAuto: 'Systeemvoorkeur',
    settingsContrast: 'Hoog contrast (WCAG AAA)',
    footerTagline: 'Permanente statische QR-codes zonder cookies of tracking van derden.',
    footerRights: '© 2026 OTHRYS. Gebouwd om nuttig, privé en duurzaam te zijn.'
  },
  fr: {
    navGenerator: 'Générateur',
    navHowItWorks: 'Comment ça marche',
    navPrivacy: 'Confidentialité & Légal',
    navFaq: 'FAQ',
    navAbout: 'À propos',
    navAccount: 'Coffre',
    navSettings: 'Paramètres',
    heroEyebrow: 'GRATUIT · STATIQUE · PRIVÉ',
    heroTitle: 'Générateur de QR code gratuit',
    heroDescription: 'Créez un QR code pour un lien, texte ou Wi-Fi. Téléchargez en PNG ou SVG sans créer de compte.',
    modeText: '↗   Texte ou URL',
    modeWifi: '⌁   Réseau Wi-Fi',
    labelPayload: 'Votre texte ou lien',
    placeholderPayload: 'https://votre-super-site.fr',
    helpPayload: 'Incluez https:// pour les sites web afin que les téléphones l’ouvrent directement. Jusqu’à 1 000 octets.',
    labelSsid: 'Nom du réseau (SSID)',
    labelSecurity: 'Sécurité',
    labelPassword: 'Mot de passe Wi-Fi',
    labelHidden: 'Réseau masqué',
    helpWifi: 'Les identifiants restent localement dans votre navigateur.',
    btnClear: 'Effacer',
    btnPng: 'Télécharger PNG',
    btnSvg: 'SVG',
    btnCopy: 'Copier le contenu',
    statusEmpty: 'Ajoutez du contenu pour générer le QR code.',
    statusCreating: 'Génération du QR code…',
    statusReady: 'Prêt. Testez avec votre téléphone avant de partager.',
    statusCopied: 'Contenu copié dans le presse-papiers.',
    cookieBadge: 'Zéro Cookie',
    cookieGuaranteeTitle: 'Garantie Zéro Cookie & Souveraineté',
    cookieGuaranteeText: 'FreeQR n’utilise aucun cookie ni traceur tiers ; seul un comptage anonyme des pages vues sans cookies ni IP (Do Not Track / GPC respecté, 90 jours) est effectué. Aucune bannière requise.',
    aboutTitle: 'À propos de FreeQR & OTHRYS',
    aboutText: 'FreeQR est un utilitaire souverain développé par OTHRYS. 100% exécuté dans votre navigateur.',
    vaultTitle: 'Coffre Local Souverain',
    vaultStorage: 'Stockage local utilisé',
    vaultExport: 'Exporter sauvegarde (JSON)',
    vaultImport: 'Importer sauvegarde',
    vaultWipe: 'Effacer le coffre local',
    settingsTitle: 'Affichage & Accessibilité',
    settingsTheme: 'Thème (Noir ou Blanc)',
    settingsThemePaper: 'Blanc papier (#ffffff)',
    settingsThemeOled: 'Noir pur OLED (#000000)',
    settingsThemeAuto: 'Automatique',
    settingsContrast: 'Contraste élevé (WCAG AAA)',
    footerTagline: 'QR codes statiques permanents sans cookies ni suivi tiers.',
    footerRights: '© 2026 OTHRYS. Conçu pour être utile, privé et durable.'
  },
  de: {
    navGenerator: 'Generator',
    navHowItWorks: 'Funktionsweise',
    navPrivacy: 'Datenschutz & Recht',
    navFaq: 'FAQ',
    navAbout: 'Über uns',
    navAccount: 'Tresor',
    navSettings: 'Einstellungen',
    heroEyebrow: 'KOSTENLOS · STATISCH · PRIVAT',
    heroTitle: 'Kostenloser QR-Code Generator',
    heroDescription: 'Erstellen Sie QR-Codes für Links, Texte oder WLAN. PNG oder SVG ohne Registrierung herunterladen.',
    modeText: '↗   Text oder URL',
    modeWifi: '⌁   WLAN-Netzwerk',
    labelPayload: 'Ihr Text oder Link',
    placeholderPayload: 'https://ihre-tolle-website.de',
    helpPayload: 'Websites mit https:// versehen. Bis zu 1.000 Bytes.',
    labelSsid: 'Netzwerkname (SSID)',
    labelSecurity: 'Sicherheit',
    labelPassword: 'WLAN-Passwort',
    labelHidden: 'Verstecktes Netzwerk',
    helpWifi: 'WLAN-Daten verbleiben ausschließlich in Ihrem Browser.',
    btnClear: 'Leeren',
    btnPng: 'PNG herunterladen',
    btnSvg: 'SVG',
    btnCopy: 'Inhalt kopieren',
    statusEmpty: 'Geben Sie Inhalte ein, um den QR-Code zu sehen.',
    statusCreating: 'QR-Code wird erzeugt…',
    statusReady: 'Fertig. Bitte vor der Weitergabe prüfen.',
    statusCopied: 'In die Zwischenablage kopiert.',
    cookieBadge: 'Null Cookies',
    cookieGuaranteeTitle: 'Null-Cookie & Datenschutz-Garantie',
    cookieGuaranteeText: 'FreeQR nutzt weder Cookies noch Tracking durch Dritte; nur anonyme Seitenaufrufe ohne Cookies oder IP-Speicherung (Do Not Track / GPC, 90 Tage). Keine Cookie-Banner gemäß DSGVO.',
    aboutTitle: 'Über FreeQR & OTHRYS',
    aboutText: 'FreeQR ist ein souveränes Werkzeug von OTHRYS, das zu 100% lokal im Browser läuft.',
    vaultTitle: 'Lokaler Tresor',
    vaultStorage: 'Lokaler Speicher belegt',
    vaultExport: 'Exportieren (JSON)',
    vaultImport: 'Importieren',
    vaultWipe: 'Tresor löschen',
    settingsTitle: 'Anzeige & Barrierefreiheit',
    settingsTheme: 'Seiten-Design (Schwarz oder Weiß)',
    settingsThemePaper: 'Papierweiß (#ffffff)',
    settingsThemeOled: 'OLED Tiefschwarz (#000000)',
    settingsThemeAuto: 'Systemstandard',
    settingsContrast: 'Hoher Kontrast (WCAG AAA)',
    footerTagline: 'Permanente statische QR-Codes ohne Cookies oder Drittanbieter-Tracking.',
    footerRights: '© 2026 OTHRYS. Nützlich, privat und langlebig.'
  },
  es: {
    navGenerator: 'Generador',
    navHowItWorks: 'Cómo funciona',
    navPrivacy: 'Privacidad y Legal',
    navFaq: 'Preguntas',
    navAbout: 'Acerca de',
    navAccount: 'Bóveda',
    navSettings: 'Ajustes',
    heroEyebrow: 'GRATIS · ESTÁTICO · PRIVADO',
    heroTitle: 'Generador de códigos QR gratis',
    heroDescription: 'Cree códigos QR estáticos para enlaces, texto o Wi-Fi. Descargue en PNG o SVG sin registro.',
    modeText: '↗   Texto o URL',
    modeWifi: '⌁   Red Wi-Fi',
    labelPayload: 'Su texto o enlace',
    placeholderPayload: 'https://su-gran-sitio.es',
    helpPayload: 'Incluya https:// para que los móviles lo abran como enlace. Hasta 1.000 bytes.',
    labelSsid: 'Nombre de red (SSID)',
    labelSecurity: 'Seguridad',
    labelPassword: 'Contraseña Wi-Fi',
    labelHidden: 'Red oculta',
    helpWifi: 'Los datos nunca salen de su navegador.',
    btnClear: 'Limpiar',
    btnPng: 'Descargar PNG',
    btnSvg: 'SVG',
    btnCopy: 'Copiar contenido',
    statusEmpty: 'Añada contenido para ver el código QR.',
    statusCreating: 'Generando código QR…',
    statusReady: 'Listo. Pruebe con su móvil antes de compartir.',
    statusCopied: 'Contenido copiado al portapapeles.',
    cookieBadge: 'Cero Cookies',
    cookieGuaranteeTitle: 'Garantía Cero Cookies y Privacidad',
    cookieGuaranteeText: 'FreeQR no utiliza cookies ni rastreo de terceros; solo recuenta visitas anónimas sin cookies ni IP (Do Not Track / GPC respetado, 90 días). Sin banners molestos según el RGPD.',
    aboutTitle: 'Acerca de FreeQR y OTHRYS',
    aboutText: 'FreeQR es una utilidad soberana de OTHRYS que funciona 100% en el navegador.',
    vaultTitle: 'Bóveda Local Soberana',
    vaultStorage: 'Almacenamiento local utilizado',
    vaultExport: 'Exportar respaldo (JSON)',
    vaultImport: 'Importar respaldo',
    vaultWipe: 'Borrar bóveda local',
    settingsTitle: 'Diseño y Accesibilidad',
    settingsTheme: 'Tema de página (Negro o Blanco)',
    settingsThemePaper: 'Blanco papel (#ffffff)',
    settingsThemeOled: 'Negro puro OLED (#000000)',
    settingsThemeAuto: 'Sincronizar sistema',
    settingsContrast: 'Alto contraste (WCAG AAA)',
    footerTagline: 'Códigos QR permanentes sin cookies ni rastreo de terceros.',
    footerRights: '© 2026 OTHRYS. Construido para ser útil, privado y duradero.'
  }
};

let currentLocale: Locale = 'en';

export function getLocale(): Locale {
  return currentLocale;
}

export function getTranslations(): Translations {
  return DICTIONARY[currentLocale];
}

export function setLocale(locale: Locale, emitToast = false) {
  if (!DICTIONARY[locale]) return;
  currentLocale = locale;
  document.documentElement.lang = locale;
  localStorage.setItem('othrys-locale', locale);

  const t = DICTIONARY[locale];
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n') as keyof Translations;
    if (key && t[key]) {
      node.textContent = t[key];
    }
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((node) => {
    const key = node.getAttribute('data-i18n-placeholder') as keyof Translations;
    if (key && t[key] && 'placeholder' in node) {
      (node as HTMLInputElement).placeholder = t[key];
    }
  });

  const langSelect = document.getElementById('lang-select') as HTMLSelectElement | null;
  if (langSelect && langSelect.value !== locale) {
    langSelect.value = locale;
  }

  if (emitToast && (window as unknown as { showToast?: (msg: string) => void }).showToast) {
    (window as unknown as { showToast: (msg: string) => void }).showToast(`Language switched to ${locale.toUpperCase()}`);
  }
}

export function initI18n() {
  const urlParam = new URLSearchParams(window.location.search).get('lang') as Locale | null;
  const stored = localStorage.getItem('othrys-locale') as Locale | null;
  const browser = navigator.language?.slice(0, 2) as Locale;
  const initialLocale: Locale = (urlParam && DICTIONARY[urlParam])
    ? urlParam
    : (stored && DICTIONARY[stored])
    ? stored
    : (DICTIONARY[browser] ? browser : 'en');

  const langSelect = document.getElementById('lang-select') as HTMLSelectElement | null;
  langSelect?.addEventListener('change', (e) => {
    setLocale((e.target as HTMLSelectElement).value as Locale, true);
  });

  setLocale(initialLocale, false);
}
