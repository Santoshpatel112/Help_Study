'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit" component={Link} href="/dashboard">
              Home
            </Button>
            <Button color="inherit" component={Link} href="/dashboard/users">
              Users
            </Button>
            <Button color="inherit" component={Link} href="/dashboard/products">
              Products
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
