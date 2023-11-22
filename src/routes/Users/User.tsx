import {
  Button,
  Grid,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  CardContent,
  CardActions,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getUser, deleteUser, getUsersCards } from 'api/Users';
import { invariant } from 'helpers/invariant';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';
import { CardGrid } from 'components/CardGrid';

export const User = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useParams();
  invariant(userId);

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
  });

  const { data: usersCards, isLoading: usersCardsLoading } = useQuery({
    queryKey: ['users', userId, 'cards'],
    queryFn: () => getUsersCards(userId),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.setQueryData(['users'], (old: any[]) => {
        if (!old) return;

        const indexOfObject = old.findIndex(object => {
          return object.id === userId;
        });

        old.splice(indexOfObject, 1);
        return old;
      });
      queryClient.invalidateQueries({ queryKey: ['users', userId] });
      navigate('/users');
    },
  });

  const isProcessing = userLoading || isPending;

  return (
    <div>
      <BreadcrumbHeader
        title={`${userData?.firstName} ${userData?.lastName}`}
        loading={userLoading}
        actions={
          <Button
            variant="contained"
            component={Link}
            to={`/users/${userId}/edit`}
            disabled={isProcessing}
          >
            Edit user
          </Button>
        }
        crumbs={[
          {
            label: 'Users',
            path: '/users',
          },
          {
            label: 'User info',
          },
        ]}
      />

      {userLoading ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={250} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={250} />
          </Grid>
        </Grid>
      ) : (
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title="User Details" titleTypographyProps={{ variant: 'h6' }} />
                <List>
                  <ListItem divider>
                    <ListItemText primary="First Name" secondary={userData.firstName} />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText primary="Last Name" secondary={userData.lastName} />
                  </ListItem>
                  <ListItem divider>
                    <ListItemText primary="Username" secondary={userData.username} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Email" secondary={userData.email} />
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={4} sx={{ height: '100%' }}>
                <Card
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  <CardHeader title="Total Value" titleTypographyProps={{ variant: 'h6' }} />
                  <CardContent>
                    <Typography variant="h3">${userData.totalValue}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader title="Delete User" titleTypographyProps={{ variant: 'h6' }} />
                  <CardContent>
                    <Box
                      sx={{
                        color: 'text.secondary',
                      }}
                    >
                      <Typography variant="body2">
                        Deleting a user will remove all information we hold, this cannot be undone
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => mutateAsync()}
                      disabled={isProcessing}
                    >
                      Delete User
                    </Button>
                  </CardActions>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              Cards owned
            </Typography>
            <CardGrid loading={usersCardsLoading} cards={usersCards} />
          </Box>
        </div>
      )}
    </div>
  );
};
