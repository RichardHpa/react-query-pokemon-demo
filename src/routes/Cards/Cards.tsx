import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCards } from 'api/Cards';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';
import { CardGrid } from 'components/CardGrid';

export const Cards = () => {
  const { data, isLoading } = useQuery({ queryKey: ['cards'], queryFn: getCards });

  return (
    <div>
      <BreadcrumbHeader
        title="Loaded cards"
        actions={
          <Button variant="contained" component={Link} to="/cards/add">
            Load a new card
          </Button>
        }
        crumbs={[
          {
            label: 'Loaded Cards',
          },
        ]}
      />

      <Box>
        <CardGrid loading={isLoading} cards={data} />
      </Box>
    </div>
  );
};
