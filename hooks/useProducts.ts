import { useEffect, useCallback, useState } from 'react';
import { useProductsStore } from '@/lib/store/productsStore';

/**
 * Custom hook for fetching and managing products data
 * Benefits: Separation of concerns, reusable logic, cleaner components
 */
export const useProducts = (limit: number = 10, skip: number = 0) => {
  const {
    products,
    total,
    loading,
    categories,
    fetchProducts,
    searchProducts,
    filterByCategory,
    fetchCategories,
  } = useProductsStore();

  useEffect(() => {
    fetchProducts(limit, skip);
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [limit, skip, fetchProducts, fetchCategories, categories.length]);

  const handleSearch = useCallback(
    (query: string) => {
      searchProducts(query);
    },
    [searchProducts]
  );

  const handleCategoryFilter = useCallback(
    (category: string) => {
      if (category === 'all') {
        fetchProducts(limit, skip);
      } else {
        filterByCategory(category, limit, skip);
      }
    },
    [filterByCategory, fetchProducts, limit, skip]
  );

  return {
    products,
    total,
    loading,
    categories,
    handleSearch,
    handleCategoryFilter,
  };
};

/**
 * Custom hook for fetching single product details
 */
export const useProduct = (id: string) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
