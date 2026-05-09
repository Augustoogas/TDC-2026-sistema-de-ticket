import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/images/hero.jpg';

import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';

import { EventService } from '../services/api';

const Home = () => {
  const navigate = useNavigate();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getAllEvents();
        setEventos(data);
      } catch (error) {
        console.error('Error cargando eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (container.scrollWidth > container.clientWidth) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY * 6,
          behavior: 'smooth',
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [loading]);

  const eventosDestacados = eventos.slice(0, 6);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* HERO */}
      <Box
        sx={(theme) => ({
          position: 'relative',
          mb: 10,
          py: { xs: 6, md: 10 },
          px: 2,
          textAlign: 'center',
          overflow: 'hidden',
          isolation: 'isolate',

          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            transform: 'scale(1.1)',
          },

          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to bottom, ${theme.palette.background.default} 0%, transparent 40%),
              linear-gradient(to top, ${theme.palette.background.default} 0%, transparent 40%),
              linear-gradient(to right, ${theme.palette.background.default} 0%, transparent 20%),
              linear-gradient(to left, ${theme.palette.background.default} 0%, transparent 20%)
            `,
          },

          '& > *': {
            position: 'relative',
            zIndex: 1,
          },
        })}
      >
        <Typography
          variant="overline"
          sx={(theme) => ({
            color: theme.palette.primary.main,
            letterSpacing: 1.5,
            fontWeight: 600,
          })}
        >
          NUEVOS EVENTOS CADA SEMANA
        </Typography>

        <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 800 }}>
          Descubrí experiencias únicas
        </Typography>

        <Typography
          variant="body1"
          sx={{ maxWidth: 600, mx: 'auto', color: 'text.secondary' }}
        >
          Explorá shows, conciertos y eventos exclusivos en un solo lugar.
        </Typography>
      </Box>

      {/* EVENTOS */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3, ml: 2 }}>
          Eventos destacados
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : eventosDestacados.length === 0 ? (
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>
              No se encontraron eventos.
            </Typography>
          </Box>
        ) : (
          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              px: 1,
              py: 1.5,
              pb: 2,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              alignItems: 'stretch',
            }}
          >
            {eventosDestacados.map((evento, index) => (
              <Card
                key={evento.id_evento}
                sx={{
                  minWidth: 260,
                  maxWidth: 260,
                  flexShrink: 0,
                  ml: index === 0 ? 1 : 0,
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/event/${evento.id_evento}`)}
                >
                  <Box sx={{ position: 'relative', pt: '56.25%' }}>
                    <CardMedia
                      component="img"
                      image={
                        evento.imagen ||
                        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=500'
                      }
                      alt={evento.nombre}
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      pt: 2,
                      pb: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: 120,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 500, mb: 0.5, lineHeight: 1.3 }}
                    >
                      {evento.nombre}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        mt: 'auto',
                      }}
                    >
                      {evento.fecha}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}

        {/* CTA */}
        <Box
          sx={(theme) => ({
            mt: 10,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 4,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.custom.cardBorder}`,
            transition: '0.25s',

            '&:hover': {
              borderColor: theme.palette.primary.main,
            },
          })}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            ¿Listo para tu próximo evento?
          </Typography>

          <Typography
            sx={{ mb: 4, maxWidth: 500, mx: 'auto', color: 'text.secondary' }}
          >
            Explorá todos los eventos disponibles y encontrá la experiencia perfecta.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/events')}
          >
            Explorar eventos
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
