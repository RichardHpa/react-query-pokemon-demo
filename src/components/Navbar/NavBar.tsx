import { AppBar, Toolbar, Typography } from '@mui/material';

export const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          React Query Demo
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
