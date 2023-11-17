import { Button, Card, CardContent, CardActions, Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCards } from 'api/Cards';

export const CardsCountCard = () => {
  const { data, isLoading } = useQuery({ queryKey: ['cards'], queryFn: getCards });
  return (
    <Card sx={{ height: '100%', minHeight: '170px', display: 'flex', flexDirection: 'column' }}>
      {isLoading ? (
        <Skeleton height="100%" variant="rounded" />
      ) : (
        <>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Cards
            </Typography>
            <Typography variant="h3">{data.length}</Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/cards/add">
              Add New Card
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};
