# Hero Specification (Round 3 — 3-mode animation + object hover)

## Overview
- **Target file:** `src/components/Hero.tsx`
- **Screenshots:** `docs/design-references/r3-mode-{brush(clean),pencil(notebook)}.png`, `r3-original-hero-load.png` (chaos)
- **Interaction model:** click-driven mode switch (3 tool-icon buttons) + per-object hover scale.

## Modes & buttons (left→right under the tagline, 48×48, gap 10, centered)
1. **Note icon → `chaos`** (default on load). Active button bg `#e7e6de`; inactive `#fffaf6`.
2. **Brush icon → `clean`** (objects de-rotated, spread into a neat grid; text column shifts right).
3. **Pencil icon → `notebook`** (open-notebook centerpiece; most clutter fades out; airdrop moves to left).

Clicking a button sets the mode. The active button gets bg `#e7e6de`.

## Stage / responsive model
Fixed **1440×900** design stage, horizontally centered. `scale = min(1, viewportWidth/1440)`,
`transform-origin: top center`. Outer height = `900 * scale`. All coords below are top-left (x,y),
size (w,h), rotation (deg), opacity — in the 1440 stage coordinate system. (This replaces round-2's
edge-anchor model because objects flip sides between modes, which edge-anchoring can't transition.)

## Transition timing (measured)
- **Mode switch:** position/size/rotation animate ~0.4s, monotonic ease-out.
  Use `transition: left/top/width/height/transform .5s cubic-bezier(.22,.61,.36,1); opacity .4s ease`.
- **Hover:** object scales to **1.1×** (pure uniform scale, composed on top of base rotation),
  spring with tiny overshoot, settles ~250ms. Use inner element `transition: transform .28s cubic-bezier(.34,1.56,.64,1)`.
  On hover also `z-index:50` so the scaled object isn't clipped. No z change in original but improves feel.

## Image objects — per-mode [x, y, w, h, rot, opacity]
| id (png) | chaos | clean | notebook |
|---|---|---|---|
| lamp `jdLgBfSLwKTClxqYuahwosnQ0ao` | -34,-50,343,457,0,1 | -21,-10,239,319,0,1 | 539,176,240,320,0,1 |
| dolipane `Ib2MgBDUnLnhAsZEGDsaXTRCyEc` | -166,95,246,344,0,1 | 50,415,105,147,0,1 | 365,371,105,147,0,1 |
| dreams-news `UYw9YXInfHuvyVQzhOZZzoZBPh4` | 158,158,181,155,-12,1 | 317,55,103,80,0,1 | 309,131,167,144,14,1 |
| open-notebook `EXDOfJMplEjncYGaW1AXyHUrGo` | -251,168,785,728,-26,1 | -181,338,551,449,2,1 | 337,7,766,695,-21,1 |
| coffee-ring `AgBD7j2uv82zRz8yWkU2JJqXUU` | -102,250,244,245,-47,1 | 76,489,247,247,-20,1 | 1011,333,277,277,-46,1 |
| blue-tube `r0cKKLDepuyC861bflopOCb3QvM` | 158,521,251,302,-14,1 | 275,322,337,359,-33,1 | 275,322,337,359,-33,**0** |
| pen `tQZK8bAxzmm6UcxN8lrkuLrsPTs` | 256,202,69,204,3,1 | 1096,70,68,230,0,1 | 989,57,101,261,6,1 |
| film-roll `dReV0XQhJYgPVKg5SFc8B4qk` | -2,420,215,212,13,1 | 175,190,138,135,0,1 | 175,190,138,135,0,**0** |
| lighter `rksKjHdY89q3Pqx7B0oMmuDZYAo` | 181,368,153,178,-26,1 | 320,190,84,133,0,1 | 320,190,84,133,0,**0** |
| sticker `2q82sqseGi8szDiOuBWqQaBz5k` | 0,640,119,118,-16,1 | 186,49,96,95,0,1 | 186,49,96,95,0,**0** |
| mac-toolbar `w5rRTcZlyNjchgev3qGcQcEdA4` | 1330,339,95,341,0,1 | 1225,74,63,226,0,1 | 1225,74,63,226,0,**0** |
| cursor `BMk9tbBUQoj1TbGSpyuzVtpEI` | 1110,52,110,110,-14,1 | 1300,114,110,110,-14,1 | 1300,114,110,110,-14,**0** |

Objects with opacity 0 in a mode keep their previous box (so they fade/shrink in place) and get `pointer-events:none`.

## Composite cards (center-based; size fixed; animate center + rotation + opacity)
Keep round-2 card visuals (vinyl card incl. `pIJQ` thumbnail; airdrop CSS gradient; folder = `zBTr` img + label).
| card | chaos center,rot,op | clean center,rot,op | notebook center,rot,op |
|---|---|---|---|
| vinyl card (≈170w) | 1296,200, 2, 1 | 756,184, 0, 1 | 1100,238, 0, 1 |
| folder (≈150w) | 1196,365, -6, 1 | 1305,655, 0, 1 | 1305,655, 0, **0** |
| airdrop card (≈188w) | 1205,530, 2, 1 | 1099,654, 0, 1 | 423,588, 0, 1 |

## Center text column (signature + Product Design + Verb&Noun + tagline)
Centered block; per-mode translate of the whole group (chaos baseline: signature top 215):
- **chaos:** translate(0, 0), centered.
- **notebook:** translate(0, 0), centered (identical placement; sits on the notebook page).
- **clean:** shift right + down ≈ `translate(+390px, +95px)`. (Measured: signature center 720→1225,
  tagline center 720→1072, both +95 in y.) Approximate; QA-nudge.

Buttons + chevron stay fixed (not animated). Buttons keep their own `-translate-y` hover.

## Implementation notes (verified)
- `position:absolute` + transitions are applied via Tailwind `absolute` + inline `transition`
  (custom `.hero-obj` CSS in globals.css did NOT apply under Tailwind v4 — do not rely on it).
- Hover uses `group` / `group-hover:scale-110`; Tailwind v4 emits this via the CSS `scale:`
  property (not `transform:`) inside `@media (hover:hover)`. Verified `scale:1.1` on real hover.
- The centered text overlay MUST be `pointer-events-none`, otherwise its full-stage box
  intercepts hovers and objects never receive them.

## Known limitations (vs live Framer site)
- Cards keep a fixed size/orientation (live vinyl flips portrait↔landscape between modes).
- Wide screens (>1440) center the composition rather than hugging viewport edges (round-2 edge-anchor traded away for clean mode transitions).
