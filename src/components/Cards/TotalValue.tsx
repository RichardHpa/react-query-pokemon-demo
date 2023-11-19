import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getTotalValue } from 'api/Stats';

export const TotalValue = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['stats', 'totalValue'],
    queryFn: getTotalValue,
  });
  return (
    <Card sx={{ height: '100%', minHeight: '170px', display: 'flex', flexDirection: 'column' }}>
      {isLoading ? (
        <Skeleton height="100%" variant="rounded" />
      ) : (
        <>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Overall value
            </Typography>
            <Typography variant="h3">${data.totalValue}</Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};
