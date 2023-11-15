import { Link } from 'react-router-dom';
import { Typography, Box, Button, Stack } from '@mui/material';

import { ContentContainer } from 'components/ContentContainer';

export const Error404 = () => {
  return (
    <ContentContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={4} alignItems="center">
          <Typography variant="h4">Uh Oh</Typography>
          <Typography>We cant find a page for your request</Typography>
          <Button variant="contained" component={Link} to="/dashboard">
            Return to Dashboard
          </Button>
        </Stack>
      </Box>
    </ContentContainer>
  );
};
