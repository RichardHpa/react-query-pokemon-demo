import { useMemo } from 'react';
import { Button, Grid, Box, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCards } from 'api/Cards';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';

import type { RegularBreakpoints } from '@mui/material';
import type { Card } from 'types/card';

const loadingCount = 12;

const gridMap = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 2,
} as RegularBreakpoints;

export const Cards = () => {
  const { data, isLoading } = useQuery({ queryKey: ['cards'], queryFn: getCards });

  const renderCards = useMemo(() => {
    if (isLoading && !data) {
      return Array.from(Array(loadingCount), (e, i) => {
        return (
          <Grid item {...gridMap} key={i}>
            <img src="images/cardBack.png" width="100%" alt="pokemon card back" />
          </Grid>
        );
      });
    }
    if (!isLoading && data) {
      if (data.length > 0) {
        return data.map((card: Card) => {
          return (
            <Grid item {...gridMap} key={card.id} component={Link} to={`/cards/${card.id}`}>
              <img
                src={card.image}
                width="100%"
                alt="pokemon card back"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = 'images/cardBack.png';
                }}
              />
            </Grid>
          );
        });
      }
      return (
        <Grid item xs={12}>
          <Stack alignItems="center" spacing={4}>
            <Typography variant="h4" align="center">
              No cards found
            </Typography>
            <Button variant="contained" component={Link} to="/cards/add">
              Add New Card
            </Button>
          </Stack>
        </Grid>
      );
    }
  }, [data, isLoading]);

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
        <Grid container spacing={2}>
          {renderCards}
        </Grid>
      </Box>
    </div>
  );
};
