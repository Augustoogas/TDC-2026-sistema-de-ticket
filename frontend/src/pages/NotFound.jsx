import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 800,
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Página no encontrada
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        La página que intentas visitar no existe.
      </Typography>

      <Button variant="contained" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Box>
  );
}
