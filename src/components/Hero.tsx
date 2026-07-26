"use client";

import { useEffect, useRef, useState } from "react";
import { NoteIcon, BrushIcon, ChevronDownIcon } from "./icons";

const STAGE_W = 1440;
const STAGE_H = 900;

type Mode = "chaos" | "clean";
type Box = [number, number, number, number, number, number];
type ImgObj = { src: string; chaos: Box; clean: Box };

// Background elements
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

// Optional 5th parameter for scaling: [x, y, rotation, opacity, scale?]
type Pose = [number, number, number, number, number?]; 

// Mobile background coordinates
const MOBILE_BG_POS: Record<Mode, Pose[]> = {
  chaos: [
    [780, 60, 25, 1, 0.65],   
    [500, 120, -15, 1],       
    [720, 360, -4, 1],        // Notebook
    [880, 90, -10, 1, 0.65],  
    [810, 620, 0, 1, 0.7],    
    [860, 550, -20, 1, 0.65], 
    [440, 750, 15, 1],        // Film Roll (Pushed further LEFT)
    [650, 70, -15, 1, 0.6],   
    [420, 480, -12, 1, 0.55], // Tool Palette (Pushed safely LEFT)
    [860, 650, -15, 1],       
    [430, 320, 15, 1, 0.7],   // Blue Tube (Pushed safely LEFT)
    [830, 750, 15, 1, 0.65],  
  ],
  clean: [
    [780, 60, 25, 1, 0.65], [500, 120, -15, 1], [720, 360, -4, 1], [880, 90, -10, 1, 0.65],
    [810, 620, 0, 1, 0.7], [860, 550, -20, 1, 0.65], [440, 750, 15, 1], [650, 70, -15, 1, 0.6],
    [420, 480, -12, 1, 0.55], [860, 650, -15, 1], [430, 320, 15, 1, 0.7], [830, 750, 15, 1, 0.65],
  ]
};

// Interactive cards coordinates
const VINYL_DESKTOP: Record<Mode, Pose> = { chaos: [1296, 200, 2, 1], clean: [756, 184, 0, 1] };
const FOLDER_DESKTOP: Record<Mode, Pose> = { chaos: [1196, 365, -6, 1], clean: [1305, 655, 0, 1] };
const AIRDROP_DESKTOP: Record<Mode, Pose> = { chaos: [1205, 530, 2, 1], clean: [1099, 654, 0, 1] };

const VINYL_MOBILE: Record<Mode, Pose> = { chaos: [960, 220, 15, 1], clean: [960, 220, 15, 1] }; 
const FOLDER_MOBILE: Record<Mode, Pose> = { chaos: [720, 1500, 0, 0], clean: [720, 1500, 0, 0] }; 
const AIRDROP_MOBILE: Record<Mode, Pose> = { chaos: [570, 660, -8, 1], clean: [570, 660, -8, 1] }; 

const TEXT_SHIFT_DESKTOP: Record<Mode, [number, number]> = { chaos: [0, 0], clean: [390, 95] };
const TEXT_SHIFT_MOBILE: Record<Mode, [number, number]> = { chaos: [0, 0], clean: [0, 0] };

