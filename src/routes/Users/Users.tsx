import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography,
  IconButton,
  Skeleton,
  Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { getUsers } from 'api/Users';

import { BreadcrumbHeader } from 'components/BreadcrumbHeader';

import type { User } from 'types/user';

export const Users = () => {
  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers });

  return (
    <div>
      <BreadcrumbHeader
        title="All Users"
        actions={
          <Button variant="contained" component={Link} to="/users/add">
            Add New User
          </Button>
        }
        crumbs={[
          {
            label: 'Users',
          },
        ]}
      />

      {isLoading ? (
        <Box>
          <Skeleton variant="rounded" height={200} />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Total Cards</TableCell>
                <TableCell>Total Investment</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="subtitle2">No users found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row: User) => (
                  <TableRow
                    hover
                    key={row.username}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Stack direction="column">
                        <Typography variant="subtitle2">
                          {row.firstName} {row.lastName}
                        </Typography>
                        <Typography variant="body2">{row.email}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>{row.username}</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end">
                        <IconButton
                          aria-label={`edit ${row.username}`}
                          component={Link}
                          to={`/users/${row.id}/edit`}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label={`view ${row.username}`}
                          component={Link}
                          to={`/users/${row.id}`}
                        >
                          <ArrowForwardIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
