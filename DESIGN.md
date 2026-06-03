---
name: African-Tech Premium
colors:
  surface: '#e7fff6'
  surface-dim: '#c8dfd7'
  surface-bright: '#e7fff6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e2f9f0'
  surface-container: '#dcf3ea'
  surface-container-high: '#d6ede5'
  surface-container-highest: '#d1e8df'
  on-surface: '#0b1f1a'
  on-surface-variant: '#3d4946'
  inverse-surface: '#20342f'
  inverse-on-surface: '#dff6ed'
  outline: '#6d7a75'
  outline-variant: '#bcc9c4'
  surface-tint: '#006b5b'
  primary: '#006858'
  on-primary: '#ffffff'
  primary-container: '#008470'
  on-primary-container: '#f4fffa'
  inverse-primary: '#6cd9c1'
  secondary: '#755b00'
  on-secondary: '#ffffff'
  secondary-container: '#fed257'
  on-secondary-container: '#745a00'
  tertiary: '#2d655b'
  on-tertiary: '#ffffff'
  tertiary-container: '#477e74'
  on-tertiary-container: '#f4fffb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f6dd'
  primary-fixed-dim: '#6cd9c1'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#005144'
  secondary-fixed: '#ffdf90'
  secondary-fixed-dim: '#ecc248'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'
  tertiary-fixed: '#b4eee1'
  tertiary-fixed-dim: '#99d2c5'
  on-tertiary-fixed: '#00201b'
  on-tertiary-fixed-variant: '#134f46'
  background: '#e7fff6'
  on-background: '#0b1f1a'
  surface-variant: '#d1e8df'
  mint-bg: '#e9fbf4'
  mint-surface: '#f7fcfa'
  muted-gray: '#667970'
  border-line: '#d9e8e2'
  error-red: '#a91216'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-sm:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.2'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.55'
  nav-link:
    fontFamily: DM Sans
    fontSize: 15px
    fontWeight: '800'
    lineHeight: '1'
  eyebrow:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '800'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
  micro:
    fontFamily: DM Sans
    fontSize: 10px
    fontWeight: '800'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1180px
  gutter-desktop: 40px
  gutter-mobile: 24px
  section-v-lg: 86px
  section-v-md: 62px
  gap-component: 16px
  gap-grid: 24px
---

## Brand & Style

The brand personality is **Professional yet Culturally Grounded**, embodying the spirit of a "Social Wallet" that bridges community and commerce. The design style is a blend of **Corporate Modern** and **Glassmorphism**, utilizing high-end digital aesthetics to signal security and innovation.

The UI should evoke a sense of "African-tech" premium: a clean, sophisticated environment that feels technologically advanced yet warm and accessible. This is achieved through the use of soft organic gradients, generous whitespace, and high-contrast typography that commands attention while remaining readable. The aesthetic is "live" and "dynamic," reflecting the real-time nature of community finance.

## Colors

This design system uses a palette rooted in "African Teal" and "Prosperity Gold." 

- **Primary Teal (#008f7a)**: Represents growth, trust, and the core brand identity. Used for primary actions and key brand elements.
- **Secondary Gold (#f3c84e)**: An accent color symbolizing wealth and vitality. Reserved for status indicators, "pulse" animations, and high-value highlights.
- **Surface Strategy**: The background utilizes a subtle vertical gradient from pure white to **Mint Surface**, creating a soft, airy feel that distinguishes it from sterile corporate interfaces.
- **Ink Tiers**: Text is strictly hierarchical, using **Ink** for maximum legibility in body and headings, and **Muted Gray** for secondary metadata and labels.

## Typography

The typography system relies on a high-contrast pairing:
1. **Syne**: A geometric, ultra-modern sans-serif used for headings. Its bold weights create a "tech-forward" display style that feels distinctive and premium.
2. **DM Sans**: A low-contrast, highly legible sans-serif used for all functional text, navigation, and body copy.

**Usage Rules:**
- **Eyebrows**: Always uppercase with slight letter spacing to introduce sections.
- **Display**: Use the tight line-height of `1.0` for large headlines to create a "blocky," authoritative look.
- **Navigation**: Weights are kept heavy (800) to ensure clear interactive affordance despite smaller font sizes.

## Layout & Spacing

The design system utilizes a **Fluid Grid** model with a maximum container width of 1180px. 

- **Vertical Rhythm**: Large sections are separated by 86px on desktop to allow the "Social Wallet" components to breathe. 
- **Component Spacing**: We use an 8px base unit. Cards within a grid typically use a 24px gap, while internal card padding is set to 16px or 24px depending on the scale.
- **Responsive Behavior**: On mobile devices, gutters shrink to 24px and vertical section padding reduces to 62px. Content reflows into a single column, but "Social Marketplace" items may use a two-column horizontal scroll or "carousel" pattern to maintain high information density.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layering**.

- **Surface Tiers**: Base page is a white-to-mint gradient. Elements placed on top (Cards) use a white background or a high-opacity mint background.
- **Shadow Profile**: Shadows are extremely diffused with low opacity. Primary elevation uses a `blur: 80px` and a tint of the brand color `rgba(5, 48, 40, 0.14)` to prevent "muddy" grays.
- **Glassmorphism**: Headers and sticky navigation use a 16px backdrop blur with a 92% opaque background (`#f7fcfa`), creating a sense of physical layering.
- **Floating Elements**: Interactive tooltips and "notification pops" use a tighter, more pronounced shadow to indicate they are in the highest Z-index layer.

## Shapes

The shape language is defined by **Softened Geometry**. 

- **Cards & Containers**: Use a consistent 12px or 16px radius for a modern, approachable feel.
- **Device Frames**: Representations of mobile apps (The "Stage") use a larger 24px to 34px radius to mimic physical hardware.
- **Interactive Elements**: Buttons and inputs use an 8px radius to maintain a slightly more structured, "bank-grade" appearance compared to the softer cards.
- **Status Indicators**: Use "Pill" shapes (999px) for online indicators and tags to provide a visual break from the rectangular grid.

## Components

### Buttons
- **Primary**: Teal background, white text, 8px radius. On hover, subtle translateY(-2px) and a slightly darker teal (#06483f).
- **Secondary/Ghost**: 1px border (#d9e8e2), transparent background, ink text.

### Cards (The "Wallet" Style)
- White background with a 1px border (#d9e8e2).
- Soft ambient shadow on hover.
- Interior padding of 24px.
- Use of "Mint" accent backgrounds for icon containers within the card.

### Input Fields
- Subtle Mint-2 background (#f7fcfa).
- 1px border that transitions to Teal on focus.
- Placeholder text in Muted Gray.

### Chips & Tags
- Pill-shaped.
- Light Teal or Gold backgrounds with high-contrast text for status (e.g., "Active", "Synced").

### Social Wallet Marketplace Items
- Square aspect ratio for product images with a subtle Teal-to-Gold linear gradient overlay (low opacity) to tie into the brand aesthetic.
- "Social Proof" indicators (avatars) should be small, overlapping circles in the bottom corner of the image.