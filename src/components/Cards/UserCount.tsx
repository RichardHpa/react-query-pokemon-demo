import { Button, Card, CardContent, CardActions, Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getUsers } from 'api/Users';

export const UserCountCard = () => {
  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers });
  return (
    <Card sx={{ height: '100%' }}>
      {isLoading ? (
        <Skeleton height="100%" variant="rounded" />
      ) : (
        <>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Users
            </Typography>
            <Typography variant="h3">{data.length}</Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/users/add">
              Add New User
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};
