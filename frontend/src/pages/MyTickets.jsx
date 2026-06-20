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
import { TicketService } from '../services/api';
import formatearFechaEvento from '../utils/dateUtils';

const MyTickets = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.id) {
          const ticketsData = await TicketService.getMyTickets(user.id);
          setTickets(ticketsData);
        }
      } catch (error) {
        console.error('Error cargando tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

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
          {tickets.map((ticket) => {
            const eventoFinalizado =
              ticket.evento?.fecha && new Date() > new Date(ticket.evento.fecha);
            return (
              <Card
                key={ticket.ticketId}
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
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: {
                        xs: 'flex-start',
                        md: 'center',
                      },
                    }}
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
                        {ticket.evento?.titulo || 'Evento no especificado'}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 1,
                        }}
                      >
                        {ticket.reserva?.fechaCreacion
                          ? formatearFechaEvento(ticket.reserva.fechaCreacion)
                          : 'Fecha no disponible'}
                      </Typography>

                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            Locación
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {ticket.evento?.locacion?.nombre || 'Sin locación'}
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
                            TK-{String(ticket.ticketId).padStart(6, '0')}
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
                        label={eventoFinalizado ? 'Finalizado' : 'Activo'}
                        color={eventoFinalizado ? 'error' : 'success'}
                        variant="outlined"
                      />

                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DownloadIcon />}
                          onClick={async () => {
                            try {
                              const blob = await TicketService.downloadTicket(
                                ticket.ticketId
                              );
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `ticket-${ticket.ticketId}.pdf`;
                              a.click();
                              window.URL.revokeObjectURL(url);
                            } catch (error) {
                              console.error('Error downloading ticket:', error);
                              alert('No se pudo descargar el ticket');
                            }
                          }}
                        >
                          Descargar
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
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
