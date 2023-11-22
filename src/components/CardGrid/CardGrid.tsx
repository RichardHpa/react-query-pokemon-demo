import { useMemo } from 'react';
import { Button, Grid, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { Image } from 'components/Image';

import type { RegularBreakpoints } from '@mui/material';
import type { Card } from 'types/card';
import type { FC } from 'react';

const gridMap = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 2,
} as RegularBreakpoints;

interface CardGridProps {
  loading: boolean;
  cards?: Card[];
  loadingCount?: number;
}

export const CardGrid: FC<CardGridProps> = ({ loading, cards, loadingCount = 12 }) => {
  const renderCards = useMemo(() => {
    if (loading && !cards) {
      return Array.from(Array(loadingCount), (e, i) => {
        return (
          <Grid item {...gridMap} key={i}>
            <img src="/images/cardBack.png" width="100%" alt="pokemon card back" />
          </Grid>
        );
      });
    }
    if (!loading && cards) {
      if (cards.length > 0) {
        return cards.map((card: Card) => {
          return (
            <Grid item {...gridMap} key={card.id} component={Link} to={`/cards/${card.id}`}>
              <Image src={card.image} alt={card.name} />
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
  }, [cards, loading, loadingCount]);

  return (
    <Grid container spacing={2}>
      {renderCards}
    </Grid>
  );
};
