export default function CurrentlyCooking() {
  return (
    <section className="mx-auto w-full max-w-[1040px] px-5 md:px-6 pt-2 pb-10">
      <div className="mb-6 border-t border-black/10 pt-6">
        <h2 className="text-[20px] font-medium text-[#3e3e42] font-mono">My USP</h2>
      </div>

      {/* MOBILE: Xếp dọc (flex-col) / LAPTOP: Xếp ngang (md:flex-row) */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-4 mt-4 font-mono">
        
        {/* ==================== U BUTTON ==================== */}
        {/* MOBILE: width 100% (w-full) / LAPTOP: w-auto */}
        <div className="relative group w-full md:w-auto flex flex-col items-center">
          <div className="flex justify-center items-center border border-black/[0.04] rounded-2xl w-full md:w-40 py-3 text-xl md:text-2xl font-sans font-bold text-[#878686] bg-[#fcf7f2] transition-all duration-500 ease-out md:group-hover:-translate-y-1 md:group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] md:group-hover:text-[#3e3e42] md:group-hover:border-black/[0.1] cursor-default">
            U
          </div>
          
          {/* MOBILE: relative, luôn hiện / LAPTOP: absolute, ẩn đi và chờ hover */}
          <div className="relative md:absolute md:left-0 md:top-full mt-3 md:mt-4 w-full md:w-[90vw] md:max-w-[1000px] bg-[#fcf7f2] border border-black/[0.06] shadow-sm md:shadow-[0_15px_45px_rgba(0,0,0,0.06)] p-5 md:p-10 md:z-50 rounded-2xl md:rounded-[2rem] opacity-100 visible translate-y-0 md:opacity-0 md:invisible md:translate-y-3 transition-all duration-500 ease-out md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0">
            {/* Tam giác: Ẩn trên mobile, chỉ hiện trên laptop */}
            <div className="hidden md:block absolute -top-[9px] left-[72px] w-4 h-4 bg-[#fcf7f2] border-t border-l border-black/[0.06] transform rotate-45 transition-all duration-500"></div>
            
            <h3 className="font-bold text-[16px] md:text-[18px] text-[#3e3e42] mb-2 md:mb-3 font-sans tracking-tight">
              Unfair Advantage: The Calm After the Storm
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#69645e] leading-relaxed font-sans font-normal">
              As an ex-Ogilvy Vietnam strategist, I eventually traded chaotic agency deadlines and endless pings for the magic of meditation. Turns out, my ultimate hack for surviving—and winning—in the wild world of advertising is knowing exactly when to sit completely still and tell my brain to shut up. It’s what keeps my strategy sharp when everyone else is panicking.
            </p>
          </div>
        </div>

        {/* ==================== S BUTTON ==================== */}
        <div className="relative group w-full md:w-auto flex flex-col items-center mt-4 md:mt-0">
          <div className="flex justify-center items-center border border-black/[0.04] rounded-2xl w-full md:w-40 py-3 text-xl md:text-2xl font-sans font-bold text-[#878686] bg-[#fcf7f2] transition-all duration-500 ease-out md:group-hover:-translate-y-1 md:group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] md:group-hover:text-[#3e3e42] md:group-hover:border-black/[0.1] cursor-default">
            S
          </div>
          
          <div className="relative md:absolute md:-left-[176px] md:top-full mt-3 md:mt-4 w-full md:w-[90vw] md:max-w-[1000px] bg-[#fcf7f2] border border-black/[0.06] shadow-sm md:shadow-[0_15px_45px_rgba(0,0,0,0.06)] p-5 md:p-10 md:z-50 rounded-2xl md:rounded-[2rem] opacity-100 visible translate-y-0 md:opacity-0 md:invisible md:translate-y-3 transition-all duration-500 ease-out md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0">
            <div className="hidden md:block absolute -top-[9px] left-[248px] w-4 h-4 bg-[#fcf7f2] border-t border-l border-black/[0.06] transform rotate-45 transition-all duration-500"></div>
            
            <h3 className="font-bold text-[16px] md:text-[18px] text-[#3e3e42] mb-2 md:mb-3 font-sans tracking-tight">
              Storytelling with Soul (and Strategy)
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#69645e] leading-relaxed font-sans font-normal">
              I have a massive crush on marketing, but I don’t just churn out random content. My secret weapon is a deeply reflective process: pausing, cutting through the internet noise, and figuring out how to actually shape clarity and spark genuine delight. I build campaigns that don't just look good on a deck, but actually mean something to real people.
            </p>
          </div>
        </div>

        {/* ==================== P BUTTON ==================== */}
        <div className="relative group w-full md:w-auto flex flex-col items-center mt-4 md:mt-0">
          <div className="flex justify-center items-center border border-black/[0.04] rounded-2xl w-full md:w-40 py-3 text-xl md:text-2xl font-sans font-bold text-[#878686] bg-[#fcf7f2] transition-all duration-500 ease-out md:group-hover:-translate-y-1 md:group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] md:group-hover:text-[#3e3e42] md:group-hover:border-black/[0.1] cursor-default">
            P
          </div>
          
          <div className="relative md:absolute md:-left-[352px] md:top-full mt-3 md:mt-4 w-full md:w-[90vw] md:max-w-[1000px] bg-[#fcf7f2] border border-black/[0.06] shadow-sm md:shadow-[0_15px_45px_rgba(0,0,0,0.06)] p-5 md:p-10 md:z-50 rounded-2xl md:rounded-[2rem] opacity-100 visible translate-y-0 md:opacity-0 md:invisible md:translate-y-3 transition-all duration-500 ease-out md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0">
            <div className="hidden md:block absolute -top-[9px] left-[424px] w-4 h-4 bg-[#fcf7f2] border-t border-l border-black/[0.06] transform rotate-45 transition-all duration-500"></div>
            
            <h3 className="font-bold text-[16px] md:text-[18px] text-[#3e3e42] mb-2 md:mb-3 font-sans tracking-tight">
              P Title (Edit your title here)
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#69645e] leading-relaxed font-sans font-normal">
              Detailed content for P will go here. Highlight this line and replace it with your own text.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}