// --- CONFIGURACIÓN BASE ---
const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'https://ticketflowbackend.onrender.com/api';

// const API_BASE_URL = 'http://localhost:8081/api';

// --- HELPER PARA AGREGAR TOKEN A LAS PETICIONES ---
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// --- SERVICIOS CONECTADOS AL BACKEND REAL ---
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
    const eventId = eventData.idEvento || eventData.eventoId;

    const url = eventId
      ? `${API_BASE_URL}/eventos/${eventId}`
      : `${API_BASE_URL}/eventos`;

    const method = eventId ? 'PUT' : 'POST';

    console.log(`🚀 Despachando a la API vía ${method} a la URL: ${url}`);

    const response = await fetch(url, {
      method: method,
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

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

  saveLocacion: async (locacion) => {
    const response = await fetch(`${API_BASE_URL}/locaciones`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(locacion),
    });

    if (!response.ok) {
      const error = await response.text();
      console.log(error);
      throw new Error(error);
    }

    return await response.json();
  },

  getCategorias: async () => {
    const saved = localStorage.getItem('ticketflow_categorias');
    return saved ? JSON.parse(saved) : [];
  },

  getEventoCategorias: () => {
    return [
      { id: 1, titulo: 'Música', icon: '🎵' },
      { id: 2, titulo: 'Teatro', icon: '🎭' },
      { id: 3, titulo: 'Danza', icon: '💃' },
      { id: 4, titulo: 'Cine', icon: '🎬' },
      { id: 5, titulo: 'Conferencia', icon: '🎤' },
    ];
  },

  // Locaciones
  getEventoLocaciones: async (id) => {
    const response = await fetch(`${API_BASE_URL}/locaciones/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al cargar las locaciones del evento');
    }
    return await response.json();
  },

  getLocaciones: async () => {
    const response = await fetch(`${API_BASE_URL}/locaciones`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al cargar locaciones');
    }

    return await response.json();
  },

  deleteSala: async (id) => {
    const response = await fetch(`${API_BASE_URL}/locaciones/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al eliminar la locación');
    return { success: true };
  },
};

export const SectorService = {
  getAllSectores: async () => {
    const response = await fetch(`${API_BASE_URL}/sectores`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al cargar los Sectores');
    return await response.json();
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
        headers: getAuthHeaders(),
      });

      if (!meResponse.ok) throw new Error('Error al obtener el perfil del servidor');

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
        headers: getAuthHeaders(),
      });

      // 🟢 CORREGIDO: Validación estricta añadida para evitar romper el LocalStorage en el registro
      if (!meResponse.ok)
        throw new Error('Error al obtener el perfil tras el registro');

      const user = await meResponse.json();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Register error:', error.message);
      throw error;
    }
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  getToken: () => localStorage.getItem('auth_token'),
  isAuthenticated: () => !!localStorage.getItem('auth_token'),
};

export const AdminService = {
  getUsers: async () => {
    // 🟢 CORREGIDO: Apunta de forma coherente a /usuarios en sintonía con las rutas de abajo
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) return [];
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

  // Nuevo método para cambiar el estado de la reserva en la bbdd
  confirmReservation: async (reservaId) => {
    const response = await fetch(`${API_BASE_URL}/reservas/${reservaId}/confirmar`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al confirmar la reserva');
    }
    return await response.json();
  },

  // Llamada a cancelar la reserva cuando se aprieta en el checkout el boton de cancelar y volver
  cancelReservation: async (reservaId) => {
    const response = await fetch(`${API_BASE_URL}/reservas/${reservaId}/cancelar`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al cancelar reserva');
    }
    return await response.json();
  },
};
