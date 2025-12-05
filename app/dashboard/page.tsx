'use client';

import { Typography, Paper, Box, Grid, Card, CardContent } from '@mui/material';
import { useSession } from 'next-auth/react';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {session?.user?.firstName || 'Admin'}!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Select a section to manage
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Link href="/dashboard/users" style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
                cursor: 'pointer',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <PeopleIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h5">Users Management</Typography>
                    <Typography variant="body2" color="text.secondary">
                      View, search, and manage users
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} md={6}>
          <Link href="/dashboard/products" style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
                cursor: 'pointer',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <ShoppingCartIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h5">Products Management</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Browse, search, and filter products
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
