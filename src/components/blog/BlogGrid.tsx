"use client";

import { useState, useMemo } from 'react';
import BlogCard, { BlogPost } from './BlogCard';
import BlogHeader from './BlogHeader';

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.name.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  return (
    <div className="min-h-screen">
      <BlogHeader onSearch={setSearchQuery} />
      
      <div className="px-6 md:px-24 pb-16">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#4A5D1D]/60 text-lg">
              No articles found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
