"use client";

import Image from 'next/image';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import { useEffect, useState } from 'react';

export default function AboutSection() {
  const [showAnnotations, setShowAnnotations] = useState(false);

  useEffect(() => {
    // Small delay to ensure layout is stable before drawing the doodles
    const timer = setTimeout(() => setShowAnnotations(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full h-[calc(100vh-120px)] px-6 md:px-24">
      {/* Left Text Content */}
      <div className="flex-1 flex flex-col justify-center relative max-w-2xl pl-12 z-10">
        <RoughNotationGroup show={showAnnotations}>
          <h2 className="text-5xl md:text-6xl font-serif font-medium text-[#4A5D1D] leading-tight mb-8">
            About Anh
          </h2>
          
          <div className="relative">
            <p className="text-[#4A5D1D] text-lg leading-relaxed max-w-xl font-medium px-4">
              Anh is a Vietnamese fresh out of university, excited to be working at her first full-time job as a{' '}
              <RoughNotation type="highlight" color="#ffdec2" multiline={true} padding={[0, 4]}>
                <span className="relative z-10">UX designer</span>
              </RoughNotation>
              . However, it has been quite a difficult transition for her to be living on her own, instead of in the comfort of living with her parents.
            </p>
          </div>
        </RoughNotationGroup>
      </div>

      {/* Right Image Content */}
      <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 relative h-full max-h-[600px] w-full max-w-md">
        <Image
          src="/images/doodle_portrait_about_me_screen.png"
          alt="About Anh portrait doodle"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
