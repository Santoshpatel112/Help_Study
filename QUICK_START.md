# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
The `.env.local` file is already created with default values. For production, update `NEXTAUTH_SECRET`:

```bash
# Generate a secure secret
openssl rand -base64 32
```

### 3. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 🔐 Test Login

Use these DummyJSON credentials:
- **Username**: `emilys`
- **Password**: `emilyspass`

## 📋 Features to Test

### ✅ Authentication
1. Login at `/login`
2. Try accessing `/dashboard` without login (redirects to login)
3. After login, try accessing `/login` (redirects to dashboard)
4. Logout from dashboard

### ✅ Users Management
1. Go to `/dashboard/users`
2. Test pagination (navigate pages)
3. Search for "John" or "Emma"
4. Click any user to view full details
5. Click "Back to Users"

### ✅ Products Management
1. Go to `/dashboard/products`
2. Test pagination
3. Search for "phone" or "laptop"
4. Filter by category (smartphones, laptops, etc.)
5. Click any product to view details
6. Browse image carousel

## 🎯 Key Technologies

- **Next.js 14** - App Router with Server Components
- **Material-UI** - Complete UI component library
- **Zustand** - Lightweight state management
- **NextAuth** - Authentication solution
- **TypeScript** - Type safety

## 📊 Performance Features

- ✅ Client-side caching (5-minute duration)
- ✅ API-side pagination
- ✅ Debounced search (500ms)
- ✅ React.memo for components
- ✅ useCallback for handlers
- ✅ Custom hooks for data fetching

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📝 Notes

- All data comes from https://dummyjson.com
- Caching reduces API calls and improves performance
- Responsive design works on mobile, tablet, and desktop
- Protected routes ensure security

---

**Ready to explore!** 🎉
