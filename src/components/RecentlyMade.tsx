"use client";

import { useState } from "react";
type Item = {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
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
    href: "https://www.getjust.eu/",
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
    href: "https://www.linkedin.com/company/drigmo/",
    icon: <IconImage src="/images/logo consen.png" />,
    description: "Grew Ủa sen ơi from 0 to 237 organic followers in 4 weeks through rapid content testing.Led GTM for Book Hunter Plus, acquiring 450+ active users in 7 days via narrative email sequences.",
    hoverImages:  ["/images/drigmo.png",]
  },
  {
    title: "Ogilvy Vietnam",
    subtitle: "Account Management Coordinator in PR and Influencer Marketing",
    href: "https://zenly.com/",
    description: "Crafted press releases and media kits to drive consistent campaign messaging.Managed a $5,000+ campaign budget, tracking spend to ensure 100% financial compliance.",
    icon: <IconImage src="/images/logo ogilvy.png" />,
  },
  {
    title: "Influencer Marketing Executive (Freelance)", 
    subtitle: "",
    href: "https://hcii.cmu.edu/mhci/capstone/2020/discover/#/",
    icon: <IconImage src="/images/logo freelance.png" />,
    description: "Managed 30+ influencers with a 95% campaign completion rate.Increased BareSoul's TikTok mentions by 22% via trend-based content strategy.",
    hoverImages: ["/images/influencer.png"]
  },
];

export default function RecentlyMade() {
  const [activeImages, setActiveImages] = useState<string[] | null>(null);
  return (
    <section className="relative mx-auto w-full max-w-[1040px] px-6 py-10">
      <div className="mb-6 border-t border-black/10 pt-6">
        <h2 className="text-[20px] font-medium text-[#3e3e42]">Recently Work ▶</h2>
      </div>

      <div className="flex flex-col gap-3">
        {ITEMS.map((item) => (
         <a
  key={item.title}
  href={item.href}
  target="_blank"
  rel="noopener noreferrer"
onMouseEnter={() => setActiveImages(item.hoverImages || null)}
  onMouseLeave={() => setActiveImages(null)}
  className="group flex min-h-[120px] h-auto w-full max-w-[500px] items-start gap-5 rounded-2xl border border-[#e8e1d9] border-b-[4px] border-b-[#ded5ca] bg-[#fcf7f2] px-[30px] py-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#d1c6b8] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
>
            <div className="shrink-0">{item.icon}</div>
            <div>
              <h3 className="text-[18px] font-bold text-[#3e3e42]">{item.title}</h3>
              <p className="text-[16px] font-medium text-[#5c5751]">{item.subtitle}</p>
              {item.description && (
                <p className="text-[14px] font-normal text-[#857f77] leading-relaxed mt-1.5">{item.description}</p>
              )}
            </div>
            
          </a>
        ))}
      </div>
      {/* KHUNG HIỂN THỊ ẢNH MỚI */}
      <div className="pointer-events-none absolute right-[20px] top-[100px] hidden w-[550px] h-[450px] lg:block z-40">
        
        {/* TRƯỜNG HỢP 1: Dự án chỉ có 1 ảnh */}
        {activeImages && activeImages.length === 1 && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={activeImages[0]}
            alt="Project Preview"
            className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl rounded-2xl animate-in fade-in slide-in-from-bottom-4"
          />
        )}

        {/* TRƯỜNG HỢP 2: Dự án có 2 hoặc 3 ảnh (Hiệu ứng xếp chồng Mockup) */}
        {activeImages && activeImages.length > 1 && (
          <div className="relative w-full h-full animate-in fade-in slide-in-from-bottom-4">
            
            {/* ẢNH 1 (AMAZON): Nằm ở bên trái (vị trí chân dung cũ) (z-10) */}
            <img
              src={activeImages[0]}
              alt="Preview 1"
              className="absolute top-[-120px] left-[35px] w-[60%] h-auto rounded-2xl drop-shadow-xl z-10 border border-[#e8e1d9]/50"
            />

            {/* ẢNH 2 (CHÂN DUNG): Đẩy lên góc trên bên phải (z-20) */}
            {activeImages[1] && (
              <img
                src={activeImages[1]}
                alt="Preview 2"
                className="absolute top-[-100px] right-[-60px] w-[40%] h-auto rounded-[24px] drop-shadow-2xl z-20 border-[3px] border-white/90"
              />
            )}

            {/* ẢNH 3 (COMMENT): Nằm ở góc dưới bên phải, đè lên các ảnh kia (z-30) */}
            {activeImages[2] && (
              <img
                src={activeImages[2]}
                alt="Preview 3"
                className="absolute bottom-[60px] right-[-20px] w-[50%] h-auto rounded-[16px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)] z-30 border-2 border-white"
              />
            )}

          </div>
        )}
      </div>

      {/* Floating Jackie chat pill */}
      <div className="pointer-events-none absolute right-[40px] top-[150px] hidden lg:block">
        <div className="relative">
        </div>
      </div>
    </section>
  );
}
