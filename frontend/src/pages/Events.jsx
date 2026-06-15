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
  Chip,
  Stack,
} from '@mui/material';

import { EventService } from '../services/api';

const Events = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  // FETCH EVENTOS Y CATEGORÍAS
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

  // FILTRO BÚSQUEDA Y CATEGORÍA
  const eventosFiltrados = eventos.filter((evento) => {
    const cumpleBusqueda = evento.titulo
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const cumpleCategoria =
      selectedCategoria === null || evento.categoriaId === selectedCategoria;
    return cumpleBusqueda && cumpleCategoria;
  });

  // OBTENER NOMBRE Y ICONO DE CATEGORÍA
  const obtenerCategoria = (categoriaId) => {
    return categorias.find((c) => c.id === categoriaId);
  };

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
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar eventos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: 500 }}
        />
      </Box>

      {/* FILTROS DE CATEGORÍA */}
      {!loading && categorias.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}
          >
            Categorías
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Chip
              label="Todos"
              onClick={() => setSelectedCategoria(null)}
              variant={selectedCategoria === null ? 'filled' : 'outlined'}
              color={selectedCategoria === null ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
            {categorias.map((cat) => (
              <Chip
                key={cat.id}
                label={`${cat.icon} ${cat.titulo}`}
                onClick={() => setSelectedCategoria(cat.id)}
                variant={selectedCategoria === cat.id ? 'filled' : 'outlined'}
                color={selectedCategoria === cat.id ? 'primary' : 'default'}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Box>
      )}

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
          {eventosFiltrados.map((evento) => {
            const categoria = obtenerCategoria(evento.tipo);
            return (
              <Card
                key={evento.eventoId}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/event/${evento.eventoId}`)}
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
                      alt={evento.titulo}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {/* BADGE DE CATEGORÍA */}
                    {categoria && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: theme.palette.background.transparent,
                          color: theme.palette.text.primary,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {categoria.icon} {categoria.nombre}
                      </Box>
                    )}
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
                      {evento.titulo}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.3,
                        mb: 0.5,
                        fontWeight: 500
                      }}
                    >
                      {evento.fecha ? new Date(evento.fecha).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      }) : (evento.fechaString || 'fecha no definida')

                      }
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
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
