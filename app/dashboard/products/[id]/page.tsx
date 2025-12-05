'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProduct } from '@/hooks/useProducts';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Rating,
  Chip,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { product, loading, error } = useProduct(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box>
        <Typography color="error">Failed to load product details</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/dashboard/products')}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box>
            <Box
              sx={{
                width: '100%',
                height: 400,
                position: 'relative',
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
              {product.images.map((image: string, index: number) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    cursor: 'pointer',
                    border: selectedImage === index ? 2 : 1,
                    borderColor: selectedImage === index ? 'primary.main' : 'grey.300',
                    borderRadius: 1,
                    overflow: 'hidden',
                    height: 80,
                  }}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>

            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Chip label={product.category} color="primary" />
              {product.brand && <Chip label={product.brand} variant="outlined" />}
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">
                ({product.rating} rating)
              </Typography>
            </Box>

            <Typography variant="h3" color="primary" gutterBottom>
              ${product.price}
            </Typography>

            {product.discountPercentage && (
              <Typography variant="body2" color="success.main" gutterBottom>
                {product.discountPercentage}% OFF
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Stock
                </Typography>
                <Typography variant="body1">
                  {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  SKU
                </Typography>
                <Typography variant="body1">{product.sku || 'N/A'}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="body1">{product.weight || 'N/A'} g</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Warranty
                </Typography>
                <Typography variant="body1">
                  {product.warrantyInformation || 'N/A'}
                </Typography>
              </Box>
            </Box>

            {product.tags && product.tags.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tags
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {product.tags.map((tag: string) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
