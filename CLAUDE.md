# Jeison Christ — Developer Portfolio

## Stack
React + TypeScript + Vite + Tailwind CSS + GSAP ScrollTrigger

## Visual reference
landonorris.com — editorial, premium, athletic. Each section transitions background color on scroll.

## Color palette
- Cream: #F2EDE4
- Olive: #1C2B1A
- Black: #0D0D0D
- Lime: #C5FF4A / #c8f135 (accent, glow effects)
- Text: #111111

## Typography (Google Fonts)
- Newsreader — `font-headline` — serif headlines (italic for accents)
- Plus Jakarta Sans — `font-body` / `font-label` — body and labels
- (DM Mono used inline via `font-mono` for email and code strings)

## Sections & background transitions (App.tsx canvas)
1. **Hero** — cream (#F2EDE4), sticky, cutout figure `/jeison.png`, headline "I BUILD PRODUCTS / PEOPLE LOVE."
2. **Editorial** (`#about`) — olive (#1C2B1A), frosted glass panel, bio + tech stack grid + marquee strip
3. **Projects** (`#projects`) — near-black (#111111), see Projects section below
4. **Contact** (`#contact`) — pure black (#0D0D0D), two-column (headline + form)
5. **Footer** — cream (#F2EDE4)

Background color transitions are driven by GSAP ScrollTrigger on a fixed `<div>` canvas in App.tsx.
**Do not add `overflow-x: hidden` to the `<html>` element** — it breaks the scroll container and kills all ScrollTrigger animations. Only set it on `body`.

## GSAP animation patterns
- Hero: entrance timeline (fade + slide + skewY stagger), exit parallax on scroll
- Editorial: static (no GSAP), marquee via CSS animation
- Projects empty state: ScrollTrigger entrance timeline (fade + slide + skewY)
- Projects populated: scroll-pinned horizontal card swipe (ScrollTrigger + pin)
- Contact: ScrollTrigger entrance (left col stagger, right col slide from right)
- Footer: ScrollTrigger fade-in

## Projects section — data-driven
**File:** `src/components/Projects.tsx`

Add project objects to the `projects: Project[]` array at the top of the file.

```ts
export interface Project {
  title:  string
  year:   string
  desc:   string
  tech:   string[]
  url?:   string   // display-only URL in the fake browser bar
  href?:  string   // real external link (opens in new tab)
  image?: string   // full-bleed screenshot URL
  alt?:   string
}
```

- `projects.length === 0` → renders `<EmptyState />` ("Work in progress" with lime badge)
- `projects.length > 0`  → renders `<PopulatedProjects />` (GSAP scroll-pinned horizontal swipe, MacWindow cards)

## Navbar
- Desktop: logo left, "JC" center mark, nav links + "LET'S TALK" CTA right
- Mobile: hamburger button (`z-[70]`) toggles a fullscreen dark overlay (`z-[60]`) with large italic nav links
- Scroll-aware: switches from transparent to dark background when `#about` reaches the navbar

## Mobile notes
- Burger button is a `<button>` with `w-11 h-11` (44px touch target); overlay is `z-[60]`, nav is `z-[70]`
- Scroll lock uses `overflowY` only (not `overflow`) to preserve `overflow-x: hidden` on body
- Custom cursor (`Cursor.tsx`) is `hidden md:block` — never renders on touch devices
- Contact section is `min-h-screen` (not `h-screen`) on mobile so the form column doesn't get clipped

## Invariants
- The name is always "JEISON CHRIST" — never shortened or altered
- `/jeison.png` is the cutout portrait (no background), used only in Hero on md+ screens
- Sections are transparent — background comes from the fixed canvas in App.tsx
- `body` has `overflow-x: hidden` + `max-width: 100vw` to prevent horizontal scroll
