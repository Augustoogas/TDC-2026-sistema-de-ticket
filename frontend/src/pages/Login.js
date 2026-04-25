import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api';

import { Box, Paper, Typography, TextField, Button, Stack } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nombre: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await AuthService.register(formData);
        setIsRegister(false);
      } else {
        const user = await AuthService.login(formData.username, formData.password);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      }
    } catch (err) {
      alert(err.message);
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
              <TextField
                label="Nombre completo"
                fullWidth
                required
                variant="outlined"
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
            )}

            <TextField
              label="Usuario"
              fullWidth
              required
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              required
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Button type="submit" variant="contained" fullWidth>
              {isRegister ? 'Registrarme' : 'Entrar'}
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
          onClick={() => setIsRegister(!isRegister)}
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
