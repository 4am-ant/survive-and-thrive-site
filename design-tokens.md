# Design tokens (Survive & Thrive)

## Status
This file is the single source of truth for visual “facts” we’ve confirmed.
If anything here changes, update this file first, then implement.

---

## Colours

### Brand
- Brand purple (primary): `#8702A9` (rgb(135, 2, 169))
- Brand purple (hover): `rgb(173, 3, 216)` (hex TBD)

### Backgrounds
- Site background: `#ffffff`
- Soft panel background (used on home hero content box + mobile nav overlay): `#f8f0ff`

### Text
- Navbar link text: `#000000`
- Navbar link hover: brand purple (`#8702A9`)
- Active nav indicator: brand purple underline, text remains black

### TODO (to extract)
- Body text colour(s)
- Heading colour(s)
- Link colour(s) in body + hover/visited
- Border colours used for cards/dividers
- Focus ring colour (we should add one if missing)

---

## Typography

### Font families
- Primary: `Quicksand`
- Secondary: `Muli`

### TODO (to extract/decide)
- Base font size (desktop + mobile)
- Heading scale (H1–H4 etc)
- Line heights
- Font weights actually used
- Letter spacing (if any)
- Button text casing (as-is vs forced uppercase)

---

## Buttons

### Primary button
- Background: brand purple `#8702A9`
- Hover background: `rgb(173, 3, 216)`
- Transition: `background-color 0.3s ease`
- Shape: “square” (i.e. not pill/rounded; exact radius TBD)

### TODO
- Padding (x/y)
- Border radius numeric value
- Font size/weight
- Border: none vs 1px (TBD)
- Shadow: none vs subtle (TBD)

---

## Navigation

### Desktop behaviour
- Links black; hover purple.
- Active page: purple underline (text stays black).

### Responsive behaviour
1) As viewport shrinks: nav text shrinks.
2) At a breakpoint: some links collapse into a “More” dropdown.
3) At a smaller breakpoint: hamburger menu replaces navbar.
4) Hamburger opens overlay:
   - Background: `#f8f0ff`
   - Current implementation: full screen; allowed improvement: partial width panel.

### TODO (to extract)
- Exact breakpoints for (2) and (3)
- Exact dropdown styling
- Overlay width if changed (proposal: 320–420px depending on breakpoint)

---

## Layout patterns

### Home hero block
- Wrapper with horizontal padding (keeps content off edges).
- Inner: flex row with no gap: [image] + [content panel]
- Content panel background: `#f8f0ff`
- Content panel uses large internal padding to centre text.
- Responsive:
  - image shrinks without distortion
  - text size adjusts
  - at a breakpoint, flex switches to column (image above panel, matching widths)

### TODO (to extract/decide)
- Image:panel width ratio at desktop
- Wrapper max-width (if any)
- Padding values (outer + inner)
- Breakpoint where it stacks

---

## Spacing scale

### Approach (agreed)
Use Tailwind as a token system:
- define colours + fonts
- use utilities mainly for layout
- use component classes/components for buttons/nav/etc

### TODO (to define)
- spacing scale mapping (Tailwind default vs custom)
- section vertical rhythm (spacing between major blocks)
- container padding at xs/sm/md/lg

---

## Breakpoints

### TODO
- Confirm breakpoints from either:
  - computed CSS used / builder settings (preferred), or
  - pragmatic choices that look close enough.

We will record final breakpoints here once chosen.