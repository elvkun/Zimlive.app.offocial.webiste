# Flow

This repository contains Flow's static product website. The repository name and current sitemap host still use the legacy ZimLive name; DNS, domain ownership, and redirects are outside this code change.

Flow is a product of **O’Riley Foundation**, its parent company. The intended product architecture has native Android and iOS clients, a browser-based web app, and shared backend services.

## Current implementation status

The related [`ryvo-hardened`](https://github.com/elvkun/ryvo-hardened) repository contains the Android prototype and iOS and web previews. The web preview supports a limited marketplace flow when its API and Supabase services are configured. Android remains a local UI demonstration; iOS is an informational preview. Production payments, identity verification, messaging, and AI services are not available.

This site presents product direction and interface concepts. Example feeds, profiles, counts, wallets, and service screens are illustrative UI; they do not indicate active users, verified accounts, processed payments, live synchronization, or deployed services. Update this disclosure when those capabilities are implemented and verified.

## Website

The site is a static, semantic `index.html` page with embedded CSS and no JavaScript runtime or third-party runtime dependencies. Open it directly or serve the repository with any static web server. UI design tokens and guidance are in [`DESIGN.md`](DESIGN.md).

The sitemap is [`sitemap.xml`](sitemap.xml), and [`robots.txt`](robots.txt) points crawlers to it. Both retain the current `zimlive.app` host; update them only after a Flow domain and any migration redirects are established. Fragment links are in-page navigation and are not separate sitemap entries. The parent company website is [O’Riley Foundation](https://www.orileyplatforms.com/).

The social preview and favicon are local SVG assets. The public page contains no account form or fake app download action. It describes the current app scope and uses illustrative interface artwork rather than remote screenshots or live product data.

The page's meta-delivered Content Security Policy disables scripts, network connections, forms, objects, and framing, and allows only the embedded stylesheet and same-origin assets. Static hosts should also send response headers for `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and `Content-Security-Policy: frame-ancestors 'none'`; `frame-ancestors` is ignored inside a meta policy.
