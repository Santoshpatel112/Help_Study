import { create } from 'zustand';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  company: {
    name: string;
  };
  image: string;
}

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  cache: Map<string, { users: User[]; total: number; timestamp: number }>;
  fetchUsers: (limit: number, skip: number) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
  clearCache: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  cache: new Map(),

  // Caching Strategy: Store API responses with timestamp to avoid redundant calls
  // Benefits: Reduces API load, improves performance, better UX with instant results
  fetchUsers: async (limit: number, skip: number) => {
    const cacheKey = `users-${limit}-${skip}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      set({ users: cached.users, total: cached.total });
      return;
    }

    set({ loading: true });
    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      
      get().cache.set(cacheKey, {
        users: data.users,
        total: data.total,
        timestamp: Date.now(),
      });
      
      set({ users: data.users, total: data.total, loading: false });
    } catch (error) {
      console.error('Failed to fetch users:', error);
      set({ loading: false });
    }
  },

  searchUsers: async (query: string) => {
    if (!query.trim()) {
      get().fetchUsers(10, 0);
      return;
    }

    const cacheKey = `search-${query}`;
    const cached = get().cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      set({ users: cached.users, total: cached.total });
      return;
    }

    set({ loading: true });
    try {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      get().cache.set(cacheKey, {
        users: data.users,
        total: data.total,
        timestamp: Date.now(),
      });
      
      set({ users: data.users, total: data.total, loading: false });
    } catch (error) {
      console.error('Failed to search users:', error);
      set({ loading: false });
    }
  },

  clearCache: () => {
    set({ cache: new Map() });
  },
}));
