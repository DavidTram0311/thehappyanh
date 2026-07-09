"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/blogs?populate=*&sort=createdAt:desc')
      .then((res) => res.json())
      .then((res) => setBlogs(res.data || []))
      .catch((err) => console.error("Lỗi tải blog:", err));
  }, []);

  const formatHTML = (html: string) => {
    if (!html) return "Đang cập nhật nội dung...";
    let formatted = html.replace(/src="(\/[^"]+)"/g, 'src="http://localhost:1337$1"');
    formatted = formatted.replace(/<img /g, '<img class="max-h-[160px] w-auto max-w-full object-contain mx-auto my-4 rounded-xl border border-[#e5e7eb]/80 shadow-sm bg-white p-1 block" ');
    formatted = formatted.replace(/<p\b([^>]*)>/gi, '<div class="ck-p"$1>').replace(/<\/p>/gi, '</div>');
    return formatted;
  };

  const col1 = blogs.filter((_, index) => index % 2 === 0);
  const col2 = blogs.filter((_, index) => index % 2 !== 0);

  const renderBlogCard = (item: any) => {
    const blog = item.attributes || item;
    const isHighlight = blog.ISFEATURED === true || blog.isFeatured === true || blog.Isfeatured === true; 

    return (
      <Link
        href={`/blog/${blog.Slug || blog.slug}`}
        key={item.id}
        className="group block relative overflow-hidden bg-[#fcf7f2] border border-[#e5e7eb] rounded-[20px] p-8 transition-all duration-500 ease-out hover:border-[#3e3e42]/50 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(62,62,66,0.15)] w-full"
      >
        <div className="absolute left-0 top-0 w-[3px] h-0 bg-[#3e3e42] transition-all duration-500 ease-out group-hover:h-full z-20"></div>

        {isHighlight && (
          <div className="mb-5">
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-widest text-[#69645e] border border-[#e5e7eb] bg-white px-3 py-1.5 rounded-full shadow-sm">
              ✦ Highlight Blog
            </span>
          </div>
        )}

        {/* Giảm cỡ chữ tiêu đề xuống 18px */}
        <h2 className="text-[18px] font-bold text-[#3e3e42] group-hover:text-black transition-colors mb-4 leading-snug">
          {blog.Title}
        </h2>

        {/* Tăng max-h lên 400px */}
        <div className="relative max-h-[400px] overflow-hidden">
          <div 
            className="text-[#69645e] text-[14px] leading-[1.7] pr-2 
              [&_.ck-p]:mb-3 [&_.ck-p]:!font-sans [&_span]:!font-sans
              [&_h1]:text-[16px] [&_h1]:font-bold [&_h1]:text-[#3e3e42] [&_h1]:mb-2 [&_h1]:mt-4 [&_h1]:!font-sans
              [&_h2]:text-[15px] [&_h2]:font-bold [&_h2]:text-[#3e3e42] [&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:!font-sans
              [&_h3]:text-[14px] [&_h3]:font-bold [&_h3]:text-[#3e3e42] [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:!font-sans
              [&_pre]:bg-[#f3f4f6] [&_pre]:p-3 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:text-[12px] [&_pre]:mb-3 [&_pre_*]:!font-mono
              [&_code]:bg-[#f3f4f6] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[12px] [&_code_*]:!font-mono
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:!font-sans
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
            "
            dangerouslySetInnerHTML={{ __html: formatHTML(blog.Content) }}
          >
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#fcf7f2] via-[#fcf7f2]/90 to-transparent pointer-events-none"></div>
        </div>

        <div className="mt-5 flex justify-end relative z-10">
          <span className="text-sm text-[#878686] italic opacity-60 group-hover:opacity-100 transition-opacity flex items-center">
            continue reading →
          </span>
        </div>
      </Link>
    );
  };

  return (
    <main className="w-full min-h-screen bg-[#fcf7f2] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        <div className="mb-14 border-b border-[#e5e7eb] pb-6">
          <Link href="/#blogs" className="inline-flex items-center text-sm font-medium text-[#878686] hover:text-[#3e3e42] transition-colors mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3e3e42]">All Blogs</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full items-start">
          <div className="flex flex-col gap-8 w-full md:w-1/2">
            {col1.map(renderBlogCard)}
          </div>
          <div className="flex flex-col gap-8 w-full md:w-1/2">
            {col2.map(renderBlogCard)}
          </div>
        </div>

      </div>
    </main>
  );
}