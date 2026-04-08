import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Grid, Card, CardMedia, 
  CardContent, CardActionArea, TextField, Box, CircularProgress 
} from '@mui/material';
import { EventService } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await EventService.getAllEvents();
        setEventos(data);
      } catch (error) {
        console.error("Error cargando eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const eventosFiltrados = eventos.filter(evento =>
    evento.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: 'var(--bordo-medio)' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 5 }}> {/* pt: 12 empuja todo debajo del header */}
      
      <Typography variant="h3" align="center" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}>
        Cartelera SITU
      </Typography>

      <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar espectáculo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            maxWidth: '600px', 
            bgcolor: 'white', 
            borderRadius: '8px',
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {eventosFiltrados.map((evento) => (
          <Grid item key={evento.id_evento} xs={12} sm={6} md={4}>
            <Card sx={{ 
              bgcolor: '#1a1a1a', 
              color: 'white', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '16px',
              border: '1px solid #333',
              overflow: 'hidden'
            }}>
              <CardActionArea onClick={() => navigate(`/evento/${evento.id_evento}`)}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}> {/* Esto crea un ratio 16:9 perfecto */}
                  <CardMedia
                    component="img"
                    image={evento.imagen || "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=500"}
                    alt={evento.nombre}
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover' // Esto hace que la imagen no se deforme
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ color: 'var(--bordo-medio)', fontWeight: 'bold', mb: 1 }}>
                    {evento.nombre}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: 'grey.500', mb: 2 }}>
                    {evento.fecha}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: 'grey.300',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {evento.descripcion}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;