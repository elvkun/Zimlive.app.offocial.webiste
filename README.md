# Flow

This repository contains Flow's static product website. The repository name and current sitemap host still use the legacy ZimLive name; DNS, domain ownership, and redirects are outside this code change.

Flow is a product of **O’Riley Foundation**, its parent company. The intended product architecture has native Android and iOS clients, a browser-based web app, and shared backend services. The linked repository roles, shared color palette, and current capability statements are maintained in the [Flow product system](https://github.com/elvkun/ryvo-hardened/blob/main/docs/PRODUCT_SYSTEM.md).

## Current implementation status

The related [`ryvo-hardened`](https://github.com/elvkun/ryvo-hardened) repository contains the Android app, iOS introduction, browser app, and API source. The browser app uses Firebase Auth and Firestore for accounts, profiles, private listing drafts, reports, and published listing discovery when a Firebase project is configured. Android service screens use local demonstration data; iOS does not yet connect to shared accounts or services. Payments, identity verification, messaging, and AI services are not available.

This site presents product direction and interface concepts. Example feeds, profiles, counts, wallets, and service screens are illustrative UI; they do not indicate active users, verified accounts, processed payments, live synchronization, or deployed services. Update this disclosure when those capabilities are implemented and verified.

## Website

The site uses semantic `index.html`, a standalone stylesheet at [`styles/site.css`](styles/site.css), and a small native ES module at [`scripts/site.js`](scripts/site.js) for accessible mobile navigation and lightweight reveal motion. It has no framework, build step, third-party runtime dependencies, analytics, or remote assets. Scroll reveals use the browser's `IntersectionObserver` once per element and animate only opacity and position; there are no continuous loops or added image/font downloads. Motion is omitted for reduced-motion preferences, and content remains visible without JavaScript. Serve the repository root with any static web server; root-relative asset paths expect the site to be hosted at the domain root. UI design tokens and guidance are in [`DESIGN.md`](DESIGN.md).

The sitemap is [`sitemap.xml`](sitemap.xml), and [`robots.txt`](robots.txt) points crawlers to it at the current apex host `zimlive.app`. Fragment links are in-page navigation and are not separate sitemap entries. The parent company website is [O’Riley Foundation](https://www.orileyplatforms.com/).

The public platform section contains an inline Firebase email sign-in, account creation, email verification, and password recovery experience. It stays on `zimlive.app`; it does not send credentials to a separate app site. Account controls remain disabled until the public Firebase web configuration is added and the Firebase Email/Password provider is enabled. Follow [Firebase web account setup](docs/FIREBASE_WEB_ACCOUNT_SETUP.md) before enabling them. Store links open Google Play and Apple App Store search pages because verified Flow listing URLs have not been provided. The social preview and favicon are local SVG assets; interface artwork is illustrative rather than live product data.

The page's Content Security Policy allows same-origin app code plus the pinned Firebase Web SDK CDN and the specific Firebase Authentication endpoints used by email/password sign-in, while disallowing form submission, objects, and framing. [`vercel.json`](vercel.json) applies matching response headers, including `frame-ancestors 'none'`, for Vercel deployments. If you deploy this static site elsewhere, configure equivalent headers at that host; `frame-ancestors` is ignored inside a meta policy.

## Security maintenance

GitHub CodeQL analyzes the website JavaScript on pushes, pull requests, and weekly. Dependabot checks GitHub Actions dependencies weekly. This site has no package manager dependencies to audit. The Vercel response-header configuration adds framing protection and browser security headers; review code-scanning alerts and keep these workflows enabled.
