import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { EventService } from '../services/api';
import { PurchaseService } from '../services/api';
import formatearFechaEvento from '../utils/dateUtils';
import ChairIcon from '@mui/icons-material/Chair';
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

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  const [evento, setEvento] = useState(null);
  const [sectores, setSectores] = useState([]);
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

        const eventoData = await EventService.getEventDetail(id);
        const LocacionData = await EventService.getEventoLocaciones(
          eventoData.locacionId
        );

        setEvento(eventoData);
        setSectores(LocacionData.sectores);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const getSectorLetter = (index) => String.fromCharCode(65 + index);

  const handleSelectSector = (sector) => {
    if (sector.disponibles === 0) {
      return;
    }
    setSelectedSector(sector);
    if (ticketCount > sector.disponibles) {
      setTicketCount(sector.disponibles);
    }
  };

  const handleComprar = async () => {
    if (!selectedSector) return;

    //Redirige a login si el usuario no inició sesión
    if (!user) {
      navigate('/login', {
        state: { from: location.pathname },
      });
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const clienteId = user?.id;

      const total = ticketCount * selectedSector.precio;

      const reservaBody = {
        nombreEvento: evento.titulo,
        eventoId: evento.eventoId || evento.id || id,
        sectorId: selectedSector.sectorId,
        nombreSector: selectedSector.nombre,
        cantidadEntradas: ticketCount,
        montoTotal: total,
      };

      const reserva = await PurchaseService.sendPurchase(reservaBody, clienteId);

      console.log('Reserva creada:', reserva);

      navigate('/checkout', {
        state: {
          reservaId: reserva.reservaId,
          nombreEvento: evento.titulo,
          nombreSector: selectedSector.nombre,
          cantidadEntradas: ticketCount,
          montoTotal: total,
        },
      });
    } catch (error) {
      console.error('Error creando reserva:', error);
      alert('No se pudo crear la reserva');
    }
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

  if (!evento) {
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
      <Box
        sx={{
          mb: 6,
          p: 4,
          bgcolor: theme.palette.background.paper,
          borderRadius: '20px',
          border: `1px solid ${theme.palette.text.primary}`,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          {evento.titulo}
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 500 }}
        >
          {evento.fecha ? formatearFechaEvento(evento.fecha) : 'Fecha no definida'}
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 2, color: theme.palette.text.secondary }}
        >
          {evento.descripcion}
        </Typography>

        <Typography sx={{ mt: 2 }}>Locación: {evento.locacionNombre}</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
          <Typography>Cantidad de entradas:</Typography>
          <TextField
            type="number"
            size="small"
            value={ticketCount}
            //Controlar que no baje de 1 ni supere los disponibles del sector seleccionado
            onChange={(e) => {
              const val = Number(e.target.value);
              const maxLimit = selectedSector ? selectedSector.disponibles : 99;
              setTicketCount(Math.min(maxLimit, Math.max(1, val)));
            }}
            disabled={!selectedSector}
            sx={{ width: 70 }}
          />
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {!selectedSector
              ? 'Selecciona un sector primero'
              : `${selectedSector.disponibles} Asientos disponibles`}
          </Typography>
        </Box>
      </Box>

      {/* ESCENARIO */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{ letterSpacing: 6, fontWeight: 'bold' }}
        >
          ESCENARIO
        </Typography>
      </Box>

      {/* MAPA DE ASIENTOS */}
      {sectores.every((s) => s.disponibles === 0) && (
        <Alert
          severity="error"
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            mb: 3,
          }}
        >
          No hay entradas disponibles para este evento.
        </Alert>
      )}
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={1.5} sx={{ width: '100%', alignItems: 'center' }}>
          {sectores.map(
            (sector, sectorIndex) =>
              sector.disponibles > 0 && (
                <Box
                  key={sector.sectorId}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', width: 15 }}>
                    {getSectorLetter(sectorIndex)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {Array.from({ length: sector.disponibles }).map(
                      (_, seatIndex) => {
                        const esSeleccionado =
                          selectedSector?.sectorId === sector.sectorId;

                        return (
                          <Box
                            key={seatIndex}
                            onClick={() => {
                              handleSelectSector(sector);
                            }}
                            sx={{
                              width: 34,
                              height: 34,
                              bgcolor: sector.color,
                              borderRadius: 0.5,
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              opacity: esSeleccionado ? 1 : 0.4,
                              transform: esSeleccionado ? 'scale(1.05)' : 'none',
                              transition: 'all 0.2s ease',
                              border: esSeleccionado
                                ? `1px solid ${theme.palette.primary.main}`
                                : `1px solid ${theme.palette.divider}`,
                              boxShadow: esSeleccionado
                                ? `0 0 2px ${theme.palette.primary.main}`
                                : 'none',
                              '&:hover': {
                                opacity: 1,
                                transform: 'scale(1.15)',
                              },
                            }}
                            title={`${sector.nombre} - Asiento ${getSectorLetter(sectorIndex)}${seatIndex + 1}`}
                          >
                            <ChairIcon
                              sx={{
                                fontSize: 18,
                                color: theme.palette.text.primary,
                                opacity: 0.8,
                              }}
                            />

                            <Typography
                              sx={{
                                position: 'absolute',
                                bottom: 1,
                                right: 2,
                                fontSize: '0.55rem',
                                fontWeight: 'bold',
                                color: theme.palette.text.primary,
                                lineHeight: 1,
                                pointerEvents: 'none',
                              }}
                            >
                              {seatIndex + 1}
                            </Typography>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                </Box>
              )
          )}
        </Stack>
      </Box>

      {/* SECTORES CARD */}
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {sectores.map((sector) => {
          const esSeleccionado = selectedSector?.sectorId === sector.sectorId;
          return (
            <Paper
              key={sector.sectorId}
              onClick={() => handleSelectSector(sector)}
              elevation={esSeleccionado ? 6 : 1}
              sx={{
                p: 2.5,
                width: 160,
                textAlign: 'center',
                cursor: sector.disponibles === 0 ? 'not-allowed' : 'pointer',
                opacity: sector.disponibles === 0 ? 0.5 : 1,
                bgcolor: sector.color,
                color: theme.palette.text.primary,
                borderRadius: 3,
                transition: 'transform 0.2s ease',
                border: esSeleccionado
                  ? `2px solid ${theme.palette.text.primary}`
                  : '2px solid transparent',
                transform: esSeleccionado ? 'scale(1.05)' : 'none',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {sector.nombre}
              </Typography>
              <Typography variant="body1">${sector.precio}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {sector.disponibles} disponibles
              </Typography>
              {sector.disponibles === 0 && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    display: 'block',
                    fontWeight: 'bold',
                    mt: 0.5,
                    color: theme.palette.primary.main,
                  }}
                >
                  AGOTADO
                </Typography>
              )}
            </Paper>
          );
        })}
      </Box>

      {/* LEYENDA */}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: 5,
        }}
      >
        {sectores.map((sector) => (
          <Box
            key={sector.sectorId}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Box
              sx={{
                width: 14,
                height: 14,
                bgcolor: sector.color,
                borderRadius: 0.5,
              }}
            />
            <Typography variant="body2">
              {sector.nombre} - ${sector.precio}
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
            disabled={!selectedSector || selectedSector.disponibles === 0}
            onClick={handleComprar}
            size="large"
          >
            {user
              ? `Comprar (${selectedSector ? ticketCount : 0})`
              : 'Iniciar sesión'}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EventDetail;
