# Help Study Abroad - Frontend Technical Assessment

A modern, responsive admin dashboard built with Next.js 14, Material-UI, Zustand, and NextAuth for managing users and products using the DummyJSON API.

## 🚀 Features

### Authentication
- ✅ Admin login using NextAuth with DummyJSON API
- ✅ Protected routes with session management
- ✅ Token storage in Zustand with persistence
- ✅ Automatic redirect for authenticated/unauthenticated users

### Users Management
- ✅ List users with pagination (API-side)
- ✅ Search users by name, email, or phone
- ✅ Responsive table layout with MUI
- ✅ Single user detail page with full information
- ✅ Client-side caching for performance

### Products Management
- ✅ Grid layout with product cards
- ✅ Pagination with API-side limiting
- ✅ Search functionality
- ✅ Category filter dropdown
- ✅ Product detail page with image carousel
- ✅ Rating display and product specifications

### State Management (Zustand)
- ✅ Centralized auth state management
- ✅ Users store with async actions
- ✅ Products store with async actions
- ✅ Built-in caching mechanism
- ✅ Persistent storage for auth

### Performance Optimizations
- ✅ React.memo for component memoization
- ✅ useCallback for function memoization
- ✅ useMemo for computed values
- ✅ API-side pagination (limit/skip)
- ✅ Client-side caching with timestamps
- ✅ Debounced search inputs
- ✅ Custom hooks for data fetching

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Language**: TypeScript
- **API**: DummyJSON (https://dummyjson.com)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd help-study-abroad-assessment
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Login Credentials

Use any valid DummyJSON user credentials:

- **Username**: `emilys`
- **Password**: `emilyspass`

Or try other users from: https://dummyjson.com/users

## 📁 Project Structure

```
help-study-abroad-assessment/
├── app/
│   ├── api/auth/[...nextauth]/    # NextAuth API routes
│   ├── dashboard/                  # Protected dashboard pages
│   │   ├── users/                  # Users list & detail pages
│   │   ├── products/               # Products list & detail pages
│   │   ├── layout.tsx              # Dashboard layout with nav
│   │   └── page.tsx                # Dashboard home
│   ├── login/                      # Login page
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home redirect
├── components/
│   ├── AuthProvider.tsx            # NextAuth session provider
│   └── ProtectedRoute.tsx          # Route protection HOC
├── hooks/
│   ├── useUsers.ts                 # Custom hook for users data
│   └── useProducts.ts              # Custom hook for products data
├── lib/store/
│   ├── authStore.ts                # Zustand auth state
│   ├── usersStore.ts               # Zustand users state
│   └── productsStore.ts            # Zustand products state
├── theme.ts                        # MUI theme configuration
└── .env.local                      # Environment variables
```

## 🎯 Why Zustand?

Zustand was chosen for state management because:

1. **Simplicity**: Minimal boilerplate compared to Redux
2. **Small Footprint**: ~1KB bundle size
3. **Built-in Async**: Native support for async actions without middleware
4. **No Context Provider**: Direct store access without wrapping components
5. **TypeScript Support**: Excellent type inference
6. **Persistence**: Easy integration with localStorage
7. **Better DX**: Cleaner API for small to medium applications

## 💾 Caching Strategy

### Why Caching?
- Reduces unnecessary API calls
- Improves application performance
- Better user experience with instant results
- Reduces server load

### Implementation
- **Cache Duration**: 5 minutes per cached entry
- **Cache Key**: Unique keys based on query parameters (limit, skip, search, category)
- **Storage**: In-memory Map with timestamps
- **Invalidation**: Automatic expiration after cache duration
- **Benefits**: Instant data retrieval for repeated queries

### How It Works
```typescript
// Check cache first
const cached = cache.get(cacheKey);
if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
  return cached.data; // Return cached data
}

// Fetch from API if cache miss or expired
const data = await fetchFromAPI();
cache.set(cacheKey, { data, timestamp: Date.now() });
```

## 🎨 Responsive Design

All pages are fully responsive:
- **Mobile**: Single column layouts, stacked cards
- **Tablet**: 2-column grids, optimized tables
- **Desktop**: Multi-column grids, full tables

Breakpoints follow MUI standards:
- xs: 0px
- sm: 600px
- md: 900px
- lg: 1200px
- xl: 1536px

## ⚡ Performance Optimizations

### Component Level
- `React.memo`: Prevents re-renders of UserRow and ProductCard components
- `useCallback`: Memoizes event handlers (pagination, search, filters)
- `useMemo`: Computes derived values only when dependencies change

### Data Fetching
- **API-side pagination**: Only fetch required data (limit/skip)
- **Debounced search**: 500ms delay to reduce API calls
- **Custom hooks**: Encapsulate data fetching logic
- **Client-side caching**: Avoid redundant API requests

### Code Splitting
- Next.js automatic code splitting
- Dynamic imports for heavy components
- Route-based splitting

## 🧪 Testing the Application

### Test Authentication
1. Go to `/login`
2. Enter credentials (emilys / emilyspass)
3. Verify redirect to dashboard
4. Try accessing `/dashboard` without login (should redirect to login)

### Test Users Management
1. Navigate to Users page
2. Test pagination (change pages)
3. Test search (search for "John")
4. Click on a user to view details
5. Use "Back to Users" button

### Test Products Management
1. Navigate to Products page
2. Test pagination
3. Test search (search for "phone")
4. Test category filter (select "smartphones")
5. Click on a product to view details
6. View image carousel

## 📝 API Endpoints Used

- `POST /auth/login` - Authentication
- `GET /users?limit=10&skip=0` - List users
- `GET /users/search?q=query` - Search users
- `GET /users/{id}` - Single user
- `GET /products?limit=10&skip=0` - List products
- `GET /products/search?q=query` - Search products
- `GET /products/category/{category}` - Filter by category
- `GET /products/categories` - List categories
- `GET /products/{id}` - Single product

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📄 License

This project is created for assessment purposes.

## 👨‍💻 Developer Notes

### Completed Features
- ✅ Full authentication flow with NextAuth
- ✅ Protected routes
- ✅ Users list with pagination and search
- ✅ User detail page
- ✅ Products list with pagination, search, and category filter
- ✅ Product detail page with image carousel
- ✅ Zustand state management for all data
- ✅ Client-side caching
- ✅ Responsive MUI design
- ✅ Performance optimizations
- ✅ Custom hooks for data fetching
- ✅ TypeScript throughout

### Future Enhancements
- Add unit tests (Jest + React Testing Library)
- Add E2E tests (Playwright)
- Implement error boundaries
- Add loading skeletons
- Implement infinite scroll
- Add product comparison feature
- Add user favorites/bookmarks
- Implement advanced filters
- Add data export functionality

---

**Assessment Completed**: All requirements met ✅
#   H e l p _ S t u d y  
 