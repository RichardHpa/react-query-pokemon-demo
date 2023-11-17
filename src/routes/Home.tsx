import { Grid, Card, CardHeader } from '@mui/material';

import { UserCountCard, CardsCountCard } from 'components/Cards';

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
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader title="Total Value" titleTypographyProps={{ variant: 'h6' }} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
