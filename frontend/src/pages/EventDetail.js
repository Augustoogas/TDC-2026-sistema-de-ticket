import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Stack,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import Seat from '../components/Seat';
import { EventService } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketCount, setTicketCount] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);

        const loggedUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedUser);

        const data = await EventService.getEventDetail(id);
        setEvent(data);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (user?.role === 'ADMIN') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length < ticketCount) {
        setSelectedSeats((prev) => [...prev, seatId]);
      }
    }
  };

  const handleComprar = () => {
    if (user?.role === 'ADMIN') return;

    const total = selectedSeats.reduce((acc, seatId) => {
      const fila = event.filas.find((f) => seatId.startsWith(f.letra));
      return acc + (fila?.precio || 0);
    }, 0);

    navigate('/checkout', {
      state: {
        asientos: selectedSeats,
        total,
        evento: event.nombre,
      },
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Typography sx={{ textAlign: 'center', mt: 10 }}>
        Evento no encontrado
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pt: 12, mb: 5 }}>
      {user?.role === 'ADMIN' && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Vista previa de administrador
        </Alert>
      )}

      {/* HEADER */}
      <Box
        sx={{
          mb: 6,
          p: 4,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.custom.cardBorder}`,
          borderRadius: '20px',
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          {event.nombre}
        </Typography>

        <Typography
          variant="body1"
          color="primary.main"
          sx={{ mb: 2, fontWeight: 600 }}
        >
          {event.fecha}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {event.descripcion}
        </Typography>

        {/* CONTROL */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Typography sx={{ fontWeight: 500 }}>Cantidad:</Typography>

          <TextField
            type="number"
            size="small"
            value={ticketCount}
            onChange={(e) => {
              setTicketCount(Math.max(1, Number(e.target.value)));
              setSelectedSeats([]);
            }}
            sx={{ width: 90 }}
          />
        </Box>
      </Box>

      {/* ESCENARIO */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="overline" letterSpacing={4} sx={{ fontWeight: 600 }}>
          ESCENARIO
        </Typography>
      </Box>

      {/* ASIENTOS */}
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          justifyContent: 'center',
          px: 1,
        }}
      >
        <Stack spacing={2} alignItems="center">
          {event.filas.map((fila) => (
            <Box
              key={fila.letra}
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  width: 30,
                  color: 'text.secondary',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {fila.letra}
              </Typography>

              {Array.from({ length: fila.asientos }).map((_, i) => {
                const seatId = `${fila.letra}${i + 1}`;

                return (
                  <Seat
                    key={seatId}
                    id={seatId}
                    customColor={fila.color}
                    status={
                      selectedSeats.includes(seatId) ? 'selected' : 'available'
                    }
                    onToggle={handleSeatClick}
                  />
                );
              })}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* LEYENDA */}
      <Box
        sx={{
          mt: 5,
          mb: 6,
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {event.filas.map((fila) => (
          <Box
            key={fila.letra}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                bgcolor: fila.color,
                borderRadius: 0.5,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {fila.nombre} <strong>${fila.precio}</strong>
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ACTIONS */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          sx={{
            minWidth: 140,
            color: theme.palette.text.primary,
            px: 4,
            '&:hover': {
              bgcolor: theme.palette.background.default,
              color: theme.palette.primary.main,
            },
          }}
        >
          Volver
        </Button>

        {user?.role !== 'ADMIN' && (
          <Button
            variant="contained"
            disabled={selectedSeats.length === 0}
            onClick={handleComprar}
            sx={{ minWidth: 140 }}
          >
            Comprar ({selectedSeats.length})
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EventDetail;
