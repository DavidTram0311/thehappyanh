import Image from 'next/image';
import Link from 'next/link';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: {
    name: string;
    slug: string;
    color: string;
  };
  publishedDate: string;
  readTime: number;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/blogs/${post.slug}`}>
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-64 w-full">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <span 
            className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-3 w-fit"
            style={{ backgroundColor: post.category.color }}
          >
            {post.category.name}
          </span>
          
          <h2 className="text-2xl font-bold text-[#4A5D1D] mb-3 hover:opacity-70 transition-opacity">
            {post.title}
          </h2>
          
          <p className="text-[#4A5D1D]/70 text-sm mb-4">
            {formattedDate} • {post.readTime} min read
          </p>
          
          <p className="text-[#4A5D1D]/80 leading-relaxed flex-grow">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
