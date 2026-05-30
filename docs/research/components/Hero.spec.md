# Hero Specification (Round 2 — corrected anchoring)

## Overview
- **Target file:** `src/components/Hero.tsx`
- **Screenshot:** `docs/design-references/r2-original-hero.png`
- **Interaction model:** static collage + soft-bounce scroll chevron. Hover lift on tool icons.

## CRITICAL: Responsive model (the round-1 bug)
The original is **NOT a centered, uniformly-scaled fixed stage**. Verified at viewport
widths 1200 / 1440 / 1920:
- **Left-side objects** are anchored to the **left viewport edge** — their center X is
  constant regardless of width (e.g. film roll `dReV` cx=106 at every width).
- **Right-side objects** are anchored to the **right viewport edge** — their distance
  from the right edge is constant (e.g. toolbar right edge = 15px from right at all widths;
  lamp-cluster `BMk9` center = 274px from right at all widths).
- **Sizes are fixed pixels**, no scaling on desktop.
- **Center column** (signature + text + tool icons + chevron) is horizontally centered.

Round 1 rendered a 1200px stage centered + scaled, which at 1440px pushes the whole
composition ~120px right and pulls the right cluster ~240px in from the edge.

**Implementation:** stage width = `max(1024, viewportWidth)`. For width ≥ 1024, scale = 1
and right items anchor to the true viewport edge. For width < 1024, scale = `width/1024`
(uniform shrink of the 1024 design). Left items use `left`, right items use `right`.

## Geometry (measured @1440, px; cy is from top of hero)

### Left collage (anchor: left = cx − w/2, top = cy − h/2, rotate a°)
| src (.png) | cx | cy | w | h | a |
|---|---|---|---|---|---|
| jdLgBfSLwKTClxqYuahwosnQ0ao | 138 | 179 | 343 | 457 | 0 |
| Ib2MgBDUnLnhAsZEGDsaXTRCyEc | -43 | 267 | 246 | 344 | 0 |
| UYw9YXInfHuvyVQzhOZZzoZBPh4 | 249 | 235 | 159 | 124 | -12 |
| AgBD7j2uv82zRz8yWkU2JJqXUU | 20 | 372 | 196 | 196 | -47 |
| EXDOfJMplEjncYGaW1AXyHUrGo | 142 | 532 | 627 | 504 | -26 |
| rksKjHdY89q3Pqx7B0oMmuDZYAo | 257 | 457 | 96 | 152 | -26 |
| dReV0XQhJYgPVKg5SFc8B4qk | 106 | 526 | 180 | 176 | 13 |
| tQZK8bAxzmm6UcxN8lrkuLrsPTs | 291 | 304 | 59 | 201 | 3 |
| r0cKKLDepuyC861bflopOCb3QvM | 283 | 672 | 193 | 263 | -14 |
| 2q82sqseGi8szDiOuBWqQaBz5k | 59 | 699 | 96 | 95 | -16 |

### Right collage (anchor: right = fromRightCenter − w/2, top = cy − h/2)
| src | fromRightCenter | cy | w | h | a | note |
|---|---|---|---|---|---|---|
| w5rRTcZlyNjchgev3qGcQcEdA4 | 62 | 510 | 95 | 341 | 0 | Mac toolbar grid |
| BMk9tbBUQoj1TbGSpyuzVtpEI | 274 | 107 | 91 | 91 | -14 | pink pixel cursor (was an SVG in r1) |

### Right cards (anchor by right edge)
- **Vinyl card** — right edge ≈ 35px from viewport right, top ≈ 16, width ~150. White rounded
  card, overflow-hidden record `pIJQ…png` (black disc, red label), then `Souleance` (9px IBM
  Plex Mono #8a8a8a) / `Jazz et thé vert` (12px IBM Plex Mono #69645e) / progress bar + `1:10 / 3:32`.
- **Folder** — `zBTr…png` ~130px, center 243px from right, top ≈ 275, rotate -6°, label
  `...al_Final_Final` 13px black.
- **AirDrop card** — 188×196, right edge 138px from right, top 440, radius 8px, bg #f6f6f6.
  Title `AirDrop` (10px SF Pro semibold, black), subtitle `Jackie would like to share a photo`
  (8px), **image area is an orange→red grainy gradient** (QVQe asset is blank — recreate with CSS),
  footer `Decline` / `Accept` (10px, #007aff) split by a divider.

## Center column (centered, top in px)
- Signature `Jackie Hu` — top 217, font Historia Sky Script 85px / lh 102, #3e3e42
- `Product Design` — top 331, IBM Plex Mono 16/24, #47443f
- `Verb & Noun` — top 355, 12/18, #47443f
- Tagline — top 385, 16/19.2, #47443f, width ~590, centered, 2 lines
- Three 48px tool icons — top 641, gap 10, centered (#e7e6de active, #fffaf6 others)
- Scroll chevron — top 825, 32px, #69645e, soft bounce

## Hero height
Next section (`Currently cooking`) top ≈ 963 @1440. Use hero height ≈ 900.
