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

// MAPEADORES DE DATOS
const mapBackendEventToFrontend = (backendEvent) => {
  return {
    id: backendEvent.id || backendEvent.eventoId,
    titulo: backendEvent.titulo || backendEvent.nombre,
    descripcion: backendEvent.descripcion || 'Sin descripción disponible',
    fecha: backendEvent.fecha,
    lugar: backendEvent.lugar || (backendEvent.locacion ? backendEvent.locacion.nombre : 'Estadio Único'),
    imagen: backendEvent.imagen || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500',
    // Mapeos de compatibilidad para evitar que el front se rompa
    categoria: backendEvent.categoria || 'Música',
    sala: backendEvent.sala || 'Sala Principal',
    precioBase: backendEvent.precioBase || 1500
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
    const data = await response.json();
    return data.map(mapBackendEventToFrontend);
  },


  getEventDetail: async (id) => {
    const response = await fetch(`${API_BASE_URL}/eventos`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Error al cargar el detalle del evento');
    const data = await response.json();
    const evento = data.find(e => (e.id == id || e.eventoId == id));
    if (!evento) throw new Error('Evento no encontrado');
    return mapBackendEventToFrontend(evento);
  },


  saveEvent: async (eventData) => {
    const backendPayload = {
      titulo: eventData.titulo,
      descripcion: eventData.descripcion,
      fecha: eventData.fecha,
      lugar: eventData.lugar,
      precioBase: eventData.precioBase
    };


    const response = await fetch(`${API_BASE_URL}/eventos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(backendPayload),
    });
    if (!response.ok) throw new Error('Error al guardar el evento');
    const data = await response.json();
    return mapBackendEventToFrontend(data);
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
    return saved ? JSON.parse(saved) : [{ id: 'S1', nombre: 'Sala Principal' }, { id: 'S2', nombre: 'Microestadio' }];
  },
  getCategorias: async () => {
    return [
      { id: 'EC1', nombre: 'Música', icon: '🎵' },
      { id: 'EC2', nombre: 'Teatro', icon: '🎭' },
      { id: 'EC3', nombre: 'Danza', icon: '💃' },
      { id: 'EC4', nombre: 'Cine', icon: '🎬' },
    ];
  },
  getEventoCategorias: async () => {
    return [
      { id: 'EC1', nombre: 'Música', icon: '🎵' },
      { id: 'EC2', nombre: 'Teatro', icon: '🎭' },
      { id: 'EC3', nombre: 'Danza', icon: '💃' },
      { id: 'EC4', nombre: 'Cine', icon: '🎬' },
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


      const data = await response.json(); // Devuelve { token: "..." }
      localStorage.setItem('auth_token', data.token);
     
 
      const profileResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        }
      });


      let userProfile;
      if (profileResponse.ok) {
        userProfile = await profileResponse.json(); 
      } else {
        userProfile = { email, nombre: email.split('@')[0], role: 'CLIENTE' };
      }


      localStorage.setItem('user', JSON.stringify(userProfile));
      return userProfile;
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


      const userProfile = {
        email: registerData.email,
        nombre: registerData.nombre,
        apellido: registerData.apellido,
        role: 'CLIENTE'
      };
     
      localStorage.setItem('user', JSON.stringify(userProfile));
      return userProfile;
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


export const AdminService = {
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) return [];
    return await response.json();
  },
  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return { success: response.ok };
  },
  saveUser: async (userForm) => {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userForm),
    });
    return { success: response.ok };
  },
};


export const PurchaseService = {
  sendPurchase: async (purchaseData) => {
    const user = AuthService.getUser();
    const clienteId = user?.id || user?.usuarioId || 1;


    const reservaDTO = {
      eventoId: purchaseData.eventoId,
      sectorId: purchaseData.sectorId || 1, 
      cantidadEntradas: purchaseData.cantidadEntradas || 1,
      montoTotal: purchaseData.montoTotal
    };


    const response = await fetch(`${API_BASE_URL}/reservas/${clienteId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reservaDTO),
    });
   
    if (!response.ok) throw new Error('Error al procesar la reserva en el servidor');
    return await response.json();
  },
};
