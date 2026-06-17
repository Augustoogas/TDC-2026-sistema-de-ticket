
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Stack,
  useTheme,
  Paper,
} from '@mui/material';
import { EventService } from '../services/api';
import { PurchaseService } from '../services/api';

const FILAS = [
  { letra: 'A', nombre: 'VIP', color: '#f44336', precio: 15000, asientos: 10 },
  { letra: 'B', nombre: 'Platea', color: '#2196f3', precio: 12000, asientos: 12 },
  { letra: 'C', nombre: 'General', color: '#4caf50', precio: 8000, asientos: 14 },
];

const SECTORES = [
  { nombre: 'VIP', color: '#f44336', precio: 15000, disponibles: 10, sectorId: 1 },
  { nombre: 'Platea', color: '#2196f3', precio: 12000, disponibles: 12, sectorId: 2 },
  { nombre: 'General', color: '#4caf50', precio: 8000, disponibles: 14, sectorId: 3 },
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState(null);
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // 
  const handleSelectSector = (sector) => {
    setSelectedSector(sector);
    if (ticketCount > sector.disponibles) {
      setTicketCount(sector.disponibles);
    }
  };


  const handleComprar = async () => {
  if (!selectedSector) return;

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const clienteId = user?.id;

    const total = ticketCount * selectedSector.precio;

    const reservaBody = {
      nombreEvento: event.titulo,
      eventoId: event.eventoId || event.id || id,
      sectorId: selectedSector.sectorId,
      nombreSector: selectedSector.nombre,
      cantidadEntradas: ticketCount,
      montoTotal: total
    };

    const reserva = await PurchaseService.sendPurchase(
      reservaBody,
      clienteId
    );

    console.log("Reserva creada:", reserva);

    navigate('/checkout', {
      state: {
        reservaId: reserva.reservaId,
        nombreEvento: event.titulo,
        nombreSector: selectedSector.nombre,
        cantidadEntradas: ticketCount,
        montoTotal: total
      }
    });

  } catch (error) {
    console.error("Error creando reserva:", error);
    alert("No se pudo crear la reserva");
  }
};

  if (loading) {
    return (
      <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Typography sx={{ textAlign: 'center', mt: 10 }} variant="h6">
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

      {/* DATOS DEL EVENTO */}
      <Box sx={{ mb: 6, p: 4, bgcolor: theme.palette.background.paper, borderRadius: '20px' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          {event.titulo}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 500 }}>
          {event.fecha}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {event.descripcion}
        </Typography>

        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Locación: {event.locacionNombre}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
          <Typography>Cantidad de entradas:</Typography>
          <TextField
            type="number"
            size="small"
            value={ticketCount}
            // 3. CORRECCIÓN: Controlar que no baje de 1 ni supere los disponibles del sector seleccionado
            onChange={(e) => {
              const val = Number(e.target.value);
              const maxLimit = selectedSector ? selectedSector.disponibles : 99;
              setTicketCount(Math.min(maxLimit, Math.max(1, val)));
            }}
            disabled={!selectedSector}
            helperText={!selectedSector ? "Selecciona un sector primero" : `Asientos: ${selectedSector.disponibles}`}
            sx={{ width: 120 }}
          />
        </Box>
      </Box>

      {/* ESCENARIO */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ width: '100%', bgcolor: '#323131', color: 'white', py: 1.5, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ letterSpacing: 6, fontWeight: 'bold' }}>
            ESCENARIO
          </Typography>
        </Box>
      </Box>

      {/* MAPA DE ASIENTOS */}
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={1.5} sx={{ width: '100%', alignItems: 'center' }}>
          {FILAS.map((fila) => (
            <Box key={fila.letra} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', width: 15 }}>
                {fila.letra}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {Array.from({ length: fila.asientos }).map((_, index) => {
                  const esSeleccionado = selectedSector?.nombre === fila.nombre;
                  return (
                    <Box
                      key={index}
                      onClick={() => {
                        const sectorAsociado = SECTORES.find(s => s.nombre === fila.nombre);
                        if (sectorAsociado) handleSelectSector(sectorAsociado);
                      }}
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: fila.color,
                        borderRadius: 0.5,
                        cursor: 'pointer',
                        opacity: esSeleccionado ? 1 : 0.4, // Se bajó un poco la opacidad default para notar más la selección
                        transform: esSeleccionado ? 'scale(1.15)' : 'none',
                        transition: 'all 0.2s',
                        border: esSeleccionado ? '2px solid #fff' : 'none',
                        boxShadow: esSeleccionado ? 3 : 0,
                        '&:hover': { opacity: 1, transform: 'scale(1.1)' }
                      }}
                      title={`${fila.nombre} - Sector Fila ${fila.letra}`}
                    />
                  );
                })}
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* SECTORES CARD */}
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
        {SECTORES.map((sector) => {
          const esSeleccionado = selectedSector?.nombre === sector.nombre;
          return (
            <Paper
              key={sector.nombre}
              onClick={() => handleSelectSector(sector)}
              elevation={esSeleccionado ? 6 : 1}
              sx={{
                p: 2.5,
                width: 160,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: sector.color,
                color: 'white',
                borderRadius: 3,
                transition: 'transform 0.2s',
                border: esSeleccionado ? '3px solid #fff' : '3px solid transparent',
                transform: esSeleccionado ? 'scale(1.05)' : 'none',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{sector.nombre}</Typography>
              <Typography variant="body1">${sector.precio}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>{sector.disponibles} disponibles</Typography>
            </Paper>
          );
        })}
      </Box>

      {/* LEYENDA */}
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
        {FILAS.map((fila) => (
          <Box key={fila.letra} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 14, height: 14, bgcolor: fila.color, borderRadius: 0.5 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {fila.nombre} - ${fila.precio}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* BOTONES */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Volver
        </Button>

        {user?.role !== 'ADMIN' && (
          <Button
            variant="contained"
            disabled={!selectedSector}
            onClick={handleComprar}
            size="large"
          >
            Comprar ({selectedSector ? ticketCount : 0})
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EventDetail;