---
name: Modern African Professional
colors:
  surface: '#eafef2'
  surface-dim: '#cbdfd3'
  surface-bright: '#eafef2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e4f9ec'
  surface-container: '#def3e6'
  surface-container-high: '#d9ede1'
  surface-container-highest: '#d3e7db'
  on-surface: '#0e1f17'
  on-surface-variant: '#414945'
  inverse-surface: '#23342c'
  inverse-on-surface: '#e1f6e9'
  outline: '#717975'
  outline-variant: '#c0c8c4'
  surface-tint: '#3b6759'
  primary: '#00241b'
  on-primary: '#ffffff'
  primary-container: '#0b3b2f'
  on-primary-container: '#78a696'
  inverse-primary: '#a2d0bf'
  secondary: '#006c44'
  on-secondary: '#ffffff'
  secondary-container: '#8df8bd'
  on-secondary-container: '#007349'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#caa83a'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bdeddb'
  primary-fixed-dim: '#a2d0bf'
  on-primary-fixed: '#002018'
  on-primary-fixed-variant: '#224e42'
  secondary-fixed: '#8df8bd'
  secondary-fixed-dim: '#71dba2'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005232'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e7c353'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#eafef2'
  on-background: '#0e1f17'
  surface-variant: '#d3e7db'
  leaf-green: '#2E9E6B'
  ink: '#061710'
  forest-deep: '#0B3B2F'
  premium-gold: '#FFD966'
  mint-mist: '#F4F9F6'
  forest-slate: '#3C5A4F'
typography:
  headline-lg:
    fontFamily: Syne
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  subheading-italic:
    fontFamily: Fraunces
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  caption:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  gutter: 24px
  section-gap: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system embodies the "Modern African Professional" aesthetic—a synthesis of high-trust institutional stability and the vibrant energy of the continent's digital revolution. It is designed for a pan-African super-app audience that demands sophisticated, bank-grade reliability without sacrificing cultural soul.

The visual style is **Corporate / Modern** with a **Glassmorphic** overlay layer. It utilizes a "Forest Growth" narrative, where deep, grounded greens represent security and wealth, while vibrant leaf-greens and gold accents signify growth and premium opportunity. A subtle SVG grain texture is applied globally to evoke a tactile, high-end "analog" feel, moving the UI away from sterile digital minimalism toward something more organic and textured.

## Colors

The palette is anchored by **Deep Forest Green** and **Ink**, used for primary surfaces and high-contrast typography to establish immediate trust. **Leaf Green** serves as the functional primary for action states, success indicators, and interactive elements. 

**Gold** is reserved strictly for premium tiers, alerts, and high-value decorative gradients, ensuring it retains its psychological impact. Backgrounds utilize **Mint Mist** rather than pure white to maintain the organic, forest-inspired theme, while **Forest Slate** provides a soft, legible alternative for secondary information.

## Typography

This design system employs a three-font strategy to balance character with utility. **Syne** is used for headlines to provide a bold, distinctive personality that stands out in a crowded market. **Fraunces (Italic)** is used sparingly for subheadings and editorial pull-quotes, adding a layer of warmth and sophisticated elegance.

**DM Sans** handles all functional UI text, ensuring high legibility for financial data and social feeds. Large headlines use tight leading and slight negative letter-spacing for a modern, high-impact look, while body text maintains generous leading to support readability across diverse device types.

## Layout & Spacing

The system follows a **Fixed Grid** approach for desktop (1280px max-width) and a **Fluid Grid** for mobile. It uses an 8px base unit rhythm to ensure vertical harmony across components.

- **Desktop:** 12-column grid with 24px gutters and 40px margins.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px gutters and 20px margins.

Whitespace is treated as a premium asset; sections are separated by large gaps (80px+) to allow the brand elements to breathe and prevent the "super-app" complexity from overwhelming the user.

## Elevation & Depth

Hierarchy is communicated through **Glassmorphic layering** and **Ambient shadows**. Rather than heavy, dark shadows, this system uses low-opacity, tinted shadows that pull from the background colors (e.g., a Deep Forest green tint in the shadow).

1.  **Base Layer:** Solid Mint Mist background with a subtle noise texture overlay.
2.  **Surface Level:** White cards with 1px hairline borders in `rgba(46, 158, 107, 0.1)`.
3.  **Floating Level:** Used for Modals and Navigation bars. These utilize `backdrop-filter: blur(12px)` and a semi-transparent white fill (`rgba(255, 255, 255, 0.7)`).
4.  **Interactive Depth:** Hover states utilize a soft, diffused shadow (`0 20px 40px rgba(11, 59, 47, 0.08)`) to suggest a physical "lift" from the screen.

## Shapes

The shape language is organic and friendly, avoiding sharp edges to feel approachable. Standard UI containers use **1rem (16px)** roundedness. High-interaction elements like buttons and chips use **Pill-shaped** radii to differentiate them from static content containers. 

Thin, consistent borders (1px) are used to define boundaries within the glassmorphic layers, ensuring that even with transparency, the structure remains clear.

## Components

### Buttons
- **Primary:** Pill-shaped, Leaf Green background with white text. High-contrast and energetic.
- **Secondary:** Pill-shaped, transparent background with a 1px Leaf Green border.
- **Tertiary/Ghost:** No border or background, DM Sans Bold text in Forest Deep.

### Cards
- **Standard:** White background, 16px radius, subtle 1px border.
- **Premium (Gold Tier):** Glassmorphic background with a subtle Gold-to-Transparent gradient border and gold accents.

### Input Fields
- **Default:** 12px radius, light Mint Mist background, 1px Border Soft.
- **Focused:** Border changes to Leaf Green with a 2px outer glow of the same color at 10% opacity.

### Chips & Badges
- **Status:** Small pill-shaped containers.
- **Feature Badges:** 40px pill-shape with Leaf Green icon backgrounds and caption-level typography.

### Social Feed
- Items are separated by generous padding. The feed uses a "White Label" card strategy—stacking white content cards on the Mint Mist background to create a clean, modern information density.