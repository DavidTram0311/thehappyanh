"use client";

import { useEffect, useRef, useState } from "react";
import { NoteIcon, BrushIcon, ChevronDownIcon } from "./icons";

const STAGE_W = 1440;
const STAGE_H = 900;

type Mode = "chaos" | "clean";

// [x, y, w, h, rotation(deg), opacity]
type Box = [number, number, number, number, number, number];
type ImgObj = { src: string; chaos: Box; clean: Box };

const IMAGES: ImgObj[] = [
  { src: "jdLgBfSLwKTClxqYuahwosnQ0ao", chaos: [-34, -50, 343, 457, 0, 1], clean: [-21, -10, 239, 319, 0, 1] }, 
  { src: "Ib2MgBDUnLnhAsZEGDsaXTRCyEc", chaos: [-166, 95, 246, 344, 0, 1], clean: [50, 415, 105, 147, 0, 1] }, 
  { src: "EXDOfJMplEjncYGaW1AXyHUrGo", chaos: [-251, 168, 785, 728, -26, 1], clean: [-181, 338, 551, 449, 2, 1] }, 
  { src: "UYw9YXInfHuvyVQzhOZZzoZBPh4", chaos: [158, 158, 181, 155, -12, 1], clean: [317, 55, 103, 80, 0, 1] }, 
  { src: "AgBD7j2uv82zRz8yWkU2JJqXUU", chaos: [-102, 250, 244, 245, -47, 1], clean: [76, 489, 247, 247, -20, 1] }, 
  { src: "rksKjHdY89q3Pqx7B0oMmuDZYAo", chaos: [181, 368, 153, 178, -26, 1], clean: [320, 190, 84, 133, 0, 1] }, 
  { src: "dReV0XQhJYgPVKg5SFc8B4qk", chaos: [-2, 420, 215, 212, 13, 1], clean: [175, 190, 138, 135, 0, 1] }, 
  { src: "tQZK8bAxzmm6UcxN8lrkuLrsPTs", chaos: [256, 202, 69, 204, 3, 1], clean: [1096, 70, 68, 230, 0, 1] }, 
  { src: "r0cKKLDepuyC861bflopOCb3QvM", chaos: [158, 521, 251, 302, -14, 1], clean: [275, 322, 337, 359, -33, 1] }, 
  { src: "2q82sqseGi8szDiOuBWqQaBz5k", chaos: [0, 640, 119, 118, -16, 1], clean: [186, 49, 96, 95, 0, 1] }, 
  { src: "w5rRTcZlyNjchgev3qGcQcEdA4", chaos: [1330, 339, 95, 341, 0, 1], clean: [1225, 74, 63, 226, 0, 1] }, 
  { src: "BMk9tbBUQoj1TbGSpyuzVtpEI", chaos: [1110, 52, 110, 110, -14, 1], clean: [1300, 114, 110, 110, -14, 1] }, 
];

type Pose = [number, number, number, number];
const VINYL: Record<Mode, Pose> = { chaos: [1296, 200, 2, 1], clean: [756, 184, 0, 1] };
const FOLDER: Record<Mode, Pose> = { chaos: [1196, 365, -6, 1], clean: [1305, 655, 0, 1] };
const AIRDROP: Record<Mode, Pose> = { chaos: [1205, 530, 2, 1], clean: [1099, 654, 0, 1] };

const TEXT_SHIFT: Record<Mode, [number, number]> = { chaos: [0, 0], clean: [390, 95] };

// 🌟 VŨ KHÍ 1: Gộp chung thành 'all' để đảm bảo trình duyệt mạng không bao giờ bị rơi rớt frame animation 🌟
const MODE_TRANSITION = "all 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)";

function objStyle(b: Box): React.CSSProperties {
  return {
    // 🌟 VŨ KHÍ 2: Ép cứng đơn vị 'px' để chống lỗi chớp giật trên mọi trình duyệt khắt khe nhất 🌟
    left: `${b[0]}px`,
    top: `${b[1]}px`,
    width: `${b[2]}px`,
    height: `${b[3]}px`,
    transform: `rotate(${b[4]}deg)`,
    opacity: b[5],
    pointerEvents: "none", // Tước quyền bắt chuột để không đè lên 2 nút điều khiển
    transition: MODE_TRANSITION,
  };
}

function poseStyle(p: Pose, w: number, h: number): React.CSSProperties {
  return {
    left: `${p[0] - w / 2}px`,
    top: `${p[1] - h / 2}px`,
    width: `${w}px`,
    transform: `rotate(${p[2]}deg)`,
    opacity: p[3],
    pointerEvents: "none",
    transition: MODE_TRANSITION,
  };
}

