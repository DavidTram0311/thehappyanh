"use client";

import { useEffect, useRef, useState } from "react";
import { NoteIcon, BrushIcon, PencilIcon, ChevronDownIcon } from "./icons";

const HERO_H = 900;
const DESIGN_W = 1024; // below this width the whole stage scales down uniformly

type Item = {
  src: string;
  cx: number; // left-anchored center X (constant across widths)
  cy: number; // center Y from top of hero
  w: number;
  h: number;
  a: number; // rotation deg
};

// Left-edge–anchored collage objects, back-to-front render order.
const LEFT: Item[] = [
  { src: "jdLgBfSLwKTClxqYuahwosnQ0ao", cx: 138, cy: 179, w: 343, h: 457, a: 0 },
  { src: "Ib2MgBDUnLnhAsZEGDsaXTRCyEc", cx: -43, cy: 267, w: 246, h: 344, a: 0 },
  { src: "UYw9YXInfHuvyVQzhOZZzoZBPh4", cx: 249, cy: 235, w: 159, h: 124, a: -12 },
  { src: "EXDOfJMplEjncYGaW1AXyHUrGo", cx: 142, cy: 532, w: 627, h: 504, a: -26 },
  { src: "AgBD7j2uv82zRz8yWkU2JJqXUU", cx: 20, cy: 372, w: 196, h: 196, a: -47 },
  { src: "r0cKKLDepuyC861bflopOCb3QvM", cx: 283, cy: 672, w: 193, h: 263, a: -14 },
  { src: "tQZK8bAxzmm6UcxN8lrkuLrsPTs", cx: 291, cy: 304, w: 59, h: 201, a: 3 },
  { src: "dReV0XQhJYgPVKg5SFc8B4qk", cx: 106, cy: 526, w: 180, h: 176, a: 13 },
  { src: "rksKjHdY89q3Pqx7B0oMmuDZYAo", cx: 257, cy: 457, w: 96, h: 152, a: -26 },
  { src: "2q82sqseGi8szDiOuBWqQaBz5k", cx: 59, cy: 699, w: 96, h: 95, a: -16 },
];

