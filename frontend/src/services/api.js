// --- CONFIGURACIÓN BASE ---
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'https://ticketflowbackend.onrender.com/api';



// --- HELPER PARA AGREGAR TOKEN A LAS PETICIONES ---
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// --- SERVICIOS CONECTADOS AL BACKEND REAL (RENDER) ---

export const EventService = {
  getAllEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/eventos`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al cargar los eventos');
    return await response.json();
  },

  getEventDetail: async (id) => {
    const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al cargar el detalle del evento');
    return await response.json();
  },

  saveEvent: async (eventData) => {
    const response = await fetch(`${API_BASE_URL}/eventos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Error al guardar el evento');
    return await response.json();
  },

  deleteEvent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/eventos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al eliminar el evento');
    return { success: true };
  },

  getSalas: async () => {
    const saved = localStorage.getItem('ticketflow_salas');
    return saved ? JSON.parse(saved) : [];
  },
  getCategorias: async () => {
    const saved = localStorage.getItem('ticketflow_categorias');
    return saved ? JSON.parse(saved) : [];
  },
  getEventoCategorias: async () => {
    return [
     { id: 'EC1', titulo: 'Música', icon: '🎵' },
      { id: 'EC2', titulo: 'Teatro', icon: '🎭' },
      { id: 'EC3', titulo: 'Danza', icon: '💃' },
      { id: 'EC4', titulo: 'Cine', icon: '🎬' },
    ];
  },
};

export const AuthService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Credenciales inválidas');

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      
      const meResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!meResponse.ok) {
      throw new Error('Error al obtener el perfil del servidor');
    }

      const user = await meResponse.json();
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  },

  register: async (registerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: registerData.nombre,
          apellido: registerData.apellido,
          email: registerData.email,
          password: registerData.password,
        }),
      });

      if (!response.ok) throw new Error('Error en el registro');
      const data = await response.json();
      localStorage.setItem('auth_token', data.token);


      const meResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const user = await meResponse.json();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Register error:', error.message);
      throw error;
    }
  },

  getUser: () => JSON.parse(localStorage.getItem('user')),
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  getToken: () => localStorage.getItem('auth_token'),
  isAuthenticated: () => !!localStorage.getItem('auth_token'),
};

// 🟢 RESTAURADO PARA QUE VITE NO LOGRE FALLAR EL BUILD:
export const AdminService = {
  getUsers: async () => {
    // Apunta a tu controlador de usuarios en Spring Boot
    const response = await fetch(`${API_BASE_URL}/admin`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) return []; // Retorna vacío si falla para que no rompa la pantalla
    return await response.json();
  },
  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return { success: response.ok };
  },
  saveUser: async (userForm) => {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userForm),
    });
    return { success: response.ok };
  },
};

export const PurchaseService = {
  sendPurchase: async (purchaseData, clienteId) => {
    const response = await fetch(`${API_BASE_URL}/reservas/${clienteId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(purchaseData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al procesar la reserva');
    }
    return await response.json();
  },
};