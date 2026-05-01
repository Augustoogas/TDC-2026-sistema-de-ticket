import React, { useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  const { asientos, total, evento } = location.state || {
    asientos: [],
    total: 0,
    evento: 'Evento no seleccionado',
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (total === 0) return;

    setLoading(true);

    const orderData = {
      user_id: JSON.parse(localStorage.getItem('user'))?.id || 'ANONYMOUS',
      event_name: evento,
      selected_seats: asientos,
      total_amount: total,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await PurchaseService.sendPurchase(orderData);

      if (response.success) {
        alert(`Orden: ${response.orderId}`);
        navigate('/');
      }
    } catch (error) {
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      {/* CARD PRINCIPAL */}
      <Paper
        elevation={0}
        sx={(theme) => ({
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.custom.cardBorder}`,
        })}
      >
        {/* HEADER */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
          }}
        >
          Finalizar compra
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Revisá los datos antes de confirmar el pago
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* RESUMEN */}
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
            {evento}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Asientos: {asientos.length ? asientos.join(', ') : 'Ninguno'}
          </Typography>

          <Typography
            variant="h5"
            sx={(theme) => ({
              mt: 3,
              fontWeight: 800,
              color: theme.palette.primary.main,
            })}
          >
            Total: ${total}
          </Typography>
        </Box>

        {/* FORM */}
        <form onSubmit={handlePayment}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
            }}
          >
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
              inputProps={{ maxLength: 16 }}
              variant="outlined"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Vencimiento"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  type="password"
                  fullWidth
                  required
                  inputProps={{ maxLength: 3 }}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {/* ACTIONS */}
            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || total === 0}
                sx={{
                  py: 1.6,
                  fontWeight: 800,
                }}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  `Pagar $${total}`
                )}
              </Button>

              <Button
                fullWidth
                onClick={() => navigate(-1)}
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
