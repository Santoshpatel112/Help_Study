# Help Study Abroad - Frontend Assessment

Modern admin dashboard built with Next.js 14, Material-UI, Zustand, and NextAuth using DummyJSON API.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit: http://localhost:3000

**Login Credentials:**
- Username: `emilys`
- Password: `emilyspass`

## 📦 Tech Stack

- **Next.js 14** - App Router with TypeScript
- **Material-UI** - Complete UI component library
- **Zustand** - Lightweight state management
- **NextAuth** - Authentication solution
- **DummyJSON API** - Backend data source

## ✨ Features Implemented

### Authentication (NextAuth)
- Login with DummyJSON API credentials
- Protected routes with session management
- Automatic redirects for auth states
- Token storage with persistence

### Users Management
- Paginated user list (API-side pagination)
- Search by name, email, phone
- Responsive MUI table layout
- Detailed user profile pages
- Client-side caching (5-min duration)

### Products Management
- Grid layout with product cards
- API-side pagination
- Search functionality
- Category filter dropdown
- Product detail page with image carousel
- Rating and specifications display

### State Management (Zustand)
- Centralized stores for auth, users, products
- Async actions for API calls
- Built-in caching with timestamps
- Persistent auth storage

**Why Zustand?**
- Minimal boilerplate (~1KB)
- Native async support
- No context providers needed
- Excellent TypeScript support
- Perfect for small-medium apps

### Performance Optimizations
- `React.memo` for component memoization
- `useCallback` for event handlers
- `useMemo` for computed values
- Debounced search (500ms)
- Custom hooks for data fetching
- Client-side caching strategy

## 📁 Project Structure

```
app/
├── api/auth/[...nextauth]/  # NextAuth routes
├── dashboard/               # Protected pages
│   ├── users/              # Users list & details
│   ├── products/           # Products list & details
│   └── layout.tsx          # Dashboard layout
├── login/                  # Login page
└── layout.tsx              # Root layout

components/
├── Providers.tsx           # MUI + NextAuth providers
└── ProtectedRoute.tsx      # Route protection

hooks/
├── useUsers.ts             # Users data hook
└── useProducts.ts          # Products data hook

lib/
├── auth.ts                 # NextAuth config
└── store/                  # Zustand stores
    ├── authStore.ts
    ├── usersStore.ts
    └── productsStore.ts
```

## 🔧 Environment Setup

Create `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

Generate secret:
```bash
openssl rand -base64 32
```

## 💾 Caching Strategy

**Implementation:**
- 5-minute cache duration per entry
- Unique keys: `${type}-${params}`
- In-memory Map with timestamps
- Auto-expiration on timeout

**Benefits:**
- Reduces API calls
- Instant data retrieval
- Better UX
- Lower server load

```typescript
const cached = cache.get(cacheKey);
if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
  return cached.data;
}
```

## 🎨 Responsive Design

- **Mobile**: Single column, stacked cards
- **Tablet**: 2-column grids
- **Desktop**: Multi-column layouts

MUI Breakpoints: xs(0px), sm(600px), md(900px), lg(1200px), xl(1536px)

## 🧪 Testing Guide

**Authentication:**
1. Visit `/login`
2. Use: emilys / emilyspass
3. Verify dashboard redirect
4. Test protected route access

**Users:**
1. Navigate to Users page
2. Test pagination
3. Search for "John"
4. Click user for details

**Products:**
1. Navigate to Products page
2. Test pagination
3. Search for "phone"
4. Filter by category
5. View product details

## 📝 API Endpoints

- `POST /auth/login` - Authentication
- `GET /users?limit=10&skip=0` - List users
- `GET /users/search?q=query` - Search users
- `GET /users/{id}` - User details
- `GET /products?limit=10&skip=0` - List products
- `GET /products/search?q=query` - Search products
- `GET /products/category/{category}` - Filter products
- `GET /products/categories` - List categories
- `GET /products/{id}` - Product details

## 🚀 Production Build

```bash
npm run build
npm start
```

## ✅ Assessment Checklist

- ✅ NextAuth authentication with DummyJSON
- ✅ Protected dashboard routes
- ✅ Users list with pagination & search
- ✅ User detail pages
- ✅ Products list with pagination, search & filters
- ✅ Product detail pages with carousel
- ✅ Zustand state management
- ✅ Client-side caching
- ✅ Responsive MUI design
- ✅ Performance optimizations (memo, useCallback)
- ✅ Custom hooks for data fetching
- ✅ TypeScript throughout
- ✅ Clean code structure

## 🔮 Future Enhancements

- Unit tests (Jest + RTL)
- E2E tests (Playwright)
- Error boundaries
- Loading skeletons
- Infinite scroll
- Advanced filters
- Data export

