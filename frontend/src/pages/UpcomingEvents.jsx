import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import formatearFechaEvento from '../utils/dateUtils';

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  useTheme,
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { EventService } from '../services/api';

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventosData, categoriasData] = await Promise.all([
          EventService.getAllEvents(),
          EventService.getEventoCategorias(),
        ]);

        setEventos(eventosData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const obtenerCategoria = (categoriaId) => {
    return categorias.find((c) => c.id === categoriaId);
  };

  const eventosProximos = eventos.slice(0, 8);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* HEADER */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Próximamente
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 600,
            mx: 'auto',
            color: theme.palette.text.secondary,
          }}
        >
          Los próximos eventos y actividades disponibles.
        </Typography>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/events')}
          sx={{ mt: 3 }}
        >
          Ver todos los eventos
        </Button>
      </Box>

      {/* CONTENIDO */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : eventosProximos.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {eventosProximos.map((evento) => {
            const categoria = obtenerCategoria(evento.categoriaId);

            return (
              <Box
                key={evento.eventoId}
                onClick={() => navigate(`/event/${evento.eventoId}`)}
                sx={{
                  p: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: '0.2s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.background.paper,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {evento.titulo}
                </Typography>

                <Box
                  sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  {categoria && (
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {categoria.icon} {categoria.titulo}
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
                  >
                    📅
                    {evento.fecha
                      ? formatearFechaEvento(evento.fecha)
                      : 'Fecha no definida'}
                  </Typography>
                </Box>

                {evento.descripcion && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {evento.descripcion}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            No hay eventos próximos por el momento.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default UpcomingEvents;
