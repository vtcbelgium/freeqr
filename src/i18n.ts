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
  tabCreate: string;
  tabScan: string;
  badgeReverse: string;
  stepEnterContent: string;
  badgeLocalGen: string;
  createHeading: string;
  modeUrl: string;
  modeText: string;
  modeWifi: string;
  modeEmail: string;
  modePhone: string;
  modeSms: string;
  modeVcard: string;
  modeLocation: string;
  labelUrl: string;
  helpUrl: string;
  labelPayload: string;
  placeholderPayload: string;
  helpPayload: string;
  labelSsid: string;
  labelSecurity: string;
  labelPassword: string;
  labelHidden: string;
  helpWifi: string;
  labelEmailTo: string;
  labelEmailSubject: string;
  labelEmailBody: string;
  labelPhoneNum: string;
  labelSmsNum: string;
  labelSmsMsg: string;
  labelVcardFirst: string;
  labelVcardLast: string;
  labelVcardOrg: string;
  labelVcardPhone: string;
  labelVcardEmail: string;
  labelVcardUrl: string;
  labelGeoLat: string;
  labelGeoLng: string;
  labelQuickPresets: string;
  helpGeo: string;
  customizerTitle: string;
  customizerTag: string;
  labelFgColor: string;
  labelCustomColor: string;
  labelCenterLogo: string;
  labelLogoNone: string;
  labelUploadLogo: string;
  customizerHint: string;
  labelPrintFrame: string;
  labelExportRes: string;
  labelEcc: string;
  liveUpdates: string;
  btnClear: string;
  stepPreviewDownload: string;
  badgeLiveCanvas: string;
  previewEmptyTitle: string;
  previewEmptySub: string;
  btnPng: string;
  btnSvg: string;
  btnCopyImage: string;
  btnCopy: string;
  btnPrint: string;
  stepUploadQr: string;
  badgeInBrowserDecoder: string;
  scannerHeading: string;
  scannerDesc: string;
  scannerDropMain: string;
  scannerDropHint: string;
  scannerDecodedLabel: string;
  btnOpenLink: string;
  btnCopyContent: string;
  btnLoadGenerator: string;
  btnScanAnother: string;
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
    tabCreate: 'Create QR Code',
    tabScan: 'Scan / Read QR',
    badgeReverse: 'REVERSE',
    stepEnterContent: '01 / ENTER CONTENT',
    badgeLocalGen: 'LOCAL GENERATION',
    createHeading: 'Create your QR code',
    modeUrl: 'URL',
    modeText: 'Text',
    modeWifi: 'Wi-Fi',
    modeEmail: 'Email',
    modePhone: 'Phone',
    modeSms: 'SMS',
    modeVcard: 'vCard',
    modeLocation: 'Location',
    labelUrl: 'Website URL or Link',
    helpUrl: 'Enter any website link. Phone cameras open this URL with a single tap.',
    labelPayload: 'Your text or message',
    placeholderPayload: 'Enter any text, note, or raw code...',
    helpPayload: 'For a website, include https:// so phones can open it as a link. Up to 1,000 UTF-8 bytes (some characters use more than one).',
    labelSsid: 'Network name (SSID)',
    labelSecurity: 'Security',
    labelPassword: 'Network password',
    labelHidden: 'Hidden network',
    helpWifi: 'SSIDs and passwords stay in your browser. Anyone with this code can read the credentials. Device support varies.',
    labelEmailTo: 'Recipient Email Address',
    labelEmailSubject: 'Subject (optional)',
    labelEmailBody: 'Pre-filled Message (optional)',
    labelPhoneNum: 'Phone Number',
    labelSmsNum: 'Mobile Number',
    labelSmsMsg: 'Pre-filled SMS Text (optional)',
    labelVcardFirst: 'First Name',
    labelVcardLast: 'Last Name',
    labelVcardOrg: 'Organization / Company',
    labelVcardPhone: 'Mobile Phone',
    labelVcardEmail: 'Work Email',
    labelVcardUrl: 'Website',
    labelGeoLat: 'Latitude',
    labelGeoLng: 'Longitude',
    labelQuickPresets: 'Quick Presets:',
    helpGeo: 'Opens Google Maps or Apple Maps directly at specified geographic coordinates.',
    customizerTitle: 'Design, Center Logo & Resolution',
    customizerTag: 'Studio Controls',
    labelFgColor: 'Foreground Color',
    labelCustomColor: 'Custom',
    labelCenterLogo: 'Center Logo / Icon Overlay',
    labelLogoNone: 'None',
    labelUploadLogo: 'Upload Logo ⇪',
    customizerHint: 'Adding an icon automatically elevates error recovery to High (30%) so your QR scans reliably.',
    labelPrintFrame: 'Print Frame & Caption',
    labelExportRes: 'Export Resolution',
    labelEcc: 'Error Correction (Redundancy Level)',
    liveUpdates: 'Updates as you type',
    btnClear: 'Clear',
    stepPreviewDownload: '02 / PREVIEW & DOWNLOAD',
    badgeLiveCanvas: 'LIVE CANVAS',
    previewEmptyTitle: 'Your QR preview will appear here.',
    previewEmptySub: 'Type content above to generate instantly',
    btnPng: 'Download PNG',
    btnSvg: 'SVG',
    btnCopyImage: 'Copy Image',
    btnCopy: 'Copy payload',
    btnPrint: 'Print',
    stepUploadQr: '01 / UPLOAD OR PASTE QR CODE',
    badgeInBrowserDecoder: '100% IN-BROWSER DECODER',
    scannerHeading: 'Scan & Decode Any QR Code',
    scannerDesc: 'Drop any screenshot, flyer image, or photo of a QR code to read its content instantly on your desktop or laptop. Decoded entirely inside your browser sandbox.',
    scannerDropMain: 'Drag & drop a QR image or browse files',
    scannerDropHint: 'Supports PNG, JPG, WEBP, or SVG · or paste directly with Ctrl+V / ⌘+V',
    scannerDecodedLabel: 'Decoded Content:',
    btnOpenLink: 'Open Link ↗',
    btnCopyContent: 'Copy Content',
    btnLoadGenerator: 'Load into Generator ↻',
    btnScanAnother: 'Scan Another Image',
    statusEmpty: 'Add some content to see your QR code.',
    statusCreating: 'Creating your QR code…',
    statusReady: 'Ready. Test with your phone before sharing.',
    statusCopied: 'Payload copied to clipboard.',
    cookieBadge: 'Zero Cookies',
    cookieGuaranteeTitle: 'Cookies and optional statistics',
    cookieGuaranteeText: 'FreeQR uses no analytics cookies. QR entries stay in your browser. Optional pseudonymous pageview statistics are sent only after you accept in Privacy choices. The service derives a daily visitor hash from network and browser information; a 90-day deletion schedule is configured.',
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
    tabCreate: 'QR-code maken',
    tabScan: 'QR scannen / lezen',
    badgeReverse: 'OMGEKEERD',
    stepEnterContent: '01 / INHOUD INVOEREN',
    badgeLocalGen: 'LOKALE GENERATIE',
    createHeading: 'Maak uw QR-code',
    modeUrl: 'URL',
    modeText: 'Tekst',
    modeWifi: 'Wifi',
    modeEmail: 'E-mail',
    modePhone: 'Telefoon',
    modeSms: 'SMS',
    modeVcard: 'vCard',
    modeLocation: 'Locatie',
    labelUrl: 'Website-URL of link',
    helpUrl: 'Voer een website-URL in. Smartphonecamera’s openen deze link met één tik.',
    labelPayload: 'Uw tekst of bericht',
    placeholderPayload: 'Voer tekst, notitie of code in...',
    helpPayload: 'Voeg https:// toe voor websites zodat telefoons de link direct openen. Tot 1.000 bytes.',
    labelSsid: 'Netwerknaam (SSID)',
    labelSecurity: 'Beveiliging',
    labelPassword: 'Wifi-wachtwoord',
    labelHidden: 'Verborgen netwerk',
    helpWifi: 'SSID en wachtwoord blijven uitsluitend in uw browser. Iedereen die de code scant kan dit lezen.',
    labelEmailTo: 'E-mailadres ontvanger',
    labelEmailSubject: 'Onderwerp (optioneel)',
    labelEmailBody: 'Vooringevuld bericht (optioneel)',
    labelPhoneNum: 'Telefoonnummer',
    labelSmsNum: 'Mobiel nummer',
    labelSmsMsg: 'Vooringevuld SMS-bericht (optioneel)',
    labelVcardFirst: 'Voornaam',
    labelVcardLast: 'Achternaam',
    labelVcardOrg: 'Organisatie / Bedrijf',
    labelVcardPhone: 'Mobiele telefoon',
    labelVcardEmail: 'Zakelijk e-mailadres',
    labelVcardUrl: 'Website',
    labelGeoLat: 'Breedtegraad',
    labelGeoLng: 'Lengtegraad',
    labelQuickPresets: 'Snelle voorinstellingen:',
    helpGeo: 'Opent Google Maps of Apple Kaarten direct op deze coördinaten.',
    customizerTitle: 'Ontwerp, Logo & Resolutie',
    customizerTag: 'Studio-opties',
    labelFgColor: 'Voorgrondkleur',
    labelCustomColor: 'Aangepast',
    labelCenterLogo: 'Middenlogo / Pictogram',
    labelLogoNone: 'Geen',
    labelUploadLogo: 'Logo uploaden ⇪',
    customizerHint: 'Een pictogram verhoogt de foutcorrectie automatisch naar Hoog (30%) zodat de QR betrouwbaar scant.',
    labelPrintFrame: 'Printkader & Bijschrift',
    labelExportRes: 'Exportresolutie',
    labelEcc: 'Foutcorrectie (Redundantieniveau)',
    liveUpdates: 'Wordt direct bijgewerkt',
    btnClear: 'Wissen',
    stepPreviewDownload: '02 / VOORBEELD & DOWNLOADEN',
    badgeLiveCanvas: 'LIVE CANVAS',
    previewEmptyTitle: 'Uw QR-voorbeeld verschijnt hier.',
    previewEmptySub: 'Typ hierboven om direct te genereren',
    btnPng: 'Download PNG',
    btnSvg: 'SVG',
    btnCopyImage: 'Kopieer afbeelding',
    btnCopy: 'Kopieer inhoud',
    btnPrint: 'Afdrukken',
    stepUploadQr: '01 / QR-CODE UPLOADEN OF PLAKKEN',
    badgeInBrowserDecoder: '100% IN-BROWSER DECODER',
    scannerHeading: 'Scan en decodeer elke QR-code',
    scannerDesc: 'Sleep een screenshot, flyerafbeelding of foto van een QR-code hierheen om de inhoud direct uit te lezen. Volledig lokaal gedecodeerd in uw browser.',
    scannerDropMain: 'Sleep een QR-afbeelding hierheen of blader door bestanden',
    scannerDropHint: 'Ondersteunt PNG, JPG, WEBP of SVG · of plak direct met Ctrl+V / ⌘+V',
    scannerDecodedLabel: 'Gedecodeerde inhoud:',
    btnOpenLink: 'Link openen ↗',
    btnCopyContent: 'Inhoud kopiëren',
    btnLoadGenerator: 'Laden in generator ↻',
    btnScanAnother: 'Nog een afbeelding scannen',
    statusEmpty: 'Voer inhoud in om uw QR-code te zien.',
    statusCreating: 'QR-code wordt berekend…',
    statusReady: 'Klaar. Test met uw telefoon voor gebruik.',
    statusCopied: 'Inhoud gekopieerd naar klembord.',
    cookieBadge: 'Nul Cookies',
    cookieGuaranteeTitle: 'Cookies en optionele statistieken',
    cookieGuaranteeText: 'FreeQR gebruikt geen analytische cookies. QR-invoer blijft in je browser. Optionele pseudonieme paginastatistieken worden alleen verstuurd nadat je toestemming geeft via Privacykeuzes. De dienst leidt een dagelijks bezoekerskenmerk af van netwerk- en browsergegevens; verwijdering na 90 dagen is geconfigureerd.',
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
    tabCreate: 'Créer un QR code',
    tabScan: 'Scanner / Lire un QR',
    badgeReverse: 'INVERSÉ',
    stepEnterContent: '01 / SAISIR LE CONTENU',
    badgeLocalGen: 'GÉNÉRATION LOCALE',
    createHeading: 'Créez votre QR code',
    modeUrl: 'URL',
    modeText: 'Texte',
    modeWifi: 'Wi-Fi',
    modeEmail: 'E-mail',
    modePhone: 'Téléphone',
    modeSms: 'SMS',
    modeVcard: 'vCard',
    modeLocation: 'Position',
    labelUrl: 'URL ou lien du site web',
    helpUrl: 'Entrez n’importe quel lien web. Les smartphones l’ouvrent d’un seul toucher.',
    labelPayload: 'Votre texte ou message',
    placeholderPayload: 'Saisissez un texte, une note ou un code...',
    helpPayload: 'Incluez https:// pour les sites web afin que les téléphones l’ouvrent directement. Jusqu’à 1 000 octets.',
    labelSsid: 'Nom du réseau (SSID)',
    labelSecurity: 'Sécurité',
    labelPassword: 'Mot de passe Wi-Fi',
    labelHidden: 'Réseau masqué',
    helpWifi: 'Les identifiants restent localement dans votre navigateur.',
    labelEmailTo: 'Adresse e-mail du destinataire',
    labelEmailSubject: 'Objet (optionnel)',
    labelEmailBody: 'Message pré-rempli (optionnel)',
    labelPhoneNum: 'Numéro de téléphone',
    labelSmsNum: 'Numéro de mobile',
    labelSmsMsg: 'Message SMS pré-rempli (optionnel)',
    labelVcardFirst: 'Prénom',
    labelVcardLast: 'Nom',
    labelVcardOrg: 'Organisation / Entreprise',
    labelVcardPhone: 'Téléphone mobile',
    labelVcardEmail: 'E-mail professionnel',
    labelVcardUrl: 'Site web',
    labelGeoLat: 'Latitude',
    labelGeoLng: 'Longitude',
    labelQuickPresets: 'Préréglages rapides :',
    helpGeo: 'Ouvre Google Maps ou Apple Plans aux coordonnées géographiques indiquées.',
    customizerTitle: 'Design, Logo central & Résolution',
    customizerTag: 'Contrôles Studio',
    labelFgColor: 'Couleur de premier plan',
    labelCustomColor: 'Personnalisé',
    labelCenterLogo: 'Logo central / Icône',
    labelLogoNone: 'Aucun',
    labelUploadLogo: 'Importer un logo ⇪',
    customizerHint: 'L’ajout d’une icône élève automatiquement la correction d’erreur à Élevée (30%).',
    labelPrintFrame: 'Cadre & Légende d’impression',
    labelExportRes: 'Résolution d’exportation',
    labelEcc: 'Correction d’erreurs (Redondance)',
    liveUpdates: 'Mise à jour en direct',
    btnClear: 'Effacer',
    stepPreviewDownload: '02 / APERÇU & TÉLÉCHARGEMENT',
    badgeLiveCanvas: 'CANEVAS EN DIRECT',
    previewEmptyTitle: 'L’aperçu du QR code apparaîtra ici.',
    previewEmptySub: 'Saisissez du contenu ci-dessus pour générer instantanément',
    btnPng: 'Télécharger PNG',
    btnSvg: 'SVG',
    btnCopyImage: 'Copier l’image',
    btnCopy: 'Copier le contenu',
    btnPrint: 'Imprimer',
    stepUploadQr: '01 / IMPORTER OU COLLER UN QR CODE',
    badgeInBrowserDecoder: 'DÉCODEUR 100% NAVIGATEUR',
    scannerHeading: 'Scanner et décoder tout QR code',
    scannerDesc: 'Déposez une capture d’écran, image ou photo de QR code pour lire son contenu instantanément dans votre navigateur.',
    scannerDropMain: 'Glissez-déposez une image QR ou parcourez vos fichiers',
    scannerDropHint: 'Prend en charge PNG, JPG, WEBP ou SVG · ou collez avec Ctrl+V / ⌘+V',
    scannerDecodedLabel: 'Contenu décodé :',
    btnOpenLink: 'Ouvrir le lien ↗',
    btnCopyContent: 'Copier le contenu',
    btnLoadGenerator: 'Charger dans le générateur ↻',
    btnScanAnother: 'Scanner une autre image',
    statusEmpty: 'Ajoutez du contenu pour générer le QR code.',
    statusCreating: 'Génération du QR code…',
    statusReady: 'Prêt. Testez avec votre téléphone avant de partager.',
    statusCopied: 'Contenu copié dans le presse-papiers.',
    cookieBadge: 'Zéro Cookie',
    cookieGuaranteeTitle: 'Cookies et statistiques facultatives',
    cookieGuaranteeText: 'FreeQR ne définit pas de cookies analytiques. Les données du QR restent dans le navigateur. Des statistiques facultatives pseudonymes ne sont envoyées que si vous les acceptez dans les choix de confidentialité. Un identifiant quotidien est dérivé des informations réseau et navigateur; une suppression après 90 jours est configurée.',
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
    tabCreate: 'QR-Code erstellen',
    tabScan: 'QR scannen / lesen',
    badgeReverse: 'UMGEKEHRT',
    stepEnterContent: '01 / INHALT EINGEBEN',
    badgeLocalGen: 'LOKALE ERZEUGUNG',
    createHeading: 'Erstellen Sie Ihren QR-Code',
    modeUrl: 'URL',
    modeText: 'Text',
    modeWifi: 'WLAN',
    modeEmail: 'E-Mail',
    modePhone: 'Telefon',
    modeSms: 'SMS',
    modeVcard: 'vCard',
    modeLocation: 'Standort',
    labelUrl: 'Website-URL oder Link',
    helpUrl: 'Geben Sie einen beliebigen Website-Link ein. Smartphone-Kameras öffnen ihn mit einem Tippen.',
    labelPayload: 'Ihr Text oder Nachricht',
    placeholderPayload: 'Text, Notiz oder Code eingeben...',
    helpPayload: 'Websites mit https:// versehen. Bis zu 1.000 Bytes.',
    labelSsid: 'Netzwerkname (SSID)',
    labelSecurity: 'Sicherheit',
    labelPassword: 'WLAN-Passwort',
    labelHidden: 'Verstecktes Netzwerk',
    helpWifi: 'WLAN-Daten verbleiben ausschließlich in Ihrem Browser.',
    labelEmailTo: 'Empfänger-E-Mail-Adresse',
    labelEmailSubject: 'Betreff (optional)',
    labelEmailBody: 'Vorgefüllte Nachricht (optional)',
    labelPhoneNum: 'Telefonnummer',
    labelSmsNum: 'Mobilnummer',
    labelSmsMsg: 'Vorgefüllte SMS (optional)',
    labelVcardFirst: 'Vorname',
    labelVcardLast: 'Nachname',
    labelVcardOrg: 'Organisation / Firma',
    labelVcardPhone: 'Mobiltelefon',
    labelVcardEmail: 'Geschäftliche E-Mail',
    labelVcardUrl: 'Website',
    labelGeoLat: 'Breitengrad',
    labelGeoLng: 'Längengrad',
    labelQuickPresets: 'Schnellauswahl:',
    helpGeo: 'Öffnet Google Maps oder Apple Karten direkt an den angegebenen Koordinaten.',
    customizerTitle: 'Design, Logo & Auflösung',
    customizerTag: 'Studio-Optionen',
    labelFgColor: 'Vordergrundfarbe',
    labelCustomColor: 'Benutzerdefiniert',
    labelCenterLogo: 'Zentrales Logo / Symbol',
    labelLogoNone: 'Keines',
    labelUploadLogo: 'Logo hochladen ⇪',
    customizerHint: 'Ein Symbol erhöht die Fehlerkorrektur automatisch auf Hoch (30%).',
    labelPrintFrame: 'Druckrahmen & Beschriftung',
    labelExportRes: 'Export-Auflösung',
    labelEcc: 'Fehlerkorrektur (Redundanz)',
    liveUpdates: 'Aktualisiert beim Tippen',
    btnClear: 'Leeren',
    stepPreviewDownload: '02 / VORSCHAU & DOWNLOAD',
    badgeLiveCanvas: 'LIVE-VORSCHAU',
    previewEmptyTitle: 'Ihre QR-Vorschau erscheint hier.',
    previewEmptySub: 'Oben eingeben, um sofort zu erzeugen',
    btnPng: 'PNG herunterladen',
    btnSvg: 'SVG',
    btnCopyImage: 'Bild kopieren',
    btnCopy: 'Inhalt kopieren',
    btnPrint: 'Drucken',
    stepUploadQr: '01 / QR-CODE HOCHLADEN / EINFÜGEN',
    badgeInBrowserDecoder: '100% BROWSER-DECODER',
    scannerHeading: 'Jeden QR-Code scannen & dekodieren',
    scannerDesc: 'Ziehen Sie einen Screenshot, Flyer oder ein Foto eines QR-Codes hierher, um ihn lokal im Browser auszulesen.',
    scannerDropMain: 'QR-Bild hierher ziehen oder Dateien durchsuchen',
    scannerDropHint: 'Unterstützt PNG, JPG, WEBP oder SVG · oder direkt einfügen mit Strg+V / ⌘+V',
    scannerDecodedLabel: 'Dekodierter Inhalt:',
    btnOpenLink: 'Link öffnen ↗',
    btnCopyContent: 'Inhalt kopieren',
    btnLoadGenerator: 'In Generator laden ↻',
    btnScanAnother: 'Weiteres Bild scannen',
    statusEmpty: 'Geben Sie Inhalte ein, um den QR-Code zu sehen.',
    statusCreating: 'QR-Code wird erzeugt…',
    statusReady: 'Fertig. Bitte vor der Weitergabe prüfen.',
    statusCopied: 'In die Zwischenablage kopiert.',
    cookieBadge: 'Null Cookies',
    cookieGuaranteeTitle: 'Cookies und optionale Statistiken',
    cookieGuaranteeText: 'FreeQR setzt keine Analyse-Cookies. QR-Eingaben bleiben im Browser. Optionale pseudonyme Seitenstatistiken werden erst nach Zustimmung in den Datenschutzeinstellungen übertragen. Ein täglicher Besucher-Hash entsteht aus Netzwerk- und Browserinformationen; eine Löschung nach 90 Tagen ist konfiguriert.',
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
    tabCreate: 'Crear código QR',
    tabScan: 'Escanear / Leer QR',
    badgeReverse: 'INVERSO',
    stepEnterContent: '01 / INTRODUCIR CONTENIDO',
    badgeLocalGen: 'GENERACIÓN LOCAL',
    createHeading: 'Cree su código QR',
    modeUrl: 'URL',
    modeText: 'Texto',
    modeWifi: 'Wi-Fi',
    modeEmail: 'Correo',
    modePhone: 'Teléfono',
    modeSms: 'SMS',
    modeVcard: 'vCard',
    modeLocation: 'Ubicación',
    labelUrl: 'URL o enlace del sitio web',
    helpUrl: 'Introduzca cualquier enlace web. Las cámaras móviles lo abren con un solo toque.',
    labelPayload: 'Su texto o mensaje',
    placeholderPayload: 'Escriba cualquier texto, nota o código...',
    helpPayload: 'Incluya https:// para que los móviles lo abran como enlace. Hasta 1.000 bytes.',
    labelSsid: 'Nombre de red (SSID)',
    labelSecurity: 'Seguridad',
    labelPassword: 'Contraseña Wi-Fi',
    labelHidden: 'Red oculta',
    helpWifi: 'Los datos nunca salen de su navegador.',
    labelEmailTo: 'Correo del destinatario',
    labelEmailSubject: 'Asunto (opcional)',
    labelEmailBody: 'Mensaje predefinido (opcional)',
    labelPhoneNum: 'Número de teléfono',
    labelSmsNum: 'Número móvil',
    labelSmsMsg: 'Texto SMS predefinido (opcional)',
    labelVcardFirst: 'Nombre',
    labelVcardLast: 'Apellidos',
    labelVcardOrg: 'Organización / Empresa',
    labelVcardPhone: 'Teléfono móvil',
    labelVcardEmail: 'Correo laboral',
    labelVcardUrl: 'Sitio web',
    labelGeoLat: 'Latitud',
    labelGeoLng: 'Longitud',
    labelQuickPresets: 'Ajustes rápidos:',
    helpGeo: 'Abre Google Maps o Apple Maps directamente en las coordenadas indicadas.',
    customizerTitle: 'Diseño, Logotipo y Resolución',
    customizerTag: 'Controles de estudio',
    labelFgColor: 'Color principal',
    labelCustomColor: 'Personalizado',
    labelCenterLogo: 'Logotipo o icono central',
    labelLogoNone: 'Ninguno',
    labelUploadLogo: 'Subir logotipo ⇪',
    customizerHint: 'Añadir un icono eleva la corrección de errores a Alta (30%) para un escaneo fiable.',
    labelPrintFrame: 'Marco y texto de impresión',
    labelExportRes: 'Resolución de exportación',
    labelEcc: 'Corrección de errores (Redundancia)',
    liveUpdates: 'Se actualiza al escribir',
    btnClear: 'Limpiar',
    stepPreviewDownload: '02 / VISTA PREVIA Y DESCARGA',
    badgeLiveCanvas: 'LIENZO EN VIVO',
    previewEmptyTitle: 'Su vista previa QR aparecerá aquí.',
    previewEmptySub: 'Escriba arriba para generar al instante',
    btnPng: 'Descargar PNG',
    btnSvg: 'SVG',
    btnCopyImage: 'Copiar imagen',
    btnCopy: 'Copiar contenido',
    btnPrint: 'Imprimir',
    stepUploadQr: '01 / SUBIR O PEGAR CÓDIGO QR',
    badgeInBrowserDecoder: 'DECODIFICADOR 100% EN NAVEGADOR',
    scannerHeading: 'Escanear y decodificar cualquier QR',
    scannerDesc: 'Arrastre cualquier captura de pantalla, folleto o foto de un código QR para leer su contenido al instante en su navegador.',
    scannerDropMain: 'Arrastre una imagen QR o examine archivos',
    scannerDropHint: 'Compatible con PNG, JPG, WEBP o SVG · o pegue con Ctrl+V / ⌘+V',
    scannerDecodedLabel: 'Contenido decodificado:',
    btnOpenLink: 'Abrir enlace ↗',
    btnCopyContent: 'Copiar contenido',
    btnLoadGenerator: 'Cargar en generador ↻',
    btnScanAnother: 'Escanear otra imagen',
    statusEmpty: 'Añada contenido para ver el código QR.',
    statusCreating: 'Generando código QR…',
    statusReady: 'Listo. Pruebe con su móvil antes de compartir.',
    statusCopied: 'Contenido copiado al portapapeles.',
    cookieBadge: 'Cero Cookies',
    cookieGuaranteeTitle: 'Cookies y estadísticas opcionales',
    cookieGuaranteeText: 'FreeQR no utiliza cookies analíticas. Los datos del QR permanecen en el navegador. Solo se envían estadísticas seudónimas opcionales tras aceptarlas en las preferencias de privacidad. Se obtiene un identificador diario de los datos de red y navegador; hay una eliminación configurada a los 90 días.',
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
