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

export default async function OtherWork() {
  let blogs: any[] = [];
  
  try {
    const res = await fetch(`${API_URL}/api/blogs?filters[highlight][$eq]=true&sort=publishedAt:desc&populate=*`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      blogs = data.data || [];
    }
  } catch (error) {}

  return (
    <section id="blog" className="mx-auto w-full max-w-[1040px] px-6 py-10 overflow-hidden font-sans">
      <div className="mb-6 border-t border-black/10 pt-6">
        <Link href="/blog" className="inline-block hover:opacity-70 transition-opacity">
          <h2 className="text-[20px] font-medium text-[#3e3e42] hover:underline cursor-pointer font-sans">Blogs</h2>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-gray-400 text-sm italic font-sans">Waiting for updates...</div>
      ) : (
        <div className="max-h-[550px] overflow-y-auto pr-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog: any, index: number) => {
              const item = blog.attributes || blog;
              const { title, slug, content, publishedAt } = item;

              let coverUrl = null;
              const coverData = item.cover?.data?.attributes || item.thumbnail?.data?.attributes || item.image?.data?.attributes;
              
              if (coverData?.url) coverUrl = coverData.url;
              else if (item.cover?.url) coverUrl = item.cover.url;

              if (coverUrl && !coverUrl.startsWith("http")) coverUrl = `${PUBLIC_IMAGE_URL}${coverUrl}`;

              return (
                <div key={blog.id || index} className="group w-full block relative cursor-pointer">
                  {/* Fixed Card Height */}
                  <div className="relative flex flex-row items-center h-[240px] rounded-[24px] border border-[#e8e1d9] border-b-[4px] border-b-[#ded5ca] bg-[#fcf7f2] p-5 sm:p-6 transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] group-hover:-translate-y-1 group-hover:border-b-[#d1c6b8] overflow-hidden gap-5 sm:gap-6">
                    
                    <Link href={`/blog/${slug}?from=home`} className="absolute inset-0 z-20" aria-label={title}></Link>
                    
                    {/* Fixed Square Cover Image */}
                    <div className="shrink-0 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-[16px] overflow-hidden shadow-sm border border-black/5 relative z-10 pointer-events-none flex items-center justify-center bg-[#f0ebe1]">
                      {coverUrl ? (
                        <img src={coverUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <span className="text-[#a39e93] text-[10px] font-bold tracking-widest uppercase font-sans">No Cover</span>
                      )}
                    </div>
                    
                    <div className="relative z-10 pointer-events-none flex flex-col flex-1 h-full justify-center min-w-0 py-1">
                      <h3 className="mb-2 text-[17px] sm:text-[19px] font-bold leading-snug text-[#3e3e42] font-sans">
                        {title || "Untitled"}
                      </h3>
                      
                      <div className="mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#878686] font-sans">
                        <span className="shrink-0" suppressHydrationWarning>{formatDate(publishedAt)}</span>
                      </div>
                      
                      <div className="relative overflow-hidden w-full flex-1 min-h-0">
                        {/* Apply Nunito to blog body, inherit font for headings */}
                        <div 
                          suppressHydrationWarning
                          className={`ck-content ${nunito.className} text-left text-[#5c5751] w-full break-words [overflow-wrap:anywhere]
                            [&_p]:!text-[13px] [&_p]:!leading-[1.6] [&_p]:!mb-2
                            [&_h1]:!hidden [&_h2]:!hidden [&_h3]:!hidden [&_h4]:!hidden [&_h5]:!hidden [&_h6]:!hidden
                            [&_img]:!max-w-full [&_img]:!h-auto [&_img]:!rounded-md [&_img]:!my-1`}
                          dangerouslySetInnerHTML={{ __html: fixImageUrls(content) || "" }} 
                        />
                        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#fcf7f2] to-transparent" />
                      </div>
                      
                      <div className="mt-2 text-right shrink-0">
                        <span className="text-[11px] font-medium italic text-[#878686] transition-colors duration-300 group-hover:text-[#3e3e42] font-sans">continue reading →</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}