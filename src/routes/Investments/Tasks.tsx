import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { BreadcrumbHeader } from 'components/BreadcrumbHeader';

export const Tasks = () => {
  return (
    <div>
      <BreadcrumbHeader
        title="All Tasks"
        actions={
          <Button variant="contained" component={Link} to="/tasks/add">
            Add New Task
          </Button>
        }
        crumbs={[
          {
            label: 'Tasks',
          },
        ]}
      />
    </div>
  );
};
