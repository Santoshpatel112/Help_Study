import { create } from 'zustand';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
  images: string[];
  brand?: string;
  stock?: number;
}

interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  categories: string[];
  cache: Map<string, { products: Product[]; total: number; timestamp: number }>;
  fetchProducts: (limit: number, skip: number) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  filterByCategory: (category: string, limit: number, skip: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  clearCache: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  categories: [],
  cache: new Map(),

  fetchProducts: async (limit: number, skip: number) => {
    const cacheKey = `products-${limit}-${skip}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      set({ products: cached.products, total: cached.total });
      return;
    }

    set({ loading: true });
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      
      get().cache.set(cacheKey, {
        products: data.products,
        total: data.total,
        timestamp: Date.now(),
      });
      
      set({ products: data.products, total: data.total, loading: false });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      set({ loading: false });
    }
  },

  searchProducts: async (query: string) => {
    if (!query.trim()) {
      get().fetchProducts(10, 0);
      return;
    }

    const cacheKey = `search-${query}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      set({ products: cached.products, total: cached.total });
      return;
    }

    set({ loading: true });
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      get().cache.set(cacheKey, {
        products: data.products,
        total: data.total,
        timestamp: Date.now(),
      });
      
      set({ products: data.products, total: data.total, loading: false });
    } catch (error) {
      console.error('Failed to search products:', error);
      set({ loading: false });
    }
  },

  filterByCategory: async (category: string, limit: number, skip: number) => {
    const cacheKey = `category-${category}-${limit}-${skip}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      set({ products: cached.products, total: cached.total });
      return;
    }

    set({ loading: true });
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      
      get().cache.set(cacheKey, {
        products: data.products,
        total: data.total,
        timestamp: Date.now(),
      });
      
      set({ products: data.products, total: data.total, loading: false });
    } catch (error) {
      console.error('Failed to filter products:', error);
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      // DummyJSON returns array of objects with slug and name
      // Extract just the slug values for filtering
      const categoryList = Array.isArray(data) 
        ? data.map((cat: any) => typeof cat === 'string' ? cat : cat.slug)
        : data;
      set({ categories: categoryList });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },

  clearCache: () => {
    set({ cache: new Map() });
  },
}));