const OBJ_CLASS = "group absolute hover:z-50";
const INNER_CLASS =
  "h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(STAGE_W);
  const [mode, setMode] = useState<Mode>("chaos");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setVw(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = Math.min(1, vw / STAGE_W);
  const [tx, ty] = TEXT_SHIFT[mode];

  return (
    <section ref={wrapRef} className="relative w-full overflow-hidden">
      <div style={{ height: STAGE_H * scale }} className="relative w-full">
        <div
          className="absolute top-0 left-1/2"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            marginLeft: -STAGE_W / 2,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {/* Lớp Ảnh Collage */}
          {IMAGES.map((o) => (
            <div key={o.src} className={OBJ_CLASS} style={objStyle(o[mode])}>
              <div className={INNER_CLASS}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/${o.src}.png`} alt="" draggable={false} className="h-full w-full select-none" />
              </div>
            </div>
          ))}

          {/* Card Vinyl */}
          <div className={OBJ_CLASS} style={poseStyle(VINYL[mode], 150, 200)}>
            <div className={`${INNER_CLASS} rounded-[14px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)]`} style={{ fontFamily: "-apple-system, system-ui, sans-serif" }}>
              <div className="relative mx-auto h-[120px] w-[120px] overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/pIJQNvKwXzQWb9Be5qUhoITihY.png" alt="" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2" style={{ fontFamily: "var(--font-jetbrains)", fontSize: 9, color: "#8a8a8a", lineHeight: "11px" }}>Souleance</p>
              <p style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: 12, color: "#69645e", lineHeight: "14px" }}>Jazz et thé vert</p>
              <div className="mt-2 flex items-center justify-between gap-1.5">
                <div className="relative h-[3px] flex-1 rounded-full bg-black/15">
                  <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-black/50" />
                </div>
                <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: 8, color: "#474d50", letterSpacing: "-0.2px" }}>1:10 / 3:32</span>
              </div>
            </div>
          </div>

          {/* Card Folder */}
          <div className={OBJ_CLASS} style={poseStyle(FOLDER[mode], 150, 170)}>
            <div className={INNER_CLASS}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/zBTrYExuPA4oelyKSUOT0Jd5Jw.png" alt="" className="mx-auto block w-[130px]" />
              <p className="text-center" style={{ fontSize: 13, color: "#000", letterSpacing: "-0.32px", fontFamily: "-apple-system, system-ui, sans-serif", marginTop: -6 }}>
                ...al_Final_Final
              </p>
            </div>
          </div>

          {/* Card AirDrop */}
          <div className={OBJ_CLASS} style={poseStyle(AIRDROP[mode], 188, 152)}>
            <div className={`${INNER_CLASS} rounded-[8px] bg-[#f6f6f6] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)]`} style={{ fontFamily: "-apple-system, system-ui, sans-serif" }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#000", letterSpacing: "-0.25px" }}>AirDrop</p>
              <p style={{ fontSize: 8, color: "#3c3c43", lineHeight: "10px", marginTop: 1 }}>Anh would like to share a photo</p>
              <div className="mt-1.5 h-[80px] w-full overflow-hidden rounded-[4px]" style={{ background: "linear-gradient(135deg,#ff9e57 0%,#ff5d3b 52%,#e23329 100%)" }} />
              <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-1.5 text-[#007aff]" style={{ fontSize: 10 }}>
                <span>Decline</span>
                <span>Accept</span>
              </div>
            </div>
          </div>

          {/* Vùng Text Trung Tâm */}
          <div className="pointer-events-none absolute inset-0 z-40" style={{ transform: `translate(${tx}px, ${ty}px)`, transition: "transform .55s cubic-bezier(.22,.61,.36,1)" }}>
            <h1 className="pointer-events-auto absolute inset-x-0 cursor-default text-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:scale-[1.03]" style={{ top: 215, fontFamily: "var(--font-script)", fontSize: 85, lineHeight: "102px", color: "#3e3e42", fontWeight: 400 }}>
              Talia Nguyen
            </h1>
            <p className="pointer-events-auto absolute inset-x-0 cursor-default text-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:scale-[1.05]" style={{ top: 331, fontSize: 16, lineHeight: "24px", color: "#47443f" }}>
              Influencer Partnership Specialist
            </p>
            <p className="pointer-events-auto absolute inset-x-0 cursor-default text-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:scale-[1.05]" style={{ top: 355, fontSize: 12, lineHeight: "18px", color: "#47443f" }}>
              Verb &amp; Noun
            </p>
            <p className="pointer-events-auto absolute left-1/2 -translate-x-1/2 cursor-default text-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:-translate-x-1/2 hover:scale-[1.02]" style={{ top: 385, width: 590, fontSize: 16, lineHeight: "19.2px", color: "#47443f" }}>
              A dynamic young marketer who transforms influencer campaigns into a thoughtful process of crafting experiences shaping clarity for brands and sparking genuine delight for audiences.
            </p>
          </div>

          {/* BỘ NÚT ĐIỀU KHIỂN */}
          <div className="absolute flex gap-3 pointer-events-none" style={{ top: 641, left: "50%", transform: "translateX(-50%)", zIndex: 99999 }}>
            <ModeButton active={mode === "chaos"} onClick={() => setMode("chaos")} label="Chaos mode">
              <NoteIcon className="h-[22px] w-[22px]" />
            </ModeButton>
            <ModeButton active={mode === "clean"} onClick={() => setMode("clean")} label="Cleaned-up mode">
              <BrushIcon className="h-[22px] w-[22px]" />
            </ModeButton>
          </div>

          <div className="pointer-events-none absolute inset-x-0 flex justify-center z-[99999]" style={{ top: 825 }}>
            <div className="animate-bounce-soft text-[#69645e]">
              <ChevronDownIcon className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 🌟 VŨ KHÍ 3: Cường hóa nút bấm với "active:scale-90" tạo độ nảy vật lý 🌟
function ModeButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`pointer-events-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl shadow-md transition-all duration-300 active:scale-90 lg:hover:-translate-y-1 z-[99999] ${
        active ? "bg-[#e7e6de] text-[#3e3e42] ring-2 ring-black/5" : "bg-[#fffaf6] text-[#69645e]"
      }`}
      style={{
        touchAction: "manipulation", // Chặn độ trễ 300ms
        WebkitTapHighlightColor: "transparent"
      }}
    >
      {children}
    </button>
  );
}