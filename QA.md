# Verification — 2026-10-29

- `npm run typecheck`: passed.
- `npm test`: 7 passed. Independently decoded 1024 px PNG output with jsQR for URL, Unicode, escaped Wi-Fi and 1,000-byte content; checked SVG output structure. Payload tests cover escaping, exact preservation, byte limit, missing SSID/password and open networks.
- `npm run build`: passed; static `dist/` generated.
- Dependency installation audit: zero vulnerabilities after updating Vite and Vitest.
- T3 collaborative browser smoke test at localhost: live preview loaded at 1024 px; PNG and SVG download actions invoked; Wi-Fi generated; missing password and over-limit content reported; stale downloads disabled; clear removed preview and returned focus. No external resource requests observed.

Physical phone scans, Wi-Fi joining, print tests, screen reader testing and clipboard permission behavior remain manual checks in README. Automated decoding establishes actual encoding for tested samples, not universal scanner compatibility.
