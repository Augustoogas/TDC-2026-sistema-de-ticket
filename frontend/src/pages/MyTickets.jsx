import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  useTheme,
  Stack,
  Chip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';

const MyTickets = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: reemplazar por llamada al backend para obtener los tickets del usuario
    const fetchTickets = async () => {
      try {
        // Aquí iría la llamada a la API
        // Por ahora, simulamos con datos locales
        const mockTickets = [
          {
            id: 1,
            evento: 'Gala de Orquesta - Teatro UNPAZ',
            fecha: '28 de Octubre - 21:00 hs',
            asiento: 'A-5',
            precio: 5000,
            estado: 'activo',
            numeroTicket: 'TK-2026-001',
          },
          {
            id: 2,
            evento: 'Stand Up Night - Humor en Vivo',
            fecha: '11 de Noviembre - 22:00 hs',
            asiento: 'B-12',
            precio: 1800,
            estado: 'activo',
            numeroTicket: 'TK-2026-002',
          },
          {
            id: 3,
            evento: 'Ciclo de Cine - Clásicos del Siglo XX',
            fecha: '15 de Noviembre - 20:00 hs',
            asiento: 'A-8',
            precio: 1200,
            estado: 'activo',
            numeroTicket: 'TK-2026-003',
          },
        ];
        setTickets(mockTickets);
      } catch (error) {
        console.error('Error cargando tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'activo':
        return 'success';
      case 'usado':
        return 'default';
      case 'cancelado':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (estado) => {
    switch (estado) {
      case 'activo':
        return 'Activo';
      case 'usado':
        return 'Utilizado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return estado;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {/* HEADER */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <EventIcon
          sx={{
            fontSize: 40,
            color: theme.palette.primary.main,
            mb: 1,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Mis Tickets
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          Aquí encontrás todos tus tickets de eventos
        </Typography>
      </Box>

      {/* CONTENIDO */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : tickets.length > 0 ? (
        <Stack spacing={3}>
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: theme.shadows[4],
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={3}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                >
                  {/* INFORMACIÓN DEL EVENTO */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {ticket.evento}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 1,
                      }}
                    >
                      📅 {ticket.fecha}
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          Asiento
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {ticket.asiento}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          Número de Ticket
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {ticket.numeroTicket}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          Precio
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ${ticket.precio}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* ESTADO Y ACCIONES */}
                  <Stack
                    spacing={2}
                    sx={{
                      alignItems: { xs: 'flex-start', md: 'flex-end' },
                      width: { xs: '100%', md: 'auto' },
                    }}
                  >
                    <Chip
                      label={getStatusLabel(ticket.estado)}
                      color={getStatusColor(ticket.estado)}
                      variant="outlined"
                    />

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DownloadIcon />}
                      >
                        Descargar
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <EventIcon
            sx={{
              fontSize: 60,
              color: theme.palette.text.secondary,
              opacity: 0.3,
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
            }}
          >
            No tienes tickets aún
          </Typography>

          <Button variant="contained" onClick={() => navigate('/events')}>
            Explorar eventos
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MyTickets;
