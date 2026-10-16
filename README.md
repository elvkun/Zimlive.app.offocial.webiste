# Flow

This repository contains Flow's static product website. The repository name and current sitemap host still use the legacy ZimLive name; DNS, domain ownership, and redirects are outside this code change.

Flow is a product of **O’Riley Foundation**, its parent company. The intended product architecture has native Android and iOS clients, a browser-based web app, and shared backend services.

## Current implementation status

The related [`ryvo-hardened`](https://github.com/elvkun/ryvo-hardened) repository contains the Android prototype and iOS and web previews. The web preview supports a limited marketplace flow when its API and Supabase services are configured. Android remains a local UI demonstration; iOS is an informational preview. Production payments, identity verification, messaging, and AI services are not available.

This site presents product direction and interface concepts. Example feeds, profiles, counts, wallets, and service screens are illustrative UI; they do not indicate active users, verified accounts, processed payments, live synchronization, or deployed services. Update this disclosure when those capabilities are implemented and verified.

## Website

The site uses semantic `index.html`, a standalone stylesheet at [`styles/site.css`](styles/site.css), and a small native ES module at [`scripts/site.js`](scripts/site.js) for accessible mobile navigation and lightweight reveal motion. It has no framework, build step, third-party runtime dependencies, analytics, or remote assets. Scroll reveals use the browser's `IntersectionObserver` once per element and animate only opacity and position; there are no continuous loops or added image/font downloads. Motion is omitted for reduced-motion preferences, and content remains visible without JavaScript. Serve the repository root with any static web server; root-relative asset paths expect the site to be hosted at the domain root. UI design tokens and guidance are in [`DESIGN.md`](DESIGN.md).

The sitemap is [`sitemap.xml`](sitemap.xml), and [`robots.txt`](robots.txt) points crawlers to it. Both retain the current `zimlive.app` host; update them only after a Flow domain and any migration redirects are established. Fragment links are in-page navigation and are not separate sitemap entries. The parent company website is [O’Riley Foundation](https://www.orileyplatforms.com/).

The social preview and favicon are local SVG assets. The public page contains no account form or fake app download action. It describes the current app scope and uses illustrative interface artwork rather than remote screenshots or live product data.

The page's meta-delivered Content Security Policy allows only same-origin scripts, styles, and assets, while disabling network connections, forms, objects, and framing. Static hosts should also send response headers for `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and `Content-Security-Policy: frame-ancestors 'none'`; `frame-ancestors` is ignored inside a meta policy. Meta policies are defense in depth; response headers are preferred where hosting supports them.

## Security maintenance

GitHub CodeQL analyzes the website JavaScript on pushes, pull requests, and weekly. Dependabot checks GitHub Actions dependencies weekly. This site has no package manager dependencies to audit. The page uses a restrictive same-origin Content Security Policy delivered in a meta element; configure `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy` as response headers at the host because meta policies cannot set those protections. Review code-scanning alerts and keep these workflows enabled.
