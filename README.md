# FreeQR

A standalone, static QR generator built with Vite, vanilla TypeScript, semantic HTML and custom responsive CSS. QR encoding uses the locally bundled `qrcode` library. No backend, hosted QR service, accounts, analytics, tracking, external fonts or runtime API calls.

## Run

Node.js 22.12+ (or 24 LTS) and npm are recommended.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

On Windows with PowerShell script execution disabled, use `npm.cmd` instead of `npm`.

`dist/` is the independently deployable static build. Serve it from any static web host; no server application is needed. Vite defaults to a root path; set its `base` option when hosting in a subdirectory. Nothing has been deployed or connected to external services.

## Behavior and limitations

- Text/URL is the default. Input is encoded exactly, without trimming or URL rewriting. Include `https://` for web links.
- Wi-Fi supports personal WPA/WPA2/WPA3, legacy WEP and open networks, plus hidden SSIDs. Reserved payload characters are escaped. Enterprise Wi-Fi is not supported; scanners and devices vary.
- Entries exist only in page memory. Clearing or reloading removes them. Clipboard contents and downloaded files remain under the user's control. Anyone who receives a Wi-Fi code can recover its credentials.
- Preview and downloads use black modules on white with a four-module quiet zone and medium error correction. PNG is 1024 × 1024; SVG is vector. Content is limited to 1,000 UTF-8 bytes to keep exports practical. Dense codes require larger physical sizes.
- Static codes cannot be edited after distribution. They have no built-in expiry, but linked destinations can change or disappear and network credentials can change.
- Clipboard access needs a secure context (HTTPS or localhost) and browser permission. Copy errors are reported in the page.
- No scan tracking or promise of compatibility with every scanner. Automated tests independently decode representative generated PNGs using `jsQR`, including Unicode, Wi-Fi and maximum-length input; SVG structure is checked. Always perform final device and print tests.

## Domain and SEO

The unique title, description and OpenGraph text are present. The page uses `noindex, nofollow` and `robots.txt` blocks crawling because no public hostname is confirmed. There is deliberately no placeholder canonical, `og:url`, sitemap or external social image. After a real domain is approved: add its canonical and `og:url`, change robots directives to permit indexing, and generate a sitemap with the confirmed absolute URL. Deployment/domain configuration is outside this initial build.

## Manual functional QA

1. Enter a URL with `https://`; confirm live preview, download PNG and SVG, open both files, and scan the final files on iOS and Android. Confirm the destination matches exactly.
2. Try plain text, Unicode, surrounding whitespace and content over 1,000 UTF-8 bytes. Confirm exact content and clear error handling; stale codes/downloads must disappear on edits.
3. Switch to Wi-Fi. Try secured, open and hidden networks; include semicolons, colons and backslashes in credentials. Scan on an intended device and confirm joining works. Check that open networks omit the password.
4. Copy the payload, including Wi-Fi content. Deny clipboard permission and confirm an accessible error. Clear and confirm all content and preview disappear and focus returns to the active input.
5. Navigate using only keyboard, including radio arrows and FAQ summaries. Check visible focus, labels, error announcements, disabled actions and layout at 320 px and 200% zoom.
6. Check DevTools Network while typing: no payload requests or third-party resources. Inspect a production build locally with `npm run preview`.

