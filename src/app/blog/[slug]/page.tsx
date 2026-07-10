import BackButton from '@/components/BackButton';

function formatDate(dateString: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`http://127.0.0.1:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.[0] || null; 
  } catch (error) {
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug) {
    return (
      <div className="max-w-3xl mx-auto p-8 pt-24 text-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Invalid directory!</h1>
      </div>
    );
  }

  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-8 pt-24 text-center min-h-screen">
        <h1 className="text-3xl font-bold text-[#3e3e42] mb-6">Article not found</h1>
        <BackButton />
      </div>
    );
  }

  const item = blog.attributes || blog;
  const { title, content, publishedAt } = item;
  const authorName = item.author?.data?.attributes?.name || "Nguyễn Bá Phát";

  return (
    <article className="max-w-3xl mx-auto p-8 pt-24 min-h-screen">
      
      <BackButton />
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#3e3e42]">
        {title}
      </h1>

      <div className="mb-14 flex items-center gap-3 font-mono text-[12px] uppercase tracking-wider text-[#878686] border-b border-black/[0.05] pb-6">
        <span>By {authorName}</span>
        <span className="h-1 w-1 rounded-full bg-[#878686]/40"></span>
        <span>{formatDate(publishedAt)}</span>
      </div>

      <div className="w-full relative">
        {/* 🌟 ÉP CHUẨN ĐỊNH DẠNG: text-left, THÊM mr-8, ml-8 CHO ẢNH FLOAT 🌟 */}
        <div 
          className="ck-content text-left text-[15.5px] leading-[1.8] text-[#5c5751] break-words
            /* Text & Lists */
            [&_p]:mb-5 [&_strong]:font-bold [&_em]:italic
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-5
            /* Headings */
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-[#3e3e42]
            [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-[#3e3e42]
            /* Hình ảnh & Float theo Strapi */
            [&_figure]:m-0 [&_figure]:mb-6 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md
            [&_.image-style-align-left]:float-left [&_.image-style-align-left]:mr-8 [&_.image-style-align-left]:mb-4 [&_.image-style-align-left]:max-w-[50%]
            [&_.image-style-side]:float-right [&_.image-style-side]:ml-8 [&_.image-style-side]:mb-4 [&_.image-style-side]:max-w-[50%]
            [&_.image-style-align-right]:float-right [&_.image-style-align-right]:ml-8 [&_.image-style-align-right]:mb-4 [&_.image-style-align-right]:max-w-[50%]
            [&_.image-style-align-center]:mx-auto [&_.image-style-align-center]:block [&_.image-style-align-center]:max-w-[85%]
            /* Xóa Float cuối bài tránh tràn khối */
            after:content-[''] after:table after:clear-both"
          dangerouslySetInnerHTML={{ __html: content || "<p>No content available.</p>" }}
        />
      </div>
      
    </article>
  );
}