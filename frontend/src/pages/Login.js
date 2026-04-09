import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api';
import { Box, Paper, Typography, TextField, Button, Stack } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', nombre: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await AuthService.register(formData);
        alert("Registro exitoso. Ya puedes iniciar sesión.");
        setIsRegister(false);
      } else {
        const user = await AuthService.login(formData.username, formData.password);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'var(--negro-fondo)' }}>
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400, bgcolor: '#1a1a1a', color: 'white', borderRadius: 4, border: '1px solid #333' }}>
        <Typography variant="h4" align="center" sx={{ color: 'var(--bordo-medio)', fontWeight: 'bold', mb: 3 }}>
          {isRegister ? "Crear Cuenta" : "SITU Login"}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {isRegister && (
              <TextField 
                label="Nombre Completo" fullWidth required 
                variant="filled" sx={{ bgcolor: '#333', borderRadius: 1 }}
                InputLabelProps={{ style: { color: '#aaa' } }} inputProps={{ style: { color: 'white' } }}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
            )}
            <TextField 
              label="Usuario" fullWidth required 
              variant="filled" sx={{ bgcolor: '#333', borderRadius: 1 }}
              InputLabelProps={{ style: { color: '#aaa' } }} inputProps={{ style: { color: 'white' } }}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <TextField 
              label="Contraseña" type="password" fullWidth required 
              variant="filled" sx={{ bgcolor: '#333', borderRadius: 1 }}
              InputLabelProps={{ style: { color: '#aaa' } }} inputProps={{ style: { color: 'white' } }}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: 'var(--bordo-medio)', py: 1.5, fontWeight: 'bold', '&:hover': { bgcolor: 'var(--bordo-oscuro)' } }}>
              {isRegister ? "REGISTRARME" : "ENTRAR"}
            </Button>
          </Stack>
        </form>

        <Button fullWidth sx={{ mt: 2, color: 'grey.500', textTransform: 'none' }} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes usuario? Regístrate aquí"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;