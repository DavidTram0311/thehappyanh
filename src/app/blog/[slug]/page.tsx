import BackButton from '@/components/BackButton';
import { Nunito } from 'next/font/google';

const PUBLIC_IMAGE_URL = "http://192.168.1.9:1337"; 
const API_URL = "http://127.0.0.1:1337"; 
const SITE_DOMAIN = "http://192.168.1.9:3000"; 

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

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`, { 
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
      <div className="max-w-3xl mx-auto p-8 pt-24 text-center min-h-screen font-sans">
        <h1 className="text-3xl font-bold text-red-500 mb-6 font-sans">Invalid directory!</h1>
      </div>
    );
  }

  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-8 pt-24 text-center min-h-screen font-sans">
        <h1 className="text-3xl font-bold text-[#3e3e42] mb-6 font-sans">Article not found</h1>
        <BackButton />
      </div>
    );
  }

  const item = blog.attributes || blog;
  const { title, subtitle, content, publishedAt } = item;
  
  const authorData = item.author?.data?.attributes;
  const authorName = authorData?.name || "Nguyễn Bá Phát";
  
  let coverUrl = null;
  const coverData = item.cover?.data?.attributes || item.thumbnail?.data?.attributes || item.image?.data?.attributes;
  if (coverData?.url) coverUrl = coverData.url;
  else if (item.cover?.url) coverUrl = item.cover.url;
  if (coverUrl && !coverUrl.startsWith("http")) coverUrl = `${PUBLIC_IMAGE_URL}${coverUrl}`;

  const shareUrl = `${SITE_DOMAIN}/blog/${slug}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const d = new Date(publishedAt);
  const day = d.getDate();
  const month = d.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short' });
  const year = d.getFullYear();

  return (
    <article className="max-w-[1000px] mx-auto p-6 md:p-8 pt-24 min-h-screen overflow-hidden w-full">
      <BackButton />
      
      <h1 className="text-3xl md:text-[42px] font-bold mb-10 leading-tight text-[#3e3e42] text-center max-w-4xl mx-auto font-sans">
        {title}
      </h1>

      {/* Preserve Original Aspect Ratio for Detail View */}
      {coverUrl && (
        <div className="w-fit mx-auto mb-8 rounded-[20px] overflow-hidden shadow-sm border border-black/5 bg-[#fcf7f2]">
          <img src={coverUrl} alt={title} className="w-auto h-auto max-w-full max-h-[600px] object-contain block" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center mb-16 mt-6">
        <span className="text-[12px] uppercase tracking-widest font-bold text-[#878686] font-sans">{authorName}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-5xl mx-auto font-sans">
        
        {/* Sidebar Info */}
        <div className="md:w-[80px] shrink-0 flex flex-row md:flex-col items-center md:items-center justify-between md:justify-start gap-6 md:sticky md:top-32 h-fit border-b md:border-b-0 border-black/10 pb-6 md:pb-0 mb-6 md:mb-0">
          <div className="flex flex-col items-center md:border-b border-black/10 md:pb-6" suppressHydrationWarning>
             <span className="text-4xl font-bold text-[#3e3e42] leading-none mb-1 font-sans">{day}</span>
             <span className="text-[10px] uppercase tracking-widest text-[#878686] font-sans">{month}</span>
             <span className="text-[10px] uppercase tracking-widest text-[#878686] font-sans">{year}</span>
          </div>

          <div className="flex flex-row md:flex-col gap-3 items-center">
            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f0ebe1] text-[#69645e] hover:bg-[#3b5998] hover:text-white transition-colors duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f0ebe1] text-[#69645e] hover:bg-[#0077b5] hover:text-white transition-colors duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 max-w-[720px]">
          
          {subtitle && (
            <h2 className="text-[17px] md:text-[19px] font-bold mb-10 text-[#3e3e42] leading-[1.7] italic border-l-[3px] border-[#bba38a] pl-5 font-sans">
              {subtitle}
            </h2>
          )}

          {/* Apply Nunito to blog body, inherit font for headings */}
          <div 
            suppressHydrationWarning
            className={`ck-content ${nunito.className} text-left break-words [overflow-wrap:anywhere] text-[#5c5751] w-full overflow-hidden
              [&_p]:!text-[16px] [&_p]:!leading-[1.8] [&_p]:!mb-6
              [&_span]:!text-[16px] [&_span]:!leading-[1.8]
              [&_li]:!text-[16px] [&_li]:!leading-[1.8] [&_li]:!mb-3
              [&_h1]:!font-inherit [&_h1]:!text-[28px] [&_h1]:!font-bold [&_h1]:!mb-4 [&_h1]:!text-[#3e3e42]
              [&_h2]:!font-inherit [&_h2]:!text-[24px] [&_h2]:!font-bold [&_h2]:!mb-4 [&_h2]:!mt-10 [&_h2]:!text-[#3e3e42]
              [&_h3]:!font-inherit [&_h3]:!text-[20px] [&_h3]:!font-bold [&_h3]:!mb-3 [&_h3]:!mt-8 [&_h3]:!text-[#3e3e42]
              [&_h4]:!font-inherit [&_h5]:!font-inherit [&_h6]:!font-inherit
              [&_strong]:!font-bold [&_em]:!italic
              [&_figure]:!my-8 [&_figure]:!max-w-full [&_figure]:!mx-auto
              [&_img]:!max-w-full [&_img]:!h-auto [&_img]:!rounded-xl [&_img]:!shadow-md [&_img]:!mx-auto
              [&_.image-style-align-left]:!float-left [&_.image-style-align-left]:!mr-6 [&_.image-style-align-left]:!mb-4 [&_.image-style-align-left]:!max-w-[50%]
              [&_.image-style-side]:!float-right [&_.image-style-side]:!ml-6 [&_.image-style-side]:!mb-4 [&_.image-style-side]:!max-w-[50%]
              [&_.image-style-align-right]:!float-right [&_.image-style-align-right]:!ml-6 [&_.image-style-align-right]:!mb-4 [&_.image-style-align-right]:!max-w-[50%]
              [&_.image-style-align-center]:!mx-auto [&_.image-style-align-center]:!block [&_.image-style-align-center]:!max-w-[85%]
              after:content-[''] after:table after:clear-both`}
            dangerouslySetInnerHTML={{ __html: fixImageUrls(content) || "<p>No content available.</p>" }}
          />
        </div>
      </div>
    </article>
  );
}