import Navbar from '@/components/layout/Navbar';
import SocialIcons from '@/components/ui/SocialIcons';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
// import { fetchBlogBySlug, getStrapiMediaUrl } from '@/lib/strapi';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  category: {
    name: string;
    slug: string;
    color: string;
  };
  publishedDate: string;
  readTime: number;
}

// Mock data for development before Strapi is connected
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'What Traveling Greece For 2 Weeks Taught Me About Life',
    slug: 'traveling-greece-2-weeks',
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis imperdiet et, aliquam suspendisse. Feugiat neque facilisi diam faucibus nec quis.</p>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <h2>The Journey Begins</h2>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      
      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      
      <h2>Lessons Learned</h2>
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
    `,
    featuredImage: '/images/doodle_portrait_main_screen.png',
    category: {
      name: 'Travel',
      slug: 'travel',
      color: '#6B8E23'
    },
    publishedDate: '2024-06-21',
    readTime: 11
  },
  {
    id: 2,
    title: 'Why You Should Never Order 12 Chicken Nuggets and Fries',
    slug: 'never-order-12-chicken-nuggets',
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis imperdiet et, aliquam suspendisse. Feugiat neque facilisi diam faucibus nec quis.</p>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <h2>The Science Behind It</h2>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      
      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
    `,
    featuredImage: '/images/doodle_portrait_about_me_screen.png',
    category: {
      name: 'Food Theory',
      slug: 'food-theory',
      color: '#D2691E'
    },
    publishedDate: '2024-08-01',
    readTime: 7
  }
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  // TODO: Uncomment this when Strapi is set up and running
  // const strapiPost = await fetchBlogBySlug(slug);
  // if (!strapiPost) {
  //   notFound();
  // }
  // const post: BlogPost = {
  //   id: strapiPost.id,
  //   title: strapiPost.title,
  //   slug: strapiPost.slug,
  //   content: strapiPost.content,
  //   featuredImage: getStrapiMediaUrl(strapiPost.featuredImage.url),
  //   category: {
  //     name: strapiPost.category.name,
  //     slug: strapiPost.category.slug,
  //     color: strapiPost.category.color
  //   },
  //   publishedDate: strapiPost.publishedDate,
  //   readTime: strapiPost.readTime
  // };

  // For now, use mock data
  const post = mockBlogPosts.find(p => p.slug === slug);
  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <Link 
          href="/blogs" 
          className="inline-flex items-center gap-2 text-[#4A5D1D] hover:opacity-70 transition-opacity mb-8"
        >
          <ArrowLeft size={20} />
          Back to Blogs
        </Link>

        <span 
          className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
          style={{ backgroundColor: post.category.color }}
        >
          {post.category.name}
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-[#4A5D1D] mb-4">
          {post.title}
        </h1>

        <p className="text-[#4A5D1D]/70 mb-8">
          {formattedDate} • {post.readTime} min read
        </p>

        <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div 
          className="prose prose-lg max-w-none prose-headings:text-[#4A5D1D] prose-p:text-[#4A5D1D]/80 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <SocialIcons />
    </main>
  );
}