const INNER_CLASS = "h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(STAGE_W);
  const [mode, setMode] = useState<Mode>("chaos");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setVw(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMobile = isMounted && vw < 768;

  const activeVinyl = isMobile ? VINYL_MOBILE[mode] : VINYL_DESKTOP[mode];
  const activeFolder = isMobile ? FOLDER_MOBILE[mode] : FOLDER_DESKTOP[mode];
  const activeAirDrop = isMobile ? AIRDROP_MOBILE[mode] : AIRDROP_DESKTOP[mode];
  
  const tx = isMounted ? (isMobile ? TEXT_SHIFT_MOBILE[mode][0] : TEXT_SHIFT_DESKTOP[mode][0]) : 0;
  const ty = isMounted ? (isMobile ? TEXT_SHIFT_MOBILE[mode][1] : TEXT_SHIFT_DESKTOP[mode][1]) : 0;

  const desktopScale = Math.min(1, vw / STAGE_W);

  const getCardStyle = (dPose: Pose, mPose: Pose, w: number, h: number) => ({
    '--w': `${w}px`,
    '--dx': `${dPose[0] - w / 2}px`, '--dy': `${dPose[1] - h / 2}px`, '--drot': `${dPose[2]}deg`, '--dop': dPose[3],
    '--mx': `${mPose[0] - w / 2}px`, '--my': `${mPose[1] - h / 2}px`, '--mrot': `${mPose[2]}deg`, '--mop': mPose[3],
  } as React.CSSProperties);

  const getBgStyle = (idx: number, dBox: Box, mMode: Mode) => {
    const mPose = MOBILE_BG_POS[mMode][idx];
    const mScale = mPose[4] ?? 1; 
    
    return {
      '--w': `${dBox[2]}px`, '--h': `${dBox[3]}px`,
      '--dx': `${dBox[0]}px`, '--dy': `${dBox[1]}px`, '--drot': `${dBox[4]}deg`, '--dop': dBox[5],
      '--mx': `${mPose[0] - dBox[2] / 2}px`, '--my': `${mPose[1] - dBox[3] / 2}px`, '--mrot': `${mPose[2]}deg`, '--mop': mPose[3], '--mscale': mScale,
    } as React.CSSProperties;
  };

  return (
    <section ref={wrapRef} className="relative w-full overflow-hidden res-section" style={{ '--ds': desktopScale } as React.CSSProperties}>
      
      {/* Fallback CSS for rendering */}
      <style dangerouslySetInnerHTML={{ __html: `
        .res-section { height: 950px; }
        .res-container { width: 1440px; height: 900px; left: 50%; margin-left: -720px; transform-origin: top center; transform: scale(1); }
        .res-bg { position: absolute; pointer-events: none; width: var(--w); height: var(--h); left: var(--mx); top: var(--my); transform: rotate(var(--mrot)) scale(var(--mscale, 1)); opacity: var(--mop); transition: left 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), top 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 0.61, 0.36, 1); }
        .res-card { position: absolute; width: var(--w); left: var(--mx); top: var(--my); transform: rotate(var(--mrot)); opacity: var(--mop); transition: left 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), top 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 0.61, 0.36, 1); }
        .res-txt { transform: translate3d(var(--mtx), var(--mty), 0); transition: transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1); }
        @media (min-width: 768px) {
           .res-section { height: calc(900px * var(--ds)); }
           .res-container { transform: scale(var(--ds)); }
           .res-bg { left: var(--dx); top: var(--dy); transform: rotate(var(--drot)) scale(1); opacity: var(--dop); }
           .res-card { left: var(--dx); top: var(--dy); transform: rotate(var(--drot)); opacity: var(--dop); }
           .res-txt { transform: translate3d(var(--dtx), var(--dty), 0); }
        }
      `}} />

      {/* Background layer */}
      <div className="absolute top-0 pointer-events-none res-container">
        {IMAGES.map((o, idx) => (
          <div key={o.src} className="group hover:z-50 res-bg" style={getBgStyle(idx, o[mode], mode)}>
            <div className={INNER_CLASS}>
              <img src={`/images/${o.src}.png`} alt="" draggable={false} className="h-full w-full select-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive cards layer */}
      <div className="absolute top-0 pointer-events-none res-container">
        
        {/* Vinyl Card */}
        <div className="group hover:z-50 res-card" style={getCardStyle(VINYL_DESKTOP[mode], VINYL_MOBILE[mode], 150, 200)}>
          <div className={`${INNER_CLASS} rounded-[14px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)]`} style={{ fontFamily: "-apple-system, system-ui, sans-serif" }}>
            <div className="relative mx-auto h-[120px] w-[120px] overflow-hidden rounded-md">
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

        {/* Folder Card */}
        <div className="group hover:z-50 res-card" style={getCardStyle(FOLDER_DESKTOP[mode], FOLDER_MOBILE[mode], 150, 170)}>
          <div className={INNER_CLASS}>
            <img src="/images/zBTrYExuPA4oelyKSUOT0Jd5Jw.png" alt="" className="mx-auto block w-[130px]" />
            <p className="text-center" style={{ fontSize: 13, color: "#000", letterSpacing: "-0.32px", fontFamily: "-apple-system, system-ui, sans-serif", marginTop: -6 }}>
              ...al_Final_Final
            </p>
          </div>
        </div>

        {/* AirDrop Card */}
        <div className="group hover:z-50 res-card" style={getCardStyle(AIRDROP_DESKTOP[mode], AIRDROP_MOBILE[mode], 188, 152)}>
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

      </div>

      {/* Main Text Content */}
      <div className="absolute inset-x-0 z-40 flex flex-col items-center justify-start text-center pointer-events-none mx-auto w-full px-4 top-[140px] md:top-[215px] res-txt"
           style={{
              '--mtx': `${tx}px`, '--mty': `${ty}px`,
              '--dtx': `${TEXT_SHIFT_DESKTOP[mode][0]}px`, '--dty': `${TEXT_SHIFT_DESKTOP[mode][1]}px`,
           } as React.CSSProperties}>
           
           <h1 className="pointer-events-auto transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] font-script text-[#3e3e42] font-normal text-[65px] leading-[70px] md:text-[85px] md:leading-[102px]">
               Talia Nguyen
           </h1>
           
           <p className="pointer-events-auto transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.05] text-[#47443f] mt-2 md:mt-3.5 text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]">
              Influencer Partnership Specialist
           </p>
           
           <p className="pointer-events-auto transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.05] text-[#47443f] mt-1 md:mt-0 text-[12px] leading-[18px]">
              Verb &amp; Noun
           </p>
           
           <p className="pointer-events-auto transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] text-[#47443f] mt-5 mx-auto w-full max-w-[310px] md:max-w-[590px] text-[14px] leading-[22px] md:text-[16px] md:leading-[19.2px]">
              A dynamic young marketer who transforms influencer campaigns into a thoughtful process of crafting experiences shaping clarity for brands and sparking genuine delight for audiences.
           </p>
      </div>

      {/* Mode Controls (Hidden on mobile) */}
      <div className="absolute hidden md:flex gap-3 pointer-events-none" style={{ 
          top: '641px', left: "50%", transform: "translateX(-50%)", zIndex: 99999 
      }}>
        <ModeButton active={mode === "chaos"} onClick={() => setMode("chaos")} label="Chaos mode">
          <NoteIcon className="h-[22px] w-[22px]" />
        </ModeButton>
        <ModeButton active={mode === "clean"} onClick={() => setMode("clean")} label="Cleaned-up mode">
          <BrushIcon className="h-[22px] w-[22px]" />
        </ModeButton>
      </div>

      {/* Down Arrow */}
      <div className="absolute inset-x-0 flex justify-center pointer-events-none top-[780px] md:top-[825px]" style={{ zIndex: 99999 }}>
        <div className="animate-bounce-soft text-[#69645e]">
          <ChevronDownIcon className="h-8 w-8" />
        </div>
      </div>

    </section>
  );
}

function ModeButton({ active, onClick, label, children }: { active: boolean; onClick: () => void; label: string; children: React.ReactNode; }) {
  return (
    <button
      type="button" aria-label={label} aria-pressed={active} onClick={onClick}
      className={`pointer-events-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl shadow-md transition-all duration-300 active:scale-90 hover:-translate-y-1 z-[99999] ${
        active ? "bg-[#e7e6de] text-[#3e3e42] ring-2 ring-black/5" : "bg-[#fffaf6] text-[#69645e]"
      }`}
    >
      {children}
    </button>
  );
}