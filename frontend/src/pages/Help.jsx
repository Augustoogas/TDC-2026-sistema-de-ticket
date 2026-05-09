import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  TextField,
  Button,
  Stack,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Help = () => {
  const faqs = [
    {
      question: '¿Cómo compro una entrada?',
      answer:
        'Seleccioná un evento, elegí tus asientos y seguí el proceso de compra.',
    },
    {
      question: '¿Puedo cancelar una compra?',
      answer:
        'Por el momento no ofrecemos cancelaciones automáticas. Si tuviste un problema, podés contactarnos.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Actualmente el sistema simula pagos. En una versión real, se integrarían tarjetas y billeteras digitales.',
    },
    {
      question: '¿Necesito una cuenta para comprar?',
      answer:
        'Sí, necesitás iniciar sesión para poder completar una compra y guardar tus datos.',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* HERO */}
      <Box sx={{ textAlign: 'center', mb: 10 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'primary.main',
            letterSpacing: 1.5,
            fontWeight: 600,
          }}
        >
          AYUDA
        </Typography>

        <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 800 }}>
          ¿En qué podemos ayudarte?
        </Typography>

        <Typography
          variant="body1"
          sx={{ maxWidth: 600, mx: 'auto', color: 'text.secondary' }}
        >
          Encontrá respuestas rápidas a las preguntas más comunes o ponete en
          contacto con nosotros.
        </Typography>
      </Box>

      {/* FAQ */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Preguntas frecuentes
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            disableGutters
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.custom.cardBorder}`,
              mb: 2,
              borderRadius: 2,
              transition: '0.2s',
              '&.Mui-expanded': {
                borderColor: theme.palette.primary.main,
              },

              // elimina línea default del desplegable
              '&:before': { display: 'none' },
            })}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Divider sx={{ mb: 10 }} />

      {/* CONTACTO */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          ¿No encontraste lo que buscabas?
        </Typography>

        <Typography
          sx={{ mb: 4, maxWidth: 600, mx: 'auto', color: 'text.secondary' }}
        >
          Podés enviarnos un mensaje y te responderemos lo antes posible.
        </Typography>

        <Box
          sx={(theme) => ({
            maxWidth: 600,
            mx: 'auto',
            p: 4,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.custom.cardBorder}`,
          })}
        >
          <Stack spacing={2}>
            <TextField label="Email" fullWidth />
            <TextField label="Mensaje" multiline rows={4} fullWidth />

            <Button variant="contained">Enviar mensaje</Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Help;
