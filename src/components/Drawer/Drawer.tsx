import {
  Drawer as MuiDrawer,
  Toolbar,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const items = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    path: '/dashboard',
  },
  {
    label: 'Users',
    icon: <PeopleIcon />,
    path: '/users',
  },
];

export const Drawer = () => {
  const location = useLocation();

  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />

      <Box mt={4} sx={{ overflow: 'auto' }}>
        {items.map(item => {
          const isActive = location.pathname.includes(item.path);
          return (
            <ListItemButton
              key={item.label}
              sx={{ py: 0.5, minHeight: 32 }}
              component={Link}
              to={item.path}
              selected={isActive}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
              />
            </ListItemButton>
          );
        })}
      </Box>
    </MuiDrawer>
  );
};
