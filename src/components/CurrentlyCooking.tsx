export default function CurrentlyCooking() {
  return (
    <section className="mx-auto w-full max-w-[1040px] px-6 pt-2 pb-10">
      <div className="mb-6 border-t border-black/10 pt-6">
        <h2 className="text-[20px] font-medium text-[#3e3e42] font-mono">My USP</h2>
      </div>

      <div className="flex items-center gap-4 mt-4 font-mono">
        
        {/* ==================== NÚT U ==================== */}
        <div className="relative group">
          {/* Giữ nguyên py-3, tăng w-40, dùng nền #fcf7f2 và có shadow 3D tinh tế */}
          <div className="flex justify-center items-center border border-black/[0.04] rounded-2xl w-40 py-3 text-2xl font-sans font-bold text-[#878686] bg-[#fcf7f2] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] group-hover:text-[#3e3e42] group-hover:border-black/[0.1] cursor-default">
            U
          </div>
          
          {/* Khung nội dung rộng ra max-w-[900px] */}
          <div className="absolute left-0 top-full mt-4 w-[90vw] max-w-[1000px] bg-[#fcf7f2] border border-black/[0.06] shadow-[0_15px_45px_rgba(0,0,0,0.06)] p-6 md:p-10 z-50 rounded-[2rem] opacity-0 invisible translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
            {/* Tam giác căn giữa nút U (chiều rộng nút 160px -> tâm là 80px -> trừ đi nửa tam giác là left-[72px]) */}
            <div className="absolute -top-[9px] left-[72px] w-4 h-4 bg-[#fcf7f2] border-t border-l border-black/[0.06] transform rotate-45 transition-all duration-500"></div>
            
            <h3 className="font-bold text-[16px] md:text-[18px] text-[#3e3e42] mb-3 font-sans tracking-tight">
              Unfair Advantage: The Calm After the Storm
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#69645e] leading-relaxed font-sans font-normal">
              As an ex-Ogilvy Vietnam strategist, I eventually traded chaotic agency deadlines and endless pings for the magic of meditation. Turns out, my ultimate hack for surviving—and winning—in the wild world of advertising is knowing exactly when to sit completely still and tell my brain to shut up. It’s what keeps my strategy sharp when everyone else is panicking.
            </p>
          </div>
        </div>

        {/* ==================== NÚT S ==================== */}
        <div className="relative group">
          <div className="flex justify-center items-center border border-black/[0.04] rounded-2xl w-40 py-3 text-2xl font-sans font-bold text-[#878686] bg-[#fcf7f2] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] group-hover:text-[#3e3e42] group-hover:border-black/[0.1] cursor-default">
            S
          </div>
          
          {/* Lùi bảng S lại 176px (160px nút + 16px khoảng cách) để cân bằng giao diện */}
          <div className="absolute left-0 md:-left-[176px] top-full mt-4 w-[90vw] max-w-[1000px] bg-[#fcf7f2] border border-black/[0.06] shadow-[0_15px_45px_rgba(0,0,0,0.06)] p-6 md:p-10 z-50 rounded-[2rem] opacity-0 invisible translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
            {/* Bù trừ tam giác: 72px + 176px = 248px */}
            <div className="absolute -top-[9px] left-[72px] md:left-[248px] w-4 h-4 bg-[#fcf7f2] border-t border-l border-black/[0.06] transform rotate-45 transition-all duration-500"></div>
            
            <h3 className="font-bold text-[16px] md:text-[18px] text-[#3e3e42] mb-3 font-sans tracking-tight">
              Storytelling with Soul (and Strategy)
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#69645e] leading-relaxed font-sans font-normal">
              I have a massive crush on marketing, but I don’t just churn out random content. My secret weapon is a deeply reflective process: pausing, cutting through the internet noise, and figuring out how to actually shape clarity and spark genuine delight. I build campaigns that don't just look good on a deck, but actually mean something to real people.
            </p>
          </div>
        </div>

        {/* ==================== NÚT P ==================== */}
        <div className="relative group">
          <div className="flex justify-center items-center border border-black/[0.04] rounded-2xl w-40 py-3 text-2xl font-sans font-bold text-[#878686] bg-[#fcf7f2] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] group-hover:text-[#3e3e42] group-hover:border-black/[0.1] cursor-default">
            P
          </div>
          
          {/* Lùi bảng P lại 352px (2 lần 176px) */}
          <div className="absolute left-0 md:-left-[352px] top-full mt-4 w-[90vw] max-w-[1000px] bg-[#fcf7f2] border border-black/[0.06] shadow-[0_15px_45px_rgba(0,0,0,0.06)] p-6 md:p-10 z-50 rounded-[2rem] opacity-0 invisible translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
            {/* Bù trừ tam giác: 72px + 352px = 424px */}
            <div className="absolute -top-[9px] left-[72px] md:left-[424px] w-4 h-4 bg-[#fcf7f2] border-t border-l border-black/[0.06] transform rotate-45 transition-all duration-500"></div>
            
            <h3 className="font-bold text-[16px] md:text-[18px] text-[#3e3e42] mb-3 font-sans tracking-tight">
              Tiêu đề của P (Bạn sửa chữ ở đây)
            </h3>
            <p className="text-[14px] md:text-[15px] text-[#69645e] leading-relaxed font-sans font-normal">
              Nội dung chi tiết của chữ P sẽ nằm ở đây. Bạn cứ bôi đen dòng này và gõ chữ của bạn vào nhé.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}