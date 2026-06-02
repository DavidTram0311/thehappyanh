type Item = {
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
};

function IconJust() {
  return (
    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[14px] bg-black">
      <span className="text-[15px] font-bold tracking-tight text-white">JUST</span>
    </div>
  );
}

function IconDrigmo() {
  return (
    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[14px] bg-gradient-to-br from-[#ff9ec4] via-[#ffd0e0] to-[#ffe8c4]">
      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#ffb347] to-[#ff7e5f]" />
    </div>
  );
}

function IconImage({ src }: { src: string }) {
  return (
    <div className="h-[60px] w-[60px] overflow-hidden rounded-[14px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

const ITEMS: Item[] = [
  {
    title: "JUST",
    subtitle: "Simple, smart, social shopping",
    href: "https://www.getjust.eu/",
    icon: <IconJust />,
  },
  {
    title: "Drigmo",
    subtitle: "AI playlist of food and places",
    href: "https://www.linkedin.com/company/drigmo/",
    icon: <IconDrigmo />,
  },
  {
    title: "Zenly (Snap. Inc)",
    subtitle: "Live map of close friends and family",
    href: "https://zenly.com/",
    icon: <IconImage src="/images/IZRnrksxk6jlauzVdxiPn0G08Hk.png" />,
  },
  {
    title: "Discover Student Loans",
    subtitle: "Interactive application assistant tool",
    href: "https://hcii.cmu.edu/mhci/capstone/2020/discover/#/",
    icon: <IconImage src="/images/duEM63itto4Se3V5U7UC7uZb8.png" />,
  },
];

export default function RecentlyMade() {
  return (
    <section className="relative mx-auto w-full max-w-[1040px] px-6 py-10">
      <div className="mb-6 border-t border-black/10 pt-6">
        <h2 className="text-[20px] font-medium text-[#3e3e42]">Portfolio ▶</h2>
      </div>

      <div className="flex flex-col gap-3">
        {ITEMS.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-[120px] w-full max-w-[500px] items-center gap-5 rounded-2xl border border-black/[0.04] bg-[#fcf7f2] px-[30px] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="shrink-0">{item.icon}</div>
            <div>
              <h3 className="text-[18px] font-semibold text-[#69645e]">{item.title}</h3>
              <p className="text-[16px] text-[#69645e]">{item.subtitle}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Floating Jackie chat pill */}
      <div className="pointer-events-none absolute right-[40px] top-[150px] hidden lg:block">
        <div className="relative">
          <div
            className="absolute -left-1 -top-2 h-3 w-3 rotate-45 bg-[#ff6a3d]"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
          <div className="rounded-full bg-[#ff6a3d] px-5 py-2 text-[15px] font-semibold text-white shadow-md">
            Anh
          </div>
        </div>
      </div>
    </section>
  );
}