// Right-edge–anchored objects. `fr` is the distance from the right edge to the center.
const RIGHT: { src: string; fr: number; cy: number; w: number; h: number; a: number }[] = [
  { src: "w5rRTcZlyNjchgev3qGcQcEdA4", fr: 62, cy: 510, w: 95, h: 341, a: 0 }, // Mac toolbar
];

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(DESIGN_W);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setVw(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wide = vw >= DESIGN_W;
  const stageW = wide ? vw : DESIGN_W;
  const scale = wide ? 1 : vw / DESIGN_W;

  return (
    <section ref={wrapRef} className="relative w-full overflow-hidden">
      <div style={{ height: HERO_H * scale }} className="relative w-full">
        <div
          className="absolute left-0 top-0"
          style={{
            width: stageW,
            height: HERO_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Left-anchored collage */}
          {LEFT.map((c, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`l${i}`}
              src={`/images/${c.src}.png`}
              alt=""
              draggable={false}
              className="pointer-events-none absolute select-none"
              style={{
                width: c.w,
                height: c.h,
                left: c.cx - c.w / 2,
                top: c.cy - c.h / 2,
                transform: `rotate(${c.a}deg)`,
              }}
            />
          ))}

          {/* Right-anchored collage */}
          {RIGHT.map((c, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`r${i}`}
              src={`/images/${c.src}.png`}
              alt=""
              draggable={false}
              className="pointer-events-none absolute select-none"
              style={{
                width: c.w,
                height: c.h,
                right: c.fr - c.w / 2,
                top: c.cy - c.h / 2,
                transform: `rotate(${c.a}deg)`,
              }}
            />
          ))}

          {/* Pixel cursor (real asset) — sits above-left of the vinyl card */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/BMk9tbBUQoj1TbGSpyuzVtpEI.png"
            alt=""
            draggable={false}
            className="pointer-events-none absolute select-none"
            style={{ width: 91, height: 91, right: 274 - 45, top: 107 - 45, transform: "rotate(-14deg)" }}
          />

          {/* Vinyl player card */}
          <div
            className="absolute rounded-[14px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
            style={{ right: 35, top: 16, width: 150, transform: "rotate(2deg)", fontFamily: "-apple-system, system-ui, sans-serif" }}
          >
            <div className="relative mx-auto h-[120px] w-[120px] overflow-hidden rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pIJQNvKwXzQWb9Be5qUhoITihY.png" alt="" className="h-full w-full object-cover" />
            </div>
            <p className="mt-2" style={{ fontFamily: "var(--font-jetbrains)", fontSize: 9, color: "#8a8a8a", lineHeight: "11px" }}>
              Souleance
            </p>
            <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 12, color: "#69645e", lineHeight: "14px" }}>
              Jazz et thé vert
            </p>
            <div className="mt-2 flex items-center justify-between gap-1.5">
              <div className="relative h-[3px] flex-1 rounded-full bg-black/15">
                <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-black/50" />
              </div>
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: 8, color: "#474d50", letterSpacing: "-0.2px" }}>
                1:10 / 3:32
              </span>
            </div>
          </div>

          {/* Folder */}
          <div className="absolute" style={{ right: 165, top: 270, width: 150 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/zBTrYExuPA4oelyKSUOT0Jd5Jw.png" alt="" className="mx-auto block w-[130px]" style={{ transform: "rotate(-6deg)" }} />
            <p className="text-center" style={{ fontSize: 13, color: "#000", letterSpacing: "-0.32px", fontFamily: "-apple-system, system-ui, sans-serif", marginTop: -6 }}>
              ...al_Final_Final
            </p>
          </div>

          {/* AirDrop card */}
          <div
            className="absolute rounded-[8px] bg-[#f6f6f6] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
            style={{ right: 138, top: 440, width: 188, transform: "rotate(2deg)", fontFamily: "-apple-system, system-ui, sans-serif" }}
          >
            <p style={{ fontSize: 10, fontWeight: 600, color: "#000", letterSpacing: "-0.25px" }}>AirDrop</p>
            <p style={{ fontSize: 8, color: "#3c3c43", lineHeight: "10px", marginTop: 1 }}>
              Jackie would like to share a photo
            </p>
            <div
              className="mt-1.5 h-[80px] w-full overflow-hidden rounded-[4px]"
              style={{ background: "linear-gradient(135deg,#ff9e57 0%,#ff5d3b 52%,#e23329 100%)" }}
            />
            <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-1.5 text-[#007aff]" style={{ fontSize: 10 }}>
              <span>Decline</span>
              <span>Accept</span>
            </div>
          </div>

          {/* Center column */}
          <h1
            className="absolute inset-x-0 text-center"
            style={{ top: 215, fontFamily: "var(--font-script)", fontSize: 85, lineHeight: "102px", color: "#3e3e42", fontWeight: 400 }}
          >
            Jackie Hu
          </h1>
          <p className="absolute inset-x-0 text-center" style={{ top: 331, fontSize: 16, lineHeight: "24px", color: "#47443f" }}>
            Product Design
          </p>
          <p className="absolute inset-x-0 text-center" style={{ top: 355, fontSize: 12, lineHeight: "18px", color: "#47443f" }}>
            Verb &amp; Noun
          </p>
          <p
            className="absolute left-1/2 -translate-x-1/2 text-center"
            style={{ top: 385, width: 590, fontSize: 16, lineHeight: "19.2px", color: "#47443f" }}
          >
            a thoughtful process of crafting experiences that engage people, shape clarity, and spark delights.
          </p>

          {/* Three tool icons */}
          <div className="absolute inset-x-0 flex justify-center gap-2.5" style={{ top: 641 }}>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e7e6de] text-[#69645e] transition-transform hover:-translate-y-0.5">
              <NoteIcon className="h-[22px] w-[22px]" />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fffaf6] text-[#69645e] shadow-sm transition-transform hover:-translate-y-0.5">
              <BrushIcon className="h-[22px] w-[22px]" />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fffaf6] text-[#69645e] shadow-sm transition-transform hover:-translate-y-0.5">
              <PencilIcon className="h-[22px] w-[22px]" />
            </button>
          </div>

          {/* Scroll chevron */}
          <div className="absolute inset-x-0 flex justify-center" style={{ top: 825 }}>
            <div className="animate-bounce-soft text-[#69645e]">
              <ChevronDownIcon className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
