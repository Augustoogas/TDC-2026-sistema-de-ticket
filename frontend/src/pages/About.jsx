import { Container, Typography, Box, Divider } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
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
          SOBRE NOSOTROS
        </Typography>

        <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 800 }}>
          ¿Qué es TicketFlow?
        </Typography>

        <Typography
          variant="body1"
          sx={{ maxWidth: 600, mx: 'auto', color: 'text.secondary' }}
        >
          TicketFlow es una plataforma para descubrir, explorar y comprar entradas
          para eventos de forma simple y sin vueltas.
        </Typography>
      </Box>

      {/* MISIÓN */}
      <Box sx={{ mb: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Nuestra misión
        </Typography>

        <Typography sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
          Queremos conectar a las personas con experiencias únicas, facilitando el
          acceso a eventos en un solo lugar, con una experiencia clara y pensada para
          vos.
        </Typography>
      </Box>

      {/* CÓMO FUNCIONA */}
      <Box sx={{ mb: 12 }}>
        <Typography variant="h4" sx={{ mb: 8, textAlign: 'center' }}>
          ¿Cómo funciona?
        </Typography>

        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 4,
            textAlign: 'center',
            p: 4,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.custom.cardBorder}`,
            borderRadius: 3,
          })}
        >
          {[
            { step: '1', title: 'Explorá eventos' },
            { step: '2', title: 'Elegí tus asientos' },
            { step: '3', title: 'Comprá en segundos' },
            { step: '4', title: 'Disfrutá la experiencia' },
          ].map((item) => (
            <Box key={item.step}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  opacity: 0.9,
                }}
              >
                {item.step}
              </Typography>

              <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: 10 }} />

      {/* POR QUÉ EXISTE */}
      <Box sx={{ mb: 12, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ¿Por qué existe TicketFlow?
        </Typography>

        <Typography sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
          Comprar entradas suele ser lento y confuso. TicketFlow nace para
          simplificar todo en una sola experiencia: rápida, clara y accesible desde
          cualquier lugar.
        </Typography>
      </Box>

      {/* STATS */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 6,
          textAlign: 'center',
        }}
      >
        {[
          { value: '+100', label: 'Eventos publicados' },
          { value: '+500', label: 'Usuarios activos' },
          { value: '+1000', label: 'Entradas vendidas' },
        ].map((stat) => (
          <Box
            key={stat.label}
            sx={(theme) => ({
              p: 4,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.custom.cardBorder}`,
              borderRadius: 3,
            })}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
              }}
            >
              {stat.value}
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>{stat.label}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default About;
