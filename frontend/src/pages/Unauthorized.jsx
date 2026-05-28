import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
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
        403
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Acceso denegado
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        No tienes permisos para acceder a esta página.
      </Typography>

      <Button variant="contained" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Box>
  );
}
