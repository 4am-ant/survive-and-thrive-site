# Survive & Thrive site rebuild tracker

## Goal
Rebuild GoDaddy Site Builder site in Astro on Cloudflare Pages.
Not pixel-perfect; close enough to avoid unsettling non-technical users.
Allowed: improvements + replacement of GoDaddy widgets.

## Known facts (confirmed)
- Original GoDaddy theme: **Bisque**
- Brand colour: **#8702A9** (rgb(135, 2, 169))
- Hover brand colour: **rgb(173, 3, 216)**
- Fonts: **Quicksand** and **Muli**
- Site background: **#ffffff**
- Button style: purple square background + `transition: background-color 0.3s ease;` to hover colour
- Navbar:
  - Links: black text; hover = brand purple
  - Active page: brand purple underline (text stays black)
  - Responsive behaviour: shrink text → “More” dropdown → hamburger → full-screen overlay
  - Overlay background: **#f8f0ff**
  - Improvement allowed: overlay can be partial width instead of full-screen
- Home hero layout:
  - Flex container: image + content box side-by-side, no gap
  - Content box background: **#f8f0ff**
  - Wrapper has horizontal padding
  - Responsive: image shrinks w/o distortion; text scales; breakpoint switches to column with image above content box

## Content & assets
- All media downloaded: YES
- Missing page content: available locally, to be inserted later
- Newsletter PDFs: available
- Favicon: currently none; have high-res logo PNG; will create favicon set

## Widgets / behaviour replacements
- Instagram: currently 3 permalinks; likely replace with a feed (future improvement)
- Cookie banner: does not need to match GoDaddy; implement minimal compliant approach
- Contact:
  - Main form: minimal validation; uses recaptcha; on submit sends email (address known)
  - “Chat helper” widget: assumed email-based; to be replaced/replicated
- Map: interactive map + "Get directions" button must be reproduced
- Gallery: auto-advance + swipe/drag + arrow controls on hover

## SEO
- Currently minimal/non-existent; improve
- Keep main URL structure (bookmark safety)
- `/f/` blog-like structure can be dropped
- robots.txt currently:
  - User-agent: *
  - Disallow: /404
- Privacy policy currently empty; replace with a proper one

## Decisions to make (open)
1. Forms:
   - Use Cloudflare Turnstile vs reCAPTCHA?
   - Delivery method: Cloudflare Pages Functions → email provider (needs choice)
2. Chat helper:
   - Keep as a “send us a message” mini-form? Or remove?
3. Map:
   - Use embedded Google Maps, OpenStreetMap/Leaflet, or static map + “Directions” link?
4. Content editing (future):
   - Option A: Markdown content collections in repo (simple, but still GitHub)
   - Option B: Headless CMS (Decap/Netlify CMS, Tina, Storyblok, etc.) (no-code editing)
   - Option C: Cloudflare + something (needs selection)

## Information we still need (from local scrape / settings)
- Full list of routes in scrape (command output)
- Exact nav structure including what’s under “More”
- Breakpoints (rough) for:
  - navbar transitions
  - home hero flex → column
- Exact hero image + dimensions/aspect ratio
- Gallery image list(s) per page (About Us, Meetings, etc.)
- Contact submission flow details (where it posts now, what fields)
- Map embed/source URL currently used