type Work = {
  title: string;
  meta: string;
  desc: string;
  thumb: string;
  href?: string;
};

const WORKS: Work[] = [
  {
    title: "Alora",
    meta: "Chrome extension | 2020",
    desc: "Personal data management and data tracking transparency.",
    thumb: "/images/iB6uzsB6l2paDhNKJwSzJyvDSzw.png",
    href: "https://chromewebstore.google.com/detail/pcmafklmeafeodgkklcoidiledfeicha?utm_source=item-share-cb",
  },
  {
    title: "NBA Fan Zone",
    meta: "AKQA Summer Internship | 2017",
    desc: "The official loyalty HUB of the NBA for China’s fans.",
    thumb: "/images/xleyZ28tx2lxtCNCKRFTGYdUqTI.png",
  },
  {
    title: "100 Days of UI",
    meta: "User Interface | 2020",
    desc: "Daily Design Challenge on Dribbble",
    thumb: "/images/mqKjnAfYlJoPjLE80JkaFFBYGyE.png",
    href: "https://dribbble.com/jackiehu_",
  },
  {
    title: "Oddio",
    meta: "Project @ CMU MHCI | 2020",
    desc: "A new audio-based social network with an endless feed",
    thumb: "/images/NhreDx8SlTfulVIsJ34VmaolzQ.png",
    href: "https://drive.google.com/file/d/1brEwbnox8v0qfgKTK1wfy83NFziLbp4T/view?usp=sharing",
  },
];

function LinkGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
    </svg>
  );
}

export default function OtherWork() {
  return (
    <section className="mx-auto w-full max-w-[1040px] px-6 py-10">
      <div className="mb-6 border-t border-black/10 pt-6">
        <h2 className="text-[20px] font-medium text-[#3e3e42]">Other Work ⁕</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {WORKS.map((w) => {
          const Card = (
            <div className="group flex h-full gap-5 rounded-2xl border border-black/[0.04] bg-[#fcf7f2] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="h-[135px] w-[115px] shrink-0 overflow-hidden rounded-xl bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.thumb}
                  alt={w.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] font-semibold tracking-[-0.36px] text-[#69645e]">{w.title}</h3>
                <p className="mt-0.5 text-[12px] text-[#878686]">{w.meta}</p>
                <p className="mt-3 text-[16px] leading-snug text-[#69645e]">{w.desc}</p>
                <div className="mt-auto pt-3 text-[#878686]">
                  <LinkGlyph />
                </div>
              </div>
            </div>
          );
          return w.href ? (
            <a key={w.title} href={w.href} target="_blank" rel="noopener noreferrer">
              {Card}
            </a>
          ) : (
            <div key={w.title}>{Card}</div>
          );
        })}
      </div>
    </section>
  );
}
