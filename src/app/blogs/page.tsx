import Navbar from '@/components/layout/Navbar';
import BlogGrid from '@/components/blog/BlogGrid';
import SocialIcons from '@/components/ui/SocialIcons';
import { BlogPost } from '@/components/blog/BlogCard';
// import { fetchBlogs, getStrapiMediaUrl } from '@/lib/strapi';

// Mock data for development before Strapi is connected
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'What Traveling Greece For 2 Weeks Taught Me About Life',
    slug: 'traveling-greece-2-weeks',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis imperdiet et, aliquam suspendisse. Feugiat neque facilisi diam faucibus nec quis...',
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
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam mollis imperdiet et, aliquam suspendisse. Feugiat neque facilisi diam faucibus nec quis...',
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

export default async function BlogsPage() {
  // TODO: Uncomment this when Strapi is set up and running
  // const strapiPosts = await fetchBlogs();
  // const posts: BlogPost[] = strapiPosts.map(post => ({
  //   id: post.id,
  //   title: post.title,
  //   slug: post.slug,
  //   excerpt: post.excerpt,
  //   featuredImage: getStrapiMediaUrl(post.featuredImage.url),
  //   category: {
  //     name: post.category.name,
  //     slug: post.category.slug,
  //     color: post.category.color
  //   },
  //   publishedDate: post.publishedDate,
  //   readTime: post.readTime
  // }));

  // For now, use mock data
  const posts = mockBlogPosts;

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      <Navbar />
      <BlogGrid posts={posts} />
      <SocialIcons />
    </main>
  );
}
