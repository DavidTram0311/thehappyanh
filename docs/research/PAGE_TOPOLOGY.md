# jackiehu.design — Page Topology

Source: https://jackiehu.design/ (built on Framer). Single long scroll page, warm paper
background `#fffaf5`, content in a centered ~1040px column. No nav bar.

Fonts:
- **Historia Sky Script** (local woff2) — the "Jackie Hu" signature title (85px)
- **IBM Plex Mono** — all body text, labels, headings (400/500/600)
- **JetBrains Mono** (500) — tiny meta text (vinyl timecode)

Palette: ink `#3e3e42`, body `#69645e`, muted `#878686`, pen `#47443f`, card `#fcf7f2`.

## Sections (top → bottom)

1. **Hero collage** (`Hero.tsx`) — full-bleed 1200×889 "stage", scaled to viewport width.
   ~11 rotated desk-object PNGs placed by captured center+size+angle (lamp, ruler,
   newspaper, big paper sheet, pen, film roll, sticker, paint tube, coffee rings).
   Centered text column (signature title, "Product Design / Verb & Noun", tagline),
   three 48px tool-icon buttons, and a bouncing scroll chevron. Right-side UI cluster
   rebuilt as cards: cursor, vinyl player card, blue folder, AirDrop card, Mac toolbar.

2. **Currently cooking** (`CurrentlyCooking.tsx`) — heading + paragraph with an inline
   script-font "The Uncle Thing" badge.

3. **Recently Made** (`RecentlyMade.tsx`) — 4 link cards (icon + title + subtitle):
   JUST, Drigmo, Zenly, Discover Student Loans. Floating orange "Jackie" chat pill.

4. **Other Work** (`OtherWork.tsx`) — 2×2 grid of cards (thumbnail + title + meta +
   description + link glyph): Alora, NBA Fan Zone, 100 Days of UI, Oddio.

5. **About** (`About.tsx`) — heading + bio paragraphs + LinkedIn / Twitter / email line.

## Behaviors
- Hero scales uniformly to viewport via ResizeObserver (`scale = min(1, w/1200)`).
- Scroll chevron has a soft bounce keyframe.
- Cards lift + shadow on hover; Other Work thumbnails zoom slightly on hover.
- All external links open in a new tab.
