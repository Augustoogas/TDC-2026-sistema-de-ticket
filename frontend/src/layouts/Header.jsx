import { AppBar, Toolbar, Box, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

// ICONOS
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import HelpOutlineIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';

// EFECTO HOVER PARA BOTONES DE NAVEGACIÓN
const navButtonStyle = {
  position: 'relative',
  borderRadius: 0,
  color: 'inherit',
  height: '64px',
  display: 'flex',
  alignItems: 'center',

  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: 0,
    backgroundColor: 'primary.main',
    transition: 'width 0.3s ease',
  },

  '&:hover::after': {
    width: '100%',
  },

  '&:hover': {
    backgroundColor: 'transparent',
  },
};

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 0 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* IZQUIERDA */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {/* LOGO */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <ConfirmationNumberIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              TicketFlow
            </Typography>
          </Box>

          {/* NAV */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/events"
              startIcon={<EventIcon />}
              color="inherit"
              sx={navButtonStyle}
            >
              Eventos
            </Button>

            <Button
              component={Link}
              to="/featured"
              startIcon={<StarIcon />}
              color="inherit"
              sx={navButtonStyle}
            >
              Destacados
            </Button>

            <Button
              component={Link}
              to="/create-event"
              startIcon={<AddCircleOutlineIcon />}
              color="inherit"
              sx={navButtonStyle}
            >
              Crear Evento
            </Button>
          </Box>
        </Box>

        {/* ESPACIO FLEXIBLE */}
        <Box sx={{ flexGrow: 1 }} />

        {/* DERECHA */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            to="/my-tickets"
            startIcon={<ConfirmationNumberOutlinedIcon />}
            color="inherit"
            sx={navButtonStyle}
          >
            Mis Tickets
          </Button>

          <Button
            component={Link}
            to="/help"
            startIcon={<HelpOutlineIcon />}
            color="inherit"
            sx={navButtonStyle}
          >
            Ayuda
          </Button>

          <Button
            component={Link}
            to="/about"
            startIcon={<InfoIcon />}
            color="inherit"
            sx={navButtonStyle}
          >
            Nosotros
          </Button>

          <Button
            component={Link}
            to="/login"
            variant="outlined"
            startIcon={<LoginIcon />}
          >
            Login
          </Button>

          <IconButton sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
