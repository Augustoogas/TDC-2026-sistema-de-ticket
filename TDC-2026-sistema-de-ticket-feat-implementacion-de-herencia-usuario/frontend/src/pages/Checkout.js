import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Container, Paper, Typography, Box, TextField, 
  Button, Grid, Divider, Stack, CircularProgress 
} from '@mui/material';
import { PurchaseService } from '../services/api'; 

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

 
  const { asientos, total, evento } = location.state || { 
    asientos: [], 
    total: 0, 
    evento: "Evento no seleccionado" 
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (total === 0) {
      alert("No hay una compra activa para procesar.");
      return;
    }

    setLoading(true);

 
    const orderData = {
      user_id: JSON.parse(localStorage.getItem('user'))?.id || "ANONYMOUS",
      event_name: evento,
      selected_seats: asientos,
      total_amount: total,
      timestamp: new Date().toISOString()
    };

    try {

      const response = await PurchaseService.sendPurchase(orderData);
      
      if (response.success) {
        alert(`¡Pago exitoso! Tu número de orden es: ${response.orderId}`);
        navigate('/home'); 
      }
    } catch (error) {
      alert("Error al procesar el pago. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 12, pb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: '#1a1a1a', color: 'white', borderRadius: '16px', border: '1px solid #333' }}>
        
        <Typography variant="h4" gutterBottom sx={{ color: 'var(--bordo-medio)', fontWeight: 'bold' }}>
          Finalizar Compra
        </Typography>
        
        <Divider sx={{ mb: 3, bgcolor: '#444' }} />

        {/* RESUMEN DE LA COMPRA */}
        <Box sx={{ mb: 4, p: 2, bgcolor: '#252525', borderRadius: '8px' }}>
          <Typography variant="subtitle1" sx={{ color: 'grey.400' }}>Resumen:</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>{evento}</Typography>
          <Typography variant="body1">
            <strong>Ubicaciones:</strong> {asientos.length > 0 ? asientos.join(', ') : 'Ninguna'}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, color: 'var(--bordo-medio)', fontWeight: 'bold' }}>
            Total: ${total}
          </Typography>
        </Box>

        {/* FORMULARIO DE PAGO */}
        <form onSubmit={handlePayment}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', mb: 2 }}>
            Datos de Pago (Simulado)
          </Typography>
          
          <Stack spacing={2}>
            <TextField
              label="Nombre en la Tarjeta"
              variant="filled"
              fullWidth
              required
              InputLabelProps={{ style: { color: '#aaa' } }}
              sx={{ bgcolor: '#333', borderRadius: 1, input: { color: 'white' } }}
            />
            
            <TextField
              label="Número de Tarjeta"
              variant="filled"
              fullWidth
              required
              inputProps={{ maxLength: 16 }}
              InputLabelProps={{ style: { color: '#aaa' } }}
              sx={{ bgcolor: '#333', borderRadius: 1, input: { color: 'white' } }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Vencimiento (MM/AA)"
                  variant="filled"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  sx={{ bgcolor: '#333', borderRadius: 1, input: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  type="password"
                  variant="filled"
                  fullWidth
                  required
                  inputProps={{ maxLength: 3 }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  sx={{ bgcolor: '#333', borderRadius: 1, input: { color: 'white' } }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={loading || total === 0}
                size="large"
                sx={{ 
                  bgcolor: 'var(--bordo-medio)', 
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: 'var(--bordo-oscuro)' }
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : `PAGAR $${total}`}
              </Button>

              <Button 
                variant="text" 
                onClick={() => navigate(-1)} 
                sx={{ color: 'grey.500', textTransform: 'none' }}
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