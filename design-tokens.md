# Design Tokens & Visual Reference

Source of truth for the Astro rebuild. All values confirmed against the original GoDaddy live site unless marked **(impl)**.

---

## Fonts

### Fonts loaded

| Family (CSS name) | Weights requested | Source |
|---|---|---|
| `'Raleway'` | 300, 400, 600, 700 | Google Fonts `<link>` in `<head>` |
| `'Quicksand'` | 300, 400, 500, 600, 700 | Google Fonts `<link>` in `<head>` |

### CSS variables

```css
--logo-font:    "Raleway",    ui-sans-serif, system-ui, ...
--primary-font: "Quicksand", ui-sans-serif, system-ui, ...
```

---

## Colours

| Token | Value | Usage |
|---|---|---|
| `--brand` | rgb(135, 2, 169) / `#8702a9` | Primary purple — buttons, links, active underline, body heading |
| `--brand-hover` | rgb(173, 3, 216) | Button/link hover state |
| `--bg` | `#ffffff` | Page background |
| `--panel` | `#f8f0ff` | Hero content panel, mobile nav overlay |
| `--dark` | rgb(21, 21, 21) / `#151515` | Nav default, box-announce text, near-black UI text |
| `--box-heading` | rgb(27, 27, 27) / `#1b1b1b` | Box headings (meetings card, conditions titles) |
| `--body-text` | rgb(94, 94, 94) / `#5e5e5e` | Body copy (`.page-copy`) |
| `--sub-text` | rgb(87, 87, 87) / `#575757` | Box text / subtitle (`.hero-sub`, conditions preview) **(impl: consider consolidating with `--body-text`)** |
| `--footer-text` | rgb(89, 89, 89) / `#595959` | Footer copy |

Nav link colours:

- Default: rgb(21, 21, 21) — `--dark`
- Hover: rgb(135, 2, 169) — `--brand`
- Active: `--dark` text + `--brand` underline

Links (inline): rgb(135, 2, 169) — `--brand`

---

## Typography

**Global base defaults:** `font-weight: 400`, `text-align: center` (context may override to left).

Typography is organised into three inheritance groups.

---

### Group A — Quicksand + Uppercase

Base: `font-family: var(--primary-font)`, `text-transform: uppercase`, `font-weight: 400`

#### Nav links

| Property | Value | Notes |
|---|---|---|
| color | rgb(21, 21, 21) | default; hover → brand |
| font-size | 14px → 16px | min at < 1536px, max at ≥ 1536px |
| letter-spacing | 0.214em | 2.996px/14px = 0.214; 3.424px/16px = 0.214 |
| white-space | nowrap | |
| active indicator | brand underline beneath link | |

#### Hero kicker (`.hero-kicker`)

| Property | Value | Notes |
|---|---|---|
| color | rgb(135, 2, 169) | brand |
| font-size | 13px → 16px | mobile: clamp(13px, 3.5vw, 15px); desktop: clamp(13px, 1.2vw, 16px) |
| letter-spacing | 0.214em | matches nav |

#### Body heading (`.page-h1` — section labels e.g. "FOLLOW US ON INSTAGRAM", "SOCIALS")

| Property | Value | Notes |
|---|---|---|
| color | rgb(135, 2, 169) | brand |
| font-size | 16px → 18px | min at < 1536px, max at ≥ 1536px |
| letter-spacing | 0.125em | 2px/16px = 0.125; 2.25px/18px = 0.125 |
| text-align | center in hero; left on most inner pages | |

#### Footer copy (`.site-footer__copy`)

| Property | Value | Notes |
|---|---|---|
| color | rgb(89, 89, 89) | `--footer-text` |
| font-size | 12px → 14px | min at < 1536px, max at ≥ 1536px |
| letter-spacing | 0.083em | 0.996px/12px = 0.083; 1.162px/14px = 0.083 |

#### Button (`.btn-primary`) — deviates: weight 700, has background/shadow

| Property | Value | Notes |
|---|---|---|
| color | rgb(255, 255, 255) | white |
| font-size | 14px → 16px | same scale as nav |
| font-weight | **700** | overrides group default of 400 |
| letter-spacing | 0.214em | same as nav |
| background | rgb(135, 2, 169) | brand |
| min-height | 56px | |
| padding | 0 32px | left and right; vertical via min-height |
| box-shadow | none (default) | |
| hover background | rgb(173, 3, 216) | fade transition |
| hover box-shadow | rgba(0,0,0,0.5) 0px 10px 10px -10px | |

---

### Group B — Quicksand, Normal Case

Base: `font-family: var(--primary-font)`, `font-weight: 400`, no `text-transform`

#### Box heading (meetings card label, conditions page section titles)

