# Ryvo

This repository contains the static Ryvo product website. The repository name and current sitemap host still use the legacy ZimLive name; DNS, domain ownership, and redirects are outside this code change.

Ryvo is a product of **O’Riley Foundation**, its parent company. The intended product architecture has native Android and iOS clients, a browser-based web app, and shared backend services.

## Current implementation status

The related [`ryvo-hardened`](https://github.com/elvkun/ryvo-hardened) repository retains the Android app and contains iOS and web starter screens. Android is currently an offline UI prototype. Authentication, messaging, live data, payments, and shared production APIs have not been implemented there.

This site presents product direction and interface concepts. Example feeds, profiles, counts, wallets, and service screens are illustrative UI; they do not indicate active users, verified accounts, processed payments, live synchronization, or deployed services. Update this disclosure when those capabilities are implemented and verified.

## Website

The site is a static `index.html` page. Open it directly or serve the repository with a static web server. Styling and fonts load from external CDNs. UI design tokens and guidance are in [`DESIGN.md`](DESIGN.md).

The sitemap is [`sitemap.xml`](sitemap.xml). It retains the current `zimlive.app` host; update it after a Ryvo domain and any migration redirects are established. The parent company website is [O’Riley Foundation](https://www.orileyplatforms.com/).
