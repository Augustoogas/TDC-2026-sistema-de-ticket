import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, Grid, Button, 
  TextField, Stack, Paper, CircularProgress, Alert
} from '@mui/material';
import Seat from '../components/Seat';
import { EventService } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // ESTADOS
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketCount, setTicketCount] = useState(1);
  const [user, setUser] = useState(null);

  // 1. CARGA DE DATOS Y SESIÓN
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedUser);

        const data = await EventService.getEventDetail(id);
        setEvent(data);
        setSelectedSeats([]); 
      } catch (error) {
        console.error("Error al cargar el evento:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // 2. LÓGICA DE SELECCIÓN DE ASIENTOS
  const handleSeatClick = (seatId) => {
    if (user?.role === 'ADMIN') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < ticketCount) {
        setSelectedSeats(prev => [...prev, seatId]);
      } else {
        alert(`Límite alcanzado: solo puedes elegir ${ticketCount} asientos.`);
      }
    }
  };

  // 3. CÁLCULO DE TOTAL Y ENVÍO A CHECKOUT (CON RESTRICCIÓN DE ROL)
  const handleComprar = () => {
    if (user?.role === 'ADMIN') {
      alert("Los administradores no pueden realizar compras de entradas.");
      return;
    }

    if (selectedSeats.length > 0) {
      const totalCompra = selectedSeats.reduce((acc, seatId) => {
        const filaLetra = seatId.charAt(0);
        const filaConfig = event.filas.find(f => f.letra === filaLetra);
        return acc + (filaConfig ? filaConfig.precio : 0);
      }, 0);

      navigate('/pago', { 
        state: { 
          asientos: selectedSeats, 
          total: totalCompra,
          evento: event.nombre 
        } 
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: 'var(--bordo-medio)' }} />
      </Box>
    );
  }

  if (!event) {
    return <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', mt: 10 }}>Evento no encontrado</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ pt: 12, mb: 5, color: 'white' }}>
      
      {/* MENSAJE PARA ADMINS */}
      {user?.role === 'ADMIN' && (
        <Alert severity="warning" sx={{ mb: 3, bgcolor: '#332b00', color: '#ffeb3b' }}>
          Estás en modo <strong>Vista Previa (ADMIN)</strong>. No puedes seleccionar asientos ni realizar compras.
        </Alert>
      )}

      {/* CABECERA DINÁMICA */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid #444' }}>
        <Typography variant="h4" sx={{ color: 'var(--bordo-medio)', fontWeight: 'bold' }}>{event.nombre}</Typography>
        <Typography variant="h6" sx={{ color: 'grey.400' }}>{event.fecha}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>{event.descripcion}</Typography>
      </Paper>

      {/* CONFIGURACIÓN DE COMPRA (Deshabilitada para Admin) */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#111', p: 2, borderRadius: 2 }}>
        <Typography>Cantidad de entradas:</Typography>
        <TextField 
          type="number" size="small" value={ticketCount}
          disabled={user?.role === 'ADMIN'}
          onChange={(e) => {
            setTicketCount(Math.max(1, parseInt(e.target.value) || 1));
            setSelectedSeats([]); 
          }}
          sx={{ bgcolor: user?.role === 'ADMIN' ? '#222' : 'white', borderRadius: 1, width: 80 }}
        />
      </Box>

      {/* ESCENARIO */}
      <Box sx={{ 
        width: '100%', height: '40px', bgcolor: 'grey.800', 
        borderRadius: '0 0 50% 50%', mb: 6, 
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
      }}>
        <Typography variant="button" sx={{ letterSpacing: 5, color: 'grey.400' }}>ESCENARIO</Typography>
      </Box>

      {/* MAPA DE ASIENTOS */}
      <Stack spacing={2} alignItems="center" sx={{ overflowX: 'auto', pb: 2 }}>
        {event.filas.map((fila) => (
          <Box key={fila.letra} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography sx={{ width: 30, fontWeight: 'bold', color: 'grey.500' }}>{fila.letra}</Typography>
            {Array.from({ length: fila.asientos }).map((_, i) => {
              const seatId = `${fila.letra}${i + 1}`;
              return (
                <Seat
                  key={seatId}
                  id={seatId}
                  customColor={fila.color} 
                  // Si es ADMIN, todos los asientos se ven como "ocupados" o no clickeables
                  status={selectedSeats.includes(seatId) ? 'selected' : (user?.role === 'ADMIN' ? 'available' : 'available')}
                  onToggle={handleSeatClick}
                />
              );
            })}
          </Box>
        ))}
      </Stack>

      {/* REFERENCIA DE PRECIOS */}
      <Box sx={{ mt: 6, p: 3, bgcolor: '#0a0a0a', borderRadius: 2, border: '1px solid #222' }}>
        <Grid container spacing={2} justifyContent="center">
          {event.filas.map((fila) => (
            <Grid item key={fila.letra} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: fila.color, borderRadius: '4px' }} />
              <Typography variant="body2">
                {fila.nombre}: <strong>${fila.precio}</strong>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* BOTONES DE ACCIÓN */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, alignItems: 'center' }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/home')} 
          sx={{ color: 'white', borderColor: 'grey.700', px: 4 }}
        >
          VOLVER
        </Button>
        
        {user?.role !== 'ADMIN' && (
          <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h6" sx={{ mb: 1, color: selectedSeats.length === ticketCount ? 'success.main' : 'white' }}>
                  Seleccionados: {selectedSeats.length} / {ticketCount}
              </Typography>
              <Button 
                variant="contained" 
                disabled={selectedSeats.length === 0} 
                onClick={handleComprar}
                sx={{ 
                  bgcolor: 'var(--bordo-medio)', 
                  px: 6, py: 1.5, fontWeight: 'bold',
                  '&:hover': { bgcolor: 'var(--bordo-oscuro)' }
                }}
              >
                COMPRAR
              </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EventDetail;