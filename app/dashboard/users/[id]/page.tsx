'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUsers';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading, error } = useUser(params.id as string);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box>
        <Typography color="error">Failed to load user details</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/dashboard/users')}
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>

      <Paper sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" gap={3} mb={4}>
          <Avatar src={user.image} sx={{ width: 100, height: 100 }} />
          <Box>
            <Typography variant="h4">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              @{user.username}
            </Typography>
            <Chip label={user.gender} sx={{ mt: 1 }} />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.email}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Phone
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.phone}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Birth Date
              </Typography>
              <Typography variant="body1">
                {user.birthDate || 'N/A'}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                {user.address?.address}
              </Typography>
              <Typography variant="body1">
                {user.address?.city}, {user.address?.state} {user.address?.postalCode}
              </Typography>
              <Typography variant="body1">
                {user.address?.country}
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Company
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">{user.company?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.company?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.company?.department}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Age
                </Typography>
                <Typography variant="body1">{user.age}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Blood Group
                </Typography>
                <Typography variant="body1">{user.bloodGroup || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Height
                </Typography>
                <Typography variant="body1">{user.height || 'N/A'} cm</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="body1">{user.weight || 'N/A'} kg</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
