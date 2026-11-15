# Website-aligned logos with taglines — v2

Current reusable logo set, 15 November 2026. Supersedes the earlier abstract concepts while preserving them as history.

## Names and exact taglines

- Flow — IDEAS IN MOTION. Verified against https://zimlive.app/ header and local source.
- O’Riley Foundation — PRODUCTS WITH PURPOSE. Verified against https://www.orileyplatforms.com/src/site.js header. This is the public name displayed on the website.
- O’Riley Platforms — PRODUCTS WITH PURPOSE. Alternate name requested by the owner; not a claim that the website has been renamed.

The websites also contain other headings and footer captions. This kit uses their primary header brand taglines.

## Files

Each brand directory contains horizontal, reversed horizontal and stacked logos in SVG and PNG. Every logo includes its name and tagline as part of the artwork. Reversed assets are for dark backgrounds; regular assets are for white or pale backgrounds. PNG backgrounds are transparent.

All SVGs contain native paths and shapes, with outlined Noto Sans Bold lettering and no embedded raster artwork, external fonts, scripts or linked resources. They scale without loss. PNG dimensions are recorded in manifest.json; they are rendered at twice the SVG dimensions. Use SVG for print/design where supported and PNG for platforms that require raster uploads. Preserve proportions and clear space; verify tagline readability at the chosen display size. Small app icons generally need a symbol-only derivative, because full taglines will be unreadable at tiny sizes.

Native vector design follows the websites’ forest-green rounded F/O tiles and typographic lockups. No image-generation model was used for v2. build_logos.py reproduces the files using system Noto Sans Bold, fontTools, librsvg and Cairo; these are build-time requirements, not requirements for opening the logos.

Open preview.html locally. The previous v1 files remain available separately. This updates reusable logo assets, not deployed application or website UI. No trademark clearance is claimed.
