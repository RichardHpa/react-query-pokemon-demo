import { Box, Toolbar, Container } from '@mui/material';

import { NavBar } from './components/Navbar';
import { Drawer } from './components/Drawer';

import { Routes } from './routes';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <Drawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container>
          <Routes />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
