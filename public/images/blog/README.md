# Blog Images Placeholder

This directory contains blog post featured images.

## Required Images

For the mock blog posts, you need to add:

1. `greece-travel.jpg` - For "What Traveling Greece For 2 Weeks Taught Me About Life"
2. `chicken-nuggets.jpg` - For "Why You Should Never Order 12 Chicken Nuggets and Fries"

## Temporary Solution

The blog pages are currently using placeholder paths. You can:

1. **Add your own images** matching the filenames above
2. **Use existing images** by updating the `featuredImage` paths in `src/app/blogs/page.tsx`
3. **Generate placeholder images** using any online service
4. **Wait for Strapi** - Strapi will handle all images through its Media Library

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 1200x800px (3:2 aspect ratio)
- **Max File Size**: Keep under 500KB for optimal performance
- **Alt Text**: Will be automatically set from blog post title

## Example

You can temporarily use the existing doodle portraits by updating the blog page:

```typescript
featuredImage: '/images/doodle_portrait_main_screen.png',
```
