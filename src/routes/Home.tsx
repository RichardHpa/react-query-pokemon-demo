import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Stack direction="row" gap={2}>
      <Button variant="contained" component={Link} to="/users/add">
        Add New User
      </Button>
      <Button variant="contained">Add New Item</Button>
    </Stack>
  );
};
