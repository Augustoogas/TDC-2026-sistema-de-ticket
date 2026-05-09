import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  TextField,
  Box,
  CircularProgress,
  useTheme,
} from '@mui/material';

import { EventService } from '../services/api';

const Events = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // FETCH EVENTOS
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

  // FILTRO BUSQUEDA
  const eventosFiltrados = eventos.filter((evento) =>
    evento.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* HEADER */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          Eventos
        </Typography>

        <Typography sx={{ color: theme.palette.text.secondary }}>
          Explorá todos los eventos disponibles
        </Typography>
      </Box>

      {/* BUSCADOR */}
      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar eventos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 500 }}
        />
      </Box>

      {/* GRID DE EVENTOS */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3.5,
          }}
        >
          {eventosFiltrados.map((evento) => (
            <Card
              key={evento.id_evento}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/event/${evento.id_evento}`)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      evento.imagen ||
                      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=500'
                    }
                    alt={evento.nombre}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>

                {/* CONTENT */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    py: 2,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      lineHeight: 1.2,
                      mb: 1.5,
                    }}
                  >
                    {evento.nombre}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.3,
                      mb: 0.5,
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

      {/* EMPTY */}
      {!loading && eventosFiltrados.length === 0 && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            No se encontraron eventos.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Events;
