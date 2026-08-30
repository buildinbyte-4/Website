---
name: BuildInByte
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#ffb873'
  on-tertiary: '#4b2800'
  tertiary-container: '#e89337'
  on-tertiary-container: '#5b3200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb873'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  container-max: 1280px
---

## Brand & Style
The design system for this product is built on a "Precision-Glow" aesthetic, blending the rigorous logic of engineering with the ethereal quality of ultra-modern digital interfaces. It targets high-level stakeholders and technical leads, evoking a sense of reliability, high-performance computing, and future-forward innovation.

The visual style is a refined execution of **Glassmorphism** set against a deep, structural backdrop. It utilizes translucent layers with high-refraction background blurs to create depth without clutter. High-precision details—such as hairline borders, micro-interactions, and glowing accent states—mimic the experience of a high-end IDE or a sophisticated hardware monitoring dashboard.

## Colors
The palette is dominated by a Deep Slate neutral, providing a low-light environment where neon-inspired accents can function as functional signals.

- **Primary (Cyan):** Used for primary actions, technical status indicators, and high-frequency data points.
- **Secondary (Violet):** Used for complex logic flows, secondary CTAs, and decorative gradients that imply depth.
- **Background:** A solid #0f172a serves as the "void" layer, ensuring all glass elements maintain high legibility and contrast.
- **Glows:** Use low-opacity radial gradients for hover states and active indicators to simulate an emissive hardware display.

## Typography
The typography system prioritizes clarity and technical precision. 
- **Headlines:** Utilize **Geist** for its mechanical yet approachable geometric structure. Use tight letter spacing for large displays to create a sophisticated, editorial feel.
- **Body:** **Inter** provides maximum legibility for long-form technical descriptions and specifications.
- **Metadata/Labels:** **JetBrains Mono** is used for all technical labels, version numbers, and system status updates to reinforce the engineering agency narrative.

## Layout & Spacing
The layout follows a strict 12-column grid system with a "Logic-Gate" flow—content is structured to show sequential engineering processes.

- **Desktop:** 12 columns, 24px gutters, 80px side margins. 
- **Tablet:** 8 columns, 16px gutters, 40px side margins.
- **Mobile:** 4 columns, 16px gutters, 20px side margins.

Spacing follows a 4px baseline shift. Large vertical gaps (120px+) should be used between major sections to allow the background blurs and glows room to breathe, preventing the "glass" from appearing cluttered.

## Elevation & Depth
Depth is created through "Optical Stacking" rather than traditional shadows.
1. **Base Layer:** #0f172a (Solid).
2. **Glass Layer:** 50% opacity slate with a 20px backdrop-blur. 
3. **Stroke Layer:** 1px solid border at 10% white (top/left) and 5% white (bottom/right) to simulate a light source catching the edge of a glass pane.
4. **Glow Layer:** Elements in an "active" or "hover" state emit a soft 20px radial blur of Cyan or Violet from beneath the glass pane, creating a localized illumination effect.

## Shapes
Shapes are intentionally disciplined. A "Soft" roundedness (0.25rem - 0.75rem) is applied to maintain a professional, corporate feel. Full "Pill" shapes are reserved strictly for status badges and tags to distinguish them from functional buttons and structural cards.

## Components
- **Buttons:** Primary buttons use a solid Cyan fill with black text for maximum contrast. Secondary buttons are "Ghost" style with a 1px Cyan border and a subtle background glow on hover.
- **Hardware/Software Cards:** Utilize the glassmorphic style with a fixed aspect ratio. Include a "Tech Stack" footer using Mono-spaced labels.
- **Product Showcase Grid:** Features interactive hover states where the card's border-color transitions from 10% white to 100% Cyan upon engagement.
- **Technical Process Timeline:** A vertical or horizontal line (1px Cyan) with "nodes" that glow when the user scrolls to that stage of the process.
- **Inputs:** Dark backgrounds (#020617) with Cyan bottom-borders that expand to full borders on focus.
- **Chips/Tags:** Small, high-contrast badges with `label-caps` typography, using Violet for "In-Progress" and Cyan for "Completed."