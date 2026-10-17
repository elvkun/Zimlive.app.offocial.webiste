# Flow visual system

This guide keeps the Flow website, Android application, and iOS and web apps visually aligned. The website uses semantic HTML, a separate CSS design system, and a small JavaScript module for mobile navigation. Visual examples must not imply a connected service where none is available.

## Brand palette

| Token | Value | Use |
| --- | --- | --- |
| Forest | `#0B3B2F` | Brand marks, primary actions, strong surfaces |
| Pine | `#006C49` | Interactive accents and selected states |
| Emerald | `#10B981` | Small highlights and positive indicators |
| Bright mint | `#6CF8BB` | Contrast accent on dark forest surfaces |
| Mint | `#E6FBF2` | Soft feature fills and selected backgrounds |
| Canvas | `#F7FAF8` | Main page and app background |
| White | `#FFFFFF` | Cards and form surfaces |
| Ink | `#181C1B` | Primary text |
| Muted | `#414945` | Secondary text |
| Line | `#D9E8E2` | Dividers, outlines, and card edges |

Use the forest and pine colors for text on pale surfaces. Reserve bright mint and emerald for accents; do not use them for small text on white. Keep destructive and error states distinct from brand green.

## Type and layout

- Use a clear system sans-serif stack so the static page does not depend on a third-party font service. The Android app uses its native sans-serif typography.
- Give headings a compact, confident rhythm and body text generous line spacing. Avoid all-caps for paragraphs; use it sparingly for short labels.
- Center content in a fluid container up to roughly 1180px. Use 24px mobile gutters and 40px desktop gutters.
- Use white cards, thin green-gray borders, and low-contrast shadows. Keep gradients and blur effects subtle.
- Maintain visible keyboard focus, sufficient contrast, reduced-motion support, semantic headings, and a skip link.
- Use quiet, short reveal motion for key content and small hover feedback on pointer devices. Animate opacity and transform only, observe each reveal once, and never rely on animation to disclose essential content. Respect `prefers-reduced-motion`; do not add looping effects, scroll listeners, animation packages, or large media for decoration.

## Website constraints

The public product page is a lightweight static site with `index.html`, `styles/site.css`, and `scripts/site.js`. It has no framework runtime, analytics, tracking pixels, third-party fonts, or remote images. Keep JavaScript limited to progressive enhancement and preserve usable navigation when it is unavailable. Links should lead to real sections or the O’Riley Foundation site; do not add forms or app-store links until the destinations and services exist.

Product examples and platform descriptions must match the project repositories. Label mock interface art as illustrative, avoid invented user or transaction counts, and state when an activity remains local demo data. The existing `zimlive.app` canonical and sitemap host are retained until the owner selects and configures a Flow domain.
