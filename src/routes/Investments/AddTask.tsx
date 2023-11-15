import { Grid } from '@mui/material';

import { ContentContainer } from 'components/ContentContainer';
import { BreadcrumbHeader } from 'components/BreadcrumbHeader';

export const AddTask = () => {
  return (
    <div>
      <BreadcrumbHeader
        title="Add New Task"
        crumbs={[
          {
            label: 'Tasks',
            path: '/tasks',
          },
          {
            label: 'Create',
          },
        ]}
      />

      <ContentContainer>
        <Grid container spacing={4}>
          <Grid item xs>
            dfdf
          </Grid>
        </Grid>
      </ContentContainer>
    </div>
  );
};
