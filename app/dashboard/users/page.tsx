'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
import { useUsersStore } from '@/lib/store/usersStore';
import { useUsers } from '@/hooks/useUsers';
import Link from 'next/link';

// Memoized row component to prevent unnecessary re-renders
const UserRow = memo(({ user }: { user: any }) => (
  <TableRow
    onClick={() => window.location.href = `/dashboard/users/${user.id}`}
    sx={{
      cursor: 'pointer',
      '&:hover': { bgcolor: 'action.hover' },
    }}
  >
    <TableCell>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={user.image} alt={user.firstName} />
        <Typography>
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
    </TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <Chip label={user.gender} size="small" color={user.gender === 'male' ? 'primary' : 'secondary'} />
    </TableCell>
    <TableCell>{user.phone}</TableCell>
    <TableCell>{user.company?.name || 'N/A'}</TableCell>
  </TableRow>
));

UserRow.displayName = 'UserRow';

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const { users, total, loading } = useUsersStore();
  const { handleSearch } = useUsers(rowsPerPage, page * rowsPerPage);

  // Use useCallback to memoize search handler
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
    setPage(0);
    debouncedSearch(value);
  };

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>

      <TextField
        fullWidth
        label="Search users"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        placeholder="Search by name, email, or phone..."
      />

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      )}
    </Box>
  );
}
