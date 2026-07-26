'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BackButtonContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  // Route based on URL params
  let targetUrl = '/blog'; // Default fallback
  
  if (from === 'home') {
    targetUrl = '/#blog'; // Back to Home section
  } else if (from === 'all') {
    targetUrl = '/blog';  // Back to All Blogs
  }

  return (
    <Link 
      href={targetUrl}
      className="group relative z-50 mb-12 inline-flex items-center gap-3 font-mono text-[13px] font-light tracking-wide text-[#878686] transition-colors duration-300 hover:text-[#3e3e42]"
    >
      <span className="font-sans font-light opacity-60 transition-transform duration-300 group-hover:-translate-x-1">
        ←
      </span> 
      Go back
    </Link>
  );
}

export default function BackButton() {
  return (
    <Suspense fallback={<div className="mb-12 h-6 w-20 animate-pulse bg-gray-100 rounded"></div>}>
      <BackButtonContent />
    </Suspense>
  );
}