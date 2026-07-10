import Link from 'next/link';

function formatDate(dateString: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function OtherWork() {
  let blogs: any[] = [];
  
  try {
    const res = await fetch('http://127.0.0.1:1337/api/blogs?filters[highlight][$eq]=true&sort=publishedAt:desc&populate=*', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      blogs = data.data || [];
    }
  } catch (error) {}

  return (
    <section id="blog" className="mx-auto w-full max-w-[1040px] px-6 py-10 overflow-hidden">
      <div className="mb-8 border-t border-black/10 pt-6">
        <Link href="/blog" className="inline-block hover:opacity-70 transition-opacity">
          <h2 className="text-[20px] font-medium text-[#3e3e42] hover:underline cursor-pointer">Blogs</h2>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-gray-400 font-mono text-sm italic">Waiting for updates...</div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pt-2 pb-10 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {blogs.map((blog: any) => {
            const item = blog.attributes || blog;
            const { title, slug, content, publishedAt } = item;
            const authorName = item.author?.data?.attributes?.name || "Nguyễn Bá Phát";

            return (
              <Link key={blog.id || Math.random()} href={`/blog/${slug}`} className="group block shrink-0 w-[90vw] md:w-[480px] snap-start">
                
                <div className="relative flex h-full flex-col rounded-2xl border border-[#e8e1d9] border-b-[4px] border-b-[#ded5ca] bg-[#fcf7f2] p-8 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-b-[#d1c6b8] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden">
                  
                  <h3 className="mb-3 text-2xl font-bold leading-snug text-[#3e3e42]">{title || "Untitled"}</h3>
                  
                  <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#878686]">
                    <span>{authorName}</span>
                    <span className="h-1 w-1 rounded-full bg-[#878686]/40"></span>
                    <span>{formatDate(publishedAt)}</span>
                  </div>
                  
                  <div className="relative mb-6 overflow-hidden max-h-[450px]">
                    <div 
                      className="ck-content text-left text-[12.5px] leading-[1.6] text-[#5c5751] break-words
                        [&_p]:mb-3 [&_strong]:font-bold [&_em]:italic [&_h2]:text-base [&_h3]:text-[14px]
                        [&_figure]:m-0 [&_figure]:mb-3 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-xl
                        [&_.image-style-align-left]:float-left [&_.image-style-align-left]:mr-6 [&_.image-style-align-left]:mb-2 [&_.image-style-align-left]:max-w-[50%]
                        [&_.image-style-side]:float-right [&_.image-style-side]:ml-6 [&_.image-style-side]:mb-2 [&_.image-style-side]:max-w-[50%]
                        [&_.image-style-align-right]:float-right [&_.image-style-align-right]:ml-6 [&_.image-style-align-right]:mb-2 [&_.image-style-align-right]:max-w-[50%]
                        [&_.image-style-align-center]:mx-auto [&_.image-style-align-center]:block [&_.image-style-align-center]:max-w-[80%]
                        after:content-[''] after:table after:clear-both"
                      dangerouslySetInnerHTML={{ __html: content || "" }} 
                    />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#fcf7f2] to-transparent pointer-events-none z-10" />
                  </div>
                  
                  <div className="mt-auto text-right relative z-20">
                    <span className="font-mono text-[13px] italic text-[#878686] transition-colors duration-300 group-hover:text-[#3e3e42]">continue reading →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}