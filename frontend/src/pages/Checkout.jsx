import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Divider,
  Stack,
  CircularProgress,
} from '@mui/material';

import { PurchaseService } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log('State recibido:', location.state);

  const [loading, setLoading] = useState(false);

  // 1. CORREGIDO: Extraemos las variables exactas del estado (arreglado typo cantidadEntradas)
  const {
    nombreEvento,
    // eventoId,
    // sectorId,
    nombreSector,
    cantidadEntradas,
    montoTotal,
  } = location.state || {
    nombreEvento: 'Evento no seleccionado',
    eventoId: null,
    sectorId: null,
    nombreSector: 'No seleccionado',
    cantidadEntradas: 0,
    montoTotal: 0,
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!montoTotal || montoTotal === 0) return;

    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const clienteId = user?.id;

    if (!clienteId) {
      alert('Debes iniciar sesión para completar la reserva.');
      setLoading(false);
      return;
    }

    const { reservaId } = location.state || {};

    if (!reservaId) {
      alert('No hay reserva para confirmar');
      setLoading(false);
      return;
    }

try {
       const reservaConfirmada = await PurchaseService.confirmReservation(reservaId);

       console.log('Reserva confirmada:', reservaConfirmada);

       alert(`¡Reserva confirmada! ID: ${reservaConfirmada.reservaId}`);

       navigate('/my-tickets');
     } catch (error) {
      console.error(error);
      alert(`Error al procesar el pago: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper
        elevation={0}
        sx={(theme) => ({
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.custom?.cardBorder || theme.palette.divider}`,
        })}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Finalizar compra
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          Revisá los datos antes de confirmar el pago
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* 3. RESUMEN CORREGIDO: Ya no usa 'evento', 'asientos' ni 'total' */}
        <Box
          sx={(theme) => ({
            mb: 4,
            p: 2.5,
            borderRadius: 2,
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 600 }}
          >
            RESUMEN
          </Typography>

          <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
            {nombreEvento}
          </Typography>

          <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
            Sector: <strong>{nombreSector}</strong> — {cantidadEntradas}{' '}
            {cantidadEntradas === 1 ? 'entrada' : 'entradas'}
          </Typography>

          <Typography
            variant="h5"
            sx={(theme) => ({
              mt: 3,
              fontWeight: 800,
              color: theme.palette.primary.main,
            })}
          >
            Total: ${montoTotal}
          </Typography>
        </Box>

        <form onSubmit={handlePayment}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Datos de pago
          </Typography>

          <Stack spacing={2.2}>
            <TextField
              label="Nombre en la tarjeta"
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Número de tarjeta"
              fullWidth
              required
              slotProps={{ htmlInput: { maxLength: 16 } }}
              variant="outlined"
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Vencimiento"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="CVV"
                  type="password"
                  fullWidth
                  required
                  slotProps={{ htmlInput: { maxLength: 3 } }}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || montoTotal === 0}
                sx={{
                  py: 1.6,
                  fontWeight: 800,
                }}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  `Pagar $${montoTotal}`
                )}
              </Button>

              <Button
                fullWidth
                onClick={async () => {
                  try {
                    const { reservaId } = location.state || {};

                    if (reservaId) {
                      await PurchaseService.cancelReservation(reservaId);
                    }

                    navigate(-1);
                  } catch (error) {
                    console.error(error);
                    alert('Error al cancelar la reserva');
                  }
                }}
                sx={{
                  mt: 1,
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Cancelar y volver
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Checkout;
