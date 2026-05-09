import {
  Box,
  Typography,
  Container,
  Grid,
  Link as MuiLink,
  IconButton,
} from '@mui/material';

// ICONOS
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const linkStyle = {
  '&:hover': {
    color: 'primary.main',
    transform: 'scale(1.05)',
    transition: 'all 0.1s ease',
  },
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 6,
        borderTop: '2px dotted',
        borderColor: 'custom.footerBorder',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6.5}>
          {/* COLUMNA 1 - MARCA */}
          <Grid xs={12} md={3}>
            <Box sx={{ maxWidth: 300 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                🎟️ TicketFlow
              </Typography>

              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Sistema de gestión y venta de tickets para eventos y shows de
                entretenimiento. Descubrí experiencias y conectate con la comunidad.
              </Typography>
            </Box>
          </Grid>

          {/* COLUMNA 2 - INFORMACIÓN */}
          <Grid xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Información
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink href="#" underline="hover" color="inherit" sx={linkStyle}>
                Cómo comprar entradas
              </MuiLink>

              <MuiLink href="#" underline="hover" color="inherit" sx={linkStyle}>
                Métodos de pago
              </MuiLink>

              <MuiLink href="#" underline="hover" color="inherit" sx={linkStyle}>
                Política de reembolsos
              </MuiLink>

              <MuiLink href="#" underline="hover" color="inherit" sx={linkStyle}>
                Seguridad de la plataforma
              </MuiLink>
            </Box>
          </Grid>

          {/* COLUMNA 3- COMUNIDAD */}
          <Grid xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Comunidad
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ '&:hover': { color: 'primary.main' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ '&:hover': { color: 'primary.main' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ '&:hover': { color: 'primary.main' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ '&:hover': { color: 'primary.main' } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>

            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              Seguinos para enterarte de nuevos eventos.
            </Typography>
          </Grid>

          {/* COLUMNA 4 - CONTACTO */}
          <Grid xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ mb: 3.5, fontWeight: 'bold' }}>
              Contacto
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" color="primary" />

              <MuiLink
                href="mailto:soporte@ticketflow.com"
                underline="hover"
                color="inherit"
                variant="body2"
                sx={linkStyle}
              >
                soporte@ticketflow.com
              </MuiLink>
            </Box>

            <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
              Respondemos dentro de las 24hs.
            </Typography>
          </Grid>
        </Grid>

        {/* FOOTER BOTTOM (PARTE LEGAL) */}
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © 2026 TicketFlow. Todos los derechos reservados.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink href="#" underline="hover" color="inherit" sx={linkStyle}>
              Privacidad
            </MuiLink>
            <MuiLink href="#" underline="hover" color="inherit" sx={linkStyle}>
              Términos
            </MuiLink>
            <MuiLink href="#" underline="hover" color="inherit" sx={linkStyle}>
              Cookies
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
