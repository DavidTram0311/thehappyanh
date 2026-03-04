"use client";

import { Search } from 'lucide-react';
import { useState } from 'react';

interface BlogHeaderProps {
  onSearch: (query: string) => void;
}

export default function BlogHeader({ onSearch }: BlogHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="w-full py-12 px-6 md:px-24 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-[#4A5D1D] mb-4">
        thehappyanh&apos;s blog
      </h1>
      <p className="text-lg text-[#4A5D1D]/70 mb-8">
        A blog about food, experiences, and recipes.
      </p>
      
      <div className="max-w-xl mx-auto relative">
        <input
          type="text"
          placeholder="Search for articles"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-6 py-3 pr-12 rounded-lg border-2 border-[#4A5D1D]/20 focus:border-[#4A5D1D] focus:outline-none bg-white text-[#4A5D1D] placeholder:text-[#4A5D1D]/40"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A5D1D]/40" size={20} />
      </div>
    </div>
  );
}
