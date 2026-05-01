import React, { useState, useEffect } from 'react';
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
} from '@mui/material';

import { EventService } from '../services/api';

const Events = () => {
  const navigate = useNavigate();

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
        <Typography variant="h3" sx={{ mb: 2 }}>
          Eventos
        </Typography>

        <Typography color="text.secondary">
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
          <CircularProgress color="primary" />
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
            gap: 3,
          }}
        >
          {eventosFiltrados.map((evento) => (
            <Card key={evento.id_evento}>
              <CardActionArea onClick={() => navigate(`/event/${evento.id_evento}`)}>
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

                <CardContent>
                  <Typography variant="h6">{evento.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {evento.fecha}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}

      {/* MENSAJE SIN RESULTADOS */}
      {eventosFiltrados.length === 0 && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography color="text.secondary">No se encontraron eventos.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Events;
