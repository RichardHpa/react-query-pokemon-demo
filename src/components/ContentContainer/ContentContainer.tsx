import { Box, Paper } from '@mui/material';

import type { FC, ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
}

export const ContentContainer: FC<ContentContainerProps> = ({ children }) => {
  return (
    <Paper>
      <Box p={4}>{children}</Box>
    </Paper>
  );
};
