import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
 
  const user = JSON.parse(localStorage.getItem('user'));


  if (location.pathname === '/' || !user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: 'rgba(10, 10, 10, 0.95)', 
        borderBottom: '2px solid var(--bordo-medio)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.8)',
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', height: '70px' }}>
          
          {/* LOGO / NOMBRE APP */}
          <Box 
            onClick={() => navigate('/home')} 
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'white', 
                letterSpacing: 3,
                textTransform: 'uppercase'
              }}
            >
              SITU
            </Typography>
          </Box>

          {/* SECCIÓN DERECHA: USUARIO Y ACCIONES */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 } }}>
            
            {/* MENSAJE DE BIENVENIDA */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountCircleIcon sx={{ color: 'var(--bordo-medio)', fontSize: 28 }} />
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'white', 
                  display: { xs: 'none', md: 'block' },
                  fontSize: '0.95rem'
                }}
              >
                Bienvenid@, <strong>{user.nombre}</strong>
              </Typography>
            </Box>

            {/* BOTÓN PANEL ADMIN (Solo si el rol es ADMIN) */}
            {user.role === 'ADMIN' && (
              <Button 
                variant="text"
                startIcon={<AdminPanelSettingsIcon />}
                onClick={() => navigate('/admin')}
                sx={{ 
                  color: 'gold', 
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  px: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255, 215, 0, 0.1)',
                    borderColor: 'gold'
                  }
                }}
              >
                ADMIN
              </Button>
            )}

            {/* BOTÓN SALIR */}
            <Button 
              variant="outlined" 
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.3)',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'var(--bordo-medio)',
                  bgcolor: 'rgba(128, 0, 32, 0.1)'
                }
              }}
            >
              Salir
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;