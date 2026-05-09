import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 2, md: 0 },
          my: 4,
        }}
      >
        <Header />

        <Box component="main" sx={{ my: 4 }}>
          <Outlet />
        </Box>

        <Footer />
      </Container>
    </Box>
  );
}
