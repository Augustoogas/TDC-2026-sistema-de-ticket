import { Typography, Box, Paper, Avatar, Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthService } from '../services/api';

const Profile = () => {
  const user = AuthService.getUser();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: 6,
        px: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          border: `1px solid ${theme.palette.primary.main}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              bgcolor: theme.palette.primary.main,
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 50 }} />
          </Avatar>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            Mi Perfil
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            Información de la cuenta
          </Typography>
        </Box>

        <Divider
          sx={{
            mb: 3,
            borderColor: theme.palette.divider,
          }}
        />

        {/* INFO */}
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                color: theme.palette.text.secondary,
              }}
            >
              Nombre
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              {user.nombre} {user.apellido}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                color: theme.palette.text.secondary,
              }}
            >
              Email
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              {user?.email}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                color: theme.palette.text.secondary,
              }}
            >
              Rol
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textTransform: 'capitalize',
                color: theme.palette.text.primary,
              }}
            >
              {user?.role}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;