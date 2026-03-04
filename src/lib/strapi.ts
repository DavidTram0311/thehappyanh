const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  color: string;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  readTime: number;
  featuredImage: StrapiImage;
  category: StrapiCategory;
}

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Fetch all blog posts from Strapi
 * @param params Optional query parameters (pagination, filters, etc.)
 */
export async function fetchBlogs(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<StrapiBlogPost[]> {
  try {
    const searchParams = new URLSearchParams();
    
    // Populate relations
    searchParams.append('populate[featuredImage]', 'true');
    searchParams.append('populate[category]', 'true');
    
    // Sorting
    searchParams.append('sort[0]', 'publishedDate:desc');
    
    // Pagination
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    
    // Category filter
    if (params?.category) {
      searchParams.append('filters[category][slug][$eq]', params.category);
    }

    const url = `${STRAPI_URL}/api/blogs?${searchParams.toString()}`;
    const response = await fetch(url, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data: StrapiResponse<StrapiBlogPost[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 * @param slug The blog post slug
 */
export async function fetchBlogBySlug(slug: string): Promise<StrapiBlogPost | null> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('filters[slug][$eq]', slug);
    searchParams.append('populate[featuredImage]', 'true');
    searchParams.append('populate[category]', 'true');

    const url = `${STRAPI_URL}/api/blogs?${searchParams.toString()}`;
    const response = await fetch(url, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.statusText}`);
    }

    const data: StrapiResponse<StrapiBlogPost[]> = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<StrapiCategory[]> {
  try {
    const url = `${STRAPI_URL}/api/categories`;
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data: StrapiResponse<StrapiCategory[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Search blog posts by query
 * @param query Search query string
 */
export async function searchBlogs(query: string): Promise<StrapiBlogPost[]> {
  if (!query.trim()) {
    return fetchBlogs();
  }

  try {
    const searchParams = new URLSearchParams();
    
    // Search in title and excerpt
    searchParams.append('filters[$or][0][title][$containsi]', query);
    searchParams.append('filters[$or][1][excerpt][$containsi]', query);
    
    // Populate relations
    searchParams.append('populate[featuredImage]', 'true');
    searchParams.append('populate[category]', 'true');
    
    // Sorting
    searchParams.append('sort[0]', 'publishedDate:desc');

    const url = `${STRAPI_URL}/api/blogs?${searchParams.toString()}`;
    const response = await fetch(url, {
      cache: 'no-store' // Don't cache search results
    });

    if (!response.ok) {
      throw new Error(`Failed to search blogs: ${response.statusText}`);
    }

    const data: StrapiResponse<StrapiBlogPost[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error searching blogs:', error);
    return [];
  }
}

/**
 * Get the full URL for a Strapi media file
 * @param url The media URL from Strapi (can be relative or absolute)
 */
export function getStrapiMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
