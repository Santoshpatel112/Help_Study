'use client';

import { useState, useCallback, memo } from 'react';
import {
  Box,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Chip,
} from '@mui/material';
import { useProductsStore } from '@/lib/store/productsStore';
import { useProducts } from '@/hooks/useProducts';
import Link from 'next/link';

// Memoized product card to prevent unnecessary re-renders
const ProductCard = memo(({ product }: { product: any }) => (
  <Link href={`/dashboard/products/${product.id}`} style={{ textDecoration: 'none' }}>
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' },
        cursor: 'pointer',
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Chip label={product.category} size="small" sx={{ mb: 1 }} />
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Rating value={product.rating} readOnly size="small" precision={0.1} />
          <Typography variant="body2" color="text.secondary">
            ({product.rating})
          </Typography>
        </Box>
        <Typography variant="h5" color="primary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  </Link>
));

ProductCard.displayName = 'ProductCard';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const rowsPerPage = 12;

  const { products, total, loading } = useProductsStore();
  const { categories, handleSearch, handleCategoryFilter } = useProducts(
    rowsPerPage,
    (page - 1) * rowsPerPage
  );

  const debouncedSearch = useCallback(
    (query: string) => {
      const timer = setTimeout(() => {
        handleSearch(query);
      }, 500);
      return () => clearTimeout(timer);
    },
    [handleSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(1);
    setSelectedCategory('all');
    debouncedSearch(value);
  };

  const handleCategoryChange = useCallback(
    (e: any) => {
      const category = e.target.value;
      setSelectedCategory(category);
      setSearchQuery('');
      setPage(1);
      handleCategoryFilter(category);
    },
    [handleCategoryFilter]
  );

  const handlePageChange = useCallback((_: any, value: number) => {
    setPage(value);
  }, []);

  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products Management
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Search products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title, brand, or description..."
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={`category-${category}-${index}`} value={category}>
                {typeof category === 'string' ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
