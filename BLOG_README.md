# Blog & Strapi Integration Guide

## Project Structure

This project now includes a fully functional blog system with Strapi CMS integration support.

## Current Status

✅ **Frontend Complete**: Blog pages are fully built and functional with mock data
✅ **Strapi Integration Ready**: API utilities are in place and ready to connect
⚠️ **Strapi Backend**: Requires Node.js 20.x or 24.x (see setup instructions)

## Quick Start

### 1. Run the Next.js Frontend

```bash
npm run dev
```

Visit http://localhost:3000/blogs to see the blog page.

### 2. Set Up Strapi Backend (When Ready)

Follow the detailed instructions in `backend/SETUP.md`.

**Important**: Strapi requires Node.js 20.x-24.x. If you're running Node.js 25.x, you'll need to use nvm to switch versions.

## Features

### Blog Listing Page (`/blogs`)
- Responsive grid layout (2 columns on desktop, 1 on mobile)
- Search functionality (searches titles, excerpts, and categories)
- Category badges with custom colors
- Date and reading time display
- Hover effects and smooth transitions

### Blog Detail Page (`/blogs/[slug]`)
- Full blog post view with featured image
- Rich text content rendering
- Category badge
- Back navigation to blog list
- Responsive layout

### Components Created

- `BlogHeader.tsx`: Title, subtitle, and search bar
- `BlogCard.tsx`: Individual blog post card with image, category, and metadata
- `BlogGrid.tsx`: Grid container with search/filter functionality

## Strapi Integration

### When Strapi is Running

1. **Start Strapi**:
   ```bash
   cd backend
   npm run develop
   ```

2. **Create an `.env.local` file** in the project root:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Update the blog pages** to use Strapi data:

   In `src/app/blogs/page.tsx` and `src/app/blogs/[slug]/page.tsx`, uncomment the Strapi integration code sections marked with `// TODO: Uncomment this when Strapi is set up`

4. **Add blog content** in the Strapi admin panel at http://localhost:1337/admin

### API Utilities (`src/lib/strapi.ts`)

Pre-built functions for Strapi integration:
- `fetchBlogs()`: Get all blog posts
- `fetchBlogBySlug(slug)`: Get single blog post
- `fetchCategories()`: Get all categories
- `searchBlogs(query)`: Search blog posts
- `getStrapiMediaUrl(url)`: Get full URL for Strapi media

### Content Types

The following Strapi content types are configured in `backend/SETUP.md`:

**Blog Collection**:
- title, slug, excerpt, content
- featuredImage (Media)
- category (Relation)
- publishedDate, readTime

**Category Collection**:
- name, slug, color (hex code)

## Mock Data

Currently using mock data with two sample blog posts:
1. "What Traveling Greece For 2 Weeks Taught Me About Life" (Travel)
2. "Why You Should Never Order 12 Chicken Nuggets and Fries" (Food Theory)

**Note**: You'll need to add actual images at:
- `public/images/blog/greece-travel.jpg`
- `public/images/blog/chicken-nuggets.jpg`

Or update the image paths in `src/app/blogs/page.tsx` to match your existing images.

## Styling

The blog uses your existing color scheme:
- Primary Green: `#4A5D1D`
- Background: `#fff4ee`
- Category colors are customizable per category

## Navigation

The Navbar has been updated to link the "blogs" menu item to `/blogs`.

## Next Steps

1. ✅ Blog pages are functional with mock data
2. ⏳ Set up Strapi backend (requires Node.js version switch)
3. ⏳ Add blog content in Strapi admin
4. ⏳ Switch from mock data to Strapi API
5. ⏳ Add actual blog images
6. ⏳ Deploy Strapi to production (optional)

## Development vs Production

### Development
- Next.js: http://localhost:3000
- Strapi: http://localhost:1337

### Production
Update `NEXT_PUBLIC_STRAPI_URL` in `.env.local` or your deployment environment variables to point to your production Strapi URL.

## Troubleshooting

### "Module not found" errors
Make sure all dependencies are installed:
```bash
npm install
```

### Strapi connection errors
1. Verify Strapi is running: http://localhost:1337/admin
2. Check `.env.local` has the correct `NEXT_PUBLIC_STRAPI_URL`
3. Verify CORS is configured in Strapi (see `backend/SETUP.md`)

### Images not loading from Strapi
1. Check the image was uploaded in Strapi admin
2. Verify the image URL in the API response
3. Use `getStrapiMediaUrl()` helper function

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Strapi REST API Guide](https://docs.strapi.io/dev-docs/api/rest)
