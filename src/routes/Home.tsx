import { Grid } from '@mui/material';

import { UserCountCard, CardsCountCard, TotalValue } from 'components/Cards';

import { BreadcrumbHeader } from 'components/BreadcrumbHeader';

export const Home = () => {
  return (
    <div>
      <BreadcrumbHeader title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <UserCountCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardsCountCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalValue />
        </Grid>
      </Grid>
    </div>
  );
};
