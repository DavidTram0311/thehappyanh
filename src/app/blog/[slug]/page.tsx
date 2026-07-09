"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter(); 
  const slug = params?.slug;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`http://localhost:1337/api/blogs?filters[Slug][$eq]=${slug}&populate=*`)
      .then((res) => res.json())
      .then((res) => {
        const data = res.data || [];
        setBlog(data[0]); 
        setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [slug]);

  const formatHTML = (html: string) => {
    if (!html) return "";
    let formatted = html.replace(/src="(\/[^"]+)"/g, 'src="http://localhost:1337$1"');
    formatted = formatted.replace(/<p\b([^>]*)>/gi, '<div class="ck-p"$1>').replace(/<\/p>/gi, '</div>');
    return formatted;
  };

  if (loading) return <div className="text-center py-20 text-[#878686] bg-[#fcf7f2] min-h-screen">Loading...</div>;
  if (!blog) return <div className="text-center py-20 text-[#3e3e42] bg-[#fcf7f2] min-h-screen">Không tìm thấy bài viết.</div>;

  const data = blog.attributes || blog;

  return (
    <main className="w-full min-h-screen bg-[#fcf7f2] py-20">
      <article className="max-w-3xl mx-auto px-6">
        <button onClick={() => router.back()} className="text-sm text-[#878686] hover:text-[#3e3e42] mb-10 transition-colors">
          ← Back
        </button>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[#3e3e42] mb-10 leading-snug">
          {data.Title}
        </h1>
        
        <div 
          className="text-[16px] leading-[1.8] text-[#69645e] 
            [&_.ck-p]:mb-6 [&_.ck-p]:!font-sans
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#3e3e42] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:!font-sans
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#3e3e42] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:!font-sans
            [&_pre]:bg-[#f3f4f6] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:text-[14px] [&_pre]:mb-6 [&_pre_*]:!font-mono
            [&_code]:bg-[#f3f4f6] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[14px] [&_code_*]:!font-mono
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
            [&_figure]:!w-full [&_figure]:!flex [&_figure]:!flex-col [&_figure]:!items-center [&_figure]:!my-10 [&_figure]:!m-0
            [&_figcaption]:!text-sm [&_figcaption]:!text-[#878686] [&_figcaption]:!mt-3 [&_figcaption]:!italic [&_figcaption]:!text-center
            [&_img]:!mx-auto [&_img]:!block [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:shadow-md [&_img]:border [&_img]:border-[#e5e7eb]"
          dangerouslySetInnerHTML={{ __html: formatHTML(data.Content) }}
        >
        </div>
      </article>
    </main>
  );
}