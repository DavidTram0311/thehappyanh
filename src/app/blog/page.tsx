import Link from 'next/link';
import { Nunito } from 'next/font/google';

const PUBLIC_IMAGE_URL = "http://192.168.1.9:1337"; 
const API_URL = "http://127.0.0.1:1337"; 

/* Initialize Nunito Font */
const nunito = Nunito({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

function formatDate(dateString: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });
}

function fixImageUrls(htmlContent: string) {
  if (!htmlContent) return "";
  return htmlContent.replace(/(https?:\/\/[^\/]+)?\/uploads\//g, `${PUBLIC_IMAGE_URL}/uploads/`);
}

export default async function BlogPage() {
  let blogs: any[] = [];

  try {
    const res = await fetch(`${API_URL}/api/blogs?sort=publishedAt:desc&populate=*`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      blogs = data.data || [];
    }
  } catch (error) {}

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const gridBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  const getCover = (item: any) => {
    let coverUrl = null;
    const coverData = item.cover?.data?.attributes || item.thumbnail?.data?.attributes || item.image?.data?.attributes;
    if (coverData?.url) coverUrl = coverData.url;
    else if (item.cover?.url) coverUrl = item.cover.url;
    if (coverUrl && !coverUrl.startsWith("http")) coverUrl = `${PUBLIC_IMAGE_URL}${coverUrl}`;
    return coverUrl;
  };

  return (
    <div className="mx-auto max-w-[900px] px-6 py-20 font-sans">
      <Link href="/#blog" className="group mb-12 inline-flex items-center gap-3 text-[13px] font-medium tracking-wide text-[#878686] transition-colors duration-300 hover:text-[#3e3e42] font-sans">
        <span className="opacity-60 transition-transform duration-300 group-hover:-translate-x-1">←</span> Home
      </Link>

      <h1 className="mb-14 text-4xl md:text-5xl font-bold tracking-tight text-[#3e3e42] font-sans">All Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-[#878686] text-center font-sans">No blogs found...</p>
      ) : (
        <>
          {/* Featured Blog */}
          {featuredBlog && (
            <div className="mb-24 w-full group cursor-pointer block relative">
              <Link href={`/blog/${featuredBlog.attributes?.slug || featuredBlog.slug}?from=all`} className="absolute inset-0 z-20"></Link>
              
              {/* Fixed 16:9 Aspect Ratio (1200x675 Equivalent) */}
              <div className="w-full aspect-video mx-auto mb-8 rounded-[20px] shadow-sm overflow-hidden border border-black/5 bg-[#fcf7f2] relative">
                 {getCover(featuredBlog.attributes || featuredBlog) ? (
                   <img src={getCover(featuredBlog.attributes || featuredBlog)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 block" alt="Cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-[#fcf7f2] text-[#a39e93] font-bold tracking-widest uppercase font-sans">No Cover Image</div>
                 )}
              </div>
              
              <div className="text-center px-4 max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3e3e42] mb-4 leading-tight font-sans">{featuredBlog.attributes?.title || featuredBlog.title}</h2>
                  
                  <div className="text-[#878686] text-[12px] mb-6 italic font-sans" suppressHydrationWarning>
                    Posted On {formatDate(featuredBlog.attributes?.publishedAt || featuredBlog.publishedAt)}
                  </div>
                  
                  <div className="relative overflow-hidden h-[120px] mb-8 text-left">
                    <div 
                      suppressHydrationWarning
                      className={`ck-content ${nunito.className} text-[15px] leading-[1.7] text-[#5c5751] w-full break-words [overflow-wrap:anywhere]
                        [&_h1]:!hidden [&_h2]:!hidden [&_h3]:!hidden [&_h4]:!hidden [&_h5]:!hidden [&_h6]:!hidden
                        [&_img]:!max-w-full [&_img]:!h-auto [&_img]:!rounded-lg [&_img]:!my-2`}
                      dangerouslySetInnerHTML={{ __html: fixImageUrls(featuredBlog.attributes?.content || featuredBlog.content) || "" }} 
                    />
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#fcf7f2] to-transparent" />
                  </div>

                  <div className="w-8 h-[1px] bg-black/20 mx-auto mb-6"></div>
                  <div className="text-[11px] uppercase tracking-widest font-bold text-[#3e3e42] transition-colors group-hover:text-[#bba38a] font-sans">Continue Reading</div>
              </div>
            </div>
          )}

          {/* Grid Blogs */}
          {gridBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-black/5 pt-16 items-start">
              {gridBlogs.map((blog: any, index: number) => {
                const item = blog.attributes || blog;
                const { title, slug, content, publishedAt } = item;
                
                return (
                  <div key={blog.id || index} className="w-full group cursor-pointer block relative">
                    <Link href={`/blog/${slug}?from=all`} className="absolute inset-0 z-20" aria-label={title}></Link>
                    
                    {/* Fixed 16:9 Aspect Ratio (1200x675 Equivalent) */}
                    <div className="w-full aspect-video flex justify-center overflow-hidden mb-6 rounded-[20px] shadow-sm bg-[#fcf7f2] relative">
                       {getCover(item) ? (
                         <img src={getCover(item)} className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 group-hover:scale-105" alt={title} />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center bg-[#fcf7f2] text-[#a39e93] text-[10px] font-bold tracking-widest uppercase rounded-[20px] font-sans">No Cover</div>
                       )}
                    </div>
                    
                    <div className="text-center">
                       <h2 className="text-[20px] font-bold text-[#3e3e42] mb-3 leading-snug font-sans">{title}</h2>
                       <div className="text-[#878686] text-[11px] mb-5 italic font-sans" suppressHydrationWarning>Posted On {formatDate(publishedAt)}</div>
                       
                       <div className="relative overflow-hidden h-[90px] mb-6 text-left">
                          <div 
                            suppressHydrationWarning
                            className={`ck-content ${nunito.className} text-[14px] leading-[1.6] text-[#5c5751] w-full break-words [overflow-wrap:anywhere]
                              [&_h1]:!hidden [&_h2]:!hidden [&_h3]:!hidden [&_h4]:!hidden [&_h5]:!hidden [&_h6]:!hidden
                              [&_img]:!max-w-full [&_img]:!h-auto [&_img]:!rounded-md [&_img]:!my-2`}
                            dangerouslySetInnerHTML={{ __html: fixImageUrls(content) || "" }} 
                          />
                          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#fcf7f2] to-transparent" />
                       </div>

                       <div className="w-6 h-[1px] bg-black/15 mx-auto mb-5"></div>
                       <div className="text-[10px] uppercase tracking-widest font-bold text-[#3e3e42] transition-colors group-hover:text-[#bba38a] font-sans">Continue Reading</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}