| Property | Value | Notes |
|---|---|---|
| color | rgb(27, 27, 27) | `--box-heading` |
| font-size | 22px → 24px | min at < 1536px, max at ≥ 1536px |
| text-align | center on meetings page; left on conditions page | |

#### Box text / subtitle (`.hero-sub`, conditions preview text)

| Property | Value | Notes |
|---|---|---|
| color | rgb(87, 87, 87) | `--sub-text` |
| font-size | 16px → 18px | min at < 1536px, max at ≥ 1536px |
| text-align | center in hero; left on conditions page | |

---

### Group C — Raleway, Normal Case

Base: `font-family: var(--logo-font)`, `font-weight: 400`, no `text-transform`

#### Body text (`.page-copy`)

| Property | Value | Notes |
|---|---|---|
| color | rgb(94, 94, 94) | `--body-text` |
| font-size | 16px → 18px | scales with html `font-size` at 1536px; use `1rem` |
| text-align | center (default) | |

#### Box announce / hero title (`.hero-title`)

| Property | Value | Notes |
|---|---|---|
| color | rgb(21, 21, 21) | `--dark` |
| font-size | 28px → 48px | min observed ~28px (mobile); max 48px at ≥ 1536px |
| letter-spacing | ~0.025em | 0.736px/28px ≈ 0.026; 1.104px/48px ≈ 0.023 — very small, near-normal |
| text-align | center | |

Note on hero-title at 768px: when the layout shifts from stacked to side-by-side, the panel narrows to 34.5% of viewport, so the effective text column shrinks. The font-size should decrease at 768px then grow again as the viewport widens — handle with a narrow-band `(768px–1020px)` media query.

---

## Breakpoints

| Breakpoint | Viewport | Key changes |
|---|---|---|
| xs | ≤ 767px | stacked layout, mobile hamburger |
| sm | ≥ 768px | side-by-side layout begins; hero panel narrows |
| md | ≥ 1024px | container locks to 984px |
| lg | ≥ 1280px | container grows to 1160px |
| xl | ≥ 1536px | container grows to 1280px; body font 16px → 18px; all type scales to max values |

Nav layout breakpoints **(impl — slightly wider than original)**:

- 0–767px: hamburger drawer
- 768–1279px: condensed bar (5 items + "More" dropdown)
- 1280px+: full desktop bar (all items)

---

## Container widths

| Breakpoint | `content-max` max-width | Notes |
|---|---|---|
| < 1024px | 100% fluid | original behaviour |
| ≥ 1024px | **984px** | confirmed from original |
| ≥ 1280px | **1160px** | confirmed from original |
| ≥ 1536px | **1280px** | confirmed from original |

Horizontal padding: `.container-pad` = `clamp(0.75rem, 2.5vw, 2rem)` each side **(impl — smooth)**

---

## Logo sizing

| Breakpoint | `--logo-h` (desktop) | `--logo-h-sm` (mobile, used ≤ 767px) |
|---|---|---|
| Default | `clamp(64px, 8vw, 110px)` | `clamp(44px, 10vw, 70px)` |
| ≤ 640px | 56px | 54px |
| ≤ 480px | 48px | 48px |

Logo dimensions: 2188×572px, aspect ratio ≈ 3.83:1.

---

## Section spacing

| Token | Value |
|---|---|
| `--space-section` | `clamp(34px, 6vw, 70px)` |

Used by: `.home-section`, `.gallery`, `.au__grid + .page-h1`

---

## CSS architecture

Files are imported in `src/styles/global.css` in this order:

```
tailwindcss
01-base-vars.css   ← tokens + base resets + link styles + 1536px body font
02-container.css   ← .container-pad + responsive .content-max
05-typography.css  ← inheritance groups, .page-h1, .page-copy utilities
10-logo.css        ← logo sizing tokens + layout

20-nav.css         ← navlink styles
25-nav-mobile.css  ← burger + drawer
30-buttons.css     ← .btn-primary

40-hero.css        ← consolidated hero (image, kicker, title, sub, padding)

90-responsive.css  ← logo token overrides at ≤640px and ≤480px

50-about-us.css    ← about page grid
51-gallery.css     ← scrollable photo gallery
70-footer.css      ← site footer
52-home.css        ← home page sections

60-forms.css       ← contact form, meetings page, gallery lightbox
61-chat-widget.css ← floating chat widget
```

Emptied (content merged elsewhere):

- `03-base-typography.css` → merged into 01-base-vars.css
- `04-theme.css` → merged into 01-base-vars.css
- `40-hero-media.css` → merged into 40-hero.css
- `41-hero-type.css` → merged into 40-hero.css
- `42-hero-layout.css` → merged into 40-hero.css
- `43-hero-spacing.css` → merged into 40-hero.css
