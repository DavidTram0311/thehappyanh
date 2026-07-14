"use client";

import { useState, ReactNode } from "react";

type Item = {
  title: string;
  subtitle: string;
  href?: string;
  icon: ReactNode;
  description?: string;
  hoverImages?: string[];
};

function IconImage({ src }: { src: string }) {
  return (
    <div className="h-[80px] w-[80px] overflow-hidden rounded-[14px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

const ITEMS: Item[] = [
  {
    title: "Dr.Reju-All",
    subtitle: "Global Influencer Marketing Specialist in Beauty industry",
    href: "https://drrejuall.com/",
    icon: <IconImage src="/images/logo dr.rejul.jpg" />,
    description: "Networked with 500+ nano, micro influencers around the world. Managed end-to-end process with paid/free collaboration with influencers",
    hoverImages: [
      "/images/dr.reju1.png", 
      "/images/dr.reju2.png", 
      "/images/dr.reju3.png",
    ]
  },
  {
    title: "Consen AI Co., Ltd",
    subtitle: "Growth Marketing Manager for AI agents for publishing and marketing",
    href: "https://consen.ai/",
    icon: <IconImage src="/images/logo consen.png" />,
    description: "Grew Ủa sen ơi from 0 to 237 organic followers in 4 weeks through rapid content testing.Led GTM for Book Hunter Plus, acquiring 450+ active users in 7 days via narrative email sequences.",
    hoverImages:  ["/images/drigmo.png",]
  },
  {
    title: "Ogilvy Vietnam",
    subtitle: "Account Management Coordinator in PR and Influencer Marketing",
    href: "https://www.ogilvy.com",
    description: "Crafted press releases and media kits to drive consistent campaign messaging.Managed a $5,000+ campaign budget, tracking spend to ensure 100% financial compliance.",
    icon: <IconImage src="/images/logo ogilvy.png" />,
    hoverImages:  ["/images/drigmo.png",]
  },
  {
    title: "Influencer Marketing Executive (Freelance)", 
    subtitle: "",
    icon: <IconImage src="/images/logo freelance.png" />,
    description: "Managed 30+ influencers with a 95% campaign completion rate.Increased BareSoul's TikTok mentions by 22% via trend-based content strategy.",
    hoverImages: ["/images/influencer.png"]
  },
];

export default function RecentlyMade() {
  return (
    <section className="relative mx-auto w-full max-w-[1040px] px-6 py-10">
      <div className="mb-6 border-t border-black/10 pt-6">
        <h2 className="text-[20px] font-sans font-medium text-[#3e3e42]">Recently Work ▶</h2>
      </div>

      <div className="flex flex-col gap-3 relative">
        {ITEMS.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-visible flex flex-col min-h-[120px] h-auto w-full max-w-[500px] rounded-2xl border border-[#e8e1d9] border-b-[4px] border-b-[#ded5ca] bg-[#fcf7f2] px-[30px] py-4 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:z-50 hover:-translate-y-1 hover:border-b-[#d1c6b8] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] z-10"
          >
            <div className="flex items-start gap-5 w-full">
              <div className="shrink-0">{item.icon}</div>
              <div className="font-sans">
                <h3 className="text-[18px] font-bold text-[#3e3e42]">{item.title}</h3>
                <p className="text-[16px] font-medium text-[#5c5751]">{item.subtitle}</p>
                {item.description && (
                  <p className="text-[14px] font-normal text-[#857f77] leading-relaxed mt-1.5">{item.description}</p>
                )}
              </div>
            </div>

            {item.hoverImages && item.hoverImages.length > 0 && (
              <>
                <div className="pointer-events-none mt-5 hidden group-hover:flex lg:group-hover:hidden w-full items-center justify-center animate-in fade-in slide-in-from-top-2 !z-[999]">
                  {item.hoverImages.length === 1 && (
                    <img src={item.hoverImages[0]} alt="Preview" className="w-full max-h-[300px] object-contain drop-shadow-xl rounded-xl" />
                  )}
                  {item.hoverImages.length > 1 && (
                    <div className="relative w-full h-[250px] sm:h-[300px]">
                      <img src={item.hoverImages[0]} alt="P1" className="absolute top-[10px] left-0 w-[55%] rounded-xl drop-shadow-md z-10 border border-[#e8e1d9]/50" />
                      {item.hoverImages[1] && <img src={item.hoverImages[1]} alt="P2" className="absolute top-0 right-0 w-[45%] rounded-[20px] drop-shadow-xl z-20 border-[2px] border-white/90" />}
                      {item.hoverImages[2] && <img src={item.hoverImages[2]} alt="P3" className="absolute bottom-[-10px] right-[20px] w-[50%] rounded-[12px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] z-30 border-2 border-white" />}
                    </div>
                  )}
                </div>

                <div className="pointer-events-none absolute left-[calc(100%+20px)] top-1/2 -translate-y-1/2 hidden group-hover:lg:flex w-[400px] xl:w-[450px] items-center justify-center !z-[999]">
                  {item.hoverImages.length === 1 && (
                    <img src={item.hoverImages[0]} alt="Preview" className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl rounded-2xl animate-in fade-in slide-in-from-bottom-4" />
                  )}
                  {item.hoverImages.length > 1 && (
                    <div className="relative w-full h-[400px] animate-in fade-in slide-in-from-bottom-4">
                      <img src={item.hoverImages[0]} alt="P1" className="absolute top-[20px] left-[10px] w-[60%] h-auto rounded-2xl drop-shadow-xl z-10 border border-[#e8e1d9]/50" />
                      {item.hoverImages[1] && <img src={item.hoverImages[1]} alt="P2" className="absolute top-[-30px] right-[10px] w-[45%] h-auto rounded-[24px] drop-shadow-2xl z-20 border-[3px] border-white/90" />}
                      {item.hoverImages[2] && <img src={item.hoverImages[2]} alt="P3" className="absolute bottom-[-20px] right-[40px] w-[50%] h-auto rounded-[16px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)] z-30 border-2 border-white" />}
                    </div>
                  )}
                </div>
              </>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}