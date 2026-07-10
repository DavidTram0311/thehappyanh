'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} // Trả về ĐÚNG trang trước đó (Highlight hoặc All Blogs)
      className="group mb-12 inline-flex items-center gap-3 font-mono text-[13px] font-light tracking-wide text-[#878686] transition-colors duration-300 hover:text-[#3e3e42]"
    >
      <span className="font-sans font-light opacity-60 transition-transform duration-300 group-hover:-translate-x-1">←</span> 
      Go back
    </button>
  );
}