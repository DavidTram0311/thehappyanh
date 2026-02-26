"use client";

import Image from 'next/image';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';
import { useEffect, useState } from 'react';

export default function HeroSection() {
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
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#4A5D1D] leading-tight mb-8">
            A taste of{' '}
            <RoughNotation type="highlight" color="#ffdec2" multiline={true} padding={[0, 4]}>
              <span className="relative z-10">home</span>
            </RoughNotation>{' '}
            in every dish
          </h1>
          
          <div className="relative">
            <p className="text-[#4A5D1D] text-lg leading-relaxed max-w-xl font-medium px-4">
              You can only have so many microwavable instant meals before your tastebuds revolt.
              Whatever your level of skill in the kitchen, however busy you are—{' '}
              <RoughNotation type="underline" color="#4A5D1D" strokeWidth={2} iterations={3}>
                <strong className="font-bold">jia mi</strong>
              </RoughNotation>{' '}
              can help you making delicious Chinese home-cooking part of your lifestyle.
            </p>
          </div>
        </RoughNotationGroup>
      </div>

      {/* Right Image Content */}
      <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 relative h-full max-h-[600px] w-full max-w-md">
        <Image
          src="/images/doodle_portrait_main_screen.png"
          alt="Portrait doodle"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
