import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api';

import { Box, Paper, Typography, TextField, Button, Stack } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        if (
          !formData.nombre ||
          !formData.apellido ||
          !formData.email ||
          !formData.password
        ) {
          throw new Error('Todos los campos son requeridos');
        }
        await AuthService.register(formData);
        alert('Registro exitoso');
        setFormData({ email: '', password: '', nombre: '', apellido: '' });
        setIsRegister(false);
      } else {
        if (!formData.email || !formData.password) {
          throw new Error('Email y contraseña son requeridos');
        }
        await AuthService.login(formData.email, formData.password);
        navigate('/');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
      })}
    >
      {/* VOLVER (HOME) */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={(theme) => ({
          position: 'absolute',
          top: 24,
          left: 24,

          color: theme.palette.text.secondary,
          textTransform: 'none',

          '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
          },
        })}
      >
        Volver
      </Button>

      {/* LOGIN CARD */}
      <Paper
        elevation={0}
        sx={(theme) => ({
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.custom.cardBorder}`,
          boxShadow: `0 12px 30px ${theme.palette.custom.cardShadow}`,
        })}
      >
        {/* TÍTULO */}
        <Typography
          variant="h4"
          align="center"
          sx={(theme) => ({
            mb: 3,
            fontWeight: 800,
            color: theme.palette.text.primary,
          })}
        >
          {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </Typography>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {isRegister && (
              <>
                <TextField
                  label="Nombre"
                  fullWidth
                  required
                  variant="outlined"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
                <TextField
                  label="Apellido"
                  fullWidth
                  required
                  variant="outlined"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData({ ...formData, apellido: e.target.value })
                  }
                />
              </>
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              variant="outlined"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              required
              variant="outlined"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? 'Cargando...' : isRegister ? 'Registrarme' : 'Entrar'}
            </Button>
          </Stack>
        </form>

        {/* TOGGLE (INICIO SESIÓN / REGISTRO) */}
        <Button
          fullWidth
          sx={(theme) => ({
            mt: 2,
            color: theme.palette.text.secondary,
            textTransform: 'none',

            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
            },
          })}
          onClick={() => {
            setIsRegister(!isRegister);
            setFormData({ email: '', password: '', nombre: '', apellido: '' });
          }}
        >
          {isRegister
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate'}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
