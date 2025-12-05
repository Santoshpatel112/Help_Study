import { useEffect, useCallback, useState } from 'react';
import { useUsersStore } from '@/lib/store/usersStore';

/**
 * Custom hook for fetching and managing users data
 * Encapsulates data fetching logic and provides clean API
 */
export const useUsers = (limit: number = 10, skip: number = 0) => {
  const { users, total, loading, fetchUsers, searchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers(limit, skip);
  }, [limit, skip, fetchUsers]);

  const handleSearch = useCallback(
    (query: string) => {
      searchUsers(query);
    },
    [searchUsers]
  );

  return {
    users,
    total,
    loading,
    handleSearch,
  };
};

/**
 * Custom hook for fetching single user details
 */
export const useUser = (id: string) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};
