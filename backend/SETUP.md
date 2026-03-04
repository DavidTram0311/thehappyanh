# Strapi Backend Setup

## Prerequisites

Strapi requires Node.js version between 20.0.0 and 24.x.x.

Currently detected Node version: 25.2.1

## Installation Instructions

### 1. Install Node Version Manager (nvm)

If you don't have nvm installed:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 2. Install and Use Compatible Node Version

```bash
# Install Node.js 20 (LTS)
nvm install 20

# Use Node.js 20
nvm use 20

# Verify version
node --version  # Should show v20.x.x
```

### 3. Create Strapi Backend

```bash
# From the project root directory
npx create-strapi-app@latest backend --quickstart
```

This will:
- Create a new Strapi project in the `backend/` directory
- Install all dependencies
- Use SQLite as the default database (good for development)
- Start the admin panel at http://localhost:1337/admin

### 4. Initial Setup

When Strapi starts for the first time, you'll need to:
1. Create an admin account in the browser
2. Access the admin panel at http://localhost:1337/admin

## Content Type Configuration

### Blog Post Collection Type

Create a collection type called "Blog" with these fields:

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| title | Text (Short) | Yes | |
| slug | UID | Yes | Based on title |
| excerpt | Text (Long) | Yes | Short description |
| content | Rich Text | Yes | Full blog content |
| featuredImage | Media (Single) | Yes | Main image |
| category | Relation | Yes | Many-to-one with Category |
| publishedDate | Date | Yes | Publication date |
| readTime | Number (Integer) | Yes | Reading time in minutes |

### Category Collection Type

Create a collection type called "Category" with these fields:

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| name | Text (Short) | Yes | Category name |
| slug | UID | Yes | Based on name |
| color | Text (Short) | Yes | Hex color code (e.g., #6B8E23) |

### Relations

- Blog → Category: Many-to-one relation

## API Configuration

### Enable Public Access

1. Go to Settings → Users & Permissions plugin → Roles
2. Click on "Public" role
3. Enable permissions for:
   - Blog: `find` and `findOne`
   - Category: `find` and `findOne`
4. Save

### CORS Configuration

Edit `backend/config/middlewares.js` to allow your Next.js frontend:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'strapi.io'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:3000'],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## Sample Data

After creating the content types, add sample blog posts:

### Categories:
1. **Travel**: color `#6B8E23`
2. **Food Theory**: color `#D2691E`

### Blog Posts:
1. **What Traveling Greece For 2 Weeks Taught Me About Life**
   - Category: Travel
   - Date: 2024-06-21
   - Read Time: 11 minutes

2. **Why You Should Never Order 12 Chicken Nuggets and Fries**
   - Category: Food Theory
   - Date: 2024-08-01
   - Read Time: 7 minutes

## Running Strapi

```bash
cd backend
npm run develop
```

The admin panel will be available at: http://localhost:1337/admin
API endpoint: http://localhost:1337/api

## Next Steps

After Strapi is running:
1. Verify API endpoints work: http://localhost:1337/api/blogs
2. Update Next.js frontend to use real Strapi data
3. See the API integration guide in the main project README
