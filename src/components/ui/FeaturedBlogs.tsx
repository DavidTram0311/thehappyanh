import Link from 'next/link';

// Hàm lấy các bài viết có đánh dấu Nổi bật (isFeatured = true)
async function getFeaturedArticles() {
  const res = await fetch('http://127.0.0.1:1337/api/articles?filters[isFeatured][$eq]=true&populate=*', {
    cache: 'no-store'
  });
  
  if (!res.ok) return { data: [] };
  return res.json();
}

export default async function FeaturedBlogs() {
  const { data: articles } = await getFeaturedArticles();

  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-16 w-full max-w-5xl mx-auto">
      <Link href="/blog" className="inline-block mb-6 hover:opacity-70 transition-opacity">
        <h2 className="text-2xl font-mono text-gray-800 font-semibold cursor-pointer">Blogs</h2>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article: any) => {
          const attributes = article.attributes || article;
          const { Title, Slug, Content } = attributes;

          // Loại bỏ thẻ HTML từ CKEditor để lấy văn bản thuần
          const plainTextContent = Content 
            ? Content.replace(/<[^>]+>/g, '') 
            : "Đang cập nhật nội dung...";

          return (
            <div 
              key={article.id} 
              className="bg-[#f4f3ef] p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="inline-block bg-white px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-500 tracking-wider mb-5 border border-gray-200 shadow-sm uppercase w-fit">
                ✦ LỰA CHỌN NỔI BẬT
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
                {Title}
              </h3>
              
              <p className="text-gray-500 mb-8 line-clamp-4 text-sm leading-relaxed font-mono">
                {plainTextContent}
              </p>
              
              <div className="text-right mt-auto">
                <Link 
                  href={`/blog/${Slug}`} 
                  className="text-gray-400 hover:text-black text-sm italic font-mono transition-colors"
                >
                  continue reading →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}